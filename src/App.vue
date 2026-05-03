<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import './assets/css/iconfont.css'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font: 16px/1 "Microsoft YaHei",
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  color: #333;
}

ul,
ol {
  list-style: none;
}

em,
i {
  font-style: normal;
}

a {
  text-decoration: none;
  color: #333;
}

img {
  vertical-align: middle;
}

input {
  border: none;
  outline: none;
  color: #333;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400;
}

.w {
  width: 1240px;
  margin: 0 auto;
}

@media (max-width: 1240px) {
  .w {
    width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .w {
    width: 100%;
    padding: 0 15px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>