<template>
  <div
    class="flex flex-col justify-center py-10 sm:h-screen max-w-3xl mx-auto px-4"
  >
    <div>
      <Header />
    </div>
    <main class="sm:mt-20 mt-10">
      <h1 class="text-heading-xl font-bold text-blue">
        Qual objetivo você deseja concluir hoje?
      </h1>
      <div class="mt-10 flex flex-col sm:flex-row gap-2">
        <RouterLink
          to="/alongar"
          class="flex-1 bg-blue rounded-3xl flex flex-col items-center py-8 hover:bg-blue-light transition-all"
        >
          <strong class="font-bold text-[#1F2128] text-card">Alongar</strong>
          <img class="mt-10 h-40 w-24" src="../assets/alongar.svg" alt="" />
          <div class="flex flex-col items-center mt-8"></div>
        </RouterLink>
        <RouterLink
          to="/agua"
          class="flex-1 bg-blue rounded-3xl flex flex-col items-center py-8 hover:bg-blue-light transition-all"
        >
          <strong class="font-bold text-[#1F2128] text-card">Beber água</strong>
          <img class="mt-10 h-40 w-24" src="../assets/agua.svg" alt="" />
          <div class="flex flex-col items-center mt-8"></div>
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
</script>
