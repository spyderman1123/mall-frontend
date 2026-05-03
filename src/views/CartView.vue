<template>
  <div class="cart-page">
    <Header />
    <div class="cart-content w">
      <div class="cart-header">
        <h2>我的购物车</h2>
        <span class="total-count">共 {{ cartStore.totalCount }} 件商品</span>
      </div>

      <div class="cart-table" v-if="cartStore.items.length > 0">
        <div class="table-head">
          <label class="select-all">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
            <span>全选</span>
          </label>
          <span class="col-info">商品信息</span>
          <span class="col-price">单价</span>
          <span class="col-quantity">数量</span>
          <span class="col-subtotal">小计</span>
          <span class="col-action">操作</span>
        </div>

        <div class="table-body">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="cart-item"
            :class="{ selected: selectedItems.includes(item.id) }"
          >
            <label class="item-select">
              <input type="checkbox" v-model="selectedItems" :value="item.id">
            </label>
            <div class="item-info">
              <img :src="item.image" :alt="item.name">
              <div class="info-text">
                <h4>{{ item.name }}</h4>
                <p>七天无理由退换</p>
              </div>
            </div>
            <div class="item-price">¥{{ item.price }}</div>
            <div class="item-quantity">
              <button @click="decrease(item)" :disabled="item.quantity <= 1">-</button>
              <input type="number" v-model.number="item.quantity" @change="updateQty(item)">
              <button @click="increase(item)">+</button>
            </div>
            <div class="item-subtotal">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
            <div class="item-action">
              <button @click="removeItem(item.id)">删除</button>
              <button @click="addToFavorite(item)">收藏</button>
            </div>
          </div>
        </div>

        <div class="cart-footer">
          <div class="footer-left">
            <label class="select-all">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
              <span>全选</span>
            </label>
            <button class="clear-btn" @click="clearSelected">删除选中</button>
            <button class="clear-btn" @click="cartStore.clearCart()">清空购物车</button>
          </div>
          <div class="footer-right">
            <div class="selected-address" @click="showAddressModal = true">
              <span class="address-label">配送至：</span>
              <span class="address-text">{{ addressStore.getAddressString(addressStore.currentAddress) }}</span>
              <span class="change-address">切换地址 ▼</span>
            </div>
            <div class="total-info">
              <p>总计：<span class="total-price">¥{{ totalPrice.toFixed(2) }}</span></p>
              <p class="tip">已节省 ¥0.00</p>
            </div>
            <button class="checkout-btn" @click="checkout" :disabled="selectedItems.length === 0">
              去结算 ({{ selectedItems.length }})
            </button>
          </div>
        </div>
      </div>

      <div class="cart-empty" v-else>
        <div class="empty-icon">🛒</div>
        <h3>购物车是空的</h3>
        <p>快去挑选心仪的商品吧</p>
        <router-link to="/" class="go-shopping">去购物</router-link>
      </div>
    </div>

    <div class="address-modal" v-if="showAddressModal" @click.self="showAddressModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>选择收货地址</h3>
          <button class="close" @click="showAddressModal = false">×</button>
        </div>
        <div class="modal-body">
          <div
            v-for="addr in addressStore.addresses"
            :key="addr.id"
            class="address-item"
            :class="{ active: addr.isDefault }"
            @click="selectAddress(addr)"
          >
            <div class="address-info">
              <div class="address-name">{{ addr.name }} {{ addr.phone }}</div>
              <div class="address-detail">{{ addressStore.getAddressString(addr) }}</div>
            </div>
            <div class="address-action">
              <span v-if="addr.isDefault" class="default-tag">默认地址</span>
              <button v-else class="set-default" @click.stop="addressStore.setDefault(addr.id)">设为默认</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/order'
import { useAddressStore } from '../stores/address'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const addressStore = useAddressStore()

const selectedItems = ref([])
const selectAll = ref(false)
const showAddressModal = ref(false)

const totalPrice = computed(() => {
  return cartStore.items
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = cartStore.items.map(item => item.id)
  } else {
    selectedItems.value = []
  }
}

const decrease = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
  }
}

const increase = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}

const updateQty = (item) => {
  if (item.quantity < 1) {
    cartStore.updateQuantity(item.id, 1)
  }
}

const removeItem = (id) => {
  cartStore.removeItem(id)
  selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
}

const clearSelected = () => {
  selectedItems.value.forEach(id => {
    cartStore.removeItem(id)
  })
  selectedItems.value = []
}

const addToFavorite = (item) => {
  console.log('收藏商品:', item.name)
  alert(`已收藏: ${item.name}`)
}

const selectAddress = (addr) => {
  addressStore.setDefault(addr.id)
  showAddressModal.value = false
}

const checkout = () => {
  if (selectedItems.value.length === 0) {
    alert('请选择要结算的商品')
    return
  }

  const selectedCartItems = cartStore.items.filter(item => selectedItems.value.includes(item.id))
  const currentAddr = addressStore.currentAddress

  const order = orderStore.addOrder({
    items: selectedCartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    })),
    totalPrice: totalPrice.value,
    address: addressStore.getAddressString(currentAddr)
  })

  selectedItems.value.forEach(id => {
    cartStore.removeItem(id)
  })
  selectedItems.value = []

  router.push('/order')
}
</script>

<style scoped>
.cart-page {
  padding-top: 184px;
}

.cart-content {
  padding: 40px 0;
  min-height: 500px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.cart-header h2 {
  font-size: 28px;
}

.total-count {
  color: #999;
  font-size: 14px;
}

.cart-table {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.table-head {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #f5f5f5;
  padding: 0 20px;
  font-size: 14px;
  color: #666;
}

.table-head label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.table-head input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.col-info { flex: 1; margin-left: 20px; }
.col-price { width: 120px; text-align: center; }
.col-quantity { width: 150px; text-align: center; }
.col-subtotal { width: 120px; text-align: center; }
.col-action { width: 120px; text-align: center; }

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.cart-item.selected {
  background-color: #fff9f0;
}

.item-select input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.item-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-info img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.info-text h4 {
  font-size: 16px;
  margin-bottom: 8px;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info-text p {
  font-size: 12px;
  color: #999;
}

.item-price {
  width: 120px;
  text-align: center;
  font-size: 16px;
  color: #333;
}

.item-quantity {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.item-quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  font-size: 16px;
}

.item-quantity button:hover:not(:disabled) {
  border-color: #5EB69C;
  color: #5EB69C;
}

.item-quantity button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.item-quantity input {
  width: 50px;
  height: 30px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
}

.item-subtotal {
  width: 120px;
  text-align: center;
  font-size: 18px;
  color: #AA2113;
  font-weight: bold;
}

.item-action {
  width: 120px;
  text-align: center;
}

.item-action button {
  display: block;
  width: 80px;
  height: 30px;
  margin: 5px auto;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  font-size: 12px;
}

.item-action button:hover {
  border-color: #AA2113;
  color: #AA2113;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-left label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.footer-left input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.clear-btn {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.clear-btn:hover {
  border-color: #AA2113;
  color: #AA2113;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.total-info p {
  font-size: 14px;
  color: #666;
}

.total-price {
  font-size: 24px;
  color: #AA2113;
  font-weight: bold;
}

.tip {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.checkout-btn {
  padding: 12px 40px;
  background-color: #5EB69C;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.checkout-btn:hover:not(:disabled) {
  background-color: #4a9f89;
}

.checkout-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.cart-empty {
  text-align: center;
  padding: 100px 0;
  background-color: #fff;
  border-radius: 8px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.cart-empty h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.cart-empty p {
  color: #999;
  margin-bottom: 30px;
}

.go-shopping {
  display: inline-block;
  padding: 12px 40px;
  background-color: #5EB69C;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
}

.go-shopping:hover {
  background-color: #4a9f89;
}

.selected-address {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.selected-address:hover {
  border-color: #5EB69C;
}

.address-label {
  color: #999;
  font-size: 14px;
}

.address-text {
  color: #333;
  font-size: 14px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.change-address {
  color: #5EB69C;
  font-size: 12px;
}

.address-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.address-modal .modal-content {
  width: 500px;
  max-height: 600px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.address-modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.address-modal .modal-header h3 {
  font-size: 18px;
}

.address-modal .close {
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.address-modal .modal-body {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.address-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 2px solid #eee;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
}

.address-item:hover {
  border-color: #5EB69C;
}

.address-item.active {
  border-color: #5EB69C;
  background-color: #f8faf9;
}

.address-name {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.address-detail {
  font-size: 13px;
  color: #666;
}

.default-tag {
  color: #5EB69C;
  font-size: 12px;
}

.set-default {
  padding: 5px 10px;
  border: 1px solid #5EB69C;
  background: none;
  color: #5EB69C;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.set-default:hover {
  background-color: #5EB69C;
  color: #fff;
}
</style>