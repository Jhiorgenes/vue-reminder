<template>
  <div class="flex flex-col justify-center sm:h-full max-w-3xl mx-auto px-4">
    <dialog id="modal_reminder" class="modal">
      <div
        class="modal-box flex flex-col items-center justify-center bg-gray-400"
      >
        <form method="dialog">
          <button
            class="btn text-gray-100 bg-gray-200 hover:bg-gray-300 border-0 btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <img class="w-12 h-20" src="../assets/alongar.svg" alt="" />
        <strong class="text-modal text-blue flex-wrap"
          >Lembrete para se alongar!</strong
        >
      </div>
    </dialog>
    <dialog id="modal_completed" class="modal">
      <div
        class="modal-box flex flex-col items-center justify-center bg-gray-400"
      >
        <form method="dialog">
          <button
            class="btn text-gray-100 bg-gray-200 hover:bg-gray-300 border-0 btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <img class="w-12 h-20" src="../assets/check.svg" alt="" />
        <strong class="text-modal text-blue flex-wrap"
          >Parabéns, você completou sua meta diária!</strong
        >
        <button @click="play" ref="finishedSoundButton"></button>
      </div>
    </dialog>
    <div>
      <Header />
    </div>
    <main
      class="mt-10 sm:mt-20 flex sm:items-center flex-col sm:flex-row gap-6 sm:gap-28"
    >
      <div class="flex-1 bg-blue rounded-3xl flex flex-col items-center py-8">
        <h2 class="font-bold text-gray-500">{{ percentage }}%</h2>
        <img class="mt-10 h-40 w-24" src="../assets/alongar.svg" alt="" />
        <div class="flex flex-col items-center mt-8">
          <strong class="font-bold text-[#1F2128] text-card">Alongar</strong>
          <p class="text-[#1F2128] font-semibold text-title">
            Meta: {{ goalValue }}x
          </p>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <h2 class="text-title font-medium text-blue">Meta diária</h2>
              <p class="text-[#4E4964] font-medium">{{ goalValue }}x</p>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              v-model="slider"
              class="range range-primary"
              step="1"
            />
          </div>
        </div>
        <div class="mt-10 flex items-center justify-center gap-4">
          <div
            class="border inline-block p-4 rounded-xl bg-gray-400 border-gray-200"
          >
            <span class="countdown font-mono text-4xl text-white">
              <input
                type="number"
                class="bg-transparent text-white w-10 sm:w-16 focus:outline-0 text-center"
                v-model="countdownMinutes"
              />
            </span>
          </div>
          <strong class="text-heading-xl">m</strong>
          <span class="text-heading-xl font-bold text-white">:</span>
          <div
            class="border inline-block p-4 rounded-xl bg-gray-400 border-gray-200"
          >
            <span class="countdown font-mono text-4xl text-white">
              <input
                type="number"
                class="bg-transparent text-white w-10 sm:w-16 focus:outline-0 text-center"
                v-model="countdownSeconds"
              />
            </span>
          </div>
          <strong class="text-heading-xl">s</strong>
        </div>
        <button
          @click="initiateCountdown"
          :disabled="isTimerRunning === true"
          class="mt-14 w-full text-title text-black font-medium bg-blue hover:bg-blue-light border-0 btn"
        >
          Começar
          <img src="../assets/arrow.svg" alt="" />
        </button>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import Header from '../components/Header.vue'
import tadaSound from '../assets/audio/tada.mp3'
import { useSound } from '@vueuse/sound'

const savedStretchesPercentage = localStorage.getItem(
  'savedStretchesPercentage'
)
const percentage = ref(
  savedStretchesPercentage ? parseInt(savedStretchesPercentage) : 0
)
const countdownMinutes = ref(60)
const countdownSeconds = ref(0)
const isTimerRunning = ref(false)
let countdownInterval = null

const slider = ref(5)

const goalValue = computed(() => slider.value)

const finishedSoundButton = ref(null)
const { play } = useSound(tadaSound)

function initiateCountdown() {
  if (countdownInterval) return // Evita múltiplas execuções simultâneas

  isTimerRunning.value = true
  countdownInterval = setInterval(decrementTimer, 1000) // Intervalo de 1 segundo
}

function decrementTimer() {
  if (countdownSeconds.value > 0) {
    countdownSeconds.value-- // Decrementa os segundos
  } else if (countdownMinutes.value > 0) {
    countdownMinutes.value-- // Decrementa os minutos
    countdownSeconds.value = 59 // Reseta os segundos para 59
  } else {
    finishCountdown() // Executa lógica de término do contador
  }
}

function finishCountdown() {
  clearInterval(countdownInterval) // Limpa o intervalo
  countdownInterval = null
  isTimerRunning.value = false

  // Lógica adicional relacionada ao seu aplicativo
  modal_reminder.showModal()
  const currentProgress = Math.floor(
    (mlValueTimer.value / mlValueMeta.value) * 100
  )
  percentage.value += currentProgress
  localStorage.setItem('savedWaterPercentage', percentage.value.toString())

  if (percentage.value >= 100) {
    handleCompletion() // Executa lógica quando a porcentagem atinge 100%
  }

  resetCountdown() // Reseta os valores do contador
}

function handleCompletion() {
  finishedSoundButton.value.click()
  modal_reminder.close()
  modal_completed.showModal()
  percentage.value = 0
  localStorage.removeItem('savedWaterPercentage')
}

function resetCountdown() {
  countdownMinutes.value = 0
  countdownSeconds.value = 0
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
