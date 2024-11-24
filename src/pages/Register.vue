<script setup lang="ts">
import { reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import { UserService } from '../api/UserService'

import Glassmorphism from '@components/Glassmorphism.vue'
import { JUMP_DELAY } from '../constant'
import Loading from '../plugins/loading'


interface FormState {
  email: string
  username: string
  password: string
}

const router = useRouter()
const user_service = UserService.getInstance()
const formState = reactive<FormState>({
  email: '',
  username: '',
  password: '',
})

const onFinish = (values: FormState) => {
  Loading.show()
  user_service.register(values.username, values.email, values.password).then((res) => {
    if (res.success) {
      message.success('Regsiter successfully!')
      setTimeout(() => {
        router.push({ path: '/login' })
      }, JUMP_DELAY)
    } else {
      message.error(res.error)
    }
    Loading.hide()
  })
}

const onFinishFailed = (errorInfo: any) => {
  for (let errorField of errorInfo.errorFields) {
    for (let error of errorField.errors) {  
      message.error(error)
    }
  }
}

const disabled = computed(() => {
  return !(formState.email && formState.password)
})

function resendConfirm() {
  if (formState.email.length == 0) {
    message.error('Please input your email first')
  } else {
    user_service.resendConfirmationEmail(formState.email)
  }
}
</script>

<template>
  <div class="register">
    <glassmorphism :opacity=".6" :border-radius="5">
      <a-form
        :model="formState"
        name="normal_register"
        class="register-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <h2 class="register-form-title">Sign up</h2>
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' },
                   { min: 3, message: 'Username length must large than 3' },
                   { max: 16, message: 'Username length must less than 16' }]"
        >
          <a-input v-model:value="formState.username" placeholder="Username">
            <template #prefix>
              <i class="iconfont">&#xe632;</i>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="email"
          :rules="[{ required: true, message: 'Please input your email!' },
                   { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                     message: 'Email address format not correct' }]"
        >
          <a-input v-model:value="formState.email" placeholder="Email">
            <template #prefix>
              <i class="iconfont">&#xe66f;</i>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' },
                   { min: 8, max: 32, message: 'Password should in range of (8, 32)' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="Password">
            <template #prefix>
              <i class="iconfont">&#xe66b;</i>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="register-form-button">
            Sign up
          </a-button>
          <a-flex justify="space-between">
            <a-typography-link href="#/login">Login now!</a-typography-link>
            <a-typography-link type="link" @click="resendConfirm">Resend confirm email</a-typography-link>
          </a-flex>
        </a-form-item>
      </a-form>
    </glassmorphism>
  </div>
</template>

<style lang="scss" scoped>
.register {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(70deg, rgb(0, 255, 200), 10%, rgb(251, 208, 133));

  .register-form {
    padding: 30px 30px;

    .register-form-title {
      text-align: center;
      margin-bottom: 25px;
    }

    .register-form-forgot {
      float: right;
    }

    .register-form-button {
      width: 100%;
    }
  }
}
</style>
