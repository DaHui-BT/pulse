<script lang="ts" setup>
import { ref } from "vue"

const props = defineProps({
  height: {
    type: String,
    default: '280px'
  },
  top: {
    type: String,
    default: '150px'
  },
  right: {
    type: String,
    default: '55px'
  }
})

const container = ref<HTMLElement>()

</script>

<template>
  <div class="removablecontainer" :style="{top: props.top, right: props.right}" 
              ref="container" draggable="true" v-draggable>
    <div class="removablecontainer-handle"></div>
    <div class="removablecontent" :style="{height: props.height}">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.removablecontainer {
  position: fixed;
  border: 1px solid #108ee9;
  border-top: none;
  border-radius: 0 0 5px 5px;
  margin: 15px 0; 
  background-color: #fff;
  z-index: 3;
  transform: translate(0);

  .removablecontainer-handle {
    height: 20px;
    width: 100%;
    background: url('../assets/handle.png');
    background-color: rgba(238, 238, 238, 0.171);
    background-repeat: repeat-x;
    background-size: 20px;

    &:hover {
      cursor: move;
    }
  }

  .removablecontent {
    max-height: 280px;
    overflow-x: auto;
  }
}
</style>