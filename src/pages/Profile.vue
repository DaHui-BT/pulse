<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import { UserService } from '../api/UserService'
import { FileService } from '../api/FileService'

import EditForm from '../components/EditForm.vue'
import TimeLine from '../components/TimeLine.vue'
import { UserDocument } from '../entities/user'
import Loading from '../plugins/loading'
import { Store } from '../store'


const store = Store()
const router = useRouter()
const userService = UserService.getInstance()
const fileService = FileService.getInstance()
const user_info = ref<UserDocument>()
// const show_confirm = ref<boolean>(false)
const upload_input = ref<HTMLInputElement | null>(null)
let spinning = ref<boolean>(false)


userService.findUserById(store.user._id).then(res => {
  console.log(res)
  if (res.success) {
    user_info.value = res.data
    res.data && store.setUser(res.data)
  } else {
    message.error(res.error)
    if (res.error == 'Token has expired') {
      router.push('/login')
    }
  }
})

async function uploadFile(event: any) {
  if (!user_info.value?._id) {
    message.error('have not login, login first')
    router.push({ path: '/login' })
    return
  }
  Loading.show()
  const fileResponse = await fileService.uploadFile(event.target.files[0])
  if (fileResponse.success) {
    const userResponse = await userService.updateUser(user_info.value._id, { avatar: fileResponse.data?.fileUrl })
    if (userResponse.success && userResponse.data) {
      store.setUser(userResponse.data)
      user_info.value = userResponse.data
    }
  }
  Loading.hide()
}

function handleChange() {
  // show_confirm.value = false
  upload_input.value?.click()
}

</script>

<template>
  <a-spin :spinning="spinning">
    <div class="profile">
      <a-typography-title :level="2">Profile</a-typography-title>
      
      <section class="profile-avatar">
        <a-avatar shape="square" :size="100"
                  :src="user_info?.avatar"
                  @click="handleChange"></a-avatar>
                  
        <input type="file" class="upload-input" ref="upload_input" @change="uploadFile">
        <!-- <a-modal v-model:open="show_confirm" title="Change Avatar"
                @ok="handleChange">is ready change your avatar?</a-modal> -->
      </section>

      <section class="profile-section">
        <edit-form v-if="user_info" :user_info="user_info"></edit-form>
        <!-- <a-skeleton v-else active /> -->

        <a-descriptions>
          <a-descriptions-item label="UserName">{{ user_info?.username || 'Not Set' }}</a-descriptions-item>
          <a-descriptions-item label="Email">{{ user_info?.email }}</a-descriptions-item>
          <a-descriptions-item label="Address">{{ user_info?.profile.location.province || 'Not set' }} - {{ user_info?.profile.location.city || 'Not set' }}</a-descriptions-item>
          <a-descriptions-item label="Gender">{{ user_info?.gender ? 'Male' : 'Female' }}</a-descriptions-item>
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
