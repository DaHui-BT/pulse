<script lang="ts" setup>
defineProps({
  is_center: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <a-flex :class="['form-mask', {'form-center': is_center}]">
    <slot></slot>
  </a-flex>
</template>

<style lang="scss" scoped>
.form-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: .5);
}

.form-center {
  align-items: center;
  justify-content: center;
}
</style>
