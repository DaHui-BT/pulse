<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { type ArticleDocument } from '../../entities/article'
import { ArticleService } from '../../api/ArticleService'

import Constant from '../../constant'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { TagDocument } from '../../entities/tag'
import { useAuthStore } from '../../store'
import PaginationType from '../../types/pagination'
import ContentCard from './components/content/index.vue'


const store = useAuthStore()
const route = useRoute()
const spinning = ref<boolean>(true)
let article_list = reactive<ArticleDocument[]>([])
const tag_list = reactive<TagDocument[]>(store.tags)
const articleService = ArticleService.getInstance()
const value = ref<string | null>(null)
const pagination = reactive<PaginationType>({
  current: 1,
  size: 10,
  total: 0
})
const page_size = ref<number>(Constant.PAGE_SIZE)

async function loadData(filter: Partial<ArticleDocument> = {}) {
  articleService.findArticles(filter, {current: 1, size: page_size.value}).then(res => {
    if (res.success && res.data) {
      let articles = res.data?.articles || []
      article_list.splice(0, article_list.length)
      article_list.push(...(articles || []))
      pagination.total = res.data.pagination.total
      pagination.current = res.data.pagination.current
      pagination.size = res.data.pagination.size
    } else {
      message.error(res.error)
    }
    spinning.value = false
  }).catch(() => spinning.value = false)
}

onMounted(() => {
  if (route.query.search && route.query.search.length > 0) {
    let search_value: string = route.query.search + ''
    
    loadData({title: search_value })
  } else {
    loadData()
  }
})

// when query string change, reload data
watch(route, (newVal) => {
  if (newVal.query.search && newVal.query.search.length > 0) {
    let search_value: string = newVal.query.search + ''
    
    loadData({title: search_value })
  } else {
    loadData()
  }
})

function onSearch() {
  pagination.current = 1
  console.log(value.value)
  if ((value.value || '').trim().length === 0) {
    loadData()
  } else {
    loadData({title: value.value || '' })
  }
}

function changePage(page_number: number) {
  spinning.value = true
  articleService.findArticles({}, {page: page_number - 1, pageSize: page_size.value}).then(res => {
    if (res.success) {
      article_list.splice(0, article_list.length)
      article_list.push(...(res.data?.articles || []))  
    } else {
      message.error(res.error)
    }
    spinning.value = false
  })
}
</script>

<template>
  <a-typography-title :level="2">Article</a-typography-title>
  <a-form>
    <a-form-item>
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        @search="onSearch"></a-input-search>
    </a-form-item>
  </a-form>

  <a-spin :spinning="spinning">
    <a-flex class="article" vertical v-if="article_list.length > 0 && tag_list.length > 0">
      <ContentCard :article-list="article_list"></ContentCard>
    </a-flex>

    <a-empty v-else></a-empty>
                    
    <a-pagination class="article-pagination" v-model:current="pagination.current"
                  :defaultPageSize="pagination.size"
                  :total="pagination.total/pagination.size"
                  show-less-items
                  @change="changePage"/>
  </a-spin>
</template>

<style lang="scss" scoped>
.article {

  .article-item {
    margin-bottom: var(--small-margin);
    box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);
  }
  
  .article-pagination {
    margin-top: var(--middle-margin);
  }
}
</style>
