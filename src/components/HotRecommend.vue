<template>
  <div class="w hot">
    <div class="box-hd">
      <h2>人气推荐<small>热门榜单 畅销好物</small></h2>
    </div>
    <div class="box-bd">
      <ul>
        <li v-for="product in products" :key="product.id">
          <a href="#">
            <img :src="product.image" :alt="product.name">
            <h3 class="title">{{ product.name }}</h3>
            <p class="price"><small>¥</small>{{ product.price }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: '家用多功能电火锅', price: 199, image: '/src/assets/uploads/hot1.png' },
  { id: 2, name: '无线蓝牙耳机', price: 299, image: '/src/assets/uploads/hot2.png' },
  { id: 3, name: '女士纯棉T恤', price: 89, image: '/src/assets/uploads/hot3.png' },
  { id: 4, name: '智能手环运动手表', price: 199, image: '/src/assets/uploads/hot4.png' },
  { id: 5, name: '婴儿纯棉连体衣', price: 79, image: '/src/assets/uploads/hot5.png' }
])
</script>

<style scoped>
.hot {
  margin-bottom: 60px;
}

.box-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 112px;
}

.box-hd h2 {
  font-size: 30px;
}

.box-hd h2 small {
  font-size: 16px;
  color: #A1A1A1;
  margin-left: 30px;
}

.box-bd ul {
  display: flex;
  justify-content: space-between;
}

.box-bd ul li {
  width: 240px;
  height: 320px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.box-bd ul li:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.box-bd ul li a {
  display: block;
  height: 100%;
}

.box-bd ul li img {
  width: 240px;
  height: 240px;
}

.box-bd ul li .title {
  margin: 15px 0 10px;
  font-size: 16px;
  padding: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.box-bd ul li .price {
  font-size: 18px;
  color: #AA2113;
}

.box-bd ul li .price small {
  font-size: 14px;
}
</style>