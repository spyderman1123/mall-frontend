import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([
    {
      id: 1,
      name: 'KN95级莫兰迪色防护口罩',
      price: 79,
      originalPrice: 99,
      image: '/uploads/goods1.png',
      category: '防疫物资',
      description: '高品质防护口罩，多色可选，独立包装，舒适透气',
      sales: 1256,
      rating: 4.8,
      tag: '热销'
    },
    {
      id: 2,
      name: '紫檀外独三层普洱茶盒',
      price: 566,
      originalPrice: 688,
      image: '/uploads/goods2.png',
      category: '茶具',
      description: '高档紫檀茶叶盒，三层设计，密封性好，防潮防虫',
      sales: 328,
      rating: 4.9,
      tag: '精品'
    },
    {
      id: 3,
      name: '法拉蒙高颜值记事本可定制',
      price: 58,
      originalPrice: 78,
      image: '/uploads/goods3.png',
      category: '文具',
      description: '精美记事本，支持定制logo，优质纸张，书写流畅',
      sales: 892,
      rating: 4.7,
      tag: ''
    },
    {
      id: 4,
      name: '科技布布艺沙发',
      price: 3579,
      originalPrice: 3999,
      image: '/uploads/goods4.png',
      category: '家具',
      description: '现代简约布艺沙发，舒适耐用，多色可选',
      sales: 156,
      rating: 4.8,
      tag: '新品'
    },
    {
      id: 5,
      name: '新鲜有机蔬菜套餐',
      price: 128,
      originalPrice: 158,
      image: '/uploads/fresh1.png',
      category: '生鲜',
      description: '当日采摘，新鲜有机蔬菜，10种时令蔬菜组合',
      sales: 2341,
      rating: 4.9,
      tag: '限时特价'
    },
    {
      id: 6,
      name: '进口智利车厘子',
      price: 168,
      originalPrice: 198,
      image: '/uploads/fresh2.png',
      category: '水果',
      description: '进口车厘子，个大饱满，甜度高，新鲜空运',
      sales: 5621,
      rating: 4.9,
      tag: '爆款'
    },
    {
      id: 7,
      name: '新鲜三文鱼刺身',
      price: 258,
      originalPrice: 298,
      image: '/uploads/fresh3.png',
      category: '海鲜',
      description: '空运直达，刺身级三文鱼，肉质鲜嫩',
      sales: 892,
      rating: 4.8,
      tag: '新鲜'
    },
    {
      id: 8,
      name: '有机土鸡蛋30枚',
      price: 68,
      originalPrice: 88,
      image: '/uploads/fresh4.png',
      category: '禽蛋',
      description: '散养土鸡，绿色有机，营养丰富',
      sales: 3421,
      rating: 4.7,
      tag: ''
    },
    {
      id: 9,
      name: '多功能厨房置物架',
      price: 189,
      originalPrice: 229,
      image: '/uploads/kitchen1.png',
      category: '餐厨',
      description: '太空铝材质，多层收纳，承重强，易清洁',
      sales: 1567,
      rating: 4.6,
      tag: ''
    },
    {
      id: 10,
      name: '不粘锅煎炒锅套装',
      price: 328,
      originalPrice: 398,
      image: '/uploads/kitchen2.png',
      category: '餐厨',
      description: '电磁炉通用，不粘涂层，少油烟，易清洗',
      sales: 2134,
      rating: 4.8,
      tag: '热卖'
    },
    {
      id: 11,
      name: '智能变频空调',
      price: 2599,
      originalPrice: 2999,
      image: '/uploads/home1.png',
      category: '电器',
      description: '一级能效，智能控温，静音运行，节能省电',
      sales: 456,
      rating: 4.7,
      tag: '新品'
    },
    {
      id: 12,
      name: '全自动洗衣机',
      price: 1899,
      originalPrice: 2199,
      image: '/uploads/home2.png',
      category: '电器',
      description: '10公斤大容量，变频静音，多种洗涤模式',
      sales: 782,
      rating: 4.8,
      tag: ''
    },
    {
      id: 13,
      name: '进口澳洲肥牛卷',
      price: 138,
      originalPrice: 168,
      image: '/uploads/fresh5.png',
      category: '生鲜',
      description: '澳洲进口，雪花纹理，肉质细腻，涮火锅首选',
      sales: 1892,
      rating: 4.9,
      tag: '人气'
    },
    {
      id: 14,
      name: '红富士苹果礼盒',
      price: 89,
      originalPrice: 109,
      image: '/uploads/fresh6.png',
      category: '水果',
      description: '烟台红富士，脆甜多汁，精美礼盒装',
      sales: 3214,
      rating: 4.8,
      tag: ''
    },
    {
      id: 15,
      name: '不锈钢保温杯',
      price: 128,
      originalPrice: 158,
      image: '/uploads/kitchen3.png',
      category: '餐厨',
      description: '316不锈钢内胆，保温保冷，便携设计',
      sales: 2567,
      rating: 4.7,
      tag: ''
    },
    {
      id: 16,
      name: '智能扫地机器人',
      price: 1599,
      originalPrice: 1899,
      image: '/uploads/home3.png',
      category: '电器',
      description: '激光导航，自动回充，APP控制，扫拖一体',
      sales: 342,
      rating: 4.6,
      tag: '智能'
    }
  ])

  const categories = computed(() => {
    const cats = [...new Set(products.value.map(p => p.category))]
    return ['全部', ...cats]
  })

  const getProductById = (id) => {
    return products.value.find(p => p.id === Number(id))
  }

  const getProductsByCategory = (category) => {
    if (category === '全部' || !category) {
      return products.value
    }
    return products.value.filter(p => p.category === category)
  }

  const searchProducts = (keyword) => {
    if (!keyword) return products.value
    const lowerKeyword = keyword.toLowerCase()
    return products.value.filter(p => 
      p.name.toLowerCase().includes(lowerKeyword) ||
      p.category.toLowerCase().includes(lowerKeyword) ||
      p.description.toLowerCase().includes(lowerKeyword)
    )
  }

  return {
    products,
    categories,
    getProductById,
    getProductsByCategory,
    searchProducts
  }
})
