<script lang="ts" setup>
import { ref } from "vue"
import { DownOutlined, LeftOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  height: {
    type: String,
    default: null
  },
  top: {
    type: String,
    default: null
  },
  right: {
    type: String,
    default: null
  },
  bottom: {
    type: String,
    default: null
  }
})

const container = ref<HTMLElement>()
const height = ref<string>(props.height)

function close(e: MouseEvent) {
  height.value = '20px'
}
function open(e: MouseEvent) {
  height.value = props.height
}
</script>

<template>
  <!-- <a-tree> -->
  <div class="removable-container" 
      :style="{top: props.top, right: props.right, bottom: props.bottom, height: height}" 
      ref="container" draggable="true" v-draggable>
    <LeftOutlined class="removable-close" @click="open" v-if="height == '20px'" />
    <DownOutlined class="removable-close" @click="close" v-else />
    <div class="removable-container-handle"></div>
    <div class="removable-content">
      <slot></slot>
    </div>
  </div>
<!-- </a-tree> -->
</template>

<style lang="scss">
.removable-container {
  position: fixed;
  border: 1px solid #108ee9;
  border-top: none;
  border-radius: 0 0 5px 5px;
  margin: 15px 0;
  background-color: #fff;
  z-index: 3;
  transform: translate(0);
  overflow: hidden;
  transition: height 0.5s ease-in-out;

  .removable-close {
    position: absolute;
    right: 5px;
    top: 3px;
    font-size: 15px;
    color: #108ee9;
    cursor: pointer;
  }

  .removable-container-handle {
    height: 20px;
    width: calc(100% - 25px);
    background: url('../assets/handle.png');
    background-color: rgba(238, 238, 238, 0.171);
    background-repeat: repeat-x;
    background-size: 20px;

    &:hover {
      cursor: move;
    }
  }

  .removable-content {
    max-height: 280px;
    overflow-x: auto;
  }
}
</style>