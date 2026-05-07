<template>
  <div class="register-page">
    <div class="w py-16">
      <div class="register-box bg-white p-12 w-96 mx-auto">
        <h1 class="text-2xl font-medium text-center mb-8">注册</h1>
        <form @submit.prevent="handleRegister">
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
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-2">确认密码</label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              class="w-full h-12 border px-4"
            />
          </div>
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-2">手机号</label>
            <input
              v-model="phone"
              type="tel"
              placeholder="请输入手机号"
              class="w-full h-12 border px-4"
            />
          </div>
          <div class="flex items-center mb-8 text-sm">
            <input type="checkbox" id="agree" v-model="agree" class="mr-2" />
            <label for="agree">我已阅读并同意</label>
            <a href="#" class="text-primary hover:underline">《用户协议》</a>
          </div>
          <button
            type="submit"
            class="w-full h-12 bg-primary text-white font-medium text-lg"
          >
            注册
          </button>
        </form>
        <div class="mt-6 text-center">
          <span class="text-gray-500">已有账号？</span>
          <router-link to="/login" class="text-primary ml-2 hover:underline">立即登录</router-link>
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
const confirmPassword = ref('')
const phone = ref('')
const agree = ref(false)

const handleRegister = () => {
  if (!username.value.trim()) {
    alert('请输入用户名')
    return
  }
  if (!password.value.trim()) {
    alert('请输入密码')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致')
    return
  }
  if (!phone.value.trim()) {
    alert('请输入手机号')
    return
  }
  if (!agree.value) {
    alert('请同意用户协议')
    return
  }
  localStorage.setItem('user', JSON.stringify({ username: username.value, phone }))
  alert('注册成功')
  router.push('/login')
}
</script>

<style scoped>
.register-box {
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
</style>
