<template>
  <div class="orders-page">
    <div class="w py-8">
      <div class="flex items-center text-sm mb-6">
        <router-link to="/" class="text-gray-500">首页</router-link>
        <span class="mx-2">/</span>
        <span>订单中心</span>
      </div>

      <div v-if="!user" class="bg-white p-16 text-center">
        <p class="text-gray-500 mb-4">请先登录</p>
        <router-link to="/login" class="btn-primary inline-block">去登录</router-link>
      </div>

      <div v-else>
        <div class="bg-white p-6 mb-6">
          <div class="flex items-center gap-8">
            <button
              v-for="status in statusFilters"
              :key="status.value"
              @click="currentStatus = status.value"
              class="px-6 py-2 rounded transition-colors"
              :class="currentStatus === status.value ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
            >
              {{ status.label }}
            </button>
          </div>
        </div>

        <div v-if="filteredOrders.length === 0" class="bg-white p-16 text-center">
          <p class="text-gray-500">暂无订单</p>
        </div>

        <div v-else class="space-y-6">
          <div v-for="order in filteredOrders" :key="order.id" class="bg-white p-6">
            <div class="flex items-center justify-between mb-6">
              <span class="text-gray-600">订单号: {{ order.id }}</span>
              <span>{{ order.time }}</span>
            </div>
            
            <div class="divide-y divide-gray-100">
              <div v-for="item in order.items" :key="item.id" class="flex items-center py-4">
                <router-link :to="`/detail/${item.id}`" class="w-20 h-20 flex-shrink-0">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                </router-link>
                <div class="flex-1 ml-4">
                  <router-link :to="`/detail/${item.id}`" class="hover:text-primary">
                    {{ item.name }}
                  </router-link>
                  <div class="mt-2 text-gray-500 text-sm">数量: {{ item.quantity }}</div>
                </div>
                <div class="w-24 text-right">
                  <span class="text-danger">¥{{ item.price }}</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t flex items-center justify-between">
              <span class="text-gray-500">订单状态: <span :class="statusColor(order.status)">{{ order.status }}</span></span>
              <div class="flex items-center">
                <span class="text-gray-500 mr-4">总计:</span>
                <span class="text-xl font-medium text-danger">¥{{ order.total }}</span>
              </div>
            </div>

            <div class="mt-6 flex justify-end gap-4">
              <button v-if="order.status === '待付款'" class="btn-primary">立即支付</button>
              <button v-if="order.status === '待发货'" class="text-gray-600 hover:text-primary">查看物流</button>
              <button v-if="order.status === '待收货'" class="btn-primary">确认收货</button>
              <button v-if="order.status === '已完成'" class="text-gray-600 hover:text-primary">再次购买</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStatus = ref('all')

const statusFilters = [
  { label: '全部', value: 'all' },
  { label: '待付款', value: 'pending' },
  { label: '待发货', value: 'shipped' },
  { label: '待收货', value: 'receiving' },
  { label: '已完成', value: 'completed' }
]

const user = computed(() => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
})

const orders = ref([
  {
    id: 'DD202401010001',
    time: '2024-01-01 12:00',
    status: '已完成',
    total: 128.00,
    items: [
      { id: 1, name: '新鲜苹果', price: 29.9, quantity: 2, image: '/images/product1.jpg' },
      { id: 2, name: '有机蔬菜', price: 19.9, quantity: 3, image: '/images/product2.jpg' }
    ]
  },
  {
    id: 'DD202401150002',
    time: '2024-01-15 15:30',
    status: '待发货',
    total: 68.00,
    items: [
      { id: 3, name: '优质大米', price: 39.9, quantity: 1, image: '/images/product3.jpg' },
      { id: 4, name: '食用油', price: 28.1, quantity: 1, image: '/images/product4.jpg' }
    ]
  },
  {
    id: 'DD202402010003',
    time: '2024-02-01 10:00',
    status: '待付款',
    total: 89.90,
    items: [
      { id: 5, name: '进口牛奶', price: 59.9, quantity: 1, image: '/images/product5.jpg' },
      { id: 6, name: '面包', price: 15.0, quantity: 2, image: '/images/product6.jpg' }
    ]
  },
  {
    id: 'DD202402100004',
    time: '2024-02-10 09:30',
    status: '待收货',
    total: 156.00,
    items: [
      { id: 7, name: '新鲜水果礼盒', price: 128.0, quantity: 1, image: '/images/product7.jpg' },
      { id: 8, name: '坚果礼包', price: 28.0, quantity: 1, image: '/images/product8.jpg' }
    ]
  }
])

onMounted(() => {
  if (!user.value) {
    router.push('/login')
  }
})

const filteredOrders = computed(() => {
  if (currentStatus.value === 'all') {
    return orders.value
  }
  const statusMap = {
    pending: '待付款',
    shipped: '待发货',
    receiving: '待收货',
    completed: '已完成'
  }
  return orders.value.filter(o => o.status === statusMap[currentStatus.value])
})

const statusColor = (status) => {
  const colors = {
    '待付款': 'text-danger',
    '待发货': 'text-primary',
    '待收货': 'text-orange-500',
    '已完成': 'text-gray-500'
  }
  return colors[status] || 'text-gray-500'
}
</script>
