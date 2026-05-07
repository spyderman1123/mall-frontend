<template>
  <div class="product-detail">
    <div class="w py-8">
      <div v-if="product" class="bg-white p-8">
        <div class="flex gap-12">
          <div class="w-96 flex-shrink-0">
            <img :src="product.image" :alt="product.name" class="w-full">
          </div>
          <div class="flex-1">
            <h1 class="text-2xl font-medium text-dark mb-4">{{ product.name }}</h1>
            <p class="text-gray-500 mb-6">{{ product.description }}</p>
            <div class="bg-gray-50 p-6 mb-6">
              <p class="text-gray-500 mb-2">价格</p>
              <p class="text-danger text-4xl font-medium">
                <small class="text-2xl">¥</small>{{ product.price }}
              </p>
            </div>
            <div class="flex items-center gap-6 mb-8">
              <div class="flex items-center">
                <span>数量:</span>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  class="w-16 h-10 border text-center ml-2"
                />
              </div>
            </div>
            <div class="flex gap-4">
              <button @click="handleAddToCart" class="btn-primary px-8 py-3 text-lg">加入购物车</button>
              <button @click="handleBuyNow" class="btn-danger px-8 py-3 text-lg">立即购买</button>
            </div>
          </div>
        </div>

        <section class="mt-16 pt-12 border-t">
          <h2 class="text-xl font-medium mb-8">商品推荐</h2>
          <div class="grid grid-cols-4 gap-6">
            <div v-for="p in relatedProducts" :key="p.id" class="text-center">
              <router-link :to="`/detail/${p.id}`" class="block">
                <img :src="p.image" :alt="p.name" class="w-full h-64 object-cover">
                <h3 class="title mt-4">{{ p.name }}</h3>
                <p class="price mt-2"><small>¥</small>{{ p.price }}</p>
              </router-link>
            </div>
          </div>
        </section>
      </div>
      <div v-else class="bg-white p-16 text-center">
        <p class="text-gray-500 mb-4">商品不存在</p>
        <router-link to="/" class="btn-primary inline-block">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const quantity = ref(1)

const product = computed(() => productStore.getProductById(route.params.id))

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products.filter(p => p.id !== product.value.id).slice(0, 4)
})

const handleAddToCart = () => {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addItem(product.value)
    }
    alert(`已添加 ${quantity.value} 件商品到购物车`)
  }
}

const handleBuyNow = () => {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addItem(product.value)
    }
    router.push('/cart')
  }
}
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
}
.price small {
  font-size: 18px;
}
</style>
