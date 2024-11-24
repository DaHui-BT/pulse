<script lang="ts" setup>
import { SmileTwoTone } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router';
import { UserService } from '../api/UserService';

const route = useRoute()
const userService = UserService.getInstance()

userService.confirmUser(route.query.token + '')

</script>

<template>
  <a-result class="confirm-result" title="Waiting for confirm ...">
    <template #icon>
      <smile-twoTone />
    </template>
    <template #extra>
      <a-button type="primary">Resend Confirm</a-button>
    </template>
  </a-result>
</template>

<style lang="scss" scoped>
.confirm-result {
  background-color: #fff;
}
</style>
