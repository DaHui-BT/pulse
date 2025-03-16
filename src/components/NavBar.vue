<script setup lang="ts">
import { ref, onMounted, watch, computed, h, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuUnfoldOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'


// type NavBarType = {label: string, key: string, name: string, path: string, icon: ''}

const i18n = useI18n()
const { t, locale } = i18n
const route = useRoute()
const router = useRouter()
let show_menu_collpase = ref<boolean>(window.innerWidth <= 400)
const current_path = ref<string[]>([])

const navbar_list = ref<MenuProps['items']>([
  {
    label: t('article'),
    key: 'Article',
  },
  {
    label: t('repository'),
    key: 'Repository',
  },
  {
    label: t('publish'),
    key: 'Publish',
  },
  // {
    // label: t('chatroom'),
  //   key: 'ChatRoom',
  //   name: 'ChatRoom',
  //   path: '/chat-room'
  // },
  {
    label: t('profile'),
    key: 'Profile',
    children: [
      {
        label: t('profile'),
        key: 'Profile',
        icon: h(UserOutlined)
      },
      {
        label: t('language'),
        key: 'language',
        icon: h(GlobalOutlined),
        onClick: () => {
          if (locale.value === 'en') {
            locale.value = 'zh'
          } else {
            locale.value = 'en'
          }
        }
      }
    ]
  },
  // {
  //   label: '',
  //   key: 'Mode',
  //   // icon: h('a-switch', { checked: 'checked'})
  //   // name: 'Mode',
  //   // icon: h('<a-switch v-model:checked="checked" />'),
  //   // path: '/profile'
  // }
])

watch(current_path, (newVal) => {
  if (newVal[0] != 'language') {
    router.push({
      name: newVal[0]
    })
  }
})

watch(() => route.name, (newVal) => {
  console.log(newVal)
  if (newVal && newVal != 'language') {
    current_path.value.splice(0, 1, newVal.toString())
  }
})

const collpaseItems = computed(() => {
  return [{
    key: '',
    label: '',
    icon: h(MenuUnfoldOutlined, {style: {fontSize: '20px'}}),
    children: navbar_list.value
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
              :items="navbar_list" style="margin-right: 20px;"/>

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
