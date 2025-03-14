<script lang="ts" setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { FileService } from '../../../../api/file.service';
import { message } from 'ant-design-vue';
import { FileType } from '../../../../types/file';
import PaginationType from '../../../../types/pagination';

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const fileService = FileService.getInstance()
const fileList = reactive<FileType[]>([])

const loading = ref<boolean>(true);
const spinning = ref<boolean>(true)
  const pagination = reactive<PaginationType>({
  current: 0,
  size: 1,
  pages: 1,
  total: 0
})

function loadData(clear: boolean = true) {
  if (clear) {
    fileList.splice(0, fileList.length)
  }
  spinning.value = true
  fileService.findFiles({ createdBy: props.userId }, { current: pagination.current, size: pagination.size }).then(res => {
    if (res.success && res.data) {
      fileList.push(...(res.data.files || []))
      pagination.current = res.data.pagination.current
      pagination.total = res.data.pagination.total
      pagination.pages = res.data.pagination.pages
      pagination.size = res.data.pagination.size
    } else {
      message.error(res.error)
    }
  }).catch(err => {
    message.error(err)
  }).finally(() => {
    loading.value = false
    spinning.value = false
  })
}

onMounted(loadData)

const onLoadMore = () => {
  pagination.current += 1
  loadData(false)
};
</script>

<template>
  <a-spin :spinning="spinning">
    <a-list item-layout="vertical" size="large" :data-source="fileList">
      <template #loadMore>
        <div v-if="!loading && fileList.length < pagination.total"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
          <a-button @click="onLoadMore">{{ $t('loading_more') }}</a-button>
        </div>
      </template>

      <template #renderItem="{ item }">
        <a-list-item key="item.title">
        <template #extra v-if="!loading">
          <a-flex :gap="20">
            <a-tag color="cyan" v-if="item.public">{{ $t('public') }}</a-tag>
            <a-tag color="blue" v-else>{{ $t('private') }}</a-tag>
            <a key="list-loadmore-edit" :href="`#/publish?_id=${item._id}&type=File`">{{ $t('edit') }}</a>
            <!-- <a key="list-loadmore-more">more</a> -->
          </a-flex>
        </template>
          <!-- <template v-if="!loading" #actions>
            <span>
              <component :is="StarOutlined" style="margin-right: 8px"></component>
              {{ item.statistics.collections }}
            </span>
            
            <span>
              <component :is="LikeOutlined" style="margin-right: 8px"></component>
              {{ item.statistics.stars }}
            </span>
            
            <span>
              <component :is="MessageOutlined" style="margin-right: 8px"></component>
              {{ item.statistics.comments }}
            </span>
          </template> -->
          <a-skeleton :loading="loading" active avatar>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a :href="`#/file-detail?_id=${item._id}`">{{ item.title }}</a>
              </template>
            </a-list-item-meta>
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
  </a-spin>
</template>

<style scoped>
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
</style>
