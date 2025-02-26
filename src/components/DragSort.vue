<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  data: {
    type: Object as () => {id: string, title: string, content: string}[],
    default: []
  }
})

const sortableList = ref<HTMLElement | null>(null)
let draggedItem: HTMLElement | null = null


const dragStartHandler = (e: DragEvent) => {
  draggedItem = (e.target as HTMLElement).closest('li.drag-item') as HTMLElement
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggedItem.outerHTML);
  }
  setTimeout(() => {
    draggedItem && (draggedItem.style.display = 'none')
  }, 0);
}

const dragOverHandler = (e: DragEvent) => {
  e.preventDefault();

  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
  }
  
  const target = (e.target as HTMLElement).closest('li.drag-item') as HTMLElement

  if (sortableList.value && draggedItem && target && target != draggedItem) {
      const rect = target.getBoundingClientRect();
      const offset = e.clientY - rect.top;
      if (offset < rect.height / 2) {
          sortableList.value.insertBefore(draggedItem, target);
      } else {
          sortableList.value.insertBefore(draggedItem, target.nextSibling);
      }
  }
}

const dragEndHandler = (_e: DragEvent) => {
  draggedItem?.style && (draggedItem.style.display = 'block')
}

onMounted(() => {
  if (sortableList.value) {
    sortableList.value.ondragstart = dragStartHandler
    sortableList.value.ondragover = dragOverHandler
    sortableList.value.ondragend = dragEndHandler
  }
})

onBeforeUnmount(() => {
  if (sortableList.value) {
    sortableList.value.removeEventListener('dragstart', dragStartHandler)
    sortableList.value.removeEventListener('dragover', dragOverHandler)
    sortableList.value.removeEventListener('dragend', dragEndHandler)
  }
})
</script>

<template>
  <div class="drag-sort">
    <ul class="drag-container" ref="sortableList">
      <li class="drag-item" draggable="true" v-for="item in data" :key="item.id">
        <slot :item="item">
        </slot>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.drag-sort {

  .drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0;
    list-style: none;
    
    .drag-item {
      min-width: 300px;
      flex-basis: 0;
    }
  }
}

@media screen and (max-width: 900px) {
  .drag-sort {

    .drag-container {
      flex-direction: column;
      flex-wrap: nowrap;

      
      .drag-item {
        min-width: 100%;
      }
    }
  }
}
</style>