<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const isSubmitted = ref(false)

const form = ref({ name: '', phone: '', address: '', date: '' })
const errors = ref({ name: '', phone: '', address: '', date: '' })

const validateForm = () => {
  let isValid = true
  
  errors.value = { name: '', phone: '', address: '', date: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Будь ласка, вкажіть ваше ім\'я'
    isValid = false
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = 'Ім\'я має містити щонайменше 2 символи'
    isValid = false
  }

  const phoneRegex = /^\+380\d{9}$/
  if (!form.value.phone.trim()) {
    errors.value.phone = 'Номер телефону є обов\'язковим полем'
    isValid = false
  } else if (!phoneRegex.test(form.value.phone.trim().replace(/\s+/g, ''))) {
    errors.value.phone = 'Некоректний формат. Приклад: +380931234567'
    isValid = false
  }

  if (!form.value.address.trim()) {
    errors.value.address = 'Потрібно вказати адресу для виїзду кур\'єра'
    isValid = false
  }

  if (!form.value.date) {
    errors.value.date = 'Оберіть дату виконання забору речей'
    isValid = false
  } else {
    const selectedDate = new Date(form.value.date)
    const today = new Date()
    today.setHours(0,0,0,0)
    if (selectedDate < today) {
      errors.value.date = 'Дата не може бути в минулому'
      isValid = false
    }
  }

  return isValid
}

const handleCheckout = () => {
  if (cartStore.items.length === 0) return
  
  if (validateForm()) {
    cartStore.saveOrder({ ...form.value })
    isSubmitted.value = true
    form.value = { name: '', phone: '', address: '', date: '' }
    cartStore.clearCart()
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center max-w-2xl mx-auto mb-12">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Оформлення заявки</h1>
      <p class="text-slate-500">Заповніть форму для виклику служби логістики хімчистки за вашою адресою.</p>
    </div>

    <div v-if="isSubmitted && cartStore.lastOrder" class="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transform transition duration-300">
      <div class="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white text-center">
        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">🎉</div>
        <h2 class="text-2xl font-black mb-1">Замовлення успішно створено!</h2>
        <p class="text-emerald-50 text-sm">Номер чеку: #{{ cartStore.lastOrder.id }}</p>
      </div>
      
      <div class="p-8 space-y-6">
        <div>
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Дані отримувача:</h3>
          <div class="bg-slate-50 p-4 rounded-xl space-y-2 text-sm">
            <p><span class="text-slate-400">Клієнт:</span> <span class="font-semibold text-slate-800">{{ cartStore.lastOrder.client.name }}</span></p>
            <p><span class="text-slate-400">Телефон:</span> <span class="font-mono text-slate-800">{{ cartStore.lastOrder.client.phone }}</span></p>
            <p><span class="text-slate-400">Адреса виклику:</span> <span class="font-semibold text-slate-800">{{ cartStore.lastOrder.client.address }}</span></p>
            <p><span class="text-slate-400">Дата візиту:</span> <span class="font-semibold text-sky-600">{{ cartStore.lastOrder.client.date }}</span></p>
          </div>
        </div>

        <div>
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Перелік замовлених послуг:</h3>
          <div class="divide-y divide-slate-100 max-h-40 overflow-y-auto pr-2">
            <div v-for="item in cartStore.lastOrder.items" :key="item.id" class="py-2.5 flex justify-between text-sm">
              <span class="text-slate-700 font-medium">{{ item.name }}</span>
              <span class="font-bold text-slate-900">{{ item.price }} ₴</span>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-100 pt-5 flex justify-between items-center">
          <span class="text-slate-900 font-bold">Разом сплачено:</span>
          <span class="text-2xl font-black text-emerald-600">{{ cartStore.lastOrder.total }} ₴</span>
        </div>

        <button @click="isSubmitted = false" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition shadow-lg">
          Зробити нове замовлення
        </button>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div class="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 class="text-xl font-bold text-slate-900 mb-6">1. Контактна інформація та адреса</h2>
        
        <form @submit.prevent="handleCheckout" class="space-y-5">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ваше ПІБ або Ім'я</label>
            <input 
              v-model="form.name" 
              type="text" 
              :class="['w-full px-4 py-3 rounded-xl border focus:outline-none transition-all text-sm', errors.name ? 'border-red-400 focus:ring-4 focus:ring-red-400/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10']"
              placeholder="Артем Ломака"
            >
            <p v-if="errors.name" class="text-xs text-red-500 font-medium mt-1">⚠️ {{ errors.name }}</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Контактний телефон (формат +380)</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              :class="['w-full px-4 py-3 rounded-xl border focus:outline-none transition-all text-sm font-mono', errors.phone ? 'border-red-400 focus:ring-4 focus:ring-red-400/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10']"
              placeholder="+380931234567"
            >
            <p v-if="errors.phone" class="text-xs text-red-500 font-medium mt-1">⚠️ {{ errors.phone }}</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Адреса доставки та забору одягу</label>
            <input 
              v-model="form.address" 
              type="text" 
              :class="['w-full px-4 py-3 rounded-xl border focus:outline-none transition-all text-sm', errors.address ? 'border-red-400 focus:ring-4 focus:ring-red-400/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10']"
              placeholder="м. Черкаси, вул. Шевченка, буд. 460, кв. 12"
            >
            <p v-if="errors.address" class="text-xs text-red-500 font-medium mt-1">⚠️ {{ errors.address }}</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Бажана дата забору речей кур'єром</label>
            <input 
              v-model="form.date" 
              type="date" 
              :class="['w-full px-4 py-3 rounded-xl border focus:outline-none transition-all text-sm', errors.date ? 'border-red-400 focus:ring-4 focus:ring-red-400/10' : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10']"
            >
            <p v-if="errors.date" class="text-xs text-red-500 font-medium mt-1">⚠️ {{ errors.date }}</p>
          </div>

          <button 
            type="submit" 
            :disabled="cartStore.items.length === 0"
            class="w-full mt-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200 text-center text-sm uppercase tracking-wider"
          >
            Підтвердити та сформувати чек
          </button>
        </form>
      </div>

      <div class="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800">
        <h2 class="text-xl font-bold mb-6 flex justify-between items-center">
          <span>2. Ваш кошик</span>
          <span class="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold px-3 py-1 rounded-md">{{ cartStore.cartCount }} послуг</span>
        </h2>

        <div v-if="cartStore.items.length === 0" class="text-center py-12 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700/60">
          <span class="text-4xl block mb-2">🛒</span>
          <p class="text-slate-400 text-sm">Кошик замовлень порожній.</p>
          <RouterLink to="/services" class="text-sky-400 hover:text-sky-300 text-xs font-bold underline inline-block mt-2">Перейти до вибору послуг</RouterLink>
        </div>

        <div v-else class="space-y-4">
          <div class="space-y-3 max-h-64 overflow-y-auto pr-1">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id" 
              class="flex justify-between items-center bg-slate-800/60 border border-slate-800 p-4 rounded-xl hover:border-slate-700/80 transition-all duration-200"
            >
              <div class="flex items-center space-x-3">
                <span class="text-2xl">{{ item.icon }}</span>
                <div>
                  <p class="font-bold text-sm text-slate-100 leading-tight">{{ item.name }}</p>
                  <p class="text-xs text-slate-400 mt-0.5">Термін виконання: {{ item.time }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 ml-2">
                <span class="font-extrabold text-sm text-sky-400 whitespace-nowrap">{{ item.price }} ₴</span>
                <button @click="cartStore.removeService(item.id)" class="text-slate-500 hover:text-rose-400 font-bold text-sm transition-colors p-1" aria-label="Remove item">✕</button>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-800 pt-5 mt-6 space-y-3 text-sm">
            <div class="flex justify-between text-slate-400">
              <span>Логістичний виїзд кур'єра:</span>
              <span class="text-emerald-400 font-semibold uppercase tracking-wider text-xs">Безкоштовно</span>
            </div>
            <div class="flex justify-between text-slate-400">
              <span>Екологічне пакування:</span>
              <span class="text-emerald-400 font-semibold uppercase tracking-wider text-xs">Безкоштовно</span>
            </div>
            <div class="border-t border-slate-800/60 pt-4 flex justify-between items-center">
              <span class="text-base font-bold text-slate-100">Загальна вартість:</span>
              <span class="text-3xl font-black text-sky-400 tracking-tight">{{ cartStore.totalCost }} ₴</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>