<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { type ArticleDocument } from '../entities/article'
import { ArticleService } from '../services/ArticleService'

import ContentCard from '@components/ContentCard.vue'
import Constant from '../constant'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'


const articleService = ArticleService.getInstance()
const route = useRoute()
const spinning = ref<boolean>(true)
let article_list = reactive<ArticleDocument[]>([])
let current_page = ref<number>(1)
let total_page = ref<number>(1)
const page_size = ref<number>(Constant.PAGE_SIZE)

async function loadData(filter: Partial<ArticleDocument> = {}) {
  articleService.findArticles(filter, {page: 0, pageSize: page_size.value}).then(res => {
    if (!res.success) {
      message.error(res.error)
    } else {
      let articles = res.data?.articles || []
      article_list.splice(0, articles.length)
      article_list.push(...(res.data?.articles || []))
      total_page.value = res.data?.total == undefined ? 0 : res.data.total
    }
    spinning.value = false
  })
}

onMounted(() => {
  let search_value: string = route.query.search + ''
  loadData({title: { $text: { $search: search_value } }})
})

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
  <a-spin :spinning="spinning">
    <a-typography-title :level="2">Article</a-typography-title>
    <a-flex class="article" vertical v-if="article_list.length > 0">
      <content-card class="article-item"
                    v-for="article in article_list"
                    :key="article._id"
                    :content="article"></content-card>
    </a-flex>

    <a-empty v-else></a-empty>
                    
    <a-pagination class="article-pagination" v-model:current="current_page"
                  :defaultPageSize="1"
                  :total="total_page"
                  show-less-items
                  @change="changePage"/>
  </a-spin>
</template>

<style lang="scss" scoped>
.article {

  .article-item {
    margin-bottom: var(--small-margin);
  }
  
  .article-pagination {
    margin-top: var(--middle-margin);
  }
}
</style>
