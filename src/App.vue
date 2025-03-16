<script setup lang="ts">
import NavBar from '@components/NavBar.vue'

</script>

<template>
  <div class="app">
    <nav-bar></nav-bar>
    <div :class="{'app-container': $route.meta.needContainer}">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  background-color: var(--background-color);
  
  .app-container {
    padding: var(--content-padding);
    margin: auto;
    min-height: calc(100vh - var(--navbar-height));
    max-width: var(--content-max-width);
    min-width: var(--content-min-width);
    background-color: var(--content-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
