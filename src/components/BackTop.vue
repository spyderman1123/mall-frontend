<template>
  <div class="back" v-show="showBack" @click="backTop">
    <a href="#">返回顶部</a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showBack = ref(false)

const handleScroll = () => {
  showBack.value = window.scrollY > 200
}

const backTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back {
  position: fixed;
  right: 0;
  bottom: 100px;
  width: 40px;
  height: 40px;
  background-color: #5EB69C;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.back a {
  color: #fff;
  font-size: 14px;
}

.back:hover {
  background-color: #4a9f89;
}
</style>