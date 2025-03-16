import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { JUMP_DELAY } from '../constant'
import { message } from 'ant-design-vue'
import { useAuthStore } from '../store'


const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/home' 
  }, {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/home/index.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/publish',
    name: 'Publish',
    component: () => import('../pages/publish/index.vue'),
    meta: {
      requiresAuth: true,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/article',
    name: 'Article',
    component: () => import('../pages/article/index.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/article-detail',
    name: 'ArticleDetail',
    component: () => import('../pages/article-detail/index.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/repository',
    name: 'Repository',
    component: () => import('../pages/repository/index.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/repository-detail',
    name: 'RepositoryDetail',
    component: () => import('../pages/repository-detail/index.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/profile/index.vue'),
    meta: {
      requiresAuth: true,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/profile-info',
    name: 'ProfileInfo',
    component: () => import('../pages/ProfileInfo.vue'),
    meta: {
      requiresAuth: true,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/chat-room',
    name: 'ChatRoom',
    component: () => import('../pages/ChatRoom.vue'),
    meta: {
      requiresAuth: true,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/index.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: false,
      needContainer: false
    }
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/register/index.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: false,
      needContainer: false
    }
  }, {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../pages/confirm/index.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: false,
      needContainer: false
    }
  }, {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../pages/NotFound.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: false,
      needContainer: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // judge is login or not
    const store = useAuthStore()
    if (store.isAuthenticated) {
      next()
    } else {
      // message.warning('Have not login, login first')
      message.warning('还没有登录，请先登录')
      setTimeout(() => {
        next({
          path: '/login',
          query: {
            from: to.path
          }
        })
      }, JUMP_DELAY)
    }
  } else {
    next()
  }
})

export default router
