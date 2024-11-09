<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import { UserService } from '../services/UserService'
import { getImageBase64 } from '../tools/image_tools'

import EditForm from '../components/EditForm.vue'
import TimeLine from '../components/TimeLine.vue'
import { UserDocument } from '../entities/user'
import Loading from '../plugins/loading'


const router = useRouter()
const userService = UserService.getInstance()
const user_info = ref<UserDocument>()
const show_confirm = ref<boolean>(false)
const upload_input = ref<HTMLInputElement | null>(null)
let spinning = ref<boolean>(true)


onBeforeMount(async () => {
  userService.findUserById(userService.getCurrentUser()._id).then(res => {
    if (res.success) {
      user_info.value = res.data
    } else {
      message.error(res.error)
    }
  })
  if (user_info.value) {
    user_info.value.avatar_url = getImageBase64(user_info.value.avatar.data)
  }
  spinning.value = false
})

function uploadFile(event: any) {
  if (!user_info.value?._id) {
    message.error('have not login, login first')
    router.push({ path: '/login' })
    return
  }
  Loading.show()
  userService.updateAvatar(user_info.value._id, event.target.files[0]).then((res) => {
    if (!res.success) {
      message.error(res.error)
    }
    Loading.hide()
  })
}

function handleChange() {
  show_confirm.value = false
  upload_input.value?.click()
}

</script>

<template>
  <a-spin :spinning="spinning">
    <div class="profile">
      <a-typography-title :level="2">Profile</a-typography-title>
      
      <section class="profile-avatar">
        <a-avatar shape="square" :size="100"
                  :src="user_info?.avatar_url"
                  @click="show_confirm = true"></a-avatar>
                  
        <input type="file" class="upload-input" ref="upload_input" @change="uploadFile">
        <a-modal v-model:open="show_confirm" title="Change Avatar"
                @ok="handleChange">is ready change your avatar?</a-modal>
      </section>

      <section class="profile-section">
        <edit-form v-if="user_info" :user_info="user_info"></edit-form>

        <a-descriptions>
          <a-descriptions-item label="UserName">{{ user_info?.username || 'Not Set' }}</a-descriptions-item>
          <a-descriptions-item label="Email">{{ user_info?.email }}</a-descriptions-item>
          <a-descriptions-item label="Address">{{ user_info?.profile.location.province || 'Not set' }} - {{ user_info?.profile.location.city || 'Not set' }}</a-descriptions-item>
          <a-descriptions-item label="Gender">{{ user_info?.gender == 0 ? 'Female' : 'Male' }}</a-descriptions-item>
          <a-descriptions-item label="Describe">{{ user_info?.description }}</a-descriptions-item>
        </a-descriptions>
      </section>
    
      <section class="profile-section">
        <a-typography-title :level="3">Status Track</a-typography-title>
        <time-line v-if="user_info?._id"></time-line>
      </section>
    </div>
  </a-spin>
</template>

<style lang="scss" scoped>
.profile {
  
  .upload-input {
    width: 0;
    overflow: hidden;
  }

  .profile-section {
    margin-top: var(--middle-margin);
    padding: var(--middle-padding);
    border-radius: var(--small-border);
    box-shadow: var(--basic-box--shadow);
  }
}
</style>
