<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { FileService } from '../../api/file.service';
// import FileTree from './components/file-tree/index.vue'
import { onMounted, reactive, ref } from 'vue';
import { FileType } from '../../types/file';
import { message } from 'ant-design-vue';
import { UserType } from '../../types/user';
import { useAuthStore } from '../../store';

const route = useRoute()
const router = useRouter()
const store = useAuthStore()
const fileService = FileService.getInstance()
const repository = ref<FileType>()
const spinning = ref<boolean>(true)
const user_info = ref<UserType>()
const tag_list = ref(store.tags)
const routes = reactive<{path: string, breadcrumbName: string}[]>([
  {
    path: '/',
    breadcrumbName: 'Home',
  },
  {
    path: '/repository',
    breadcrumbName: 'Repository',
  },
  {
    path: '/repository-info',
    breadcrumbName: repository.value?.title || '',
  },
])

onMounted(() => {
  const id = route.query._id as string
  if (!id) {
    throw new Error('No such repository')
  }

  fileService.findFileById(id).then(res => {
    console.log(res)
    if (res.success && res.data) {
      repository.value = res.data 
    } else {
      message.error(res.error)
    }
  }).catch(err => message.error(err.message))
  .finally(() => spinning.value = false)
})

function editRepository() {
  router.push({path: '/publish', query: {_id: repository.value?._id + '', type: 'File'}})
}

function confirm() {
  if (!repository.value?._id) {
    throw new Error('No such Repository')
  }
  fileService.deletePerpetualById(repository.value?._id).then(res => {
    if (res.success) {
      message.success(res.message)
    } else {
      message.error(res.error)
    }
  }).catch(err => message.error(err.message))
}

function cancel() {
  message.info('删除操作已取消')
}

</script>

<template>
  <div class="repository">
    <!-- <FileTree /> -->

    <a-spin :spinning="spinning">
      <a-page-header
        :title="repository?.title"
        class="repository-detail-header"
        :avatar="{ src: user_info?.avatar }"
        :breadcrumb="{ routes }"
        @back="() => $router.go(-1)">
        
        <template #extra v-if="repository?.createdBy == store.user._id">
          <!-- <a-button type="primary" @click="editRepository">Edit</a-button> -->
          <a-button type="primary" @click="editRepository">修改</a-button>

          <!-- <a-popconfirm title="Ready to delete?" @confirm="confirm" @cancel="cancel"> -->
          <a-popconfirm title="确认删除?" @confirm="confirm" @cancel="cancel" okText="确认" cancelText="取消">
            <!-- <a-button type="primary" danger>Delete</a-button> -->
            <a-button type="primary" danger>删除</a-button>
          </a-popconfirm>
        </template>

        <template #tags>
          <a-tag color="blue" v-for="tag in tag_list" :key="tag._id">{{ tag.name }}</a-tag>
        </template>
      </a-page-header>

      <a-flex gap="20" wrap="wrap" class="repository-function" justify="flex-end">
        <a-tooltip>
          <!-- <template #title>Create date</template> -->
          <template #title>创建时间</template>
          <!-- <a-typography-text type="secondary">Created at: {{ dayjs(repository?.createdAt).format('YYYY-MM-DD') }}</a-typography-text> -->
          <a-typography-text type="secondary">创建于: {{ dayjs(repository?.createdAt).format('YYYY-MM-DD') }}</a-typography-text>
        </a-tooltip>
        
        <a-tooltip>
          <!-- <template #title>Update date</template>
          <a-typography-text type="secondary">Update at: {{ dayjs(repository?.updatedAt).format('YYYY-MM-DD') }}</a-typography-text> -->
          <template #title>更新日期</template>
          <a-typography-text type="secondary">更新于: {{ dayjs(repository?.updatedAt).format('YYYY-MM-DD') }}</a-typography-text>
        </a-tooltip>
        
        <a-tooltip>
          <!-- <template #title>Expire date</template>
          <a-typography-text type="secondary">Expired at: {{ dayjs(repository?.expiredAt).format('YYYY-MM-DD') }}</a-typography-text>
           -->
          <template #title>过期时间</template>
          <a-typography-text type="secondary">过期于: {{ repository?.expiredAt ? dayjs(repository?.expiredAt).format('YYYY-MM-DD') : '永久' }}</a-typography-text>
        </a-tooltip>
      </a-flex>

      <a-typography-paragraph>{{ repository?.description }}</a-typography-paragraph>

      <!-- <a-button class="download-button" type="primary" :href="repository?.dataUrl" :download="repository?.filename">Download</a-button> -->
      <a-button class="download-button" type="primary" :href="repository?.dataUrl" :download="repository?.filename">下载</a-button>

      <a-divider class="divider" />

      <embed :src="repository?.dataUrl" style="height: 60vh; width:100%"></embed>
    </a-spin>
  </div>
</template>

<style lang="scss" scoped>
.repository {
  
  .repository-detail-header {
    padding: 0;

    
    :deep(.ant-page-header-heading) {
      flex-wrap: wrap;
    }

    :deep(.ant-avatar) {
      flex-shrink: 0;
    }
  }

  .repository-function {
    margin-bottom: 20px;
  }

  .download-button {
    width: 100%;
  }

  .divider {
    margin: 12px 0;
  }
}
</style>