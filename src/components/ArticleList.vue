<script lang="ts" setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { ArticleService } from '../api/ArticleService';
import { message } from 'ant-design-vue';
import { ArticleDocument } from '../entities/article';

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const articleService = ArticleService.getInstance()
const articleList = reactive<ArticleDocument[]>([])

const initLoading = ref(true);
const loading = ref<boolean>(true);
const spinning = ref<boolean>(true)

onMounted(() => {
  articleList.splice(0, articleList.length)
  articleService.findArticles({ createdBy: props.userId }).then(res => {
    articleList.push(...(res.data?.articles || []))
    loading.value = false
    spinning.value = false
  }).catch(err => {
    message.error(err)
    loading.value = false
    spinning.value = false
  })
})

const onLoadMore = () => {
  loading.value = true;
};
</script>

<template>
  <a-spin :spinning="spinning">
    <a-list item-layout="vertical" size="large" :data-source="articleList">
      <template #loadMore>
        <div v-if="!initLoading && !loading"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
          <a-button @click="onLoadMore">loading more</a-button>
        </div>
      </template>

      <template #renderItem="{ item }">
        <a-list-item key="item.title">
        <template #extra v-if="!loading">
          <a-flex :gap="20">
            <a key="list-loadmore-edit" :href="`#/publish?_id=${item._id}`">edit</a>
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
