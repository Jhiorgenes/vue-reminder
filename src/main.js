import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import DrinkWater from './views/DrinkWater.vue'
import Stretches from './views/Stretches.vue'
import Home from './views/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/agua', component: DrinkWater },
  { path: '/alongar', component: Stretches },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
