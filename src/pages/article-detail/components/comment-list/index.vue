<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { CommentAggrateDocument, CommentDocument } from '../../../../entities/comment';
import { CommentService } from '../../../../api/CommentService';
import PaginationType from '../../../../types/pagination';
import { message } from 'ant-design-vue';
import { useAuthStore } from '../../../../store';
import Comment from '../comment/index.vue'
import { CommentInteractionService } from '../../../../api/CommentInteractionService';
import { CommentInteractionDocument } from '../../../../entities/commentInteraction';
import { ArticleService } from '../../../../api/ArticleService';

const props = defineProps({
  articleId: {
    type: String,
    required: true
  },
})
const store = useAuthStore()
const article_service = ArticleService.getInstance()
const comment_service = CommentService.getInstance()
const comment_interaction_service = CommentInteractionService.getInstance()
const comment_list = reactive<CommentDocument[]>([])
const comment_aggrate_list = reactive<Array<CommentAggrateDocument>>([])
const spinning = ref<boolean>(true)
const submit_loading = ref<boolean>(false)
const comment = ref<string | null>(null)
const comment_ref = ref<HTMLTextAreaElement | null>(null)
const parent_comment_id = ref<string | null>(null)
const comment_interaction_list = reactive<CommentInteractionDocument[]>([])
const replay_placeholder = ref<string | null> (null)
const pagination = reactive<PaginationType>({
  current: 1,
  size: 3,
  total: 0
})

function loadData(clear: boolean = false) {
  if (clear) {
    comment_list.splice(0, comment_list.length)
  }
  comment_aggrate_list.splice(0, comment_aggrate_list.length)
  comment_service.findChildComments({article: props.articleId, parentComment: ''},
                                    {current: pagination.current, size: pagination.size}).then(res => {
    if (res.success) {
      comment_list.push(...(res.data?.comments || []))
      comment_aggrate_list.push(...commentCombine(comment_list || []))
      if (res.data?.pagination) {
        pagination.current = res.data.pagination.current
        pagination.size = res.data.pagination.size
        pagination.total = res.data.pagination.total
      }
    } else {
      message.error(res.error)
    }
  }).catch(err => message.error(err.message))
  .finally(() => spinning.value = false)
}

function loadCommentInteraction() {
  comment_interaction_list.splice(0, comment_interaction_list.length)

  comment_interaction_service.findAllCommentInteractionsByFilter(
    { articleId: props.articleId, userId: store.user._id }).then(res => {
    comment_interaction_list.push(...(res.data || []))
  })
}

onMounted(() => {
  loadData(true)
  loadCommentInteraction()
})

function commentCombine(commentList: CommentDocument[]): CommentAggrateDocument[] {
  let commentAggrateList: CommentAggrateDocument[] = []

  commentList.forEach(comment => {
    if (comment.parentComment == null || comment.parentComment.length == 0) {
      commentAggrateList.push({...comment, children: []})
    }
  })

  function combine(innerCommentList: CommentDocument[], fatherCommentList: CommentAggrateDocument[]) {
    for (let comment of innerCommentList) {
      if (comment.parentComment + '' != null) {
        for (let comment_aggrate of fatherCommentList) {
          if (comment_aggrate._id + '' == comment.parentComment + '') {
            comment_aggrate.children.push({...comment, children: []})
          } else if (comment_aggrate.children.length > 0) {
            combine(innerCommentList, comment_aggrate.children)
          }
        }
      }
    }
  }

  combine(commentList, commentAggrateList)
  return commentAggrateList
}

function loadMore() {
  pagination.current += 1
  loadData()
}

function replay (comment: CommentDocument) {
  parent_comment_id.value = comment._id || null
  replay_placeholder.value = comment?.author?.username || null
  comment_ref.value?.focus()
}

async function likeHandler(commentId: string, isCancel: boolean) {
  if (isCancel) {
    await comment_service.like(commentId, -1).catch(err => message.error(err.message))
    comment_interaction_service.deleteByCommentIdAndAction(commentId, 'like').then(res => {
      if (res.data) {
        message.success('Cancel like successfully!')
        loadCommentInteraction()
        loadData(true)
      } else {
        message.error(res.message)
      }
    }).catch(err => message.error(err.message))
  } else {
    // judge if is disliked
    for (let ci of comment_interaction_list) {
      if (ci.commentId === commentId) {
        if (ci.action === 'dislike') {
          // delete first
          await comment_service.dislike(commentId, -1).catch(err => message.error(err.message))
          await comment_interaction_service.deleteByCommentIdAndAction(commentId, 'dislike')
        }
      }
    }
    await comment_service.like(commentId, 1)
    comment_interaction_service.createCommentInteraction({
      userId: store.user._id,
      articleId: props.articleId,
      commentId: commentId,
      action: 'like'
    }).then(res => {
      if (res.data) {
        message.success(res.message)
        loadCommentInteraction()
        loadData(true)
      } else {
        message.error(res.message)
      }
    }).catch(err => message.error(err.message))
  }
}

async function dislikeHandler(commentId: string, isCancel: boolean) {
  if (isCancel) {
    await comment_service.dislike(commentId, -1).catch(err => message.error(err.message))
    comment_interaction_service.deleteByCommentIdAndAction(commentId, 'dislike').then(res => {
      if (res.data) {
        message.success('Cancel dislike successfully!')
        loadCommentInteraction()
        loadData(true)
      } else {
        message.error(res.message)
      }
    }).catch(err => message.error(err.message))
  } else {
    // judge if is liked
    for (let ci of comment_interaction_list) {
      if (ci.commentId === commentId) {
        if (ci.action === 'like') {
          // delete first
          await comment_service.like(commentId, -1).catch(err => message.error(err.message))
          await comment_interaction_service.deleteByCommentIdAndAction(commentId, 'like')
        }
      }
    }

    await comment_service.dislike(commentId, 1).catch(err => message.error(err.message))
    comment_interaction_service.createCommentInteraction({
      userId: store.user._id,
      articleId: props.articleId,
      commentId: commentId,
      action: 'dislike'
    }).then(res => {
      if (res.data) {
        message.success('Dislike successfully!')
        loadCommentInteraction()
        loadData(true)
      } else {
        message.error(res.message)
      }
    }).catch(err => message.error(err.message))
  }
}

async function deleteComment(commentId: string) {
  comment_service.deleteById(commentId).then(res => {
    if (res.data) {
      article_service.deleteArticleCommentCount(props.articleId)
      message.success(res.message)
    } else {
      message.error(res.message)
    }
  }).catch(err => message.error(err.message))
}

function closeReplayHandler() {
  replay_placeholder.value = null
}

function submitHandler() {
  if (comment.value) {
    comment_service.createComment({
      article: props.articleId,
      content: comment.value,
      parentComment: parent_comment_id.value || undefined,
      author: {
        userId: store.user._id,
        username: store.user.username,
        avatar: store.user.avatar || undefined
      }
    }).then(res => {
      if (res.data) {
        article_service.addArticleCommentCount(props.articleId)
        message.success(res.message)
        replay_placeholder.value = null
        comment.value = null
        parent_comment_id.value = null
        loadData(true)
      } else { message.error(res.message) }
    }).catch(err => message.error(err.message))
  } else {
    message.error('Please input your comment first before submit')
  }
}
</script>

<template>
  <Comment v-for="comment in comment_aggrate_list"
          :key="comment._id + ''"
          :comment="comment" :comment_interaction_list="comment_interaction_list"
          @replay="replay" @like="likeHandler" @dislike="dislikeHandler" @delete="deleteComment"></Comment>
  
  <a-flex justify="center" v-if="comment_list.length < pagination.total ">
    <a-button type="link" @click="loadMore">loadMore</a-button>
  </a-flex>

  <a-comment class="comment-input-container">
    <template #avatar>
      <a-avatar :src="store.user?.avatar" :alt="store.user?.username" />
    </template>

    <template #content>
      <a-flex justify="space-between" :gap="10" class="replay-placeholder" v-if="replay_placeholder">
        <a-typography-text type="secondary">Replay to: {{ replay_placeholder }}</a-typography-text>
        <a-typography-link type="secondary" class="close" @click="closeReplayHandler">x</a-typography-link>
      </a-flex>

      <a-form-item>
        <a-textarea v-model:value="comment" :rows="4"
                    placeholder="input your comment" ref="comment_ref"
                    :disabled="!store.isAuthenticated" />
      </a-form-item>

      <a-form-item>
        <a-tooltip :title="store.isAuthenticated ? 'comment' : 'login for comment'">
          <a-button html-type="submit" :loading="submit_loading"
                    type="primary" @click="submitHandler"
                    :disabled="!store.isAuthenticated">
            Add Comment
          </a-button>
        </a-tooltip>
      </a-form-item>
    </template>
  </a-comment>
</template>

<style scoped lang="scss">
.comment-input-container {

  .replay-placeholder {

  }
}
</style>
