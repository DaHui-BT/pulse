<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message, UploadProps } from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';

import { TagDocument } from '../../../../entities/tag'
import { useAuthStore } from '../../../../store'
import Loading from '../../../../plugins/loading'


import FileTools from '../../../../tools/file.tool'
import { FileDirectoryType } from '../../../../types/file';
import { FileService } from '../../../../api/file.service';
import { JUMP_DELAY } from '../../../../constant';

const route = useRoute()
const router = useRouter()
const store = useAuthStore()
const isEdit = ref<boolean>(false)
const spinning = ref<boolean>(false)
const fileService = FileService.getInstance()
const fileTools = new FileTools()
const tag_list = reactive<TagDocument[]>(store.tags)
const fileList = ref<UploadProps['fileList']>([])

interface FormState {
  _id?: string,
  createdBy: string,
  title: string,
  tags: string[],
  description: string,
  public: boolean,
  expiredAt: Date | null,

  directory: string,
  filename: string,
  type: FileDirectoryType, // directory, file
  size: number,
  hash: string,
  dataUrl: string,
  parentId: string,
}

const formState = reactive<FormState>({
  createdBy: store.user._id,
  title: '',
  tags: [],
  description: '',
  public: false,
  expiredAt: null,

  directory: '',
  filename: '',
  type: FileDirectoryType.FILE, // directory, file
  size: 0,
  hash: '',
  dataUrl: '',
  parentId: '',
})


onMounted(() => {
  if (route.query._id != undefined && route.query._id != null) {
    isEdit.value = true
    spinning.value = true
    fileService.findFileById((route.query._id + '')).then(res => {
      if (res.success) {
        if (!res.data) {
          throw new Error('no such article')
        }
        formState.title = res.data.title
        formState.tags = res.data.tags
        formState.public = res.data.public
        formState.description = res.data.description
        formState.dataUrl = res.data.dataUrl
        // formState.filename = res.data.files
        fileList.value = []
        fileList.value?.push({ uid: res.data.filename, name: res.data.filename, url: res.data.dataUrl})
        formState._id = res.data._id
      } else {
        message.error(res.error)
      }
      spinning.value = false
    }).catch((err) => {
      message.error(err)
      spinning.value = false
    })
  }
})


const disabled = computed(() => {
  return !(formState.title.length > 0 
           && formState.tags.length > 0
           && formState.description.length > 0
           && formState.expiredAt != null
           && formState.dataUrl.length > 0)
})

const disabledDate = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
}

async function onFinish(_values: FormState) {
  spinning.value = true
  console.log(formState)
  formState.createdAt = new Date().toISOString()
  formState.expiredAt = (formState.expiredAt as Dayjs).toDate()
  fileService.uploadFile(formState).then(res => {
    if (res.success) {
      message.success(res.message)
      setTimeout(() => {
        router.push('/article')
      }, JUMP_DELAY)
    } else {
      message.error(res.error)
    }
  }).catch(err => message.error(err.message))
  .finally(() => spinning.value = false)
}

function onFinishFailed(values: { values: FormState,
                                  errorFields: {errors: string[],
                                                name: string, 
                                                warnings: string[]}[],
                                                outOfDate: boolean }) {
  for (let errorField of values.errorFields) {
    for (let error of errorField.errors) {
      message.error(error)
    }
  }
}

// [TODO] BUG this funcion will be executed 3 times
const handleChange = async (file: File) => {
  // upload File
  spinning.value = true
  formState.filename = file.name
  formState.size = file.size
  formState.type = FileDirectoryType.FILE
  formState.hash = '1111111'
  
  fileTools.upload(file).then(res => {
    console.log(res)
    if (res.success && res.data) {
      message.success(res.message)
      formState.dataUrl = res.data
      fileList.value = []
      fileList.value.push({ uid: file.name, name: file.name, url: res.data })
      console.log(formState, fileList)
    } else {
      message.error(res.message)
    }
  }).catch(err => message.error(err.message))
  .finally(() => spinning.value = false)

  return false
}
</script>

<template>
  <div class="publish-file">
    <a-spin :spinning="spinning">
      <a-form :model="formState" name="norm" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item>
          <a-button :disabled="disabled" type="primary" @click="onFinish">Publish</a-button>
        </a-form-item>

        <a-form-item name="title" :rules="[{ required: true, message: 'Please input your title!' }, { max: 50, min: 5}]">
          <a-input placeholder="Input your title" size="large" v-model:value="formState.title"></a-input>
        </a-form-item>

        <a-flex gap="20" align="center" wrap="wrap">
          <a-form-item name="tags" :rules="[{ required: true, max: 3, min: 1, type: 'array' }]">
            <a-select
                size="large"
                v-model:value="formState.tags"
                :options="tag_list.map(tag => ({label: tag.name, value: tag._id + ''}))"
                mode="multiple"
                placeholder="select your tag"
                style="min-width: 200px"></a-select>
          </a-form-item>
          
          <a-form-item name="expireAt">
            <a-date-picker :disabled-date="disabledDate" v-model:value="formState.expiredAt" show-time placeholder="Exipre Date"/>
          </a-form-item>
          
          <a-form-item name="public" :rules="[{ required: true, message: 'Please input your permission!' }]">
            <a-switch v-model:checked="formState.public" checked-children="public" un-checked-children="private" />
          </a-form-item>
        </a-flex>

        <a-form-item name="description" :rules="[{ required: true, message: 'Please input your description!' }, { max: 150, min: 30}]">
          <a-textarea size="large" placeholder="Input your description" class="publish-describe" v-model:value="formState.description"></a-textarea>
        </a-form-item>

        <a-form-item name="dataUrl" :rules="[{ required: false, message: 'Please input your files!' }]">
          <a-upload-dragger
            v-model:fileList="fileList"
            name="file"
            :multiple="true"
            :beforeUpload="handleChange"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </a-upload-dragger>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<style lang="scss" scoped>
</style>
