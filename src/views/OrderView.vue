<template>
  <div class="order-page">
    <Header />
    <div class="order-content w">
      <div class="order-header">
        <h2>我的订单</h2>
        <div class="tabs">
          <span
            v-for="tab in tabs"
            :key="tab.value"
            :class="{ active: activeTab === tab.value }"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
            <span class="count" v-if="tab.value === 'pending' && orderStore.pendingCount > 0">
              {{ orderStore.pendingCount }}
            </span>
          </span>
        </div>
      </div>

      <div class="order-list" v-if="filteredOrders.length > 0">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="order-item"
        >
          <div class="order-top">
            <div class="order-info">
              <span class="order-id">订单号: {{ order.id }}</span>
              <span class="order-time">{{ order.createTime }}</span>
            </div>
            <div class="order-status" :class="order.status">
              {{ order.statusText }}
            </div>
          </div>

          <div class="order-products">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="product-item"
              @click="goDetail(item.id)"
            >
              <img :src="item.image" :alt="item.name">
              <div class="product-info">
                <h4>{{ item.name }}</h4>
                <p>¥{{ item.price }} × {{ item.quantity }}</p>
              </div>
            </div>
          </div>

          <div class="order-bottom">
            <div class="order-address">
              <span class="iconfont icon-location"></span>
              {{ order.address }}
            </div>
            <div class="order-total">
              共{{ order.items.length }}件商品，总计: <span>¥{{ order.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="order-actions">
              <template v-if="order.status === 'pending'">
                <button class="btn-pay" @click="handlePay(order)">立即支付</button>
                <button class="btn-cancel" @click="handleCancel(order.id)">取消订单</button>
              </template>
              <template v-else-if="order.status === 'shipped'">
                <button class="btn-receive" @click="handleReceive(order.id)">确认收货</button>
                <button class="btn-logistics" @click="showLogistics(order)">查看物流</button>
              </template>
              <template v-else-if="order.status === 'paid'">
                <span class="status-tip">待发货</span>
              </template>
              <template v-else-if="order.status === 'completed'">
                <button class="btn-again" @click="reorder(order)">再次购买</button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="order-empty" v-else>
        <div class="empty-icon">📦</div>
        <h3>暂无相关订单</h3>
        <p>快去选购心仪的商品吧</p>
        <router-link to="/" class="go-shopping">去购物</router-link>
      </div>
    </div>

    <div class="logistics-modal" v-if="showLogisticsModal" @click.self="showLogisticsModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>物流信息</h3>
          <button class="close" @click="showLogisticsModal = false">×</button>
        </div>
        <div class="modal-body">
          <p class="express-no">运单号: {{ currentExpressNo }}</p>
          <div class="logistics-steps">
            <div class="step completed">
              <div class="step-dot"></div>
              <div class="step-info">
                <p>商品已发出</p>
                <span>2026-04-29 10:30:00</span>
              </div>
            </div>
            <div class="step completed">
              <div class="step-dot"></div>
              <div class="step-info">
                <p>商品运输中</p>
                <span>2026-04-30 08:15:00</span>
              </div>
            </div>
            <div class="step">
              <div class="step-dot"></div>
              <div class="step-info">
                <p>派送中</p>
                <span>预计今天送达</span>
              </div>
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
import { useOrderStore } from '../stores/order'

const router = useRouter()
const orderStore = useOrderStore()

const activeTab = ref('all')
const showLogisticsModal = ref(false)
const currentExpressNo = ref('')

const tabs = [
  { label: '全部', value: 'all' },
  { label: '待支付', value: 'pending' },
  { label: '待发货', value: 'paid' },
  { label: '待收货', value: 'shipped' },
  { label: '已完成', value: 'completed' }
]

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') {
    return orderStore.orders
  }
  return orderStore.orders.filter(o => o.status === activeTab.value)
})

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}

const handlePay = (order) => {
  if (confirm(`确认支付 ¥${order.totalPrice.toFixed(2)}？`)) {
    orderStore.payOrder(order.id)
    alert('支付成功！')
  }
}

const handleCancel = (orderId) => {
  if (confirm('确认取消该订单？')) {
    orderStore.cancelOrder(orderId)
    alert('订单已取消')
  }
}

const handleReceive = (orderId) => {
  if (confirm('确认已收到商品？')) {
    orderStore.confirmReceive(orderId)
    alert('收货成功！')
  }
}

const showLogistics = (order) => {
  currentExpressNo.value = order.expressNo || 'SF1234567890'
  showLogisticsModal.value = true
}

const reorder = (order) => {
  order.items.forEach(item => {
    console.log('再次购买:', item.name)
  })
  alert('已加入购物车')
}
</script>

<style scoped>
.order-page {
  padding-top: 184px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.order-content {
  padding: 40px 0;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.order-header h2 {
  font-size: 28px;
}

.tabs {
  display: flex;
  gap: 30px;
}

.tabs span {
  cursor: pointer;
  padding: 10px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  position: relative;
}

.tabs span.active {
  color: #5EB69C;
  border-bottom-color: #5EB69C;
}

.tabs .count {
  position: absolute;
  top: -5px;
  right: -15px;
  background-color: #AA2113;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.order-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
}

.order-info {
  display: flex;
  gap: 20px;
}

.order-id {
  font-weight: bold;
  color: #333;
}

.order-time {
  color: #999;
  font-size: 14px;
}

.order-status {
  font-weight: bold;
  color: #5EB69C;
}

.order-status.pending {
  color: #AA2113;
}

.order-status.shipped {
  color: #FF9800;
}

.order-status.completed {
  color: #5EB69C;
}

.order-products {
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.product-item {
  display: flex;
  gap: 15px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.product-item:hover {
  opacity: 0.8;
}

.product-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info h4 {
  font-size: 14px;
  margin-bottom: 10px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-info p {
  color: #AA2113;
  font-size: 14px;
}

.order-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fafafa;
  border-top: 1px solid #eee;
}

.order-address {
  color: #666;
  font-size: 14px;
}

.order-address .iconfont {
  margin-right: 5px;
}

.order-total {
  font-size: 14px;
  color: #666;
}

.order-total span {
  font-size: 20px;
  color: #AA2113;
  font-weight: bold;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.order-actions button {
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-pay {
  background-color: #AA2113;
  color: #fff;
  border: none;
}

.btn-pay:hover {
  background-color: #8a1a0f;
}

.btn-cancel {
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
}

.btn-cancel:hover {
  border-color: #AA2113;
  color: #AA2113;
}

.btn-receive {
  background-color: #5EB69C;
  color: #fff;
  border: none;
}

.btn-receive:hover {
  background-color: #4a9f89;
}

.btn-logistics {
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
}

.btn-logistics:hover {
  border-color: #5EB69C;
  color: #5EB69C;
}

.btn-again {
  background-color: #5EB69C;
  color: #fff;
  border: none;
}

.btn-again:hover {
  background-color: #4a9f89;
}

.status-tip {
  color: #999;
  font-size: 14px;
}

.order-empty {
  text-align: center;
  padding: 100px 0;
  background-color: #fff;
  border-radius: 8px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.order-empty h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.order-empty p {
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

.logistics-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  width: 500px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  font-size: 18px;
}

.modal-header .close {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.modal-body {
  padding: 30px 20px;
}

.express-no {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.logistics-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  gap: 15px;
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ddd;
  margin-top: 4px;
}

.step.completed .step-dot {
  background-color: #5EB69C;
}

.step-info p {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.step-info span {
  font-size: 12px;
  color: #999;
}
</style>