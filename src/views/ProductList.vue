<template>
  <div class="product-list">
    <div class="w py-8">
      <div class="flex items-center text-sm mb-6">
        <router-link to="/" class="text-gray-500">首页</router-link>
        <span class="mx-2">/</span>
        <span>商品列表</span>
      </div>

      <div class="flex gap-8">
        <aside class="w-48 flex-shrink-0">
          <div class="bg-white p-4">
            <h3 class="text-lg font-medium mb-4 pb-4 border-b">分类</h3>
            <ul class="space-y-2">
              <li v-for="cat in productStore.categories" :key="cat">
                <button
                  @click="setCategory(cat)"
                  class="w-full text-left px-3 py-2 rounded transition-colors"
                  :class="currentCategory === cat ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
                >
                  {{ cat }}
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main class="flex-1">
          <div class="bg-white p-4 mb-6 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-gray-600">排序:</span>
              <button
                v-for="sort in sortOptions"
                :key="sort.value"
                @click="currentSort = sort.value"
                class="px-3 py-1 rounded transition-colors text-sm"
                :class="currentSort === sort.value ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
              >
                {{ sort.label }}
              </button>
            </div>
            <div class="text-sm text-gray-500">
              共 {{ filteredProducts.length }} 件商品
            </div>
          </div>

          <div v-if="filteredProducts.length > 0" class="grid grid-cols-4 gap-6">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="bg-white text-center"
            >
              <router-link :to="`/detail/${product.id}`" class="block">
                <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover">
                <h3 class="title mt-4 px-4">{{ product.name }}</h3>
                <p class="price mt-2"><small>¥</small>{{ product.price }}</p>
              </router-link>
            </div>
          </div>
          <div v-else class="bg-white p-16 text-center">
            <p class="text-gray-500">暂无相关商品</p>
            <router-link to="/" class="btn-primary inline-block mt-4">返回首页</router-link>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'

const route = useRoute()
const productStore = useProductStore()

const currentCategory = ref('全部')
const currentSort = ref('default')

const sortOptions = [
  { label: '默认', value: 'default' },
  { label: '价格从低到高', value: 'price-asc' },
  { label: '价格从高到低', value: 'price-desc' }
]

watch(() => route.query.category, (newCat) => {
  currentCategory.value = newCat || '全部'
}, { immediate: true })

const setCategory = (cat) => {
  currentCategory.value = cat
}

const filteredProducts = computed(() => {
  let products = productStore.getProductsByCategory(currentCategory.value)

  if (currentSort.value === 'price-asc') {
    products = [...products].sort((a, b) => a.price - b.price)
  } else if (currentSort.value === 'price-desc') {
    products = [...products].sort((a, b) => b.price - a.price)
  }

  return products
})
</script>

<style scoped>
.title {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}
.price {
  font-size: 22px;
  color: #AA2113;
  padding: 0 25px 20px;
}
.price small {
  font-size: 18px;
}

@media (max-width: 768px) {
  .w {
    width: 100%;
    padding: 0 10px;
  }
  .flex {
    flex-direction: column;
  }
  aside {
    width: 100%;
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
