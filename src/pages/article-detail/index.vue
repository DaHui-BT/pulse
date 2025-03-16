<script lang="ts" setup>
import { ref, reactive, onBeforeMount, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

import { ArticleService } from '../../api/ArticleService'
import { UserService } from '../../api/UserService'
import { ArticleDocument } from '../../entities/article'
import { UserDocument } from '../../entities/user'

import { QuestionCircleOutlined, SendOutlined } from '@ant-design/icons-vue'

import { useAuthStore } from '../../store'
import { TagDocument } from '../../entities/tag'
import { JUMP_DELAY } from '../../constant'
import { parseToc, TocType } from '../../utils/parse'
import Comment from './components/comment-list/index.vue'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()
const user_service = UserService.getInstance()
const article_service = ArticleService.getInstance()
const article_info = ref<ArticleDocument | null>(null)
const user_info = ref<UserDocument>()
const current_user = ref<UserDocument>(store.user)
const tag_list = reactive<TagDocument[]>(store.tags)
const tags = reactive<TagDocument[]>([])
const preview = ref<{$el: HTMLDocument, html: string, scrollToTarget: Function}>()
const tocs = reactive<TocType[]>([])
let spinning = ref<boolean>(true)

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

const currentAnchor = ref<string>('')

onBeforeMount(async () => {
  await article_service.findArticleById(route.query._id + '').then(res => {
    if (res.success && res.data) {
      article_info.value = res.data
      routes[2].breadcrumbName = article_info.value?.title || ''
      tags.push(...(tag_list.filter(t => article_info.value?.tags.includes(t._id)) || []))
    }
    
    if (!res.success) {
      message.error(res.error)
    }
  }).catch(err => {
    message.error(err.message)
  }).finally(() => spinning.value = false)

  if (!article_info.value) return
  
  user_service.findUserInfoById(article_info.value.createdBy).then(res => {
    if (res.success) {
      user_info.value = res.data
    } else {
      message.error(res.error)
    }
  }).catch(err => message.error(err.message))
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

function editArticle() {
  router.push({path: '/publish', query: {_id: article_info.value?._id + '', type: 'Article'}})
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
        resolve(err)
      })
    }
  })
}

const cancel = (_e: MouseEvent) => {
  message.warning('Delete operation canceled')
}

const shareHandler = () => {
  navigator.clipboard.writeText(location.href)
  message.success('Copied the link')
}
</script>

<template>
  <a-spin :spinning="spinning">
    <div class="article-detail" v-if="article_info">
      <a-page-header
        :title="article_info.title"
        class="article-detail-header"
        :avatar="{ src: user_info?.avatar }"
        :breadcrumb="{ routes }"
        @back="() => $router.go(-1)">
        
        <template #extra v-if="article_info.createdBy == current_user?._id">
          <!-- <a-button type="primary" @click="editArticle">Edit</a-button> -->
          <a-button type="primary" @click="editArticle">修改</a-button>

          <a-popconfirm title="Ready to delete?" @confirm="confirm" @cancel="cancel">
            <!-- <a-button type="primary" danger>Delete</a-button> -->
            <a-button type="primary" danger>删除</a-button>
          </a-popconfirm>
        </template>

        <template #tags>
          <a-tag color="blue" v-for="tag in tags" :key="tag._id">{{ tag.name }}</a-tag>
        </template>
      </a-page-header>
      
      <a-flex gap="20" wrap="wrap" class="repository-function" justify="flex-end">
        <a-tooltip>
          <!-- <template #title>Create date</template> -->
          <template #title>创建时间</template>
          <!-- <a-typography-text type="secondary">Created at: {{ dayjs(article_info?.createdAt).format('YYYY-MM-DD') }}</a-typography-text> -->
          <a-typography-text type="secondary">创建于: {{ dayjs(article_info?.createdAt).format('YYYY-MM-DD') }}</a-typography-text>
        </a-tooltip>
        
        <a-tooltip>
          <!-- <template #title>Update date</template> -->
          <template #title>更新时间</template>
          <!-- <a-typography-text type="secondary">Update at: {{ dayjs(article_info?.updatedAt).format('YYYY-MM-DD') }}</a-typography-text> -->
          <a-typography-text type="secondary">更新于: {{ dayjs(article_info?.updatedAt).format('YYYY-MM-DD') }}</a-typography-text>
        </a-tooltip>
      </a-flex>
      
      <a-anchor :items="tocs" :affix="false" wrapperClass="article-toc"
                  @click.prevent="handleAnchorClick" 
                  :get-current-anchor="getCurrentAnchor" />
      
      <v-md-preview :text="article_info.content" ref="preview"/>
      
      <a-divider style="height: 2px;"></a-divider>
      <Comment :article-id="article_info._id + ''"/>
      
      <a-float-button-group shape="circle" :style="{ right: '24px' }">
        <a-float-button>
          <template #icon>
            <QuestionCircleOutlined />
          </template>
        </a-float-button>
        <a-float-button @click="shareHandler">
          <template #icon>
            <SendOutlined />
          </template>
        </a-float-button>
        <a-back-top :visibility-height="0" />
      </a-float-button-group>
    </div>
    <a-empty v-else></a-empty>
  </a-spin>
</template>
<style scoped lang="scss">
.article-detail {

  .article-toc {
    max-height: 3000px !important;
  }

  .article-detail-header {
    padding: 0;

    
    :deep(.ant-page-header-heading) {
      flex-wrap: wrap;
    }

    :deep(.ant-avatar) {
      flex-shrink: 0;
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
</style>
