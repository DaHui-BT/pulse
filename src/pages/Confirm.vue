<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { UserService } from '../api/UserService'
import { message } from 'ant-design-vue'
import { JUMP_DELAY } from '../constant'

const route = useRoute()
const router = useRouter()
const userService = UserService.getInstance()
let title = ref<string>('Waiting for confirm ...')
let status = ref<string>('info')

onMounted(() => {
  userService.confirmUser(route.query.token + '').then(res => {
    if (res.success) {
      title.value = 'Confirm successfully, will jump to login page...'
      status.value = 'success'
      message.success('Confirm email successfully!')
      setTimeout(() => {
        router.push('/login')
      }, JUMP_DELAY)
    } else {
      message.error(res.error)
    }
  }).catch(err => {
    message.error(err)
  })
})

</script>

<template>
  <a-result class="confirm-result" :title="title" :status="status">
    <template #extra>
      <a-button type="primary">Resend Confirm</a-button>
    </template>
  </a-result>
</template>

<style lang="scss" scoped>
.confirm-result {
  background-color: #fff
}
</style>
