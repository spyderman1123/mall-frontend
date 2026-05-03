const API_BASE_URL = '/api'

const getToken = () => localStorage.getItem('token')

const request = async (endpoint, options = {}) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
      throw new Error(data.message || '请求失败')
    }

    return data
  } catch (error) {
    console.error('API请求错误:', error)
    throw error
  }
}

export const api = {
  users: {
    register: (data) => request('/users/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data) => request('/users/login', { method: 'POST', body: JSON.stringify(data) }),
    profile: () => request('/users/profile'),
    updateProfile: (data) => request('/users/profile', { method: 'PUT', body: JSON.stringify(data) })
  },

  products: {
    list: (params) => {
      const query = new URLSearchParams(params).toString()
      return request(`/products${query ? `?${query}` : ''}`)
    },
    hot: () => request('/products/hot'),
    new: () => request('/products/new'),
    detail: (id) => request(`/products/${id}`)
  },

  categories: {
    list: () => request('/categories'),
    detail: (id) => request(`/categories/${id}`)
  },

  cart: {
    get: () => request('/cart'),
    add: (productId, quantity = 1) => request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity })
    }),
    update: (id, quantity) => request(`/cart/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    }),
    remove: (id) => request(`/cart/remove/${id}`, { method: 'DELETE' }),
    clear: () => request('/cart/clear', { method: 'DELETE' })
  },

  orders: {
    list: (params) => {
      const query = new URLSearchParams(params).toString()
      return request(`/orders${query ? `?${query}` : ''}`)
    },
    detail: (id) => request(`/orders/${id}`),
    create: (data) => request('/orders/create', { method: 'POST', body: JSON.stringify(data) }),
    pay: (id, paymentMethod) => request(`/orders/${id}/pay`, {
      method: 'PUT',
      body: JSON.stringify({ payment_method: paymentMethod })
    }),
    cancel: (id) => request(`/orders/${id}/cancel`, { method: 'PUT' }),
    confirm: (id) => request(`/orders/${id}/confirm`, { method: 'PUT' })
  },

  addresses: {
    list: () => request('/addresses'),
    detail: (id) => request(`/addresses/${id}`),
    create: (data) => request('/addresses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/addresses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    setDefault: (id) => request(`/addresses/${id}/default`, { method: 'PUT' }),
    remove: (id) => request(`/addresses/${id}`, { method: 'DELETE' })
  }
}

export default api