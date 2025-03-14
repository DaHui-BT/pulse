<script setup lang="ts">
import { onMounted, ref } from 'vue'

import ArticlePublish from './components/article-publish/index.vue'
import FilePublish from './components/file-publish/index.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isEdit = ref<boolean>(false)
const open = ref<boolean>(false)

type options = ['Article', 'File']
const option = ref<options[number] | null>(null)

onMounted(() => {
  if (route.query.type) {
    option.value = route.query.type as options[number] || null
    open.value = false
  } else {
    open.value = true
  }
})

function selectOption(selectedOption: 'Article' | 'File') {
  option.value = selectedOption
  open.value = false
}

</script>

<template>
  <div class="publish">
    <!-- <a-modal v-model:open="open" title="Select your publish choice" :maskClosable="false"> -->
    <a-modal v-model:open="open" title="请选择你发布的方式" :maskClosable="false">
      <a-flex gap="20" wrap="wrap" justify="space-around">
        <!-- <a-card title="Article Publish" :bordered="false" style="min-width: 200px; flex: 1"> -->
        <a-card title="文章发布" :bordered="false" style="min-width: 200px; flex: 1">
          <!-- <p>Your should input your title</p>
          <p>Your should input your tags</p>
          <p>Your should input your description</p>
          <p>Your should input your content</p>
          <a-button type="primary" @click="selectOption('Article')">Select Article Publish</a-button> -->
          
          <p>你需要输入标题</p>
          <p>需要输入标签</p>
          <p>需要输入描述信息</p>
          <p>需要输入文章内容</p>
          <a-button type="primary" @click="selectOption('Article')">选择发布文章</a-button>
        </a-card>

        <!-- <a-card title="File Publish" :bordered="false" style="min-width: 200px; flex: 1"> -->
        <a-card title="文件发布" :bordered="false" style="min-width: 200px; flex: 1">
          <!-- <p>Your should input your title</p>
          <p>Your should input your tags</p>
          <p>Your should input your description</p>
          <p>Your should input your files</p>
          <a-button danger @click="selectOption('File')">Select File Publish</a-button> -->
          
          <p>需要输入标题</p>
          <p>需要输入标签</p>
          <p>需要输入描述信息</p>
          <p>需要上传文件</p>
          <a-button danger @click="selectOption('File')">选择文件发布</a-button>
        </a-card>
      </a-flex>

      <template #footer></template>
    </a-modal>
  
    <!-- <a-typography-title :level="2">{{ isEdit ? 'Edit' : 'Publish' }}</a-typography-title> -->
    <a-typography-title :level="2">{{ isEdit ? '修改' : '发布' }}</a-typography-title>

    <!-- <a-result title="Choice your publish choice" v-if="!open && option != 'Article' && option != 'File'"> -->
    <a-result title="请选择你发布的方式" v-if="!open && option != 'Article' && option != 'File'">
      <template #extra>
        <!-- <a-button key="console" type="primary" @click="() => open = true">Choose</a-button> -->
        <a-button key="console" type="primary" @click="() => open = true">选择</a-button>
      </template>
    </a-result>

    <article-publish v-if="option === 'Article'">
    </article-publish>

    <file-publish v-else-if="option === 'File'"></file-publish>
  </div>
</template>

<style lang="scss" scoped>
</style>
