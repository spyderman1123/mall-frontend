import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/OrderView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router