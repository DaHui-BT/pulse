<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue'
import moment from 'moment'

import { ArticleDocument } from '../entities/article'
import { TagDocument } from '../entities/tag';


const props = defineProps({
  content: {
    type: Object as () => ArticleDocument,
    required: true
  },
  tag_list: {
    type: Object as () => TagDocument[],
    required: true
  }
})
const loading = ref(props.content == null)
const current_tag_list = reactive<TagDocument[]>([])

const publishDate = computed(() => {
  return moment(props.content.createdAt).format('YYYY-MM-DD HH:mm')
})

const updateDate = computed(() => {
  return moment(props.content.updatedAt).format('YYYY-MM-DD HH:mm')
})

onMounted(() => {
  current_tag_list.splice(0, current_tag_list.length)
  for (let tagId of props.content.tags) {
    for (let tag of props.tag_list) {
      if (tag._id == tagId) {
        current_tag_list.push(tag)
      }
    }
  }
})

</script>

<template>
  <a-card :loading="loading">
    <template #title>
      <a-flex class="info-conatiner" justify="space-between" wrap="wrap">
        <a-typography-link class="title-ellipsis"
                           :href="`#/article-detail?_id=${content._id}`"
                           ellipsis :content="content.title"></a-typography-link>
        <div class="info-tag-container" v-if="current_tag_list.length > 0">
          <a-tag :color="tag.color" v-for="tag in current_tag_list" :key="tag._id">{{ tag.name }}</a-tag>
        </div>
      </a-flex>
    </template>
    
    <a-flex justify="right" gap="10" wrap="wrap" class="date-container">
      <a-tooltip placement="top">
        <a-typography-text type="secondary"><i class="iconfont">&#xe69d;</i> {{ publishDate }}</a-typography-text>
        <template #title>
          publish date
        </template>
      </a-tooltip>
      
      <a-tooltip placement="top">
        <a-typography-text type="secondary"><i class="iconfont">&#xe968;</i> {{ updateDate }}</a-typography-text>
        <template #title>
          update date
        </template>
      </a-tooltip>
    </a-flex>

    <a-typography-paragraph :ellipsis="{ rows: 3, expandable: true, symbol: 'more' }"
                            :content="content.description">
    </a-typography-paragraph>
    
    
    <!-- <template #cover>
      <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
    </template> -->

    <!-- <template #actions>
      Click into
    </template> -->
  </a-card>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 500px){
  .title-ellipsis {
    width: 300px!important;

  }
  
  .date-container {
    justify-content: space-between;
  }
}

.info-tag-container {
  max-width: 300px;
  overflow-x: auto;
  box-sizing: border-box;
}
</style>
