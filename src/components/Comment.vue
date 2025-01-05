<script lang="ts" setup>
import { computed, ref } from 'vue'
import moment from 'moment'

import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue'
import { CommentAggrateDocument } from '../entities/comment'
import Comment from './Comment.vue'

const emits = defineEmits(['replay', 'like', 'dislike'])
const props = defineProps({
  comment: {
    type: Object as () => CommentAggrateDocument,
    default: {}
  }
})

const likes = ref<number>(10)
const dislikes = ref<number>(0)
const action = ref<string>()

const like = () => {
  likes.value += 1
  dislikes.value -= 1
  action.value = 'liked'
  emits('like')
}

const dislike = () => {
  likes.value -= 1
  dislikes.value += 1
  action.value = 'disliked'
  emits('dislike')
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
          <template v-if="action === 'liked'">
            <LikeFilled @click="like" />
          </template>
          <template v-else>
            <LikeOutlined @click="like" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ likes }}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <template v-if="action === 'disliked'">
            <DislikeFilled @click="dislike" />
          </template>
          <template v-else>
            <DislikeOutlined @click="dislike" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ dislikes }}
        </span>
      </span>
      <span key="comment-nested-reply-to" @click.prevent="replay(comment)">Reply to</span>
    </template>
    <template #content>
      <p>{{ comment?.content }}</p>
    </template>
    <div v-if="comment.children && comment.children.length">
      <Comment v-for="inner_comment in comment.children" :key="inner_comment._id" :comment="inner_comment" @replay="replay"></Comment>
    </div>
  </a-comment>
</template>

<style lang="scss" scoped>
</style>
