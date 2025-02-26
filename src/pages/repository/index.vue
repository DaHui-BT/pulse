<script lang="ts" setup>
import { SmileTwoTone } from '@ant-design/icons-vue';
</script>

<template>
  <div class="repository">
    <a-typography-title :level="2">Repository</a-typography-title>

    <a-result title="This function will come soon!">
      <template #icon>
        <smile-twoTone />
      </template>
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">Back Home</a-button>
      </template>
    </a-result>
  </div>
</template>

<style lang="scss" scoped>
</style>