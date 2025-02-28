<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed, h, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuUnfoldOutlined } from '@ant-design/icons-vue'


type NavBarType = {label: string, key: string, name: string, path: string}

const route = useRoute()
const router = useRouter()
let show_menu_collpase = ref<boolean>(window.innerWidth <= 400)
const current_path = ref<string[]>([])

const navbar_list = reactive<NavBarType[]>([{
  label: 'Article',
  key: 'Article',
  name: 'Article',
  path: '/article'
},
{
  label: 'Repository',
  key: 'Repository',
  name: 'Repository',
  path: '/repository'
},
{
  label: 'Publish',
  key: 'Publish',
  name: 'Publish',
  path: '/publish'
},
// {
//   label: 'ChatRoom',
//   key: 'ChatRoom',
//   name: 'ChatRoom',
//   path: '/chat-room'
// },
{
  label: 'Profile',
  key: 'Profile',
  name: 'Profile',
  path: '/profile'
}])

watch(current_path, (newVal) => {
  router.push({
    name: newVal[0]
  })
})

watch(() => route.name, (newVal) => {
  if (newVal) {
    current_path.value.splice(0, 1, newVal.toString())
  }
})

const collpaseItems = computed(() => {
  return [{
    key: '',
    label: '',
    icon: h(MenuUnfoldOutlined, {style: {fontSize: '20px'}}),
    children: navbar_list
  }]
})

function resize() {
  if (window.innerWidth < 600) {
    show_menu_collpase.value = true
  } else {
    show_menu_collpase.value = false
  }
}

onMounted(() => {
  if (window.innerWidth < 600) {
    show_menu_collpase.value = true
  } else {
    show_menu_collpase.value = false
  }

  window.addEventListener('resize', resize)
})

function handleClick({key}: {key: string}) {
  current_path.value.splice(0, current_path.value.length)
  current_path.value.push(key)
  router.push({
    name: key
  })
}

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <a-affix class="nav-bar" :offset-top="0" v-if="route.meta.showNavbar">
    <a-flex class="nav-bar-content" justify="space-between" align="center">
      <div @click="handleClick({key: 'Home'})">
        <i class="iconfont nav-bar-logo">&#xe70f;</i>
      </div>
      
      <a-menu v-if="show_menu_collpase" v-model:selectedKeys="current_path" mode="horizontal"
              :items="collpaseItems"/>

      <a-menu v-else v-model:selectedKeys="current_path" mode="horizontal"
              :items="navbar_list"/>

    </a-flex>
    <div class="nav-bar-fake"></div>
  </a-affix>
</template>

<style lang="scss" scoped>
.nav-bar {
  min-width: 350px;
  
  .nav-bar-content {
    position: fixed;
    min-width: 350px;
    width: 100%;
    height: var(--navbar-height);
    padding: 0 0 0 20px;
    background-color: var(--navbar-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    
    .nav-bar-logo {
      font-size: 35px;
      cursor: pointer;
      color: var(--primary-color);
    }

    .menu-icon {
      font-size: 28px;
    }
  }

  .nav-bar-fake {
    height: var(--navbar-height);
  }
}
</style>
