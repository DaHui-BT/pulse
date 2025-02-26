<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ArticleDocument } from '../../../../entities/article';


const props = defineProps<{
  data: ArticleDocument[]
}>()

const emit = defineEmits<{
  (e: 'update:data', value: ArticleDocument[]): void
}>()

const sortableList = ref<HTMLElement | null>(null)

let startIndex = -1
let endIndex = -1

const indexedData = computed(() => 
  props.data?.map((item, index) => ({ ...item, __index: index }))
)

const handleDragStart = (e: DragEvent | TouchEvent) => {
  const target = (e.target as HTMLElement).closest('li.drag-item') as HTMLElement
  target.classList.add('dragging')
  startIndex = Array.from(sortableList.value!.children).indexOf(target)
}

const handleDragOver = (e: DragEvent | TouchEvent) => {
  e.preventDefault()
  
  const currentX = e instanceof TouchEvent 
    ? e.touches[0].clientX 
    : e.clientX
  const currentY = e instanceof TouchEvent 
    ? e.touches[0].clientY 
    : e.clientY
  
  const targetElement = document.elementFromPoint(currentX, currentY)?.closest('.drag-item')
  if (!targetElement) return

  if (sortableList.value) {
    for (let item of sortableList.value.children) {
      item.classList.remove('target-dragging')
    }
  }
  targetElement.classList.add('target-dragging')
  endIndex = Array.from(sortableList.value!.children).indexOf(targetElement)
}

const handleDragEnd = (e: DragEvent | TouchEvent) => {
  if (startIndex !== endIndex && startIndex != -1 && endIndex != -1) {
    const newData = [...props.data]
    const temp = newData[startIndex]
    newData[startIndex] = newData[endIndex]
    newData[endIndex] = temp

    emit('update:data', newData)
  }

  const elem = (e.target as HTMLElement).closest('li.drag-item') as HTMLElement
  elem.classList.remove('dragging')
  sortableList.value?.children[endIndex].classList.remove('target-dragging')
  startIndex = -1
  endIndex = -1
}


// 统一事件绑定
onMounted(() => {
  if (!sortableList.value) return

  // const handlerOptions = { passive: false, capture: true }

  // 统一事件处理
  const addHandlers = () => {
    sortableList.value!.addEventListener('dragstart', handleDragStart)
    sortableList.value!.addEventListener('dragover', handleDragOver)
    sortableList.value!.addEventListener('dragend', handleDragEnd)
    // sortableList.value!.addEventListener('touchstart', handleDragStart, handlerOptions)
    // sortableList.value!.addEventListener('touchmove', handleDragOver, handlerOptions)
    // sortableList.value!.addEventListener('touchend', handleDragEnd, handlerOptions)
  }

  addHandlers()
})

onBeforeUnmount(() => {
  if (sortableList.value) {
    sortableList.value.replaceChildren()
  }
})
</script>

<template>
  <ul 
    ref="sortableList"
    class="drag-container"
  >
    <li
      v-for="item in indexedData"
      :key="item._id"
      class="drag-item"
      draggable="true"
    >
      <slot :item="item" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.drag-container {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 0;
  list-style: none;
  gap: 10px;
  
  .drag-item {
    flex-basis: 0;
    transition: transform 0.2s ease;
    min-width: 300px;
    
    &.dragging {
      opacity: 0.3;
      background: #f0f0f0;
    }

    &.target-dragging {
      border: 1px solid #3e80c65a;
    }
  }
}

@media (hover: hover) {
  .drag-item:hover {
    transform: scale(1.02);
  }
}

@media screen and (max-width: 900px) {
  .drag-container {
    flex-direction: column;
    flex-wrap: nowrap;

    
    .drag-item {
      min-width: 100%;
    }
  }
}
</style>