<script setup lang="ts">
import { reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'

import { JUMP_DELAY } from '../../constant'
import AuthService from '../../api/auth.service'
import Loading from '../../plugins/loading'
import { useI18n } from 'vue-i18n'


type FormState = {
  username: string
  password: string
  remember: boolean
}
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authService = AuthService.getInstance()
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})

const onFinish = (values: FormState) => {
  Loading.show()
  authService.login(values.username, values.password).then((res) => {
    if (res.success) {
      message.success('login successfully')
      let to_path = '/'
      if (route.query.from) to_path = route.query.from.toString()
      setTimeout(() => {
        router.push({
          path: to_path
        })
      }, JUMP_DELAY)
    } else {
      message.error(res.error)
      // message.error('Error: username or password error')
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
  return !(formState.username && formState.password)
})
</script>

<template>
  <div class="login">
    <glassmorphism :opacity=".6" :border-radius="5">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <h2 class="login-form-title">{{ t('sign_in') }}</h2>
        <a-form-item
          :label="t('account')"
          name="username"
          :rules="[{ required: true, message: t('please_input_your_username') }]">
          <!-- { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                     message: 'Email address format not correct' } -->
          <a-input v-model:value="formState.username" :placeholder="t('account')">
            <template #prefix>
              <i class="iconfont">&#xe66f;</i>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('password')"
          name="password"
          :rules="[{ required: true, message: t('please_input_your_password') }]"
        >
          <a-input-password v-model:value="formState.password" :placeholder="t('password')">
            <template #prefix>
              <i class="iconfont">&#xe66b;</i>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">{{ t('remember_me') }}</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">{{ t('forget_password') }}</a>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
            {{ t('sign_in') }}
          </a-button>
          {{ t('or') }}
          <router-link to="/register">{{ t('sign_up_now') }}</router-link>
        </a-form-item>
      </a-form>
    </glassmorphism>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(70deg, rgb(0, 255, 200), 10%, rgb(250, 218, 218));

  .login-form {
    padding: 30px 30px;

    .login-form-title {
      text-align: center;
      margin-bottom: 25px;
    }

    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
  }
}
</style>
