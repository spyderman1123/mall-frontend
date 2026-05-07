<template>
  <div class="member-page">
    <div class="w py-8">
      <div class="flex gap-8">
        <aside class="w-48 flex-shrink-0">
          <div class="bg-white p-4">
            <h3 class="text-lg font-medium mb-4 pb-4 border-b">会员中心</h3>
            <ul class="space-y-2">
              <li>
                <button
                  @click="activeTab = 'profile'"
                  class="w-full text-left px-3 py-2 rounded transition-colors"
                  :class="activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
                >
                  个人信息
                </button>
              </li>
              <li>
                <button
                  @click="activeTab = 'orders'"
                  class="w-full text-left px-3 py-2 rounded transition-colors"
                  :class="activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
                >
                  我的订单
                </button>
              </li>
              <li>
                <button
                  @click="activeTab = 'address'"
                  class="w-full text-left px-3 py-2 rounded transition-colors"
                  :class="activeTab === 'address' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
                >
                  收货地址
                </button>
              </li>
              <li>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-3 py-2 rounded transition-colors text-gray-600 hover:bg-gray-100"
                >
                  退出登录
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main class="flex-1">
          <div v-if="!user" class="bg-white p-16 text-center">
            <p class="text-gray-500 mb-4">请先登录</p>
            <router-link to="/login" class="btn-primary inline-block">去登录</router-link>
          </div>

          <div v-else>
            <div v-if="activeTab === 'profile'" class="bg-white p-8">
              <h2 class="text-xl font-medium mb-8">个人信息</h2>
              <div class="space-y-6">
                <div class="flex items-center">
                  <span class="w-24 text-gray-500">用户名</span>
                  <span>{{ user.username }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-24 text-gray-500">会员等级</span>
                  <span class="text-primary">普通会员</span>
                </div>
                <div class="flex items-center">
                  <span class="w-24 text-gray-500">注册时间</span>
                  <span>{{ registerTime }}</span>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'orders'" class="bg-white p-8">
              <h2 class="text-xl font-medium mb-8">我的订单</h2>
              <div v-if="orders.length === 0" class="text-center py-12">
                <p class="text-gray-500">暂无订单</p>
              </div>
              <div v-else class="space-y-6">
                <div v-for="order in orders" :key="order.id" class="border p-6">
                  <div class="flex items-center justify-between mb-4">
                    <span>订单号: {{ order.id }}</span>
                    <span>{{ order.time }}</span>
                  </div>
                  <div class="space-y-3">
                    <div v-for="item in order.items" :key="item.id" class="flex items-center">
                      <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover">
                      <div class="ml-4 flex-1">
                        <p>{{ item.name }}</p>
                        <p class="text-gray-500">数量: {{ item.quantity }}</p>
                      </div>
                      <span class="text-danger">¥{{ item.price }}</span>
                    </div>
                  </div>
                  <div class="mt-4 pt-4 border-t flex items-center justify-between">
                    <span class="text-gray-500">订单状态: {{ order.status }}</span>
                    <span class="text-lg font-medium text-danger">总计: ¥{{ order.total }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'address'" class="bg-white p-8">
              <h2 class="text-xl font-medium mb-8">收货地址</h2>
              <button @click="showAddAddress = true" class="btn-primary mb-6">添加地址</button>
              <div v-if="addresses.length === 0" class="text-center py-12">
                <p class="text-gray-500">暂无收货地址</p>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div v-for="(addr, index) in addresses" :key="index" class="border p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="font-medium">{{ addr.name }}</span>
                    <span>{{ addr.phone }}</span>
                  </div>
                  <p>{{ addr.address }}</p>
                  <div class="mt-4 flex gap-4">
                    <button @click="setDefault(index)" class="text-sm text-primary">设为默认</button>
                    <button @click="deleteAddress(index)" class="text-sm text-danger">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('profile')
const showAddAddress = ref(false)
const newAddress = ref({ name: '', phone: '', address: '' })

const user = computed(() => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
})

const registerTime = ref('2024-01-01')

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
  }
])

const addresses = ref([
  { name: '张三', phone: '13800138000', address: '北京市朝阳区建国路88号SOHO现代城A座1801' },
  { name: '李四', phone: '13900139000', address: '上海市浦东新区陆家嘴环路1000号恒生银行大厦20层' }
])

onMounted(() => {
  if (!user.value) {
    router.push('/login')
  }
})

const handleLogout = () => {
  localStorage.removeItem('user')
  alert('已退出登录')
  router.push('/')
}

const setDefault = (index) => {
  const addr = addresses.value[index]
  addresses.value.splice(index, 1)
  addresses.value.unshift(addr)
  alert('已设为默认地址')
}

const deleteAddress = (index) => {
  if (confirm('确定删除该地址？')) {
    addresses.value.splice(index, 1)
  }
}

const addAddress = () => {
  if (!newAddress.value.name || !newAddress.value.phone || !newAddress.value.address) {
    alert('请填写完整信息')
    return
  }
  addresses.value.push({ ...newAddress.value })
  newAddress.value = { name: '', phone: '', address: '' }
  showAddAddress.value = false
  alert('地址添加成功')
}
</script>
