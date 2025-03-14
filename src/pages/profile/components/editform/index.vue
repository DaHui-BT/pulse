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
import cities from '../../../../constant/city.json'

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

// city_service.findAllCitys().then(res => {
//   city_list.splice(0, city_list.length)
//   city_list.push(...(res.data || []))
// })

city_list.splice(0, city_list.length)
city_list.push(...cities.province_list)

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
          if (!res.data || value === store.user.username) {
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
  <!-- <a-button type="primary" class="profile-button" @click="() => is_open_form = true">Edit</a-button> -->
  <a-button type="primary" class="profile-button" @click="() => is_open_form = true">{{ $t('modify') }}</a-button>
  
  <!-- <a-modal v-model:open="is_open_form" title="Edit Profile" ok-text="Comfirm" cancel-text="Cancel"> -->
  <a-modal v-model:open="is_open_form" :title="$t('modify_info')" :ok-text="$t('confirm')" :cancel-text="$t('cancel')">
    <a-form class="edit-form" :model="formState" @finishFailed="finishFailed" @finish="updateUser">
      <a-spin :spinning="spinning">
        <a-form-item name="username" :label="$t('name')" has-feedback
          :validate-status="validating"
          :help="help_message"
          :rules="[{required: true, message: 'Username is requeired'}, { validator: checkUsernameExist }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        
        <a-form-item name="email" :label="$t('email')" :rules="[{ required: true, type: 'email' }]">
          <a-input v-model:value="formState.email" disabled />
        </a-form-item>
        
        <a-form-item name="birthday" :label="$t('birthday')">
          <a-date-picker v-model:value="formState.birthday" value-format="YYYY-MM-DD" />
        </a-form-item>

        <a-form-item name="gender" :label="$t('gender')" :rules="[{ type: 'number' }]">
          <a-radio-group v-model:value="formState.gender">
            <a-radio :value="0">{{ $t('female') }}</a-radio>
            <a-radio :value="1">{{ $t('male') }}</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-space>
          <a-form-item name="province" :label="$t('province')" :rules="[{ required: false }]">
            <a-select v-model:value="formState.province"
                        @change="changeProvince"
                        style="width: 150px"
                        :placeholder="$t('province')"
                        :options="city_list.map(pro => ({ value: pro.province }))" />
          </a-form-item>

          <a-form-item name="city" :label="$t('city')" :rules="[{ required: false }]">
            <a-select v-model:value="formState.city"
                        style="width: 100px"
                        :placeholder="$t('city')"
                        :options="city?.map(c => ({ value: c }))" />
          </a-form-item>
        </a-space>

        <a-form-item name="description" :label="$t('description')">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>
        
        <a-form-item>
          <a-flex justify="end" gap="10">
            <!-- <a-button @click="is_open_form = false">Cancel</a-button>
            <a-button html-type="submit" type="primary">Confirm</a-button> -->
            <a-button @click="is_open_form = false">{{ $t('cancel') }}</a-button>
            <a-button html-type="submit" type="primary">{{ $t('confirm') }}</a-button>
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
