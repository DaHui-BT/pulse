<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

import { CityService } from '../api/CityService'
import { CityType } from '../types/city'
import { UserService } from '../api/UserService'
import moment from 'moment'
import { UserDocument } from '../entities/user'
import { message } from 'ant-design-vue'
import Loading from '../plugins/loading'
import { Store } from '../store'

const props = defineProps({ user_info: { type: Object as () => UserDocument }})

const store = Store()
const is_open_form = ref<boolean>(false)
const city_service = CityService.getInstance()
const user_service = UserService.getInstance()
const city_list = reactive<CityType[]>([])

const user = ref<UserDocument>(props.user_info as UserDocument)

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
  is_open_form.value = false
  try {
    Loading.show()
    user.value.birthday = new Date(formState.birthday)
    user.value.username = formState.username
    user.value.email = formState.email
    user.value.gender = formState.gender
    user.value.profile.location.province = formState.province
    user.value.profile.location.city = formState.city
    user.value.description = formState.description
    const userResponse = await user_service.updateUser(store.user._id, user.value)
    if (userResponse.success && userResponse.data) {
      store.setUser(userResponse.data)
    }
  } catch (err) {
    console.log(err)
  } finally {
    Loading.hide()
  }
}

const city = computed(() => {
  for (let pro of city_list) {
    if (pro.province == formState.province) {
      return pro.city
    }
  }
})

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

      <a-form-item name="username" label="Name" :rules="[{ required: true, max: 16, min: 2 }]">
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
        <a-form-item name="province" label="Province" :rules="[{ required: true }]">
          <a-select v-model:value="formState.province"
                      @change="changeProvince"
                      style="width: 150px"
                      placeholder="province"
                      :options="city_list.map(pro => ({ value: pro.province }))" />
        </a-form-item>

        <a-form-item name="city" label="City" :rules="[{ required: true }]">
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
