<template>
  <div class="detail-page">
    <Header />
    <div class="detail-content w">
      <div class="detail-main">
        <div class="product-images">
          <div class="main-image">
            <img :src="currentImage" :alt="product.name">
          </div>
          <div class="thumbnails">
            <div
              v-for="(img, index) in product.images"
              :key="index"
              :class="{ active: currentImageIndex === index }"
              @click="currentImageIndex = index"
            >
              <img :src="img" :alt="product.name">
            </div>
          </div>
        </div>

        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <div class="rating">
            <span class="stars">
              <span v-for="i in 5" :key="i" :class="i <= Math.floor(product.rating) ? 'filled' : ''">★</span>
            </span>
            <span class="score">{{ product.rating }}</span>
            <span class="sales">已售 {{ product.sold.toLocaleString() }} 件</span>
          </div>
          <div class="price-section">
            <div class="current-price">
              <span class="symbol">¥</span>
              <span class="amount">{{ product.price }}</span>
            </div>
            <div class="original-price">¥{{ product.originalPrice }}</div>
            <div class="discount">省 ¥{{ product.originalPrice - product.price }}</div>
          </div>
          <div class="features">
            <span v-for="(feature, index) in product.features" :key="index" class="tag">{{ feature }}</span>
          </div>
          <div class="service-promise">
            <span class="promise-item">🚚 七天无理由退换</span>
            <span class="promise-item">📦 真实库存</span>
            <span class="promise-item">💯 品质保障</span>
          </div>
          <div class="stock" v-if="product.stock < 100">
            <span class="low-stock">⚠️ 库存紧张，仅剩 {{ product.stock }} 件</span>
          </div>
          <div class="stock" v-else>
            <span>库存：{{ product.stock }} 件</span>
          </div>
          <div class="quantity">
            <label>数量</label>
            <div class="quantity-control">
              <button @click="decreaseQty" :disabled="quantity <= 1">-</button>
              <input type="number" v-model.number="quantity" @change="validateQty">
              <button @click="increaseQty">+</button>
            </div>
          </div>
          <div class="actions">
            <button class="add-cart" @click="addToCart">加入购物车</button>
            <button class="buy-now" @click="buyNow">立即购买</button>
          </div>
        </div>
      </div>

      <div class="detail-tabs">
        <div class="tabs-header">
          <span
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >{{ tab.name }}</span>
        </div>
        <div class="tabs-content">
          <div v-if="activeTab === 'desc'" class="desc-content">
            <p>{{ product.description }}</p>
            <h3>商品特点</h3>
            <ul>
              <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
            </ul>
          </div>
          <div v-if="activeTab === 'spec'" class="spec-content">
            <table>
              <tr>
                <td>商品编号</td>
                <td>SP{{ product.id.toString().padStart(6, '0') }}</td>
              </tr>
              <tr>
                <td>商品分类</td>
                <td>{{ product.category }} > {{ product.subcategory }}</td>
              </tr>
              <tr>
                <td>库存数量</td>
                <td>{{ product.stock }} 件</td>
              </tr>
              <tr>
                <td>月销量</td>
                <td>{{ product.sales }} 件</td>
              </tr>
            </table>
          </div>
          <div v-if="activeTab === 'review'" class="review-content">
            <div class="review-header">
              <span>用户评价 (128)</span>
              <span class="rating">好评率 98%</span>
            </div>
            <div class="review-list">
              <div v-for="review in reviews" :key="review.id" class="review-item">
                <div class="review-user">{{ review.user }}</div>
                <div class="review-stars">
                  <span v-for="i in 5" :key="i" :class="i <= review.rating ? 'filled' : ''">★</span>
                </div>
                <p class="review-content">{{ review.content }}</p>
                <span class="review-date">{{ review.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="related-products">
        <h3>相关商品推荐</h3>
        <div class="related-list">
          <div
            v-for="item in relatedProducts"
            :key="item.id"
            class="related-item"
            @click="goDetail(item.id)"
          >
            <img :src="item.image" :alt="item.name">
            <h4>{{ item.name }}</h4>
            <p class="price">¥{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { products } from '../data/products'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(products[0])
const currentImageIndex = ref(0)
const quantity = ref(1)
const activeTab = ref('desc')

const tabs = [
  { id: 'desc', name: '商品描述' },
  { id: 'spec', name: '规格参数' },
  { id: 'review', name: '用户评价' }
]

const reviews = [
  { id: 1, user: '***花', rating: 5, content: '商品质量很好，非常满意！', date: '2026-04-28' },
  { id: 2, user: '***明', rating: 5, content: '物流很快，包装精美，值得购买。', date: '2026-04-25' },
  { id: 3, user: '***丽', rating: 4, content: '整体不错，性价比很高。', date: '2026-04-20' },
  { id: 4, user: '***军', rating: 5, content: '已经是第三次购买了，品质一如既往的好！', date: '2026-04-18' },
  { id: 5, user: '***红', rating: 5, content: '送给朋友的礼物，包装很高档，朋友很喜欢。', date: '2026-04-15' }
]

const currentImage = computed(() => product.value.images[currentImageIndex.value])

const relatedProducts = computed(() => {
  return products.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 4)
})

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQty = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++
  }
}

const validateQty = () => {
  if (quantity.value < 1) quantity.value = 1
  if (quantity.value > product.value.stock) quantity.value = product.value.stock
}

const addToCart = () => {
  cartStore.addItem(product.value, quantity.value)
  alert(`已添加 ${quantity.value} 件 ${product.value.name} 到购物车`)
}

const buyNow = () => {
  cartStore.addItem(product.value, quantity.value)
  router.push('/cart')
}

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}

onMounted(() => {
  const id = parseInt(route.params.id) || 1
  const found = products.find(p => p.id === id)
  if (found) {
    product.value = found
  }
})
</script>

<style scoped>
.detail-page {
  padding-top: 184px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.detail-content {
  padding: 40px 0;
}

.detail-main {
  display: flex;
  gap: 40px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.product-images {
  width: 480px;
}

.main-image {
  width: 100%;
  height: 480px;
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 10px;
}

.thumbnails div {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}

.thumbnails div.active {
  border-color: #5EB69C;
}

.thumbnails img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
}

.product-info h1 {
  font-size: 28px;
  margin-bottom: 20px;
  line-height: 1.4;
}

.rating {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.stars {
  font-size: 20px;
  color: #ddd;
}

.stars .filled {
  color: #FFD700;
}

.score {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.sales {
  color: #999;
  font-size: 14px;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 15px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff9f0;
  border-radius: 8px;
}

.current-price {
  display: flex;
  align-items: baseline;
}

.current-price .symbol {
  font-size: 24px;
  color: #AA2113;
}

.current-price .amount {
  font-size: 48px;
  color: #AA2113;
  font-weight: bold;
}

.original-price {
  font-size: 18px;
  color: #999;
  text-decoration: line-through;
}

.discount {
  font-size: 14px;
  color: #AA2113;
  background-color: #ffe5e5;
  padding: 4px 8px;
  border-radius: 4px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.features .tag {
  padding: 6px 12px;
  background-color: #EEF9F4;
  color: #5EB69C;
  font-size: 12px;
  border-radius: 4px;
}

.service-promise {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.service-promise .promise-item {
  font-size: 13px;
  color: #666;
}

.stock {
  margin-bottom: 20px;
  color: #666;
}

.stock .low-stock {
  color: #AA2113;
  font-weight: bold;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.quantity label {
  font-size: 16px;
  color: #333;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.quantity-control button {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  font-size: 18px;
}

.quantity-control button:hover:not(:disabled) {
  background-color: #f5f5f5;
}

.quantity-control button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-control input {
  width: 60px;
  height: 40px;
  text-align: center;
  border: none;
  outline: none;
}

.actions {
  display: flex;
  gap: 20px;
}

.add-cart, .buy-now {
  flex: 1;
  height: 50px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.add-cart {
  background-color: #FFD700;
  color: #333;
}

.add-cart:hover {
  background-color: #ffc700;
}

.buy-now {
  background-color: #5EB69C;
  color: #fff;
}

.buy-now:hover {
  background-color: #4a9f89;
}

.detail-tabs {
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 30px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid #f5f5f5;
}

.tabs-header span {
  padding: 20px 40px;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  border-bottom: 2px solid transparent;
}

.tabs-header span.active {
  color: #5EB69C;
  border-bottom-color: #5EB69C;
}

.tabs-content {
  padding: 30px;
}

.desc-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 20px;
}

.desc-content h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.desc-content ul {
  padding-left: 20px;
}

.desc-content li {
  list-style: disc;
  margin-bottom: 10px;
  color: #666;
}

.spec-content table {
  width: 100%;
  border-collapse: collapse;
}

.spec-content td {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.spec-content td:first-child {
  width: 150px;
  color: #999;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.review-header .rating {
  color: #5EB69C;
  font-weight: bold;
}

.review-list {
  border-top: 1px solid #eee;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.review-user {
  font-weight: bold;
  margin-bottom: 10px;
}

.review-stars {
  font-size: 16px;
  color: #ddd;
  margin-bottom: 10px;
}

.review-stars .filled {
  color: #FFD700;
}

.review-content {
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}

.review-date {
  color: #999;
  font-size: 14px;
}

.related-products {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
}

.related-products h3 {
  font-size: 20px;
  margin-bottom: 20px;
}

.related-list {
  display: flex;
  justify-content: space-between;
}

.related-item {
  width: 280px;
  cursor: pointer;
  transition: transform 0.3s;
}

.related-item:hover {
  transform: translateY(-5px);
}

.related-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.related-item h4 {
  font-size: 14px;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.related-item .price {
  font-size: 18px;
  color: #AA2113;
  font-weight: bold;
}
</style>