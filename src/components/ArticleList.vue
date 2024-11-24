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

interface DataItem {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}
const articleService = ArticleService.getInstance()
const articleList = reactive<ArticleDocument[]>([])

const listData: DataItem[] = [];

for (let i = 0; i < 3; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const loading = ref<boolean>(true);
const initLoading = ref(true);

const actions = [
  { icon: StarOutlined, text: '156' },
  { icon: LikeOutlined, text: '156' },
  { icon: MessageOutlined, text: '2' },
];

onMounted(() => {
  articleList.splice(0, articleList.length)
  articleService.findArticles({ createdBy: props.userId }).then(res => {
    articleList.push(...(res.data?.articles || []))
    loading.value = false
  }).catch(err => {
    message.error(err)
    loading.value = false
  })
})

const onLoadMore = () => {
  loading.value = true;
};
</script>

<template>
  <div>
    <a-list item-layout="vertical" size="large" :data-source="articleList">
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
  </div>
</template>

<style scoped>
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
</style>
