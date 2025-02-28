<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

import { CityService } from '../../../../api/CityService'
import { CityType } from '../../../../types/city'
import { UserService } from '../../../../api/UserService'
import { UserDocument } from '../../../../entities/user'
import { message } from 'ant-design-vue'
import { useAuthStore } from '../../../../store'
import { useDebounce } from '../../../../utils/debounce'
import { ValidatorRule } from 'ant-design-vue/es/form/interface'

const props = defineProps({ user_info: { type: Object as () => UserDocument }})
type validatorStatus = 'validating' | 'warning' | 'error' | 'success'

const store = useAuthStore()
const is_open_form = ref<boolean>(false)
const city_service = CityService.getInstance()
const user_service = UserService.getInstance()
const city_list = reactive<CityType[]>([])
const validating = ref<validatorStatus>('success')
const user = ref<UserDocument>(props.user_info as UserDocument)
const debounce = useDebounce()
const help_message = ref<string>('')
const spinning = ref<boolean>(false)
const formState = reactive({
  username: user.value.username,
  email: user.value.email,
  birthday: user.value.birthday,
  gender: user.value.gender,
  province: user.value.profile.location.province,
  city: user.value.profile.location.city,
  description: user.value.description
})

city_service.findAllCitys().then(res => {
  city_list.splice(0, city_list.length)
  city_list.push(...(res.data || []))
})

async function updateUser() {
  const updateUser: Partial<UserDocument> = {
    birthday: new Date(formState.birthday),
    username: formState.username,
    email: formState.email,
    gender: formState.gender,
    profile: {
      location: {
        province: formState.province,
        city: formState.city
      }
    },
    description: formState.description,
  }
  spinning.value = true
  await user_service.updateUser(store.user._id, updateUser).then(res => {
    console.log(res)
    if (res.success && res.data) {
      message.success(res.message)
    }
  }).catch(err => {
    message.error(err.message)
  }).finally(() => {
    spinning.value = false
    is_open_form.value = false
  })
}

const city = computed(() => {
  for (let pro of city_list) {
    if (pro.province == formState.province) {
      return pro.city
    }
  }
})

function checkUsernameExist(_rule: ValidatorRule, value: string) {
  function setValidateStatus(status: validatorStatus, message: string) {
    validating.value = status
    help_message.value = message
  }

  return new Promise((resolve, reject) => {
    debounce(() => {
      setValidateStatus('validating', '')
      if (value.length == 0) {
        setValidateStatus('error', 'Please input your username!')
        resolve(true);
      } else if (value.length < 4) {
        setValidateStatus('error', 'Username length must large than 3')
        reject(new Error('Username length must large than 3'));
      } else if (value.length > 16) {
        setValidateStatus('error', 'Username length must less than 16.')
        reject(new Error('Username length must less than 16.'));
      } else {
        user_service.existUserByUsername(value).then(res => {
          if (res.data) {
            setValidateStatus('success', '')
            resolve(true)
          } else {
            setValidateStatus('error', 'Username already exists.')
            reject(new Error('Username already exists.'));
          }
        }).catch(err => {
          console.log(err)
          setValidateStatus('error', 'Error checking username availability.')
          reject(new Error('Error checking username availability.'))
        })
      }
    }, 1000)
  })
}

function changeProvince() {
  formState.city = ''
}

function finishFailed({ values, errorFields, outOfDate }: {
                        values: UserDocument,
                        errorFields: {
                          errors: string[],
                          name: string[],
                          warnings: string[]
                        }[], outOfDate: boolean}) {
  for (let errorField of errorFields) {
    for (let error of errorField.errors) {
      message.error(error)
    }
  }
}
</script>

<template>
  <a-button type="primary" class="profile-button" @click="() => is_open_form = true">Edit</a-button>
  
  <a-modal v-model:open="is_open_form" title="Edit Profile" ok-text="Comfirm" cancel-text="Cancel">
    <a-form class="edit-form" :model="formState" @finishFailed="finishFailed" @finish="updateUser">
      <a-spin :spinning="spinning">
        <a-form-item name="username" label="Name" has-feedback
          :validate-status="validating"
          :help="help_message"
          :rules="[{required: true, message: 'Username is requeired'}, { validator: checkUsernameExist }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        
        <a-form-item name="email" label="Email" :rules="[{ required: true, type: 'email' }]">
          <a-input v-model:value="formState.email" disabled />
        </a-form-item>
        
        <a-form-item name="birthday" label="Birthday">
          <a-date-picker v-model:value="formState.birthday" value-format="YYYY-MM-DD" />
        </a-form-item>

        <a-form-item name="gender" label="Gender" :rules="[{ type: 'number' }]">
          <a-radio-group v-model:value="formState.gender">
            <a-radio :value="0">Famale</a-radio>
            <a-radio :value="1">Male</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-space>
          <a-form-item name="province" label="Province" :rules="[{ required: false }]">
            <a-select v-model:value="formState.province"
                        @change="changeProvince"
                        style="width: 150px"
                        placeholder="province"
                        :options="city_list.map(pro => ({ value: pro.province }))" />
          </a-form-item>

          <a-form-item name="city" label="City" :rules="[{ required: false }]">
            <a-select v-model:value="formState.city"
                        style="width: 100px"
                        placeholder="city"
                        :options="city?.map(c => ({ value: c }))" />
          </a-form-item>
        </a-space>

        <a-form-item name="description" label="Description">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>
        
        <a-form-item>
          <a-flex justify="end" gap="10">
            <a-button @click="is_open_form = false">Cancel</a-button>
            <a-button html-type="submit" type="primary">Confirm</a-button>
          </a-flex>
        </a-form-item>
      </a-spin>
    </a-form>

    <template #footer>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.edit-form {
  padding: var(--middle-padding);
  border-radius: var(--small-border);
  background-color: #fff;
  box-shadow: var(--basic-border--shadow);
}

.profile-button {
  margin-bottom: 10px;
}
</style>
