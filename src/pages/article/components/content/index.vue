<script lang="ts" setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { ArticleDocument } from '../../../../entities/article';
import { useAuthStore } from '../../../../store';
import { ArticleService } from '../../../../api/ArticleService';
import PaginationType from '../../../../types/pagination';
import { message } from 'ant-design-vue';

const store = useAuthStore()
const loading = ref<boolean>(true)
const articleService = ArticleService.getInstance()
const articleList = reactive<ArticleDocument[]>([])
const searchValue = ref<string>('')
const pagination = reactive<PaginationType>({
  current: 1,
  size: 10,
  total: 0,
  pages: 1
})

onMounted(loadData)

async function loadData(filter: Partial<ArticleDocument> = {}) {
  loading.value = true
  if (!filter.title || filter.title?.length === 0) {
    delete filter.title
  }
  articleList.splice(0, articleList.length)
  articleList.push(...Array(pagination.size).fill({} as ArticleDocument))
  articleService.findArticles(filter, {current: pagination.current, size: pagination.size}).then(res => {
    if (res.success && res.data) {
      articleList.splice(0, articleList.length)
      articleList.push(...(res.data.articles || []))

      pagination.total = res.data.pagination.total
      pagination.current = res.data.pagination.current
      pagination.size = res.data.pagination.size
      pagination.pages = res.data.pagination.pages
    } else {
      message.error(res.error)
    }
  }).catch((err) => message.error(err.message))
  .finally(() => loading.value = false)
}

function onSearch() {
  pagination.current = 1
  if (searchValue.value.length === 0) {
    loadData()
  } else {
    loadData({title: searchValue.value})
  }
}

function changePage(page_number: number) {
  pagination.current = page_number
  loadData({title: searchValue.value})
}

const getTagName = (id: string) => {
  for (let tag of store.tags) {
    if (id == tag._id) {
      return tag.name
    }
  }
}

</script>

<template>
  <a-form>
    <a-form-item>
      <a-input-search
        v-model:value.trim="searchValue"
        placeholder="input search text"
        @search="onSearch"></a-input-search>
    </a-form-item>
  </a-form>

  <a-list item-layout="vertical" size="large" :data-source="articleList">
    <template #renderItem="{ item }">
      <a-list-item :key="item.title" class="content-item">
        <template v-if="!loading" #actions>
          <span>
            <component :is="StarOutlined" style="margin-right: 8px"></component>
            {{ item.statistics.collections }}
          </span>
          
          <span>
            <component :is="LikeOutlined" style="margin-right: 8px"></component>
            {{ item.statistics.stars }}
          </span>
          
          <span>
            <component :is="MessageOutlined" style="margin-right: 8px"></component>
            {{ item.statistics.comments }}
          </span>
        </template>

        <a-skeleton :loading="loading" active>
          <a-list-item-meta>
            <template #title>
              <a-flex justify="space-between" gap="10" class="title-container">
                <a :href="`#/article-detail?_id=${item._id}`">{{ item.title }}</a>
                
                <a-flex :gap="20">
                  <a-tag color="cyan" v-for="tag in item.tags" :key="tag">{{ getTagName(tag) }}</a-tag>
                </a-flex>
              </a-flex>
            </template>

            <template #description>
              <a-typography-paragraph
                :ellipsis="{ rows: 3 }":content="item.description">
              </a-typography-paragraph>
            </template>
          </a-list-item-meta>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>

  <a-pagination class="article-pagination"
                v-model:current="pagination.current"
                :defaultPageSize="pagination.size"
                :total="pagination.total"
                show-less-items
                @change="changePage"/>
</template>

<style scoped lang="scss">
</style>
