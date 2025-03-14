<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { ArticleService, CreateAndUpdateArticleType } from '../../../../api/ArticleService'
import { FileService } from '../../../../api/FileService'
import { TagDocument } from '../../../../entities/tag'
import { useAuthStore } from '../../../../store'
import { JUMP_DELAY } from '../../../../constant'


const route = useRoute()
const router = useRouter()
const store = useAuthStore()
const isEdit = ref<boolean>(false)
const spinning = ref<boolean>(false)
const articleService = ArticleService.getInstance()
const fileService = FileService.getInstance()
const tag_list = reactive<TagDocument[]>(store.tags)
const fileList = ref<string[]>([])


const formState = reactive<CreateAndUpdateArticleType>({
  createdBy: store.user._id,
  title: '',
  tags: [],
  description: '',
  content: '',
  public: false
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
        formState.tags = res.data.tags
        formState.public = res.data.public
        formState.description = res.data.description
        formState.content = res.data.content
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
           && formState.content.length > 0
           && formState.public != null)
})

async function handleUploadImage(_e: Event, _insertImage: Function, files: File[]) {
  spinning.value = true
  
  const file = files[0]
  const formData = new FormData()
  formData.append('file', file)
  fileService.uploadFile(formData).then(res => {
    // TODO this method will occupy much storage
    if (res.success) {
      formState.content += `![${file.name}](${res.data})`
    } else {
      message.error(res.error)
    }
  }).catch(err => message.error(err.message))
  .finally(() => spinning.value = false)
}

const handleUpload = async (file: File) => {
  formState.content = await file.text() || formState.content
  return false
}

async function onFinish(_values: CreateAndUpdateArticleType) {
  spinning.value = true
  
  if (isEdit.value) {
    if (!formState._id) {
      throw new Error('Article id error')
    }

    await articleService.updateArticle(formState._id, formState).then(res => {
      if (res.success) {
        message.success('update article successfully!')
        setTimeout(() => {
          router.push('/article')
        }, JUMP_DELAY)
      } else {
        message.error(res.error)
      }
    }).catch(err => message.error(err.message))
    .finally(() => spinning.value = false)
  } else {
    await articleService.createArticle(formState).then(res => {
      if (res.success) {
        message.success('publish article successfully!')
        setTimeout(() => {
          router.push('/article')
        }, JUMP_DELAY)
      } else {
        message.error(res.error)
      }
    }).catch(err => message.error(err.message))
    .finally(() => spinning.value = false)
  }
}

function onFinishFailed(values: { values: CreateAndUpdateArticleType,
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

</script>

<template>
  <div class="publish-article">
    <a-spin :spinning="spinning">
      <a-form :model="formState" name="norm" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item>
          <a-button :disabled="disabled" type="primary" @click="onFinish">发布</a-button>
          <!-- <a-button :disabled="disabled" type="primary" @click="onFinish">Publish</a-button> -->
        </a-form-item>

        <!-- <a-form-item name="title" :rules="[{ required: true, message: 'Please input your title!' }, { max: 50, min: 5}]">
          <a-input placeholder="Input your title" size="large" v-model:value="formState.title"></a-input>
        </a-form-item> -->
        <a-form-item name="title" :rules="[{ required: true, message: '请输入标题!' }, { max: 50, min: 5}]">
          <a-input placeholder="请输入标题" size="large" v-model:value="formState.title"></a-input>
        </a-form-item>

        <a-flex gap="20" align="center" wrap="wrap">
          <a-form-item name="tags" :rules="[{ required: true, max: 5, min: 1, type: 'array' }]">
            <!-- <a-select
                size="large"
                v-model:value="formState.tags"
                :options="tag_list.map(tag => ({label: tag.name, value: tag._id + ''}))"
                mode="multiple"
                placeholder="select your tag"
                style="min-width: 200px"></a-select> -->
                
            <a-select
                size="large"
                v-model:value="formState.tags"
                :options="tag_list.map(tag => ({label: tag.name, value: tag._id + ''}))"
                mode="multiple"
                placeholder="请选择标签"
                style="min-width: 200px"></a-select>
          </a-form-item>
          
          <!-- <a-form-item name="isPublic" :rules="[{ required: true, message: 'Please input your permission!' }]">
            <a-switch v-model:checked="formState.public" checked-children="public" un-checked-children="private" />
          </a-form-item> -->
          <a-form-item name="isPublic">
            <a-switch v-model:checked="formState.public" :checked-children="$t('public')" :un-checked-children="$t('private')" />
          </a-form-item>
        </a-flex>

        <!-- <a-form-item name="description" :rules="[{ required: true, message: 'Please input your description!' }, { max: 150, min: 30}]">
          <a-textarea size="large" placeholder="Input your description" class="publish-describe" v-model:value="formState.description"></a-textarea>
        </a-form-item> -->
        <a-form-item name="description" :rules="[{ required: true, message: '请输入描述信息!' }, { max: 150, min: 30}]">
          <a-textarea size="large" placeholder="请输入描述信息" class="publish-describe" v-model:value="formState.description"></a-textarea>
        </a-form-item>

        <!-- <a-form-item name="content" :rules="[{ required: true, message: 'Please input your content!' }]"> -->
        <a-form-item name="content" :rules="[{ required: true, message: '请输入内容!' }]">
          <a-upload
            v-model:file-list="fileList"
            name="file"
            :beforeUpload="handleUpload"
            :maxCount="1"
            accept=".md"
          >
            <a-button ghost type="primary" style="margin-bottom: 20px;">
              <!-- Upload to Analyse -->
              上传并解析
            </a-button>
          </a-upload>

          <v-md-editor v-model="formState.content" :disabled-menus="[]" @upload-image="handleUploadImage" height="400px"></v-md-editor>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<style lang="scss" scoped>
</style>
