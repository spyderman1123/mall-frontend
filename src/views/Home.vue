<template>
  <div class="home">
    <section class="entry">
      <div class="w flex">
        <div class="category">
          <ul>
            <li
              v-for="(item, index) in categories"
              :key="index"
              @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = -1"
              :class="{ active: hoveredIndex === index }"
            >
              <div>
                <router-link :to="`/list?category=${item.name}`">{{ item.name }}</router-link>
                <router-link :to="`/list?category=${item.sub}`">{{ item.sub }}</router-link>
              </div>
              <span class="arrow">></span>
            </li>
          </ul>
        </div>
        <div class="flex-1 banner"></div>
      </div>
    </section>

    <section class="fresh w">
      <div class="box-hd">
        <h2>新鲜好物<small>新鲜出炉 品质靠谱</small></h2>
        <router-link to="/list">查看全部 <i class="iconfont icon-arrow-right-bold"></i></router-link>
      </div>
      <div class="box-bd">
        <ul>
          <li v-for="product in freshProducts" :key="product.id">
            <router-link :to="`/detail/${product.id}`">
              <img :src="product.image" :alt="product.name">
              <h3 class="title">{{ product.name }}</h3>
              <p class="price"><small>¥</small>{{ product.price }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <section class="hot w">
      <div class="box-hd">
        <h2>人气推荐<small>人气爆款 不容错过</small></h2>
      </div>
      <div class="box-bd">
        <ul>
          <li v-for="product in hotProducts" :key="product.id">
            <router-link :to="`/detail/${product.id}`">
              <img :src="product.image" :alt="product.name">
              <h3 class="title">{{ product.name }}</h3>
              <p class="info">口碑好物</p>
              <p class="price"><small>¥</small>{{ product.price }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <section class="brand-box w">
      <div class="box-hd">
        <h2>热门品牌<small>品质好物 值得信赖</small></h2>
        <div class="indicator">
          <span class="dot" :class="{ active: true }"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
      <div class="box-bd">
        <div class="brand-list">
          <div class="brand-item" v-for="product in brandProducts" :key="product.id">
            <router-link :to="`/detail/${product.id}`">
              <img :src="product.image" :alt="product.name">
              <div class="brand-info">
                <h4>{{ product.category }}</h4>
                <p>品质保证</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const hoveredIndex = ref(-1)

const categories = [
  { name: '生鲜', sub: '水果' },
  { name: '美食', sub: '零食' },
  { name: '餐厨', sub: '厨具' },
  { name: '电器', sub: '数码' },
  { name: '居家', sub: '日用' },
  { name: '洗护', sub: '美妆' },
  { name: '孕婴', sub: '童装' },
  { name: '服装', sub: '鞋包' }
]

const freshProducts = computed(() => productStore.products.slice(0, 4))
const hotProducts = computed(() => productStore.products.slice(4, 8))
const brandProducts = computed(() => productStore.products.slice(8, 12))
</script>

<style scoped>
.entry {
  height: 500px;
  background-color: #f5f5f5;
}
.entry .w {
  height: 100%;
  background: url('/uploads/banner1.png') no-repeat;
  display: flex;
}
.category {
  width: 250px;
  height: 500px;
  background-color: rgba(0,0,0,.42);
  z-index: 10;
}
.category ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 12px 0 29px;
  color: #fff;
  cursor: pointer;
}
.category ul li:hover,
.category ul li.active {
  background-color: #00BE9A;
}
.category ul li a {
  color: #fff;
  font-size: 14px;
}
.category ul li a:first-child {
  font-size: 16px;
  margin-right: 10px;
}
.category ul li .arrow {
  color: #999;
  font-size: 12px;
}
.category ul li:hover .arrow,
.category ul li.active .arrow {
  color: #fff;
}
.banner {
  flex: 1;
  background-size: cover;
  background-position: center;
}

@media (max-width: 768px) {
  .entry {
    height: 200px;
  }
  .category {
    display: none;
  }
  .entry .w {
    background-size: cover;
    background-position: center;
  }
}

.box-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 112px;
}
.box-hd h2 {
  font-size: 30px;
  font-weight: normal;
}
.box-hd h2 small {
  font-size: 16px;
  color: #A1A1A1;
  margin-left: 30px;
}
.box-hd a {
  font-size: 16px;
  color: #A1A1A1;
}

.box-bd ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
}
.box-bd ul li {
  width: 304px;
  height: 404px;
  background-color: #EEF9F4;
  text-align: center;
}
.fresh .box-bd ul li {
  background-color: #EEF9F4;
}
.hot .box-bd ul li {
  background-color: #fff;
}
.box-bd ul li a {
  display: block;
  height: 100%;
  text-decoration: none;
  color: #333;
}
.box-bd ul li img {
  width: 304px;
  height: 304px;
  vertical-align: middle;
  object-fit: cover;
}
.box-bd ul li .title {
  margin: 18px 0 8px;
  font-size: 20px;
  padding: 0 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.box-bd ul li .price {
  font-size: 22px;
  color: #AA2113;
}
.box-bd ul li .price small {
  font-size: 18px;
}
.box-bd ul li .info {
  font-size: 14px;
  color: #a29e9e;
  margin-bottom: 8px;
}

.brand-box {
  margin-top: 20px;
  margin-bottom: 60px;
}
.brand-box .box-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 112px;
}
.brand-box .box-hd h2 small {
  font-size: 16px;
  color: #a1a1a1;
  margin-left: 30px;
}
.indicator {
  display: flex;
  gap: 6px;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ccc;
}
.dot.active {
  background: #27ba9b;
}
.box-bd {
  overflow: visible !important;
}
.brand-list {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 5px 0 15px;
}
.brand-list::-webkit-scrollbar {
  display: none;
}
.brand-item {
  width: 304px;
  height: 404px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background-color: #fff;
}
.brand-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.brand-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(255,255,255,0.9);
  text-align: center;
  padding: 12px 0;
}
.brand-info h4 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
  color: #333;
}
.brand-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.fresh {
  margin-bottom: 60px;
}
.hot {
  margin-bottom: 60px;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
}

@media (max-width: 768px) {
  .w {
    width: 100%;
    padding: 0 10px;
  }
  .box-bd ul {
    flex-direction: column;
    align-items: center;
  }
  .box-bd ul li {
    width: 100%;
    max-width: 304px;
    margin-bottom: 10px;
  }
  .brand-list {
    flex-direction: column;
    align-items: center;
  }
  .brand-item {
    width: 100%;
    max-width: 304px;
    margin-bottom: 10px;
  }
}
</style>
