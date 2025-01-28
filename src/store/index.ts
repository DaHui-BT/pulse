// store/authStore.ts

import { defineStore } from 'pinia'
import { UserDocument } from '../entities/user'

export const Store = defineStore('Store', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',  // Load token from localStorage if available
    refreshToken: localStorage.getItem('refreshToken') || '', // Optional: for refresh tokens
    user: JSON.parse(localStorage.getItem('user') || '{}'), // Load user data if available
    tokenExpiration: parseInt(localStorage.getItem('tokenExpiration') || ''),  // Token expiry timestamp
    loading: false, // Flag for loading state
    error: null,    // Flag for error messages
  }),

  actions: {
    // Save data to Pinia state and localStorage
    setAccessToken(token: string, refreshToken: string, expiration: number) {
      this.accessToken = token
      this.tokenExpiration = expiration
      localStorage.setItem('accessToken', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('tokenExpiration', expiration + '')
    },
    
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken
      localStorage.setItem('refreshToken', refreshToken)
    },
    
    setUser(userData: UserDocument) {
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    
    logout() {
      this.accessToken = ''
      this.refreshToken = ''
      this.user = {}
      this.tokenExpiration = 0
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      localStorage.removeItem('tokenExpiration')
    },

    // Update the loading state
    setLoading(isLoading: boolean) {
      this.loading = isLoading
    },

    // Update the error state
    // setError(error: string | null) {
    //   this.error = error
    // }
  },

  getters: {
    // TODO logic should be update
    isAuthenticated(): boolean {
      return !!this.accessToken && !!this.tokenExpiration && Date.now() < this.tokenExpiration
    },

    isTokenExpired(): boolean {
      return this.tokenExpiration ? Date.now() > this.tokenExpiration : false
    }
  }
})
