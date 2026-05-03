<template>
  <div class="home">
    <Header />
    <BackTop />
    <Entry />
    <FreshGoods title="新鲜好物" subtitle="新鲜出炉 品质靠谱" link="查看全部" />
    <HotRecommend />
    <Category title="生鲜" :products="freshProducts" />
    <Category title="美食" :products="foodProducts" />
    <Category title="餐厨" :products="kitchenProducts" />
    <Category title="居家" :products="homeProducts" />
    <TopicRecommend />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import BackTop from '../components/BackTop.vue'
import Entry from '../components/Entry.vue'
import FreshGoods from '../components/FreshGoods.vue'
import HotRecommend from '../components/HotRecommend.vue'
import Category from '../components/Category.vue'
import TopicRecommend from '../components/TopicRecommend.vue'

const freshProducts = ref([
  { id: 1, name: 'KN95级莫兰迪色防护口罩', price: 79, image: '/src/assets/uploads/goods1.png' },
  { id: 2, name: '紫米全自动保温杯', price: 59, image: '/src/assets/uploads/goods2.png' },
  { id: 3, name: '大容量多功能收纳箱', price: 129, image: '/src/assets/uploads/goods3.png' },
  { id: 4, name: '智能颈椎按摩仪', price: 299, image: '/src/assets/uploads/goods4.png' }
])

const foodProducts = ref([
  { id: 1, name: '新疆阿克苏苹果', price: 39, image: '/src/assets/uploads/fresh1.png' },
  { id: 2, name: '进口智利车厘子', price: 89, image: '/src/assets/uploads/fresh2.png' },
  { id: 3, name: '有机西兰花', price: 19, image: '/src/assets/uploads/fresh3.png' },
  { id: 4, name: '新鲜三文鱼', price: 99, image: '/src/assets/uploads/fresh4.png' }
])

const kitchenProducts = ref([
  { id: 1, name: '不粘锅炒锅', price: 199, image: '/src/assets/uploads/kitchen1.png' },
  { id: 2, name: '陶瓷餐具套装', price: 159, image: '/src/assets/uploads/kitchen2.png' },
  { id: 3, name: '多功能料理机', price: 399, image: '/src/assets/uploads/kitchen3.png' },
  { id: 4, name: '玻璃保鲜盒套装', price: 89, image: '/src/assets/uploads/kitchen4.png' }
])

const homeProducts = ref([
  { id: 1, name: '纯棉四件套', price: 299, image: '/src/assets/uploads/home1.png' },
  { id: 2, name: '乳胶枕头', price: 199, image: '/src/assets/uploads/home2.png' },
  { id: 3, name: '智能扫地机器人', price: 999, image: '/src/assets/uploads/home3.png' },
  { id: 4, name: '空气净化器', price: 599, image: '/src/assets/uploads/home4.png' }
])
</script>

<style scoped>
.home {
  background-color: #f5f5f5;
  padding-top: 184px;
}
</style>