<template>
  <header class="header">
    <div class="shortcut">
      <div class="w">
        <ul>
          <li v-if="!userStore.isLoggedIn"><router-link to="/login">请先登录</router-link></li>
          <li v-else class="user-menu">
            <div class="avatar" :style="{ backgroundColor: getAvatarColor(userStore.userInfo?.username) }">
              {{ getAvatarLetter(userStore.userInfo?.username) }}
            </div>
            <span class="username">{{ userStore.userInfo?.username }}</span>
            <div class="user-dropdown">
              <router-link to="/cart">我的购物车</router-link>
              <router-link to="/order">我的订单</router-link>
              <a href="#" @click.prevent="handleLogout">退出登录</a>
            </div>
          </li>
          <li class="line" v-if="!userStore.isLoggedIn"></li>
          <li v-if="!userStore.isLoggedIn"><router-link to="/login">免费注册</router-link></li>
          <li class="line"></li>
          <li><router-link to="/order">我的订单</router-link></li>
          <li class="line"></li>
          <li><a href="#">会员中心</a></li>
          <li class="line"></li>
          <li><a href="#">帮助中心</a></li>
          <li class="line"></li>
          <li><a href="#">在线客服</a></li>
          <li class="line"></li>
          <li><a href="#">
            <span class="iconfont icon-mobile-phone"></span> 手机版</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="header-main w">
      <div class="logo">
        <router-link to="/" title="小兔鲜儿">小兔鲜儿</router-link>
      </div>
      <ul class="nav">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/list">生鲜</router-link></li>
        <li><router-link to="/list?category=美食">美食</router-link></li>
        <li><router-link to="/list?category=餐厨">餐厨</router-link></li>
        <li><router-link to="/list?category=电器">电器</router-link></li>
        <li><router-link to="/list?category=居家">居家</router-link></li>
        <li><router-link to="/list?category=洗护">洗护</router-link></li>
        <li><router-link to="/list?category=孕婴">孕婴</router-link></li>
        <li><router-link to="/list?category=服装">服装</router-link></li>
      </ul>
      <div class="search">
        <form @submit.prevent="doSearch">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="搜索商品"
          >
          <button type="submit" class="search-btn">搜索</button>
        </form>
      </div>
      <div class="car" @click="goToCart">
        <div class="cart-icon">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-badge" v-if="cartStore.totalCount > 0">{{ cartStore.totalCount > 99 ? '99+' : cartStore.totalCount }}</span>
        </div>
        <span class="cart-text">购物车</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'
import { products } from '../data/products'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const searchKeyword = ref('')
const showSearchPanel = ref(false)
const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory') || '[]'))
const suggestions = ref([])

const hotKeywords = ['口罩', '苹果', '三文鱼', '保温杯', '乳胶枕头', '不粘锅', 'T恤']

const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    suggestions.value = []
    return
  }
  const keyword = searchKeyword.value.toLowerCase()
  suggestions.value = products
    .filter(p => p.name.toLowerCase().includes(keyword))
    .slice(0, 5)
}

const doSearch = () => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) return

  if (!searchHistory.value.includes(keyword)) {
    searchHistory.value.unshift(keyword)
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  }

  router.push({ path: '/list', query: { search: keyword } })
}

const goToCart = () => {
  router.push('/cart')
}

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}

const avatarColors = [
  '#5EB69C', '#667eea', '#764ba2', '#f093fb', '#f5576c',
  '#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#fa709a'
]

const getAvatarLetter = (username) => {
  if (!username) return '?'
  return username.charAt(0).toUpperCase()
}

const getAvatarColor = (username) => {
  if (!username) return '#ccc'
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}
</script>

<style scoped>
.w {
  width: 1240px;
  margin: 0 auto;
}

.header {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #fff;
}

.shortcut {
  height: 52px;
  background-color: #333;
}

.shortcut ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 52px;
}

.shortcut li a {
  color: #fff;
  font-size: 14px;
}

.shortcut li a:hover {
  color: #5EB69C;
}

.shortcut .line {
  width: 1px;
  height: 12px;
  background-color: #999;
  margin: 0 15px;
}

.shortcut li:first-child a {
  color: #5EB69C;
}

.header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 132px;
}

.header-main > div,
.header-main > ul {
  flex-shrink: 0;
}

.header-main > .search {
  flex: 1;
  max-width: 350px;
  min-width: 250px;
  margin: 0 20px;
}

.logo {
  width: 200px;
  height: 88px;
  display: flex;
  align-items: center;
}

.logo a {
  font-size: 28px;
  font-weight: bold;
  color: #5EB69C;
  letter-spacing: 2px;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav li a {
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}

.nav li a:hover {
  color: #5EB69C;
  border-bottom: 2px solid #5EB69C;
}

.car {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.car:hover {
  background-color: rgba(94, 182, 156, 0.1);
}

.cart-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5EB69C;
}

.cart-icon svg {
  width: 26px;
  height: 26px;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: #AA2113;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-text {
  font-size: 14px;
  color: #333;
}

.car .count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #AA2113;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
}

.user-menu {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-menu .avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
}

.user-menu .username {
  color: #5EB69C;
  font-size: 14px;
}

.user-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.user-menu:hover .user-dropdown {
  display: block;
}

.user-dropdown a {
  display: block;
  padding: 10px 20px;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
}

.user-dropdown a:hover {
  background-color: #f5f5f5;
  color: #5EB69C;
}

.search {
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
}

.search form {
  display: flex;
  align-items: center;
  height: 40px;
  border: 2px solid #5EB69C;
  border-radius: 20px;
  padding: 0 15px;
  background-color: #fff;
}

.search .search-icon {
  font-size: 18px;
  margin-right: 10px;
  opacity: 0.6;
}

.search input {
  flex: 1;
  height: 36px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
}

.search input::placeholder {
  color: #999;
}

.search-btn {
  padding: 6px 20px;
  background-color: #5EB69C;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.search-btn:hover {
  background-color: #4a9f89;
}

@media (max-width: 1024px) {
  .header-main {
    flex-wrap: wrap;
    height: auto;
    padding: 15px 0;
    gap: 15px;
  }

  .nav {
    gap: 24px;
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .search {
    max-width: 250px;
  }
}

@media (max-width: 768px) {
  .shortcut {
    display: none;
  }

  .header-main {
    flex-direction: column;
    height: auto;
    padding: 10px 0;
  }

  .logo {
    width: 150px;
    height: 66px;
  }

  .nav {
    display: none;
  }

  .search {
    width: 100%;
    max-width: none;
    margin: 10px 0;
  }

  .header {
    position: relative;
  }
}
</style>