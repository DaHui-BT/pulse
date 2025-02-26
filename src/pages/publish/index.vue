<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';

import { ArticleDocument } from '../../entities/article'
import { ArticleService } from '../../api/ArticleService'
import { FileService } from '../../api/FileService'
import { TagDocument } from '../../entities/tag'
import { useAuthStore } from '../../store'
import Loading from '../../plugins/loading'
import { JUMP_DELAY } from '../../constant'


import FileTools from '../../tools/file'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()
const isEdit = ref<boolean>(false)
const spinning = ref<boolean>(false)
const articleService = ArticleService.getInstance()
const fileService = FileService.getInstance()
const fileTools = new FileTools()
const tag_list = reactive<TagDocument[]>(store.tags)
const fileList = ref<string[]>([])
const options = [{value: 'Article', label: 'Article'}, {value: 'File', label: "File", disabled: true}]
const selectOption = ref<string>('Article')

interface FormState {
  _id?: string,
  title: string
  tag_list: string[]
  description: string
  content: string,
  isPublic: boolean,
  expireTime?: Date | null
  fileList?: string[]
}

const formState = reactive<FormState>({
  title: '',
  tag_list: [],
  description: '',
  content: '',
  isPublic: false,
  expireTime: null,
  fileList: []
})

const article = ref<ArticleDocument>({
  createdBy: store.user._id,
  title: '',
  description: '',
  content: '',
  public: false,
  status: 0,
  statistics: {
    views: 0,
    stars: 0,
    collections: 0,
    comments: 0
  },
  files: [],
  tags: [],
  isAudit: false,
  isDeleted: false
})

onMounted(() => {
  if (route.query._id != undefined && route.query._id != null) {
    isEdit.value = true
    spinning.value = true
    articleService.findArticleById((route.query._id + '')).then(res => {
      if (res.success) {
        if (!res.data) {
          throw new Error('no such article')
        }
        formState.title = res.data.title
        formState.tag_list = res.data.tags
        formState.isPublic = res.data.public
        formState.description = res.data.description
        formState.content = res.data.content
        formState._id = res.data._id
        article.value = res.data
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
           && formState.tag_list.length > 0
           && formState.description.length > 0
           && selectOption.value === 'Article' ? (formState.content.length > 0) : (formState.fileList || []).length > 0)
           && formState.isPublic != null
})

const disabledDate = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

async function handleUploadImage(e: Event, insertImage: Function, files: File[]) {
  // TODO upload image file and get the image_id
  Loading.show()
  const file = files[0]
  const uploadResponse = await fileService.uploadFile(file)
  // TODO this method will occupy much storage
  if (uploadResponse.success) {
    formState.content += `![image](${uploadResponse.data?.fileUrl})`
  } else {
    message.error(uploadResponse.error)
  }
  Loading.hide()
  
}

async function onFinish(values: FormState) {
  Loading.show()
  article.value.title = values.title
  article.value.description = values.description
  article.value.content = values.content
  article.value.public = values.isPublic
  article.value.tags = values.tag_list
  console.log(formState)
  if (selectOption.value === 'Article') {
    if (isEdit.value) {
      if (!formState._id) {
        throw new Error('Article id error')
      }
      article.value.updatedAt = new Date()
      await articleService.updateArticle(formState._id, article.value).then(res => {
        if (res.success) {
          message.success('update article successfully!')
          setTimeout(() => {
            router.push('/article')
          }, JUMP_DELAY)
        } else {
          message.error(res.error)
        }
      })
    } else {
      article.value.createdAt = new Date()
      article.value.updatedAt = new Date()
      await articleService.createArticle(article.value).then(res => {
        if (res.success) {
          message.success('publish article successfully!')
          setTimeout(() => {
            router.push('/article')
          }, JUMP_DELAY)
        } else {
          message.error(res.error)
        }
      })
    }
  } else if (selectOption.value === 'File') {
    console.log('2')
  }
  Loading.hide()
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
const handleChange = async (file: File, fileList: File[]) => {
  if (selectOption.value === 'Article') {
    // formState.content = await info.file.originFileObj?.text() || formState.content
  } else if (selectOption.value === 'File') {
    // upload File
    console.log('upload time')
    formState.fileList = ['']
    // console.log(info.file.originFileObj)
    // fileTools.upload(info.file.originFileObj as File, 'file/upload-signle')
    // formState.fileList = fileList.value
    // console.log(fileList)
  }
  console.log(file, fileList)
  // console.log(info.file)
  // console.log(formState)
  return false
}
</script>

<template>
  <div class="publish">
    <a-typography-title :level="2">{{ isEdit ? 'Edit' : 'Publish' }}</a-typography-title>
    <a-spin :spinning="spinning">
      <a-form :model="formState" name="norm" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item>
          <a-flex justify="space-between">
            <a-button :disabled="disabled" type="primary" html-type="submit">Publish</a-button>
            <a-select :options="options" v-model:value="selectOption" style="width: 200px"></a-select>
          </a-flex>
        </a-form-item>

          <a-form-item name="title" :rules="[{ required: true, message: 'Please input your title!' }, { max: 50, min: 5}]">
            <a-input placeholder="Input your title" size="large" v-model:value="formState.title"></a-input>
          </a-form-item>

          <a-flex gap="20" align="center" wrap="wrap">
            <a-form-item name="tag_list" :rules="[{ required: true, max: 3, min: 1, type: 'array' }]">
              <a-select
                  size="large"
                  v-model:value="formState.tag_list"
                  :options="tag_list.map(tag => ({label: tag.name, value: tag._id + ''}))"
                  mode="multiple"
                  placeholder="select your tag"
                  style="min-width: 200px"></a-select>
            </a-form-item>
            
            <a-form-item name="expireTime">
              <a-date-picker :disabled-date="disabledDate" v-model:value="formState.expireTime" show-time placeholder="Exipre Date"/>
            </a-form-item>
            
            <a-form-item name="isPublic" :rules="[{ required: true, message: 'Please input your permission!' }]">
              <a-switch v-model:checked="formState.isPublic" checked-children="public" un-checked-children="private" />
            </a-form-item>
          </a-flex>

        <a-form-item name="description" :rules="[{ required: true, message: 'Please input your description!' }, { max: 150, min: 30}]">
          <a-textarea size="large" placeholder="Input your description" class="publish-describe" v-model:value="formState.description"></a-textarea>
        </a-form-item>

        <a-form-item name="content" :rules="[{ required: true, message: 'Please input your content!' }]" v-if="selectOption === 'Article'">
          <a-upload
            v-model:file-list="fileList"
            name="file"
            @change="handleChange"
            :maxCount="1"
            accept=".md"
          >
            <a-button ghost type="primary">
              Upload to Analyse
            </a-button>
          </a-upload>
          <v-md-editor v-model="formState.content" :disabled-menus="[]" @upload-image="handleUploadImage" height="400px"></v-md-editor>
        </a-form-item>
        
        <a-form-item name="fileList" :rules="[{ required: true, message: 'Please input your files!' }]" v-else-if="selectOption === 'File'">
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
