<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { message, UploadChangeParam } from 'ant-design-vue'

import { TagService } from '../services/TagService'
import { ArticleDocument, ArticleStatus } from '../entities/article'
import { ArticleService } from '../services/ArticleService'
import { UserService } from '../services/UserService'
import { FileService } from '../services/FileService'
import { TagDocument } from '../entities/tag'
import { ObjectId } from '../tools/database'
import { FileDocument } from '../entities/file'
import { fileToBinary } from '../tools/image_tools'


const route = useRoute()
const isEdit = ref<boolean>(false)
const spinning = ref<boolean>(true)
const articleService = ArticleService.getInstance()
const userService = UserService.getInstance()
const fileService = FileService.getInstance()
const tagService = TagService.getInstance()
const tag_list = reactive<TagDocument[]>([])
const fileList = ref([])

interface FormState {
  _id?: ObjectId,
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
  createdBy: userService.getCurrentUser()._id,
  title: '',
  description: '',
  content: '',
  status: ArticleStatus.PRIVATE,
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
    articleService.findArticleById((new ObjectId(route.query._id + ''))).then(res => {
      if (res.success) {
        if (!res.data) {
          throw new Error('no such article')
        }
        formState.title = res.data.title
        formState.tag_list = res.data.tags.map(tags => tags._id + '')
        formState.isPublic = res.data.status === ArticleStatus.PUBLIC
        formState.description = res.data.description
        formState.content = res.data.content
        formState._id = res.data._id
        article.value = res.data
      } else {
        message.error(res.error)
      }
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
  const file = files[0]
  const fileInfo: FileDocument = {
    creator: userService.getCurrentUser()._id,
    filename: file.name,
    type: file.type,
    size: file.size,
    data: await fileToBinary(file),
    createAt: new Date(),
    expireAt: null,
    description: '',
    isDeleted: false
  }
  fileService.uploadFile(fileInfo).then(res => {
    // formState.content += `![${res.data?.filename}](${location.href.split('#')[0]}#/image/${res.data?._id})`
    // TODO this method will occupy much storage
    if (res.success) {
      formState.content += `![${res.data?.filename}](data:image/png;base64,${res.data?.data.buffer.toString('base64')})`
    } else {
      message.error(res.error)
    }
  })
}

function onFinish(values: FormState) {
  article.value.title = values.title
  article.value.description = values.description
  article.value.content = values.content
  article.value.status = values.isPublic ? ArticleStatus.PUBLIC : ArticleStatus.PRIVATE
  article.value.tags = tag_list.filter(tag => values.tag_list.includes(tag._id + ''))
  if (isEdit.value) {
    if (!formState._id) {
      throw new Error('Article id error')
    }
    article.value.updatedAt = new Date()
    articleService.updateArticle(formState._id, article.value).then(res => {
      if (res.success) {
        message.success('update article successfully!')
      } else {
        message.error(res.error)
      }
    })
  } else {
    article.value.createdAt = new Date()
    article.value.updatedAt = new Date()
    articleService.createArticle(article.value).then(res => {
      if (res.success) {
        message.success('publish article successfully!')
      } else {
        message.error(res.error)
      }
    })
  }
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

            <!-- <a-form-item name="permission" :rules="[{ required: true, message: 'Please input your permission!' }]">
              <a-select size="large"
                      v-model="formState.status"
                      :options="[{label: 'Private', value: ArticleStatus.PRIVATE},
                                    {label: 'Public', value: ArticleStatus.PUBLIC}]"
                      placeholder="permission"
                      style="width: 150px"></a-select>
            </a-form-item> -->
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
            <a-button>
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
