<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
    
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          
          <div class="flex items-center">
            <RouterLink to="/" class="group flex items-center space-x-2">
              <span class="text-3xl">✨</span>
              <span class="text-2xl font-black bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent tracking-tight group-hover:from-sky-600 group-hover:to-indigo-700 transition duration-300">
                Ваша Хімчистка
              </span>
            </RouterLink>
          </div>
          
          <nav class="hidden md:flex items-center space-x-10 font-medium">
            <RouterLink to="/" class="text-slate-600 hover:text-sky-500 transition-colors duration-200" active-class="text-sky-500 font-semibold">Головна</RouterLink>
            <RouterLink to="/services" class="text-slate-600 hover:text-sky-500 transition-colors duration-200" active-class="text-sky-500 font-semibold">Послуги та Ціни</RouterLink>
            <RouterLink to="/order" class="relative group flex items-center bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 px-5 py-2.5 rounded-xl transition-all duration-300" active-class="bg-sky-500 text-white hover:bg-sky-600 hover:text-white">
              <span>Оформити Замовлення</span>
              <span :class="['ml-2.5 text-xs font-black px-2 py-0.5 rounded-md transition-all duration-300', $route.path === '/order' ? 'bg-white text-sky-600' : 'bg-sky-500 text-white']" v-if="cartStore.cartCount > 0">
                {{ cartStore.cartCount }}
              </span>
            </RouterLink>
          </nav>

          <div class="flex items-center md:hidden">
            <button @click="toggleMobileMenu" class="text-slate-700 hover:text-sky-500 focus:outline-none p-2 rounded-lg transition" aria-label="Toggle Menu">
              <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-b border-slate-100 shadow-xl">
          <div class="px-4 pt-3 pb-6 space-y-3">
            <RouterLink to="/" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-500">Головна</RouterLink>
            <RouterLink to="/services" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-500">Послуги та Ціни</RouterLink>
            <RouterLink to="/order" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 bg-slate-50 flex justify-between items-center">
              <span>Кошик замовлень</span>
              <span class="bg-sky-500 text-white text-xs font-black px-2.5 py-1 rounded-md" v-if="cartStore.cartCount > 0">
                {{ cartStore.cartCount }} послуг
              </span>
            </RouterLink>
          </div>
        </div>
      </Transition>
    </header>

    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="bg-slate-900 text-slate-400 py-12 mt-20 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">✨</span>
            <span class="text-xl font-bold text-white tracking-tight">Ваша Хімчистка</span>
          </div>
          <div class="text-sm text-center md:text-right space-y-1">
            <p>&copy; 2026 АІС «Ваша Хімчистка». Всі права захищено.</p>
            <p class="text-slate-600 font-mono text-xs">Розроблено в рамках курсового проєкту з Front-end технологій</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>