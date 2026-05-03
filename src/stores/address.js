import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAddressStore = defineStore('address', () => {
  const addresses = ref([
    {
      id: 1,
      name: '张小明',
      phone: '138****8888',
      province: '北京市',
      city: '市辖区',
      district: '朝阳区',
      detail: '某某街道 某某小区 1号楼101',
      isDefault: true
    },
    {
      id: 2,
      name: '李小红',
      phone: '139****6666',
      province: '上海市',
      city: '市辖区',
      district: '浦东新区',
      detail: '某某路 某某花园 2栋202',
      isDefault: false
    },
    {
      id: 3,
      name: '王小华',
      phone: '137****5555',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '某某大道 某某科技园 3栋301',
      isDefault: false
    }
  ])

  const currentAddress = computed(() => {
    return addresses.value.find(a => a.isDefault) || addresses.value[0]
  })

  const defaultAddress = computed(() => {
    return addresses.value.find(a => a.isDefault) || addresses.value[0]
  })

  const setDefault = (id) => {
    addresses.value.forEach(a => {
      a.isDefault = a.id === id
    })
  }

  const addAddress = (address) => {
    addresses.value.push({
      ...address,
      id: Date.now(),
      isDefault: false
    })
  }

  const updateAddress = (id, address) => {
    const index = addresses.value.findIndex(a => a.id === id)
    if (index > -1) {
      addresses.value[index] = { ...addresses.value[index], ...address }
    }
  }

  const removeAddress = (id) => {
    const index = addresses.value.findIndex(a => a.id === id)
    if (index > -1) {
      addresses.value.splice(index, 1)
    }
  }

  const getAddressString = (address) => {
    return `${address.province} ${address.city} ${address.district} ${address.detail}`
  }

  return {
    addresses,
    currentAddress,
    defaultAddress,
    setDefault,
    addAddress,
    updateAddress,
    removeAddress,
    getAddressString
  }
})