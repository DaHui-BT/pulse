<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import moment from 'moment'
import { InteractionService } from '@api/InteractionService'
import { InteractionDocument, OperationType } from '../../../../entities/interaction'
import { useAuthStore } from '@store/index'
import PaginationType from '../../../../types/pagination'

const store = useAuthStore()
const interaction_list = reactive<InteractionDocument[]>([])
const interactionService = InteractionService.getInstance()

const initLoading = ref<boolean>(false)
const showLoadingButton = ref<boolean>(false)
const current_page = ref<number>(0)
const pagination = reactive<PaginationType>({
  current: 1,
  size: 0,
  total: 0,
  pages: 1
})

onMounted(() => {
  loadData(true)
})

function loadData(isClear: boolean = false) {
  initLoading.value = true
  interactionService.findInteractions({createdBy:  store.user._id}).then(res => {
    isClear && interaction_list.splice(0, interaction_list.length)
    interaction_list.push(...(res.data?.interactions || []))
    initLoading.value = false
    if (res.data && (res.data?.total * res.data.interactions.length == interaction_list.length)) {
      showLoadingButton.value = false
    } else {
      showLoadingButton.value = true
    }
    initLoading.value = false
  })
}

function onLoadMore() {
  initLoading.value = true
  current_page.value = current_page.value + 1
  loadData()
}

function operateType(operate: OperationType) {
  switch (operate) {
    case OperationType.INSERT:
      return 'var(--insert-color)'
    case OperationType.UPDATE:
      return 'var(--update-color)'
    case OperationType.DELETE:
      return 'var(--delete-color)'
    case OperationType.STAR:
      return 'var(--star-color)'
    case OperationType.WATCH:
      return 'var(--watch-color)'
    case OperationType.COLLECT:
      return 'var(--collect-color)'
    default:
      throw new Error('No such operate!')
  }
}
</script>

<template>
  <a-timeline class="time-line">
    <a-list
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="interaction_list">
    
      <template #loadMore>
        <div
          v-if="!initLoading && showLoadingButton"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
          <a-button @click="onLoadMore">loading more</a-button>
        </div>
      </template>

        <a-timeline-item :color="operateType(interaction.operation)" v-for="interaction in interaction_list" :key="interaction._id">
          <a-tooltip :title="moment(interaction.createdAt).format('YYYY-MM-DD: HH:mm:ss')">
            <a-typography-text type="secondary">{{ moment(interaction.createdAt).fromNow() }}</a-typography-text>
          </a-tooltip>
          <a-typography-text class="interaction-text">{{ interaction.operation }} - </a-typography-text>
          <a-typography-link v-if="interaction.collectionName == 'ARTICLE'" :href="`#/article-detail?_id=${interaction.documentId + ''}`">{{ interaction.collectionName }}</a-typography-link>
          <a-typography-text type="success" v-else>{{ interaction.collectionName }}</a-typography-text>
          </a-timeline-item>
    </a-list>
  </a-timeline>
</template>

<style lang="scss" scoped>
.time-line {
  padding: 20px;
  max-height: 300px;
  overflow-x: auto;

  .interaction-text {
    margin-left: 20px;
  }
}

</style>
