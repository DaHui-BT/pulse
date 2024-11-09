<script setup lang="ts">
defineProps({
  opacity: {
    type: Number,
    default: 0.7
  },
  borderRadius: {
    type: Number,
    default: 5
  }
})
</script>

<template>
  <div class="glassmorphism" :style="{'background': `rgba(255, 255, 255, ${opacity})`, 'border-radius': `${borderRadius}px`}">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.glassmorphism {
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
}
</style>
