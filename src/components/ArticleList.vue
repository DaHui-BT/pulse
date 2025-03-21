<script lang="ts" setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { ArticleService } from '../api/ArticleService';
import { message } from 'ant-design-vue';
import { ArticleDocument } from '../entities/article';
import PaginationType from '../types/pagination';

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const articleService = ArticleService.getInstance()
const articleList = reactive<ArticleDocument[]>([])

const loading = ref<boolean>(true);
const spinning = ref<boolean>(true)
const pagination = reactive<PaginationType>({
  current: 0,
  size: 3,
  pages: 1,
  total: 0
})

function loadData(clear: boolean = true) {
  if (clear) {
    articleList.splice(0, articleList.length)
  }
  spinning.value = true
  articleService.findArticleInfoList({ createdBy: props.userId }, { current: pagination.current, size: pagination.size }).then(res => {
    if (res.success && res.data) {
      articleList.push(...(res.data.articles || []))
      pagination.current = res.data.pagination.current
      pagination.total = res.data.pagination.total
      pagination.pages = res.data.pagination.pages
      pagination.size = res.data.pagination.size
    } else {
      message.error(res.error)
    }
  }).catch(err => {
    message.error(err)
  }).finally(() => {
    loading.value = false
    spinning.value = false
  })
}

onMounted(loadData)

const onLoadMore = () => {
  pagination.current += 1
  loadData(false)
};
</script>

<template>
  <a-spin :spinning="spinning">
    <a-list item-layout="vertical" size="large" :data-source="articleList">
      <template #loadMore>
        <div v-if="!loading && articleList.length < pagination.total"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
          <!-- <a-button @click="onLoadMore">loading more</a-button> -->
          <a-button @click="onLoadMore">加载更多</a-button>
        </div>
      </template>

      <template #renderItem="{ item }">
        <a-list-item key="item.title">
        <template #extra v-if="!loading">
          <a-flex :gap="20">
            <!-- <a-tag color="cyan" v-if="item.public">Public</a-tag> -->
            <a-tag color="cyan" v-if="item.public">公开</a-tag>
            <!-- <a-tag color="blue" v-else>Private</a-tag> -->
            <a-tag color="blue" v-else>私有</a-tag>
            <!-- <a key="list-loadmore-edit" :href="`#/publish?_id=${item._id}&type=Article`">edit</a> -->
            <a key="list-loadmore-edit" :href="`#/publish?_id=${item._id}&type=Article`">修改</a>
            <!-- <a key="list-loadmore-more">more</a> -->
          </a-flex>
        </template>
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
          <a-skeleton :loading="loading" active avatar>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a :href="`#/article-detail?_id=${item._id}`">{{ item.title }}</a>
              </template>
            </a-list-item-meta>
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
  </a-spin>
</template>

<style scoped>
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
</style>
