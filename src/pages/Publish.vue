<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message, UploadChangeParam } from 'ant-design-vue'

import { TagService } from '../api/TagService'
import { ArticleDocument, ArticleStatus } from '../entities/article'
import { ArticleService } from '../api/ArticleService'
import { FileService } from '../api/FileService'
import { TagDocument } from '../entities/tag'
import { Store } from '../store'
import Loading from '../plugins/loading'
import { JUMP_DELAY } from '../constant'


const route = useRoute()
const router = useRouter()
const store = Store()
const isEdit = ref<boolean>(false)
const spinning = ref<boolean>(true)
const articleService = ArticleService.getInstance()
const fileService = FileService.getInstance()
const tagService = TagService.getInstance()
const tag_list = reactive<TagDocument[]>([])
const fileList = ref([])

interface FormState {
  _id?: string,
  title: string
  tag_list: string[]
  description: string
  content: string,
  isPublic: boolean
}

const formState = reactive<FormState>({
  title: '',
  tag_list: [],
  description: '',
  content: '',
  isPublic: false
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
  tagService.findAllTags().then(res => {
    if (res.success) {
      tag_list.splice(0, tag_list.length)
      tag_list.push(...(res.data || []))
    } else {
      message.error(res.error)
    }
    spinning.value = false
  })

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
           && formState.content.length > 0
           && formState.isPublic != null)
})

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
const handleChange = async (info: UploadChangeParam) => {
  formState.content = await info.file.originFileObj?.text() || formState.content
}
</script>

<template>
  <div class="publish">
    <a-spin :spinning="spinning">
      <a-typography-title :level="2">{{ isEdit ? 'Edit' : 'Publish' }}</a-typography-title>

      <a-form :model="formState" name="norm" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit">Publish</a-button>
        </a-form-item>

          <a-form-item name="title" :rules="[{ required: true, message: 'Please input your title!' }, { max: 50, min: 5}]">
            <a-input placeholder="Input your title" size="large" v-model:value="formState.title"></a-input>
          </a-form-item>

          <a-flex gap="20" align="center">
            <a-form-item name="tag_list" :rules="[{ required: true, max: 3, min: 1, type: 'array' }]">
              <a-select
                  size="large"
                  v-model:value="formState.tag_list"
                  :options="tag_list.map(tag => ({label: tag.name, value: tag._id + ''}))"
                  mode="tags"
                  placeholder="select your tag"
                  style="min-width: 200px"></a-select>
            </a-form-item>
            
            <a-form-item name="isPublic" :rules="[{ required: true, message: 'Please input your permission!' }]">
              <a-switch v-model:checked="formState.isPublic" checked-children="public" un-checked-children="private" />
            </a-form-item>
          </a-flex>

        <a-form-item name="description" :rules="[{ required: true, message: 'Please input your description!' }, { max: 150, min: 30}]">
          <a-textarea size="large" placeholder="Input your description" class="publish-describe" v-model:value="formState.description"></a-textarea>
        </a-form-item>

        <a-form-item>
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
        </a-form-item>

        <a-form-item name="content" :rules="[{ required: true, message: 'Please input your content!' }]">
          <v-md-editor v-model="formState.content" :disabled-menus="[]" @upload-image="handleUploadImage" height="400px"></v-md-editor>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<style lang="scss" scoped>
</style>
