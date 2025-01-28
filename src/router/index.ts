import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { JUMP_DELAY } from '../constant'
// import { AuthorizationService } from '../services/AuthorizationService'

import { message } from 'ant-design-vue'
import { Store } from '../store'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/home' 
  }, {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: true,
      needContainer: false
    }
  }, {
    path: '/publish',
    name: 'Publish',
    component: () => import('../pages/Publish.vue'),
    meta: {
      requiresAuth: true,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/article',
    name: 'Article',
    component: () => import('../pages/Article.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/article-detail',
    name: 'ArticleDetail',
    component: () => import('../pages/ArticleDetail.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: true,
      needContainer: true
    }
  }, {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue'),
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
    component: () => import('../pages/Login.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: false,
      needContainer: false
    }
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue'),
    meta: {
      requiresAuth: false,
      showNavbar: false,
      needContainer: false
    }
  }, {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../pages/Confirm.vue'),
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
    const store = Store()
    if (store.isAuthenticated) {
      next()
    } else {
      message.warning('Have not login, login first')
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
