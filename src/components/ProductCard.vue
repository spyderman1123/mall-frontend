<template>
  <router-link
    :to="`/detail/${product.id}`"
    class="block"
  >
    <img :src="product.image" :alt="product.name">
    <h3 class="title">{{ product.name }}</h3>
    <p class="price"><small>¥</small>{{ product.price }}</p>
  </router-link>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
a {
  display: block;
  height: 100%;
}
img {
  width: 100%;
  height: 304px;
  object-fit: cover;
}
.title {
  margin: 18px 0 8px;
  font-size: 20px;
  padding: 0 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}
.price {
  font-size: 22px;
  color: #AA2113;
  padding: 0 25px;
}
.price small {
  font-size: 18px;
}
</style>
