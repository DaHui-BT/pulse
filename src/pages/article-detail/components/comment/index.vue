<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import moment from 'moment'

import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined, RightOutlined, DownOutlined } from '@ant-design/icons-vue'
import { CommentAggrateDocument } from '../../../../entities/comment'
import Comment from './index.vue'
import { CommentInteractionDocument } from '../../../../entities/commentInteraction'
import { useAuthStore } from '../../../../store'
import { CommentService } from '../../../../api/CommentService'
import { message } from 'ant-design-vue'
import PaginationType from '../../../../types/pagination'

const emits = defineEmits(['replay', 'like', 'dislike', 'delete'])
const props = defineProps({
  comment: {
    type: Object as () => CommentAggrateDocument,
    default: {}
  },
  comment_interaction_list: {
    type: Object as () => CommentInteractionDocument[],
    default: []
  }
})
const store = useAuthStore()
const comment_service = CommentService.getInstance()
const isShowChildComment = ref<boolean>(false)
const pagination = reactive<PaginationType>({
  current: 1,
  size: 0,
  total: 0
})

const like = (commentId: string | undefined, isCancel: boolean = false) => {
  commentId && emits('like', commentId, isCancel)
}

const dislike = (commentId: string | undefined, isCancel: boolean = false) => {
  commentId && emits('dislike', commentId, isCancel)
}

function replay(comment: CommentAggrateDocument) {
  emits('replay', comment)
}

const updateTime = computed(() => {
  return moment(props.comment.updatedAt).format('YYYY-MM-DD: HH-mm-ss')
})

const fromNow = computed(() => {
  return moment(props.comment.createdAt).fromNow()
})

const isLiked = (commentId: string | null | undefined): boolean => {
  for (let ci of props.comment_interaction_list) {
    if (ci.commentId === commentId) {
      return ci.action === 'like'
    }
  }
  return false
}

const isDisliked = (commentId: string | null | undefined): boolean => {
  for (let ci of props.comment_interaction_list) {
    if (ci.commentId === commentId) {
      return ci.action === 'dislike'
    }
  }
  return false
}

function deleteComment(id: string | undefined) {
  id && emits('delete', id)
}

function loadChildComments(comment: CommentAggrateDocument) {
  if (isShowChildComment.value) {
    comment.children.splice(0, comment.children.length)
  } else {
    comment_service.findChildComments({ parentComment: comment._id }).then(res => {
      if (res.data) {
        pagination.current = res.data.pagination.current
        pagination.size = res.data.pagination.size
        pagination.total = res.data.pagination.total
       
        if (!Array.isArray(comment.children)) {
          comment.children = []
        }
        comment.children.push(...(res.data.comments.map(c => ({...c, children: []}))))
      }
    })
  }
  isShowChildComment.value = !isShowChildComment.value
}

function loadMoreChildComment(comment: CommentAggrateDocument) {
  pagination.current += 1
  comment_service.findChildComments({ parentComment: comment._id }, pagination).then(res => {
    if (res.data) {
      pagination.current = res.data.pagination.current
      pagination.size = res.data.pagination.size
      pagination.total = res.data.pagination.total

      comment.children.push(...(res.data.comments.map(c => ({...c, children: []}))))
    }
  })
}

</script>

<template>
  <a-comment class="comment">
    <template #author>
      <a :href="`#/user-info?use_id=${comment?.author?.userId}`">{{ comment?.author?.username }}</a>
    </template>
    <template #avatar>
      <a-avatar :src="comment.author?.avatar" :alt="comment?.author?.username" />
    </template>
    <template #datetime>
      <a-tooltip :title="updateTime">
        <span>{{ fromNow }}</span>
      </a-tooltip>
    </template>
    <template #actions>
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <template v-if="isLiked(comment._id)">
            <LikeFilled @click="() => like(comment._id, true)" />
          </template>
          <template v-else>
            <LikeOutlined @click="() => like(comment._id)" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ comment.like }}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <template v-if="isDisliked(comment._id)">
            <DislikeFilled @click="() => dislike(comment._id, true)" />
          </template>
          <template v-else>
            <DislikeOutlined @click="() => dislike(comment._id)" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ comment.dislike }}
        </span>
      </span>
      <span key="comment-nested-reply-to" @click.prevent="replay(comment)">Reply to</span>
      <span key="comment-nested-delete" v-if="store.user._id === comment.author?.userId"
                                        @click.prevent="deleteComment(comment._id)">Delete</span>
    </template>
    <template #content>
      <p>{{ comment?.content }}</p>
    </template>
    
    <a-alert v-if="comment.childrenLen" style="color: #666" :message="`total replay: ${comment.childrenLen}`" type="info">
      <template #action>
        <a-button size="small" type="text" @click="() => loadChildComments(comment)">
          <DownOutlined v-if="isShowChildComment"/>
          <RightOutlined v-else/>
        </a-button>
      </template>
    </a-alert>

    <div v-if="comment.children && comment.children.length">
      <Comment v-for="inner_comment in comment.children"
               :key="inner_comment._id" :comment="inner_comment"
               :comment_interaction_list="comment_interaction_list"
               @replay="replay" @like="like" @dislike="dislike"></Comment>
               
      <a-flex justify="center" v-if="comment.children.length < pagination.total">
        <a-button type="link" @click="loadMoreChildComment(comment)">loadMore</a-button>
      </a-flex>
    </div>
  </a-comment>
</template>

<style lang="scss" scoped>
</style>
