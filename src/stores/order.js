import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([
    {
      id: 'DD20260501001',
      status: 'pending',
      statusText: '待支付',
      createTime: '2026-05-01 10:30:00',
      items: [
        { id: 1, name: 'KN95级莫兰迪色防护口罩', price: 79, quantity: 2, image: '/src/assets/uploads/goods1.png' }
      ],
      totalPrice: 158,
      address: '北京市 朝阳区 某某街道 某某小区 1号楼101'
    },
    {
      id: 'DD20260428002',
      status: 'shipped',
      statusText: '待收货',
      createTime: '2026-04-28 14:20:00',
      items: [
        { id: 2, name: '紫米全自动保温杯', price: 59, quantity: 1, image: '/src/assets/uploads/goods2.png' },
        { id: 3, name: '大容量多功能收纳箱', price: 129, quantity: 1, image: '/src/assets/uploads/goods3.png' }
      ],
      totalPrice: 188,
      address: '北京市 朝阳区 某某街道 某某小区 1号楼101',
      expressNo: 'SF1234567890'
    },
    {
      id: 'DD20260425003',
      status: 'completed',
      statusText: '已完成',
      createTime: '2026-04-25 09:15:00',
      items: [
        { id: 5, name: '新疆阿克苏苹果', price: 39, quantity: 3, image: '/src/assets/uploads/fresh1.png' }
      ],
      totalPrice: 117,
      address: '北京市 朝阳区 某某街道 某某小区 1号楼101'
    }
  ])

  const currentOrder = ref(null)

  const pendingCount = computed(() => {
    return orders.value.filter(o => o.status === 'pending').length
  })

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `DD${new Date().getTime()}`,
      createTime: new Date().toLocaleString(),
      status: 'pending',
      statusText: '待支付'
    }
    orders.value.unshift(newOrder)
    return newOrder
  }

  const payOrder = (orderId) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = 'paid'
      order.statusText = '待发货'
    }
  }

  const cancelOrder = (orderId) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = 'cancelled'
      order.statusText = '已取消'
    }
  }

  const confirmReceive = (orderId) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = 'completed'
      order.statusText = '已完成'
    }
  }

  const getOrderById = (orderId) => {
    return orders.value.find(o => o.id === orderId)
  }

  return {
    orders,
    currentOrder,
    pendingCount,
    addOrder,
    payOrder,
    cancelOrder,
    confirmReceive,
    getOrderById
  }
})