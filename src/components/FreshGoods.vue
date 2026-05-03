<template>
  <div class="w fresh">
    <div class="box-hd">
      <h2>{{ title }}<small>{{ subtitle }}</small></h2>
      <a href="#">{{ link }} <span class="iconfont icon-arrow-right-bold"></span></a>
    </div>
    <div class="box-bd">
      <ul>
        <li v-for="product in products" :key="product.id" @click="goDetail(product.id)">
          <a href="javascript:void(0)">
            <img :src="product.image" :alt="product.name">
            <h3 class="title">{{ product.name }}</h3>
            <p class="price"><small>¥</small>{{ product.price }}</p>
            <button class="add-cart" @click.stop="addToCart(product)">加入购物车</button>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '查看全部'
  }
})

const products = ref([
  { id: 1, name: 'KN95级莫兰迪色防护口罩你值得拥有', price: 79, image: '/src/assets/uploads/goods1.png' },
  { id: 2, name: '紫米全自动保温杯便携式杯子', price: 59, image: '/src/assets/uploads/goods2.png' },
  { id: 3, name: '大容量多功能收纳箱整理箱', price: 129, image: '/src/assets/uploads/goods3.png' },
  { id: 4, name: '智能颈椎按摩仪颈部按摩器', price: 299, image: '/src/assets/uploads/goods4.png' }
])

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}

const addToCart = (product) => {
  cartStore.addItem(product)
  alert(`已添加 ${product.name} 到购物车`)
}
</script>

<style scoped>
.fresh {
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

.box-hd a {
  font-size: 16px;
  color: #A1A1A1;
}

.box-hd a:hover {
  color: #5EB69C;
}

.box-bd ul {
  display: flex;
  justify-content: space-between;
}

.box-bd ul li {
  width: 304px;
  height: 404px;
  background-color: #EEF9F4;
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
  width: 304px;
  height: 304px;
}

.box-bd ul li .title {
  margin: 18px 0 15px;
  font-size: 20px;
  padding: 0 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.box-bd ul li .price {
  font-size: 22px;
  color: #AA2113;
}

.box-bd ul li .price small {
  font-size: 18px;
}

.box-bd ul li .add-cart {
  display: none;
  width: 100%;
  padding: 10px 0;
  background-color: #5EB69C;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.box-bd ul li:hover .add-cart {
  display: block;
}

.box-bd ul li .add-cart:hover {
  background-color: #4a9f89;
}
</style>