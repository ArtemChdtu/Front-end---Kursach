<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const services = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('Всі')

onMounted(async () => {
  try {
    const response = await fetch('/data/services.json')
    if (!response.ok) throw new Error('Помилка завантаження даних')
    services.value = await response.json()
  } catch (error) {
    console.error('Помилка під час отримання списку послуг:', error)
  } finally {
    isLoading.value = false
  }
})

const categories = computed(() => {
  const list = new Set(services.value.map(s => s.category))
  return ['Всі', ...list]
})

const filteredServices = computed(() => {
  return services.value.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          service.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'Всі' || service.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    
    <div class="text-center max-w-2xl mx-auto mb-12">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Прейскурант послуг хімчистки</h1>
      <p class="text-slate-500">Прозорі ціни без прихованих платежів. Оберіть необхідний тип обробки та додайте до замовлення.</p>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-10 space-y-6">
      <div class="max-w-xl mx-auto relative">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Яку річ вам потрібно очистити? (наприклад: пуховик, сукня...)" 
          class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-sm"
        >
        <span class="absolute left-4 top-3.5 text-xl opacity-40">🔍</span>
      </div>

      <div class="flex flex-wrap justify-center items-center gap-2 pt-2 border-t border-slate-50">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="['px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide border transition-all duration-200', 
            selectedCategory === cat 
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-transparent shadow-md shadow-sky-500/10' 
              : 'bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100 hover:text-slate-900'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent mb-4"></div>
      <p class="text-slate-400 font-medium animate-pulse">Завантаження бази даних послуг...</p>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="service in filteredServices" 
          :key="service.id" 
          class="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
        >
          <div>
            <div class="flex justify-between items-start mb-4">
              <span class="text-4xl bg-slate-50 p-3 rounded-xl group-hover:bg-sky-50 transition-colors duration-300">{{ service.icon }}</span>
              <span class="text-[10px] font-bold uppercase tracking-widest bg-sky-50 text-sky-600 px-2.5 py-1 rounded-md">{{ service.category }}</span>
            </div>
            <h2 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-500 transition-colors duration-200">{{ service.name }}</h2>
            <p class="text-sm text-slate-500 leading-relaxed mb-6">{{ service.desc }}</p>
          </div>

          <div class="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between">
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Термін / Ціна</p>
              <div class="flex items-baseline space-x-1.5">
                <span class="text-2xl font-black text-slate-900">{{ service.price }} ₴</span>
                <span class="text-xs text-slate-400 font-medium">/ ~{{ service.time }}</span>
              </div>
            </div>
            
            <button 
              @click="cartStore.addService(service)"
              :class="['px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide shadow-sm transition-all duration-200',
                cartStore.items.find(i => i.id === service.id)
                  ? 'bg-teal-500 text-white shadow-teal-500/10'
                  : 'bg-slate-900 hover:bg-sky-500 text-white shadow-slate-900/10'
              ]"
            >
              <span v-if="cartStore.items.find(i => i.id === service.id)">✓ У кошику</span>
              <span v-else>Додати +</span>
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredServices.length === 0" class="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
        <span class="text-4xl block mb-3">📦</span>
        <p class="text-slate-700 font-bold text-lg">Нічого не знайдено</p>
        <p class="text-slate-400 text-sm max-w-xs mx-auto mt-1">Спробуйте змінити пошуковий запит або вибрати іншу категорію фільтрації.</p>
      </div>
    </div>

  </div>
</template>