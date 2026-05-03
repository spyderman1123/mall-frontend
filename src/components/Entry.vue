<template>
  <div class="entry">
    <div class="w">
      <div class="category" @mouseleave="leaveCategory">
        <ul>
          <li
            v-for="(item, index) in categories"
            :key="index"
            @mouseenter="enterCategory(index)"
            :class="{ active: currentIndex === index }"
          >
            <p>
              <a href="#">{{ item.main }}</a>
              <a href="#">{{ item.sub1 }}</a>
              <a href="#">{{ item.sub2 }}</a>
            </p>
            <span class="iconfont icon-arrow-right-bold"></span>
          </li>
        </ul>
      </div>
      <div class="banner">
        <ul class="banner-list">
          <li v-for="(banner, index) in banners" :key="index" v-show="currentBanner === index">
            <a href="#">
              <img :src="banner" alt="">
            </a>
          </li>
        </ul>
        <ul class="circle">
          <li
            v-for="(_, index) in banners"
            :key="index"
            :class="{ active: currentBanner === index }"
            @click="currentBanner = index"
          ></li>
        </ul>
        <a href="#" class="prev" @click.prevent="prevBanner">
          <span class="iconfont icon-arrow-left-bold"></span>
        </a>
        <a href="#" class="next" @click.prevent="nextBanner">
          <span class="iconfont icon-arrow-right-bold"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const categories = ref([
  { main: '生鲜', sub1: '水果', sub2: '蔬菜' },
  { main: '美食', sub1: '零食', sub2: '糕点' },
  { main: '餐厨', sub1: '锅具', sub2: '餐具' },
  { main: '电器', sub1: '生活电器', sub2: '厨房电器' },
  { main: '居家', sub1: '床品', sub2: '收纳' },
  { main: '洗护', sub1: '面部护理', sub2: '身体护理' },
  { main: '孕婴', sub1: '奶粉', sub2: '玩具' },
  { main: '服装', sub1: '男装', sub2: '女装' },
  { main: '美妆', sub1: '护肤', sub2: '彩妆' },
  { main: '品牌', sub1: '品牌制造', sub2: '' }
])

const currentIndex = ref(-1)
const currentBanner = ref(0)
const banners = ref([
  '/src/assets/uploads/banner1.png',
  '/src/assets/uploads/banner1.png',
  '/src/assets/uploads/banner1.png'
])

let timer = null

const enterCategory = (index) => {
  currentIndex.value = index
}

const leaveCategory = () => {
  currentIndex.value = -1
}

const prevBanner = () => {
  currentBanner.value = currentBanner.value === 0 ? banners.value.length - 1 : currentBanner.value - 1
}

const nextBanner = () => {
  currentBanner.value = (currentBanner.value + 1) % banners.value.length
}

const startAutoPlay = () => {
  timer = setInterval(() => {
    nextBanner()
  }, 3000)
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.entry {
  height: 684px;
  background-color: #f5f5f5;
  margin-top: -184px;
  padding-top: 184px;
}

.entry .w {
  position: relative;
  height: 100%;
}

.category {
  position: absolute;
  top: 184px;
  left: 0;
  z-index: 99;
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.42);
}

.category ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 12px 0 29px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category ul li:hover,
.category ul li.active {
  background-color: #00BE9A;
}

.category ul li a {
  color: #fff;
  font-size: 14px;
}

.category ul li a:first-child {
  font-size: 16px;
  margin-right: 10px;
}

.banner {
  position: relative;
  margin-left: 250px;
  height: 100%;
}

.banner-list {
  height: 100%;
}

.banner-list li {
  position: absolute;
  top: 184px;
  left: 0;
  width: 100%;
  height: 500px;
}

.banner-list li img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.circle {
  display: flex;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.circle li {
  width: 14px;
  height: 14px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  margin: 0 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.circle li:hover,
.circle li.active {
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5);
  background-color: #fff;
}

.next,
.prev {
  position: absolute;
  top: calc(184px + 50%);
  width: 40px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: -30px;
  margin-top: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

.next span,
.prev span {
  color: #fff;
  font-size: 35px;
}
</style>