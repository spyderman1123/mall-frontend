<template>
  <div class="list-page">
    <Header />
    <div class="list-banner">
      <img src="/src/assets/uploads/banner1.png" alt="">
    </div>
    <div class="list-content w">
      <div class="filter-bar">
        <div class="filter">
          <div class="filter-box">
            <h3>分类</h3>
            <ul>
              <li :class="{ active: selectedCategory === '' }" @click="selectedCategory = ''">全部</li>
              <li
                v-for="cat in categories"
                :key="cat"
                :class="{ active: selectedCategory === cat }"
                @click="selectedCategory = cat"
              >
                {{ cat }}
              </li>
            </ul>
          </div>
          <div class="filter-box">
            <h3>价格</h3>
            <ul>
              <li :class="{ active: selectedPrice === '' }" @click="selectedPrice = ''">全部</li>
              <li
                v-for="price in priceRanges"
                :key="price.label"
                :class="{ active: selectedPrice === price.label }"
                @click="selectedPrice = price.label"
              >
                {{ price.label }}
              </li>
            </ul>
          </div>
          <div class="filter-box">
            <h3>排序</h3>
            <ul>
              <li
                v-for="sort in sortOptions"
                :key="sort.value"
                :class="{ active: currentSort === sort.value }"
                @click="currentSort = sort.value"
              >
                {{ sort.label }}
              </li>
            </ul>
          </div>
        </div>
        <div class="filter-actions">
          <span class="result-count">共找到 {{ filteredProducts.length }} 件商品</span>
          <button class="clear-filters" v-if="hasActiveFilters" @click="clearFilters">清除筛选</button>
        </div>
      </div>
      <div class="product-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item" @click="goDetail(product.id)">
          <img :src="product.image" :alt="product.name">
          <h3>{{ product.name }}</h3>
          <p class="price"><small>¥</small>{{ product.price }}</p>
          <div class="actions">
            <button @click.stop="addToCart(product)">加入购物车</button>
            <button @click.stop="addToFavorite(product)">收藏</button>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">上一页</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const categories = ['生鲜', '美食', '餐厨', '电器', '居家', '洗护', '孕婴', '服装']
const priceRanges = [
  { label: '0-100', min: 0, max: 100 },
  { label: '100-300', min: 100, max: 300 },
  { label: '300-500', min: 300, max: 500 },
  { label: '500以上', min: 500, max: Infinity }
]
const sortOptions = [
  { label: '默认', value: 'default' },
  { label: '销量', value: 'sales' },
  { label: '价格低到高', value: 'price_asc' },
  { label: '价格高到低', value: 'price_desc' }
]

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPrice = ref('')
const currentSort = ref('default')
const currentPage = ref(1)
const pageSize = 12

const allProducts = ref([
  { id: 1, name: 'KN95级莫兰迪色防护口罩', price: 79, category: '洗护', sales: 520, image: '/src/assets/uploads/goods1.png' },
  { id: 2, name: '紫米全自动保温杯', price: 59, category: '餐厨', sales: 320, image: '/src/assets/uploads/goods2.png' },
  { id: 3, name: '大容量多功能收纳箱', price: 129, category: '居家', sales: 180, image: '/src/assets/uploads/goods3.png' },
  { id: 4, name: '智能颈椎按摩仪', price: 299, category: '电器', sales: 890, image: '/src/assets/uploads/goods4.png' },
  { id: 5, name: '新疆阿克苏苹果', price: 39, category: '生鲜', sales: 1200, image: '/src/assets/uploads/fresh1.png' },
  { id: 6, name: '进口智利车厘子', price: 89, category: '生鲜', sales: 980, image: '/src/assets/uploads/fresh2.png' },
  { id: 7, name: '不粘锅炒锅', price: 199, category: '餐厨', sales: 450, image: '/src/assets/uploads/kitchen1.png' },
  { id: 8, name: '陶瓷餐具套装', price: 159, category: '餐厨', sales: 320, image: '/src/assets/uploads/kitchen2.png' },
  { id: 9, name: '纯棉四件套', price: 299, category: '居家', sales: 560, image: '/src/assets/uploads/home1.png' },
  { id: 10, name: '乳胶枕头', price: 199, category: '居家', sales: 780, image: '/src/assets/uploads/home2.png' },
  { id: 11, name: '女士纯棉T恤', price: 89, category: '服装', sales: 1100, image: '/src/assets/uploads/hot3.png' },
  { id: 12, name: '婴儿纯棉连体衣', price: 79, category: '孕婴', sales: 650, image: '/src/assets/uploads/hot5.png' }
])

const filteredProducts = computed(() => {
  let result = [...allProducts.value]

  if (searchQuery.value) {
    const keyword = searchQuery.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(keyword))
  }

  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  if (selectedPrice.value) {
    const range = priceRanges.find(r => r.label === selectedPrice.value)
    if (range) {
      result = result.filter(p => p.price >= range.min && p.price < range.max)
    }
  }

  switch (currentSort.value) {
    case 'sales':
      result.sort((a, b) => b.sales - a.sales)
      break
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
  }

  const start = (currentPage.value - 1) * pageSize
  return result.slice(start, start + pageSize)
})

const totalPages = computed(() => {
  let total = [...allProducts.value]
  if (searchQuery.value) {
    const keyword = searchQuery.value.toLowerCase()
    total = total.filter(p => p.name.toLowerCase().includes(keyword))
  }
  if (selectedCategory.value) {
    total = total.filter(p => p.category === selectedCategory.value)
  }
  if (selectedPrice.value) {
    const range = priceRanges.find(r => r.label === selectedPrice.value)
    if (range) {
      total = total.filter(p => p.price >= range.min && p.price < range.max)
    }
  }
  return Math.max(1, Math.ceil(total.length / pageSize))
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value || selectedPrice.value || currentSort.value !== 'default'
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPrice.value = ''
  currentSort.value = 'default'
  currentPage.value = 1
}

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}

const addToCart = (product) => {
  cartStore.addItem(product)
  alert('已加入购物车！')
}

const addToFavorite = (product) => {
  console.log('收藏商品', product.name)
}

const initSearch = () => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
}

watch(() => route.query.search, (newSearch) => {
  searchQuery.value = newSearch || ''
  currentPage.value = 1
})

watch(() => route.query.category, (newCategory) => {
  selectedCategory.value = newCategory || ''
  currentPage.value = 1
})

onMounted(() => {
  initSearch()
})
</script>

<style scoped>
.list-page {
  padding-top: 184px;
}

.list-banner img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.list-content {
  padding: 40px 0;
}

.filter {
  display: flex;
  gap: 40px;
}

.filter-bar {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.filter-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
  margin-top: 10px;
}

.result-count {
  font-size: 14px;
  color: #666;
}

.clear-filters {
  padding: 6px 15px;
  border: 1px solid #AA2113;
  background: none;
  color: #AA2113;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.clear-filters:hover {
  background-color: #AA2113;
  color: #fff;
}

.filter-box {
  margin-bottom: 20px;
}

.filter-box h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.filter-box ul {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.filter-box li {
  padding: 8px 20px;
  background-color: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.filter-box li:hover,
.filter-box li.active {
  background-color: #5EB69C;
  color: #fff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.product-item {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
}

.product-item h3 {
  font-size: 16px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-item .price {
  font-size: 20px;
  color: #AA2113;
  margin-bottom: 15px;
}

.product-item .price small {
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.actions button {
  padding: 8px 15px;
  border: 1px solid #5EB69C;
  background-color: #fff;
  color: #5EB69C;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.actions button:hover {
  background-color: #5EB69C;
  color: #fff;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.pagination button {
  padding: 8px 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #5EB69C;
  color: #fff;
  border-color: #5EB69C;
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .list-page {
    padding-top: 0;
  }

  .list-banner img {
    height: 150px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .product-item {
    padding: 10px;
  }

  .product-item img {
    height: 120px;
  }

  .product-item h3 {
    font-size: 12px;
  }

  .product-item .price {
    font-size: 16px;
  }

  .filter-box ul {
    gap: 8px;
  }

  .filter-box li {
    padding: 6px 12px;
    font-size: 12px;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>