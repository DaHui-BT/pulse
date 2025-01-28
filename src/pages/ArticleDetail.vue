<script lang="ts" setup>
import { ref, reactive, onBeforeMount, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

import { ArticleService } from '../api/ArticleService'
import { UserService } from '../api/UserService'
import { ArticleDocument } from '../entities/article'
import { UserDocument } from '../entities/user'
import { InteractionService } from '../api/InteractionService'
import { OperationType, CollectionType } from '../entities/interaction'
import { CommentService } from '../api/CommentService'
import { CommentDocument, CommentAggrateDocument } from '../entities/comment'

import { QuestionCircleOutlined } from '@ant-design/icons-vue'

import { Store } from '../store'
import { TagService } from '../api/TagService'
import { TagDocument } from '../entities/tag'
import { JUMP_DELAY } from '../constant'
import { parseToc, TocType } from '../utils/parse'

const route = useRoute()
const router = useRouter()
const store = Store()
const comment_input = ref<HTMLElement>()
const user_service = UserService.getInstance()
const article_service = ArticleService.getInstance()
const comment_service = CommentService.getInstance()
const interaction_service = InteractionService.getInstance()
const tagService = TagService.getInstance()
const comment_aggrate_list = reactive<Array<CommentAggrateDocument>>([])
const article_info = ref<ArticleDocument>()
const user_info = ref<UserDocument>()
const current_user = ref<UserDocument>(store.user)
const tag_list = reactive<TagDocument[]>([])
const preview = ref<{$el: HTMLDocument, html: string, scrollToTarget: Function}>()
const tocs = reactive<TocType[]>([])
let spinning = ref<boolean>(true)
let comment_spinning = ref<boolean>(true)
let function_spinning = ref<boolean>(true)

const routes = reactive<{path: string, breadcrumbName: string}[]>([
  {
    path: '/',
    breadcrumbName: 'Home',
  },
  {
    path: '/article',
    breadcrumbName: 'Article',
  },
  {
    path: '/article-info',
    breadcrumbName: article_info.value?.title || '',
  },
])

const submitting = ref<boolean>(false)
const value = ref<string>('')
const comment_father_id = ref<string | null>()
const is_stared = ref<boolean>(false)
const is_collected = ref<boolean>(false)
const replay_placeholder = ref<string>()
const currentAnchor = ref<string>('')

onBeforeMount(async () => {
  await article_service.findArticleById(route.query._id + '').then(res => {
    if (res.success) {
      article_info.value = res.data || undefined
      routes[2].breadcrumbName = article_info.value?.title || ''
    }
    spinning.value = false
    if (!res.success) {
      message.error(res.error)
      throw new Error(res.error)
    }
  }).catch(err => {
    throw new Error(err.message)
  })
  article_info.value && tagService.findTagByIds(article_info.value.tags).then(res => {
    if (res.success && res.data) {
      tag_list.splice(0, tag_list.length)
      tag_list.push(...res.data)
    }
  })
  
  article_info.value && user_service.findUserInfoById(article_info.value.createdBy).then(res => {
    if (res.success) {
      user_info.value = res.data
    } else {
      message.error(res.error)
    }
  })

  interaction_service.findInteractions({createdBy: store.user._id,
                                        documentId: article_info.value?._id,
                                        collectionName: CollectionType.ARTICLE}).then(res => {
    if (res.success) {
      res.data?.interactions.forEach(interaction => {
        if (interaction.operation == OperationType.STAR) {
          is_stared.value = true
        } else if (interaction.operation == OperationType.COLLECT) {
          is_collected.value = true
        }
      })
    } else {
      message.error(res.error)
    }
    function_spinning.value = false
  })

  article_info.value && comment_service.findComments({article: article_info.value._id}).then(res => {
    if (res.success) {
      comment_aggrate_list.push(...commentCombine(res.data?.comments || []))
      comment_spinning.value = false
    } else {
      message.error(res.error)
    }
  })
})

watch(preview, (newVal, _oldVal) => {
  if (newVal) {
    const prefixPath = route.fullPath
    tocs.push(...parseToc(newVal.html, prefixPath))
    let firstChild = newVal.$el.children[0]?.firstChild as HTMLElement
    if (firstChild) {
      currentAnchor.value = '#' + firstChild.getAttribute('data-v-md-line')
    }
  }
})

window.onscroll = () => {
  const scrollTop = window.scrollY;
  const headings = Array.from(preview.value?.$el.querySelectorAll('h1, h2, h3, h4, h5, h6') || [])
  let currentActive = headings[0]?.getAttribute('data-v-md-line')

  headings.forEach((heading) => {
    if ((heading as HTMLElement).offsetTop <= scrollTop + 50) {
      currentActive = '#' + heading.getAttribute('data-v-md-line')
      // if (currentActive != '#' + headings[0]?.getAttribute('data-v-md-line')) {
      //   // console.log(toc_ref.value.classList)
      //   toc_ref.value?.classList.add('article-title-container--fixed')
      // } else {
      //   toc_ref.value?.classList.remove('article-title-container--fixed')
      // }
    }
  })
  currentAnchor.value = currentActive || ''
}

onBeforeUnmount(() => {
  window.onscroll = null
})

const getCurrentAnchor = () => {
  return currentAnchor.value
}

function handleAnchorClick(e: MouseEvent) {
  currentAnchor.value = (e.target as HTMLElement).getAttribute('href') || ''
  const href = (e.target as HTMLElement).getAttribute('href') || ''
  
  if (href) {
    const lineIndex = href.slice(1, href.length)
    const heading = preview.value?.$el.querySelector(`[data-v-md-line="${lineIndex}"]`) as HTMLElement

    window.scrollTo({ top: heading.offsetTop, behavior: 'smooth'})
  }
}

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

const handleSubmit = () => {
  if (!value.value) {
    return;
  }
  submitting.value = true

  let comment_new: CommentDocument = {
    article: article_info.value?._id || '',
    content: value.value,
    parentComment: comment_father_id.value || '',
    createdBy: store.user._id,
    like: 0,
    dislike: 0,
    updatedAt: new Date(),
    createdAt: new Date(),
    isDeleted: false
  }
  submitting.value = false
  comment_father_id.value = null
  comment_spinning.value = true
  comment_service.createComment(comment_new).then((res) => {
    if (res.success) {
      value.value = ''
      message.success('publish comment successfully!')
      // TODO load comment again
      article_info.value && comment_service.findComments({article: article_info.value._id}).then(res => {
        if (res.success) {
          comment_aggrate_list.splice(0, comment_aggrate_list.length)
          comment_aggrate_list.push(...commentCombine(res.data?.comments || []))
          closePlaceholder()
        } else {
          message.error(res.error)
        }
        comment_spinning.value = false
      }).catch(() => comment_spinning.value = false)
    } else {
      message.error(res.error)
    }
  }).catch(() => {
    comment_spinning.value = false
  })
}

async function update(method_num: number) {
  if (article_info.value == null || article_info.value == undefined) {
    return
  }
  console.log(method_num)
  switch (method_num) {
    case 0:
      // do star method
      if (is_stared.value) {
        article_info.value.statistics.stars -= 1
        is_stared.value = false
        interaction_service.deleteInteractionByFilter({ documentId: article_info.value._id,
                                                collectionName: CollectionType.ARTICLE,
                                                createdBy: user_service.getCurrentUser()._id,
                                                operation: OperationType.STAR}).then(res => {
                                                  if (res.success) {
                                                    message.success('unstar successfully!')
                                                  } else {
                                                    message.error(res.error)
                                                  }
                                                })
      } else {
        article_info.value.statistics.stars += 1
        is_stared.value = true
        interaction_service.createInteraction({
          createdBy: user_service.getCurrentUser()._id,
          documentId: article_info.value._id || '',
          operation: OperationType.STAR,
          collectionName: CollectionType.ARTICLE,
          createdAt: new Date(),
          isDeleted: false
        }).then(res => {
          if (res.success) {
            message.success('star successfully!')
          } else {
            message.error(res.error)
          }
        })
      }
      article_info.value._id && article_service.updateArticle(article_info.value?._id, article_info.value)
      break
    case 1:
      // do collect method
      if (is_collected.value) {
        article_info.value.statistics.collections -= 1
        is_collected.value = false
        interaction_service.deleteInteractionByFilter({ documentId: article_info.value._id,
                                                createdBy: user_service.getCurrentUser()._id,
                                                operation: OperationType.COLLECT,
                                                collectionName: CollectionType.ARTICLE }).then(res => {
                                                  if (res.success) {
                                                    message.success('uncollect successfully!')
                                                  } else {
                                                    message.error(res.error)
                                                  }
                                                })
      } else {
        article_info.value.statistics.collections += 1
        is_collected.value = true
        interaction_service.createInteraction({
          createdBy: user_service.getCurrentUser()._id,
          documentId: article_info.value._id || '',
          operation: OperationType.COLLECT,
          collectionName: CollectionType.ARTICLE,
          createdAt: new Date(),
          isDeleted: false
        }).then(res => {
          if (res.success) {
            message.success('collect successfully!')
          } else {
            message.error(res.error)
          }
        })
      }
      article_info.value._id && article_service.updateArticle(article_info.value?._id, article_info.value)
      break
    case 2:
      // do transfer method
      break
    default:
      throw Error('system not contain this method: ' + method_num)
  }
}

function replay(comment: CommentDocument) {
  comment._id && (comment_father_id.value = comment._id)
  replay_placeholder.value = comment?.author?.username
  comment_input.value?.focus()
}

function closePlaceholder() {
  comment_father_id.value = null
  replay_placeholder.value = ''
}

function editArticle() {
  router.push({path: '/publish', query: {_id: article_info.value?._id + ''}})
}

const confirm = () => {
  return new Promise(async resolve => {
    if (article_info.value?._id) {
      await article_service.deleteById(article_info.value?._id).then(res => {
        console.log(res)
        if (res.success) {
          message.success('Delete article successfully!')
          setTimeout(() => {
            router.push('/article')
          }, JUMP_DELAY)
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(err => {
        resolve(false)
      })
    }

  })
}

const cancel = (e: MouseEvent) => {
  message.warning('Delete operation canceled')
}
</script>

<template>
  <a-spin :spinning="spinning">
    <div class="article-detail" v-if="article_info">
      <a-page-header
        :title="article_info.title"
        class="article-detail-container"
        :avatar="{ src: user_info?.avatar }"
        :breadcrumb="{ routes }"
        @back="() => $router.go(-1)">
        
        <template #extra v-if="article_info.createdBy == current_user?._id">
          <a-button type="primary" @click="editArticle">Edit</a-button>

          <a-popconfirm title="Ready to delete?" @confirm="confirm" @cancel="cancel">
            <a-button type="primary" danger>Delete</a-button>
          </a-popconfirm>
        </template>

        <template #tags>
          <a-tag color="#2db7f5" v-for="tag in tag_list" :key="tag._id">{{ tag.name }}</a-tag>
        </template>

        <Removable v-if="tocs.length > 0" height="280px" top="150px" right="55px">
          <a-anchor :items="tocs" :affix="false"
                      @click.prevent="handleAnchorClick" 
                      :get-current-anchor="getCurrentAnchor" />
        </Removable>
        <!-- <div class="article-title-container article-title-container--fixed" 
                    v-if="tocs.length > 0" ref="toc_ref"
                    draggable="true" v-draggable>
          <div class="article-title-container-handle"></div>
          <div class="article-title-content">
            <a-anchor :items="tocs" :affix="false"
                      @click.prevent="handleAnchorClick" 
                      :get-current-anchor="getCurrentAnchor" />
          </div>
        </div> -->
        <v-md-preview :text="article_info.content" ref="preview"/>
      </a-page-header>

      <!-- <a-flex class="article-detail-function" gap="20">
        <i :class="['iconfont', 'article-detail-function--item',
                    {'article-detail-function--item-activate': is_stared}]"
            @click="update(0)">&#xe69e; {{ article_info.statistics.stars }}</i>
        <i :class="['iconfont', 'article-detail-function--item',
                    {'article-detail-function--item-activate': is_collected}]" 
            @click="update(1)">&#xe604; {{ article_info.statistics.collections }}</i>
        <i class="iconfont article-detail-function--item" 
            @click="update(2)">&#xe63d;</i>
      </a-flex> -->
      
      <a-divider style="height: 2px;"></a-divider>
      <a-spin :spinning="comment_spinning">
        <Comment v-for="comment in comment_aggrate_list"
                :key="comment._id + ''"
                :comment="comment"
                @replay="replay"></Comment>
                
        <a-comment class="comment-input-container">
          <template #avatar>
            <a-avatar :src="store.user?.avatar" :alt="user_info?.username" />
          </template>
          <template #content>
            <div class="replay-placeholder" v-if="replay_placeholder">
              <a-typography-text type="secondary">Replay to: {{ replay_placeholder }}</a-typography-text>
              <a-typography-text type="secondary" class="close" @click="closePlaceholder">x</a-typography-text>
            </div>
            <a-form-item>
              <a-textarea v-model:value="value" :rows="4" placeholder="input your comment" ref="comment_input" />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                Add Comment
              </a-button>
            </a-form-item>
          </template>
        </a-comment>

        <!-- <Removable right="24px" bottom="20px"> -->
          <a-float-button-group shape="circle" :style="{ right: '24px' }">
            <a-float-button>
              <template #icon>
                <QuestionCircleOutlined />
              </template>
            </a-float-button>
            <a-float-button />
            <a-back-top :visibility-height="0" />
          </a-float-button-group>
        <!-- </Removable> -->
      </a-spin>
    </div>
    <a-empty v-else></a-empty>
  </a-spin>
</template>
<style scoped lang="scss">
.article-detail {

  .article-detail-container {
    padding: 0;

    .ant-page-header-heading-left {
      flex-wrap: wrap;
      overflow: auto;
    }
 
    .article-title-container--fixed {
      display: relative;
      position: fixed;
      top: 150px;
      right: 55px;
    }

    .article-title-container {
      border: 1px solid #108ee9;
      border-top: none;
      border-radius: 0 0 5px 5px;
      margin: 15px 0; 
      background-color: #fff;
      z-index: 3;
      transform: translate(0);

      .article-title-container-handle {
        height: 20px;
        width: 100%;
        background: url('../assets/handle.png');
        background-color: rgba(238, 238, 238, 0.171);
        background-repeat: repeat-x;
        background-size: 20px;

        &:hover {
          cursor: move;
        }
      }

      .article-title-content {
        max-height: 280px;
        overflow-x: auto;
      }

      .article-title-item {
        
        .article-title-href {
          cursor: pointer;
        }
      }
    }
  }

  .article-detail-function {

    .article-detail-function--item {
      cursor: pointer;
    }

    .article-detail-function--item-activate {
      color: #108ee9;
    }
  }

  .comment-input-container {

    .replay-placeholder {
      display: flex;
      justify-content: space-between;
      // background-color: #eee;
      border-radius: 8px;
      padding: 3px 15px;

      .close {
        cursor: pointer;
      }
    }
  }
}

#components-page-header-demo-content .image {
  margin: 0 0 0 60px;
  display: flex;
  align-items: center;
}

#components-page-header-demo-content .ant-page-header-rtl .image {
  margin: 0 60px 0 0;
}

#components-page-header-demo-content .example-link {
  line-height: 24px;
  margin-right: 16px;
}
[data-theme='compact'] #components-page-header-demo-content .example-link {
  line-height: 20px;
}
#components-page-header-demo-content .example-link-icon {
  margin-right: 8px;
}

[data-theme='compact'] #components-page-header-demo-content .example-link-icon {
  width: 20px;
  height: 20px;
}

#components-page-header-demo-content .ant-page-header-rtl .example-link {
  float: right;
  margin-right: 0;
  margin-left: 16px;
}
#components-page-header-demo-content .ant-page-header-rtl .example-link-icon {
  margin-right: 0;
  margin-left: 8px;
}
#components-page-header-demo-content .content p {
  margin-bottom: 1em;
  color: rgba(0, 0, 0, 0.85);
  overflow-wrap: break-word;
}

@media (max-width: 768px) {
  #components-page-header-demo-content .image {
    flex: 100%;
    margin: 24px 0 0;
  }
}
</style>

