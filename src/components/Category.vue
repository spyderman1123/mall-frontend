<template>
  <div class="category-module w">
    <div class="head">
      <h2>{{ title }}</h2>
      <ul class="tab-list">
        <li v-for="(tab, index) in tabs" :key="index" :class="{ active: currentTab === index }" @click="currentTab = index">
          {{ tab }}
        </li>
      </ul>
      <a href="#" class="more">查看更多 <span class="iconfont icon-arrow-right-bold"></span></a>
    </div>
    <div class="content">
      <div class="left">
        <a href="#">
          <img :src="leftImage" :alt="title">
        </a>
      </div>
      <div class="right">
        <ul class="product-list">
          <li v-for="(product, index) in displayProducts" :key="index" @click="goDetail(product.id)">
            <a href="#">
              <img :src="product.image" :alt="product.name">
              <h3>{{ product.name }}</h3>
              <p class="price"><small>¥</small>{{ product.price }}</p>
              <span class="tag" v-if="product.tag">{{ product.tag }}</span>
            </a>
            <button class="add-btn" @click="addToCart(product, $event)">加入购物车</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
const cartStore = useCartStore()

const tabs = ref(['热门', '当季热卖', '新品上市'])
const currentTab = ref(0)

const leftImageMap = {
  '生鲜': '/src/assets/uploads/fresh_left.png',
  '美食': '/src/assets/uploads/fresh_left.png',
  '餐厨': '/src/assets/uploads/kitchen_left.png',
  '居家': '/src/assets/uploads/home_left.png'
}

const leftImage = computed(() => leftImageMap[props.title] || '/src/assets/uploads/fresh_left.png')

const displayProducts = computed(() => props.products.slice(0, 8))

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}

const addToCart = (product, e) => {
  e.stopPropagation()
  e.preventDefault()
  cartStore.addItem(product)
  alert(`已添加 ${product.name} 到购物车`)
}
</script>

<style scoped>
.category-module {
  margin-bottom: 60px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 102px;
}

.head h2 {
  font-size: 28px;
}

.tab-list {
  display: flex;
  gap: 30px;
}

.tab-list li {
  font-size: 16px;
  color: #999;
  cursor: pointer;
  padding: 5px 0;
  border-bottom: 2px solid transparent;
}

.tab-list li:hover,
.tab-list li.active {
  color: #5EB69C;
  border-bottom-color: #5EB69C;
}

.more {
  font-size: 16px;
  color: #999;
}

.more:hover {
  color: #5EB69C;
}

.content {
  display: flex;
  gap: 10px;
}

.left {
  width: 240px;
  height: 610px;
}

.left a {
  display: block;
  width: 100%;
  height: 100%;
}

.left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  flex: 1;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.product-list li {
  width: 240px;
  height: 300px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-list li:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-list li:hover .add-btn {
  display: block;
}

.product-list li a {
  display: block;
  height: 100%;
}

.product-list li img {
  width: 240px;
  height: 240px;
}

.product-list li h3 {
  margin: 10px 0 8px;
  font-size: 16px;
  padding: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-list li .price {
  font-size: 18px;
  color: #AA2113;
}

.product-list li .price small {
  font-size: 14px;
}

.tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #AA2113;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
}

.add-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
  background-color: #5EB69C;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  display: none;
}

.add-btn:hover {
  background-color: #4a9f89;
}
</style>