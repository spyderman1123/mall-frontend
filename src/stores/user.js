import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const userInfo = ref(null)

  const login = (username, password) => {
    if (username && password) {
      isLoggedIn.value = true
      userInfo.value = {
        username: username,
        avatar: '/src/assets/images/logo.png',
        phone: '138****8888'
      }
      return true
    }
    return false
  }

  const logout = () => {
    isLoggedIn.value = false
    userInfo.value = null
  }

  return {
    isLoggedIn,
    userInfo,
    login,
    logout
  }
})