<template>
  <div class="checkout">
    <div class="w py-8">
      <div class="flex items-center text-sm mb-6">
        <router-link to="/" class="text-gray-500">首页</router-link>
        <span class="mx-2">/</span>
        <router-link to="/cart" class="text-gray-500">购物车</router-link>
        <span class="mx-2">/</span>
        <span>填写订单</span>
      </div>

      <div class="flex gap-8">
        <main class="flex-1">
          <div class="bg-white p-6 mb-6">
            <h2 class="text-xl font-medium mb-6 pb-4 border-b">收货地址</h2>
            <div v-if="addresses.length > 0" class="space-y-4">
              <div
                v-for="(addr, index) in addresses"
                :key="index"
                class="p-4 border rounded cursor-pointer transition-all"
                :class="selectedAddress === index ? 'border-primary bg-green-50' : 'border-gray-200'"
                @click="selectedAddress = index"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium">{{ addr.name }}</span>
                  <span class="text-gray-500">{{ addr.phone }}</span>
                </div>
                <p class="text-gray-600">{{ addr.address }}</p>
                <div v-if="addr.isDefault" class="mt-2 text-sm text-primary">默认地址</div>
              </div>
            </div>
            <button @click="showAddAddress = true" class="mt-4 text-primary hover:underline">+ 添加新地址</button>
          </div>

          <div class="bg-white p-6">
            <h2 class="text-xl font-medium mb-6 pb-4 border-b">商品清单</h2>
            <div class="divide-y divide-gray-100">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="py-4 flex items-center"
              >
                <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover">
                <div class="flex-1 ml-4">
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-gray-500 text-sm mt-1">数量: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="text-danger font-medium">¥{{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside class="w-80 flex-shrink-0">
          <div class="bg-white p-6 sticky top-4">
            <h3 class="text-lg font-medium mb-6">订单信息</h3>
            <div class="space-y-4 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">商品件数</span>
                <span>{{ cartStore.totalCount }} 件</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">商品总价</span>
                <span>¥{{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">运费</span>
                <span>¥0.00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">优惠</span>
                <span class="text-success">-¥0.00</span>
              </div>
              <div class="border-t pt-4 mt-4">
                <div class="flex justify-between items-center">
                  <span class="text-lg font-medium">应付总额</span>
                  <span class="text-2xl font-bold text-danger">¥{{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
              </div>
            </div>
            <button
              @click="handleSubmitOrder"
              class="w-full btn-primary py-3 text-lg mt-6"
            >
              提交订单
            </button>
          </div>
        </aside>
      </div>
    </div>

    <div v-if="showAddAddress" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="showAddAddress = false">
      <div class="bg-white p-8 w-96">
        <h3 class="text-xl font-medium mb-6">添加收货地址</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600 mb-2">收货人</label>
            <input v-model="newAddress.name" type="text" placeholder="请输入姓名" class="w-full h-12 border px-4">
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-2">手机号</label>
            <input v-model="newAddress.phone" type="tel" placeholder="请输入手机号" class="w-full h-12 border px-4">
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-2">地址</label>
            <textarea v-model="newAddress.address" placeholder="请输入详细地址" class="w-full h-24 border px-4"></textarea>
          </div>
        </div>
        <div class="mt-6 flex gap-4">
          <button @click="addAddress" class="flex-1 btn-primary">确认添加</button>
          <button @click="showAddAddress = false" class="flex-1 h-12 border">取消</button>
        </div>
      </div>
    </div>

    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 w-96 text-center">
        <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-3xl">✓</span>
        </div>
        <h3 class="text-xl font-medium mb-2">订单提交成功</h3>
        <p class="text-gray-500 mb-6">订单号: {{ orderId }}</p>
        <router-link to="/orders" class="btn-primary inline-block">查看订单</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const selectedAddress = ref(0)
const showAddAddress = ref(false)
const showSuccess = ref(false)
const orderId = ref('')

const newAddress = ref({
  name: '',
  phone: '',
  address: ''
})

const addresses = ref([
  {
    name: '张三',
    phone: '13800138000',
    address: '北京市朝阳区建国路88号SOHO现代城A座1801',
    isDefault: true
  },
  {
    name: '李四',
    phone: '13900139000',
    address: '上海市浦东新区陆家嘴环路1000号恒生银行大厦20层',
    isDefault: false
  }
])

const addAddress = () => {
  if (!newAddress.value.name || !newAddress.value.phone || !newAddress.value.address) {
    alert('请填写完整信息')
    return
  }
  addresses.value.push({ ...newAddress.value, isDefault: false })
  newAddress.value = { name: '', phone: '', address: '' }
  showAddAddress.value = false
}

const handleSubmitOrder = () => {
  if (cartStore.items.length === 0) {
    alert('购物车为空')
    return
  }

  const now = new Date()
  orderId.value = `DD${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getTime()).slice(-8)}`

  cartStore.clearCart()
  showSuccess.value = true
}
</script>

<style scoped>
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
  .sticky {
    position: static;
  }
}
</style>
