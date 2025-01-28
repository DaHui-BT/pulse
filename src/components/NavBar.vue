<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SearchOutlined } from '@ant-design/icons-vue'


type NavBarType = {label: string, key: string, name: string, path: string}

const route = useRoute()
const router = useRouter()
let show_menu_collpase = ref<boolean>(window.innerWidth <= 400)
const current_path = ref<string[]>([])
const formState = reactive({
  search: ''
})

const navbar_list = reactive<NavBarType[]>([{
  label: 'Article',
  key: 'Article',
  name: 'Article',
  path: '/article'
}, {
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

onMounted(() => {
  window.onresize = () => {
    if (window.innerWidth < 400) {
      show_menu_collpase.value = true
    } else {
      show_menu_collpase.value = false
    }
  }

  let path = ''
  let search = ''
  if (!route.name) {
    let current_name = location.href.split('#')[1].split('/')[1]
    path = current_name.charAt(0).toUpperCase() + current_name.slice(1, current_name.length)
    
    search = current_name.split('?')[1]
    if (search && search.length > 0) {
      if (search.split('=')[0] == 'search'){
        search = search.split('=')[1]
      } else {
        search = ''
      }
    }
  } else {
    path = route.name.toString()
    search = route.query.search + ''
  }
  formState.search = search
  current_path.value.push(path)
})

function handleClick({key}: {key: string}) {
  current_path.value.splice(0, current_path.value.length)
  current_path.value.push(key)
  router.push({
    name: key
  })
}

function onSearch() {
  router.push({
    path: '/article',
    query: {
      search: formState.search
    }
  })
}
</script>

<template>
  <a-affix class="nav-bar" :offset-top="0" v-if="route.meta.showNavbar">
    <a-flex class="nav-bar-content" justify="space-between" align="center">
      <router-link to="/home" @click="handleClick({key: 'Home'})"><i class="iconfont nav-bar-logo">&#xe70f;</i></router-link>
      
      <a-form layout="inline" @finish="onSearch" :model="formState">
        <a-form-item>
          <a-input
            v-model:value="formState.search"
            placeholder="input search text"
            style="width: 200px"/>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" shape="circle" type="primary" :icon="h(SearchOutlined)" />
        </a-form-item>
      </a-form>
      
      <a-dropdown v-if="show_menu_collpase">
        <a @click.prevent>
          <i class="iconfont menu-icon">&#xe638;</i>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="item in navbar_list"
                         :key="item.key"
                         @click="router.push(item.path)">{{ item.key }}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <a-menu v-else v-model:selectedKeys="current_path" mode="horizontal"
              :items="navbar_list" @select="handleClick"/>

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
    padding: 0 20px;
    background-color: var(--navbar-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    
    .nav-bar-logo {
      font-size: 35px;
    }

    .nav-bar-item {
      display: inline-block;
      height: var(--navbar-height);
      padding: 20px 15px;
      box-sizing: border-box;
      margin-left: 10px;
      color: var(--primary-color);
      font-weight: bold;
    }

    // .nav-bar-item--activate {
    //   border-bottom: 3px solid var(--primary-color);
    // }

    .menu-icon {
      font-size: 28px;
    }
  }

  .nav-bar-fake {
    height: var(--navbar-height);
  }
}

:where(.css-dev-only-do-not-override-17yhhjv).ant-form-inline .ant-form-item {
  margin-inline-end: 2px;
}
</style>