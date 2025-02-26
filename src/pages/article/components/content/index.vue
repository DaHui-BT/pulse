<script lang="ts" setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { ArticleDocument } from '../../../../entities/article';
import { useAuthStore } from '../../../../store';

defineProps({
  articleList: {
    type: Object as () => ArticleDocument[],
    required: true
  }
})
const store = useAuthStore()
const loading = ref<boolean>(false);
const spinning = ref<boolean>(false)

const getTagName = (id: string) => {
  for (let tag of store.tags) {
    if (id == tag._id) {
      return tag.name
    }
  }
}

</script>

<template>
  <a-spin :spinning="spinning">
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
          <a-skeleton :loading="loading" active avatar>
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
  </a-spin>
</template>

<style scoped>

@media screen and (max-width: 800px) {

  .title-container {
    flex-direction: column;
  } 
}
</style>
