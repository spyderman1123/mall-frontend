<template>
  <div class="topic w">
    <div class="box-hd">
      <h2>专题推荐<small>发现更多好物</small></h2>
    </div>
    <div class="topic-list">
      <div v-for="topic in topics" :key="topic.id" class="topic-item">
        <a href="#">
          <img :src="topic.image" :alt="topic.title">
          <div class="info">
            <h3>{{ topic.title }}</h3>
            <p>{{ topic.desc }}</p>
            <div class="bottom">
              <span class="views">{{ topic.views }}人浏览</span>
              <span class="date">{{ topic.date }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const topics = ref([
  {
    id: 1,
    title: '春季穿搭指南',
    desc: '解锁春日穿搭密码，简约时尚两不误',
    image: '/src/assets/uploads/topic1.png',
    views: 12580,
    date: '2026-04-15'
  },
  {
    id: 2,
    title: '厨房收纳技巧',
    desc: '小空间大利用让你的厨房整洁如新',
    image: '/src/assets/uploads/topic2.png',
    views: 8960,
    date: '2026-04-10'
  },
  {
    id: 3,
    title: '健康饮食搭配',
    desc: '科学膳食让你吃出健康好身体',
    image: '/src/assets/uploads/topic3.png',
    views: 15320,
    date: '2026-04-05'
  }
])
</script>

<style scoped>
.topic {
  margin-bottom: 60px;
}

.box-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.box-hd h2 {
  font-size: 28px;
}

.box-hd h2 small {
  font-size: 16px;
  color: #A1A1A1;
  margin-left: 20px;
}

.topic-list {
  display: flex;
  gap: 20px;
}

.topic-item {
  flex: 1;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.topic-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.topic-item a {
  display: block;
}

.topic-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.info {
  padding: 20px;
}

.info h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.bottom {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}
</style>