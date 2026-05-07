<template>
  <div class="login-page">
    <div class="w py-16">
      <div class="login-box bg-white p-12 w-96 mx-auto">
        <h1 class="text-2xl font-medium text-center mb-8">登录</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-2">用户名</label>
            <input
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              class="w-full h-12 border px-4"
            />
          </div>
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-2">密码</label>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              class="w-full h-12 border px-4"
            />
          </div>
          <div class="flex items-center justify-between mb-8 text-sm">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" />
              <span>记住我</span>
            </label>
            <a href="#" class="text-primary hover:underline">忘记密码</a>
          </div>
          <button
            type="submit"
            class="w-full h-12 bg-primary text-white font-medium text-lg"
          >
            登录
          </button>
        </form>
        <div class="mt-6 text-center">
          <span class="text-gray-500">还没有账号？</span>
          <router-link to="/register" class="text-primary ml-2 hover:underline">立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (!username.value.trim()) {
    alert('请输入用户名')
    return
  }
  if (!password.value.trim()) {
    alert('请输入密码')
    return
  }
  localStorage.setItem('user', JSON.stringify({ username: username.value }))
  alert('登录成功')
  router.push('/')
}
</script>

<style scoped>
.login-box {
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
</style>
