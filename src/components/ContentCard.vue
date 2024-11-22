<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'

import { ArticleDocument } from '../entities/article'
import { TagService } from '../api/TagService';


const props = defineProps({
  content: {
    type: Object as () => ArticleDocument,
    required: true
  }
})
const tagService = TagService.getInstance()
const loading = ref(props.content == null)

const publishDate = computed(() => {
  return moment(props.content.createdAt).format('YYYY-MM-DD HH:mm')
})

const updateDate = computed(() => {
  return moment(props.content.updatedAt).format('YYYY-MM-DD HH:mm')
})

onMounted(() => {
  tagService.findAllTags().then(res => {
    props.content.tagList = []
    res.data?.forEach(tag => {
      if (props.content.tags.includes(tag._id)) {
        props.content.tagList?.push(tag)
      }
    })
  })
})

</script>

<template>
  <a-card :loading="loading">
    <template #title>
      <a-flex class="info-conatiner" justify="space-between" wrap="wrap">
        <a-typography-link class="title-ellipsis" :href="`#/article-detail?_id=${content._id}`" ellipsis :content="content.title"></a-typography-link>

        <div class="info-tag-container">
          <a-tag :color="tag.color" v-for="tag in content.tagList" :key="tag">{{ tag.name }}</a-tag>
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
        <a-typography-text type="secondary"><i class="iconfont">&#xe968;</i> {{ updateDate}}</a-typography-text>
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
