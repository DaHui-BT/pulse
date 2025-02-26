<script lang="ts" setup>
import { ref } from "vue"
// import { DownOutlined, LeftOutlined } from '@ant-design/icons-vue'

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
// const height = ref<string>(props.height)

// function close(e: MouseEvent) {
//   height.value = '20px'
// }
// function open(e: MouseEvent) {
//   height.value = props.height
// }
</script>

<template>
  <div class="movable">
  <!-- :style="{top: props.top, right: props.right, bottom: props.bottom, height: height}"  -->
    <div class="movable-container" ref="container" draggable="true" v-draggable>
      <!-- <LeftOutlined class="movable-close" @click="open" v-if="height == '20px'" />
      <DownOutlined class="movable-close" @click="close" v-else /> -->
      <!-- <div class="movable-container-handle">
        <i class="iconfont">&#xe6ff;</i>
      </div> -->
      <div class="movable-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movable {
  position: relative;
  /* overflow: auto; */

  .movable-container {
    position: absolute;
    /* border: 1px solid #108ee9; */
    /* border-top: none;
    border-radius: 0 0 5px 5px;
    margin: 15px 0;
    background-color: #fff;
    z-index: 3;
    transform: translate(0);
    overflow: hidden;
    transition: height 0.5s ease-in-out; */

    /* .movable-close {
      position: absolute;
      right: 5px;
      top: 3px;
      font-size: 15px;
      color: #108ee9;
      cursor: pointer;
    }

    .movable-container-handle {
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

    .movable-content {
      max-height: 280px;
      overflow-x: auto;
    } */
  }
}
</style>