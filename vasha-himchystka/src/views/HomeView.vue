<template>
  <div>
    <section class="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-24 md:py-32 px-4 overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div class="max-w-5xl mx-auto text-center relative z-10">
        <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-6 uppercase tracking-wider">
          🚀 Інноваційний сервіс у м. Черкаси
        </span>
        <h1 class="text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-none">
          Повертаємо речам їхній <br>
          <span class="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">первинний вигляд</span>
        </h1>
        <p class="text-base sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Автоматизована європейська система догляду за гардеробом. Екологічні розчинники, дбайлива обробка та преміальна якість.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <RouterLink to="/services" class="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-sky-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200 text-center">
            Переглянути послуги та ціни
          </RouterLink>
          <a href="#how-it-works" class="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 px-10 rounded-2xl backdrop-blur-sm transition text-center">
            Як це працює?
          </a>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
      <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div class="space-y-1">
          <p class="text-4xl font-black text-slate-900 bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">99.4%</p>
          <p class="text-sm font-semibold uppercase tracking-wider text-slate-400">Успішно виведених плям</p>
        </div>
        <div class="border-y sm:border-y-0 sm:border-x border-slate-100 py-6 sm:py-0 space-y-1">
          <p class="text-4xl font-black text-slate-900 bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">15 000+</p>
          <p class="text-sm font-semibold uppercase tracking-wider text-slate-400">Очищених речей за рік</p>
        </div>
        <div class="space-y-1">
          <p class="text-4xl font-black text-slate-900 bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">&lt; 24 год</p>
          <p class="text-sm font-semibold uppercase tracking-wider text-slate-400">Експрес виконання робіт</p>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Всього 4 кроки до бездоганної чистоти</h2>
        <p class="text-slate-500">Автоматизована система контролю замовлення на кожному кроці.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div class="w-14 h-14 bg-sky-50 text-sky-600 text-2xl font-bold flex items-center justify-center rounded-xl mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">01</div>
          <h3 class="text-lg font-bold mb-2 text-slate-900">Вибір послуг</h3>
          <p class="text-sm text-slate-500 leading-relaxed">Оберіть необхідні речі та типи чищення в нашому інтерактивному онлайн-каталозі.</p>
        </div>

        <div class="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div class="w-14 h-14 bg-indigo-50 text-indigo-600 text-2xl font-bold flex items-center justify-center rounded-xl mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">02</div>
          <h3 class="text-lg font-bold mb-2 text-slate-900">Оформлення</h3>
          <p class="text-sm text-slate-500 leading-relaxed">Вкажіть вашу адресу та зручну дату для виклику нашого кур'єра або принесіть самостійно.</p>
        </div>

        <div class="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div class="w-14 h-14 bg-teal-50 text-teal-600 text-2xl font-bold flex items-center justify-center rounded-xl mb-6 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">03</div>
          <h3 class="text-lg font-bold mb-2 text-slate-900">Еко-чистка</h3>
          <p class="text-sm text-slate-500 leading-relaxed">Речі проходять аналіз, сортування, виведення плям та делікатне прання на фабриці.</p>
        </div>

        <div class="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div class="w-14 h-14 bg-purple-50 text-purple-600 text-2xl font-bold flex items-center justify-center rounded-xl mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">04</div>
          <h3 class="text-lg font-bold mb-2 text-slate-900">Доставка</h3>
          <p class="text-sm text-slate-500 leading-relaxed">Отримуєте чисті, випрасувані речі в індивідуальних фірмових захисних чохлах.</p>
        </div>
      </div>
    </section>
  </div>
</template>