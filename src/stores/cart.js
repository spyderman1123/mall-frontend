import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([
    { id: 1, name: 'KN95级莫兰迪色防护口罩', price: 79, quantity: 2, image: '/src/assets/uploads/goods1.png' },
    { id: 2, name: '紫米全自动保温杯', price: 59, quantity: 1, image: '/src/assets/uploads/goods2.png' },
    { id: 3, name: '大容量多功能收纳箱', price: 129, quantity: 1, image: '/src/assets/uploads/goods3.png' }
  ])

  const totalCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const addItem = (product, qty = 1) => {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += qty
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: product.image
      })
    }
  }

  const removeItem = (id) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (id, quantity) => {
    const item = items.value.find(item => item.id === id)
    if (item) {
      if (quantity <= 0) {
        removeItem(id)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})