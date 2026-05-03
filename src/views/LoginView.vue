<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-header">
        <h2>{{ isRegister ? '注册' : '登录' }}</h2>
        <p>{{ isRegister ? '注册新账号' : '欢迎回来' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-item" v-if="isRegister">
          <input
            type="text"
            v-model="form.username"
            placeholder="请输入用户名"
            required
          >
        </div>

        <div class="form-item">
          <input
            type="tel"
            v-model="form.phone"
            placeholder="请输入手机号"
            required
          >
        </div>

        <div class="form-item">
          <input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            required
          >
        </div>

        <div class="form-item" v-if="isRegister">
          <input
            type="password"
            v-model="form.confirmPassword"
            placeholder="请确认密码"
            required
          >
        </div>

        <div class="form-item captcha" v-if="!isRegister">
          <input
            type="text"
            v-model="form.captcha"
            placeholder="请输入验证码"
            required
          >
          <button type="button" class="captcha-btn" @click="sendCaptcha" :disabled="captchaCountdown > 0">
            {{ captchaCountdown > 0 ? `${captchaCountdown}s后重发` : '获取验证码' }}
          </button>
        </div>

        <div class="form-item remember" v-if="!isRegister">
          <label>
            <input type="checkbox" v-model="form.remember">
            <span>记住我</span>
          </label>
          <a href="#" class="forgot">忘记密码？</a>
        </div>

        <button type="submit" class="submit-btn">
          {{ isRegister ? '注册' : '登录' }}
        </button>

        <div class="social-login">
          <p>其他登录方式</p>
          <div class="social-icons">
            <button type="button" @click="socialLogin('wechat')">微信</button>
            <button type="button" @click="socialLogin('qq')">QQ</button>
            <button type="button" @click="socialLogin('weibo')">微博</button>
          </div>
        </div>
      </form>

      <div class="login-footer">
        <span v-if="!isRegister">还没有账号？</span>
        <span v-else>已有账号？</span>
        <a href="#" @click.prevent="isRegister = !isRegister">
          {{ isRegister ? '登录' : '立即注册' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const isRegister = ref(false)
const captchaCountdown = ref(0)

const form = reactive({
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
  captcha: '',
  remember: false
})

const sendCaptcha = () => {
  if (!form.phone) {
    alert('请输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    alert('请输入正确的手机号')
    return
  }
  captchaCountdown.value = 60
  const timer = setInterval(() => {
    captchaCountdown.value--
    if (captchaCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
  alert(`验证码已发送到: ${form.phone}`)
}

const handleSubmit = () => {
  if (isRegister.value) {
    if (!form.username) {
      alert('请输入用户名')
      return
    }
    if (form.password.length < 6) {
      alert('密码长度不能少于6位')
      return
    }
    if (form.password !== form.confirmPassword) {
      alert('两次输入的密码不一致')
      return
    }
    alert('注册成功！')
    isRegister.value = false
  } else {
    if (!form.phone || !form.password) {
      alert('请输入手机号和密码')
      return
    }
    const success = userStore.login(form.username || form.phone, form.password)
    if (success) {
      alert('登录成功！')
      router.push('/')
    } else {
      alert('登录失败，请检查账号密码')
    }
  }
}

const socialLogin = (type) => {
  alert(`正在使用${type}登录...`)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 184px 0 60px;
}

.login-box {
  width: 420px;
  background-color: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.login-header p {
  color: #999;
  font-size: 14px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item input {
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-item input:focus {
  border-color: #5EB69C;
  outline: none;
}

.form-item.captcha {
  display: flex;
  gap: 10px;
}

.form-item.captcha input {
  flex: 1;
}

.captcha-btn {
  width: 120px;
  height: 48px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
}

.captcha-btn:hover:not(:disabled) {
  background-color: #eee;
}

.captcha-btn:disabled {
  color: #999;
  cursor: not-allowed;
}

.form-item.remember {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-item.remember label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.form-item.remember input {
  width: auto;
  height: auto;
}

.forgot {
  color: #5EB69C;
  font-size: 14px;
}

.forgot:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  height: 48px;
  background-color: #5EB69C;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #4a9f89;
}

.social-login {
  margin-top: 30px;
  text-align: center;
}

.social-login p {
  color: #999;
  font-size: 14px;
  margin-bottom: 15px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icons button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  font-size: 12px;
}

.social-icons button:hover {
  background-color: #f5f5f5;
}

.login-footer {
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  color: #666;
}

.login-footer a {
  color: #5EB69C;
  margin-left: 5px;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>