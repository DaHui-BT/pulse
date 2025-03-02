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
    <a-modal v-model:open="open" title="Select your publish choice">
      <a-flex gap="20" wrap="wrap" justify="space-around">
        <a-card title="Article Publish" :bordered="false" style="min-width: 200px; flex: 1">
          <p>Your should input your title</p>
          <p>Your should input your tags</p>
          <p>Your should input your description</p>
          <p>Your should input your content</p>
          <a-button type="primary" @click="selectOption('Article')">Select Article Publish</a-button>
        </a-card>

        <a-card title="File Publish" :bordered="false" style="min-width: 200px; flex: 1">
          <p>Your should input your title</p>
          <p>Your should input your tags</p>
          <p>Your should input your description</p>
          <p>Your should input your files</p>
          <a-button danger @click="selectOption('File')">Select File Publish</a-button>
        </a-card>
      </a-flex>

      <template #footer></template>
    </a-modal>
  
    <a-typography-title :level="2">{{ isEdit ? 'Edit' : 'Publish' }}</a-typography-title>

    <article-publish v-if="option === 'Article'">
    </article-publish>

    <file-publish v-else-if="option === 'File'"></file-publish>
  </div>
</template>

<style lang="scss" scoped>
</style>
