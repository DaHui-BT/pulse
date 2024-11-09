<script setup lang="ts">
</script>

<template>
  <div class="not-found">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">Back Home</a-button>
    </template>
    </a-result>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
}
</style>
