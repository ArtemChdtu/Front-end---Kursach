import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const lastOrder = ref(null)

  const totalCost = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0)
  })

  const cartCount = computed(() => items.value.length)

  function addService(service) {
    if (!items.value.find(i => i.id === service.id)) {
      items.value.push(service)
    }
  }

  function removeService(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function clearCart() {
    items.value = []
  }

  function saveOrder(orderDetails) {
    lastOrder.value = {
      id: Math.floor(Math.random() * 90000) + 10000,
      items: [...items.value],
      total: totalCost.value,
      client: orderDetails,
      date: new Date().toLocaleDateString('uk-UA')
    }
  }

  return { items, lastOrder, totalCost, cartCount, addService, removeService, clearCart, saveOrder }
})