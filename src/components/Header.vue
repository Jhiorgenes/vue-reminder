<template>
  <header class="flex gap-2.5 items-center">
    <img
      @click="redirectToHome"
      src="https://www.github.com/jhiorgenes.png"
      alt=""
      class="w-16 h-16 rounded-full cursor-pointer hover:opacity-70 transition-all"
    />
    <div>
      <h1 class="text-white font-light text-heading-xl">Bem vindo,</h1>
      <div class="flex items-center gap-1">
        <p class="text-white font-semibold text-heading-lg">Humano</p>
        <img class="w-6 h-6" src="../assets/aceno.svg" alt="" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function redirectToHome() {
  router.push('/')
}
</script>
