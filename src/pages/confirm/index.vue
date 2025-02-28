<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { JUMP_DELAY } from '../../constant'
import AuthService from '../../api/auth.service'

const route = useRoute()
const router = useRouter()
const authService = AuthService.getInstance()
let title = ref<string>('Waiting for confirm ...')
let status = ref<string>('info')

onMounted(() => {
  sendConfirm()
})

function sendConfirm() {
  if (typeof route.query.token === 'string' && route.query.token.length > 0) {
    authService.confirmAuth(route.query.token).then(res => {
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
  }
}
</script>

<template>
  <a-result class="confirm-result" :title="title" :status="status">
    <template #extra>
      <a-button type="primary" @click="sendConfirm">Resend Confirm</a-button>
    </template>
  </a-result>
</template>

<style lang="scss" scoped>
.confirm-result {
  background-color: #fff
}
</style>
