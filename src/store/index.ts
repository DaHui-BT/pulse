// store/authStore.ts
import { defineStore } from 'pinia'
import { UserDocument } from '../entities/user'
import { TagDocument } from '../entities/tag'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    user: {} as UserDocument,
    tags: [] as TagDocument[]
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken
    },
    setUser(userData: UserDocument) {
      this.user = userData
    },
    removeAccessToken() {
      this.accessToken = ''
    },
    removeRefreshToken() {
      this.refreshToken = ''
    },
    removeUser() {
      this.user = {} as UserDocument
    },
    login(token: string, refreshToken: string, user: UserDocument) {
      this.accessToken = token
      this.refreshToken = refreshToken
      this.user = user
    },
    logout() {
      this.accessToken = ''
      this.refreshToken = ''
      this.user = {} as UserDocument
    },
    setTagList(tagList: TagDocument[]) {
      this.tags = tagList
    },
    getExpireTime(token: string): Date {
      let payload = token.split('.')[1]
      payload = atob(payload)
      const exp = parseInt(JSON.parse(payload).exp) * 1000
      return new Date(exp)
    }
  },

  getters: {
    isAuthenticated(): boolean {
      return !!this.accessToken || !!this.refreshToken
    }
  },

  persist: {
    key: 'auth',
    storage: localStorage
  }
})
