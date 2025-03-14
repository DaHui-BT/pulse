<script setup lang="ts">
import { reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import { UserService } from '../../api/UserService'

import Glassmorphism from '@components/Glassmorphism.vue'
import { JUMP_DELAY } from '../../constant'
import Loading from '../../plugins/loading'
import { ValidatorRule } from 'ant-design-vue/es/form/interface'
import { useDebounce } from '../../utils/debounce'
import { useI18n } from 'vue-i18n'


interface FormState {
  email: string
  username: string
  password: string
}

const { t } = useI18n()
const router = useRouter()
const debounce = useDebounce()
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
  console.log(errorInfo)
  for (let errorField of errorInfo.errorFields) {
    for (let error of errorField.errors) {  
      message.error(error)
    }
  }
}

const disabled = computed(() => {
  return !(formState.email && formState.password)
})

function checkUsernameExist(_: ValidatorRule, value: string) {
  return new Promise((resolve, reject) => {
    if (value.length < 4) {
      resolve(false)
    }
    debounce(() => {
      user_service.existUserByUsername(value).then(res => {
        if (res.data) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    }, 1000)
    
  })
}

function checkEmailExist(_: ValidatorRule, value: string) {
  return new Promise((resolve, reject) => {
    debounce(() => {
      user_service.existUserByEmail(value).then(res => {
        if (res.data) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    }, 1000)
    
  })
}

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
        :label-col="{ span: 6 }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <h2 class="register-form-title">{{ t('sign_up') }}</h2>
        <a-form-item
          :label="t('username')"
          name="username"
          :rules="[{ required: true, message: t('please_input_your_username') },
                   { min: 4, message: 'Username length must large than 3' },
                   { max: 16, message: 'Username length must less than 16' },
                   { message: 'Username already exist', validator: checkUsernameExist }]"
        >
          <a-input v-model:value="formState.username" :placeholder="t('username')">
            <template #prefix>
              <i class="iconfont">&#xe632;</i>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('email')"
          name="email"
          :rules="[{ required: true, message: t('please_input_your_email') },
                   { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                     message: 'Email address format not correct' }]"
        >
        <!-- ,
                   { message: 'Email already exist', validator: checkEmailExist } -->
          <a-input v-model:value="formState.email" :placeholder="t('email')">
            <template #prefix>
              <i class="iconfont">&#xe66f;</i>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('password')"
          name="password"
          :rules="[{ required: true, message: t('please_input_your_password') },
                   { min: 8, max: 32, message: 'Password should be range (8, 32)!' },
                   { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/,
                     message: 'Both letters and numbers required'},]"
        >
          <a-input-password v-model:value="formState.password" :placeholder="t('password')">
            <template #prefix>
              <i class="iconfont">&#xe66b;</i>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="register-form-button">
            {{ t('sign_up') }}
          </a-button>
          <a-flex justify="space-between">
            <a-typography-link href="#/login">{{ t('login_now') }}</a-typography-link>
            <a-typography-link type="link" @click="resendConfirm">{{ t('resend_confirm_email') }}</a-typography-link>
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
  background: linear-gradient(70deg, rgb(0, 255, 200), 10%, rgb(250, 218, 218));

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
