<template>
  <header>
    <div class="shortcut">
      <div class="w">
        <ul>
          <li>
            <router-link v-if="!user" to="/login">请先登录</router-link>
            <router-link v-else to="/member" class="text-primary">{{ user.username }}</router-link>
          </li>
          <li class="line"></li>
          <li>
            <router-link v-if="!user" to="/register">免费注册</router-link>
            <router-link v-else to="/member">会员中心</router-link>
          </li>
          <li class="line"></li>
          <li><router-link to="/orders">我的订单</router-link></li>
          <li class="line"></li>
          <li><router-link to="/member">会员中心</router-link></li>
          <li class="line"></li>
          <li><a href="#">帮助中心</a></li>
          <li class="line"></li>
          <li><a href="#">在线客服</a></li>
          <li class="line"></li>
          <li><router-link to="/mobile"><i class="iconfont icon-mobile-phone"></i>手机版</router-link></li>
        </ul>
      </div>
    </div>
    <div class="header w">
      <div class="logo">
        <h1>
          <router-link to="/" title="小兔鲜儿">小兔鲜儿</router-link>
        </h1>
      </div>
      <ul class="nav">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/list?category=居家">居家</router-link></li>
        <li><router-link to="/list?category=美食">美食</router-link></li>
        <li><router-link to="/list?category=服装">服饰</router-link></li>
        <li><router-link to="/list?category=孕婴">母婴</router-link></li>
        <li><router-link to="/list?category=洗护">个护</router-link></li>
        <li><router-link to="/list?category=生鲜">严选</router-link></li>
        <li><router-link to="/list?category=电器">数码</router-link></li>
        <li><router-link to="/list?category=美食">运动</router-link></li>
        <li><router-link to="/list?category=餐厨">杂项</router-link></li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜一搜"
          @keyup.enter="handleSearch"
        />
      </div>
      <router-link to="/cart" class="car">
        <i class="iconfont icon-cart-full"></i>
        <span v-if="cartStore.totalCount > 0" class="badge">{{ cartStore.totalCount }}</span>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const searchQuery = ref('')

const user = computed(() => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/list', query: { search: searchQuery.value } })
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.w {
  width: 1240px;
  margin: 0 auto;
}
@media (max-width: 1240px) {
  .w {
    width: 100%;
    padding: 0 10px;
  }
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
  flex-wrap: wrap;
}
.shortcut li a {
  color: #fff;
}
.shortcut li a:hover {
  color: #5eb69c;
}
.shortcut .line {
  width: 1px;
  height: 12px;
  background-color: #999;
  margin: 0 15px;
}
.shortcut li:first-child a {
  color: #5eb69c;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 132px;
  flex-wrap: wrap;
}
.logo {
  width: 200px;
  height: 88px;
}
.logo h1 {
  width: 100%;
  height: 100%;
}
.logo a {
  display: block;
  width: 100%;
  height: 100%;
  background: url('/images/logo.png') no-repeat;
  text-indent: -999px;
  overflow: hidden;
}
.nav {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
.nav li a {
  display: block;
  height: 40px;
  line-height: 40px;
  color: #333;
}
.nav li a:hover {
  color: #5eb69c;
  border-bottom: 2px solid #5eb69c;
}
.search {
  position: relative;
  width: 150px;
}
.search i {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #999;
}
.search input {
  width: 100%;
  height: 32px;
  border: none;
  border-bottom: 1px solid #ccc;
  padding-left: 20px;
  font-size: 14px;
  background: transparent;
}
.search input::placeholder {
  font-size: 14px;
  color: #999;
}
.car {
  position: relative;
  margin-left: 10px;
}
.car i {
  font-size: 24px;
  color: #333;
}
.car .badge {
  position: absolute;
  top: -8px;
  right: -10px;
  min-width: 18px;
  height: 18px;
  background-color: #e33c3c;
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 18px;
  font-style: normal;
}

@media (max-width: 768px) {
  .shortcut {
    display: none;
  }
  .header {
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 10px;
    gap: 10px;
  }
  .logo {
    width: 150px;
    height: 60px;
    margin: 0 auto;
  }
  .logo a {
    background-size: contain;
    background-position: center;
  }
  .nav {
    display: none;
  }
  .search {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    order: 3;
  }
  .car {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
