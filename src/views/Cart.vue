<template>
  <div class="cart">
    <div class="w py-8">
      <div class="flex items-center text-sm mb-6">
        <router-link to="/" class="text-gray-500">首页</router-link>
        <span class="mx-2">/</span>
        <span>购物车</span>
      </div>

      <div v-if="cartStore.items.length > 0" class="bg-white">
        <div class="p-6 border-b">
          <h1 class="text-2xl font-medium">我的购物车</h1>
          <p class="text-gray-500 mt-1">共 {{ cartStore.totalCount }} 件商品</p>
        </div>

        <div class="divide-y divide-gray-100">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="p-6 flex items-center"
          >
            <router-link :to="`/detail/${item.id}`" class="w-24 h-24 flex-shrink-0">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
            </router-link>
            <div class="flex-1 ml-6">
              <router-link :to="`/detail/${item.id}`" class="text-lg font-medium hover:text-primary">
                {{ item.name }}
              </router-link>
            </div>
            <div class="price w-32 text-center text-lg">
              <small class="text-gray-500">¥</small>{{ item.price }}
            </div>
            <div class="flex items-center mx-8">
              <button
                @click="handleUpdateQuantity(item, item.quantity - 1)"
                class="w-8 h-8 border flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <input
                :value="item.quantity"
                @change="handleUpdateQuantity(item, Number($event.target.value))"
                type="number"
                min="1"
                class="w-12 h-8 border-t border-b text-center"
              />
              <button
                @click="handleUpdateQuantity(item, item.quantity + 1)"
                class="w-8 h-8 border flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <div class="price w-32 text-center font-medium text-danger">
              <small>¥</small>{{ (item.price * item.quantity).toFixed(2) }}
            </div>
            <button
              @click="handleRemove(item.id)"
              class="w-10 h-10 text-gray-400 hover:text-danger ml-4"
            >
              删除
            </button>
          </div>
        </div>

        <div class="p-6 bg-gray-50 flex items-center justify-between">
          <div class="flex items-center">
            <router-link to="/" class="text-primary hover:underline">继续购物</router-link>
          </div>
          <div class="flex items-center">
            <div class="text-right mr-8">
              <p class="text-gray-500">应付总额</p>
              <p class="price text-3xl text-danger">
                <small class="text-lg">¥</small>{{ cartStore.totalPrice.toFixed(2) }}
              </p>
            </div>
            <router-link to="/checkout" class="btn-danger px-12 py-3 text-lg">去结算</router-link>
          </div>
        </div>
      </div>

      <div v-else class="bg-white p-16 text-center">
        <p class="text-xl text-dark mb-4">购物车是空的</p>
        <p class="text-gray-500 mb-6">快去挑选心仪的商品吧</p>
        <router-link to="/" class="btn-primary inline-block px-8 py-3">去逛逛</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const handleUpdateQuantity = (item, quantity) => {
  if (quantity < 1) return
  cartStore.updateQuantity(item.id, quantity)
}

const handleRemove = (id) => {
  if (confirm('确定要删除该商品吗？')) {
    cartStore.removeItem(id)
  }
}
</script>

<style scoped>
.price {
  font-size: 22px;
  color: #AA2113;
}
.price small {
  font-size: 18px;
}

@media (max-width: 768px) {
  .w {
    width: 100%;
    padding: 0 10px;
  }
  .divide-y > div {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .divide-y img {
    width: 80px;
    height: 80px;
  }
  .p-6 {
    padding: 10px;
  }
  .p-16 {
    padding: 30px 10px;
  }
}
</style>
