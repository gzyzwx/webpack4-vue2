import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../pages/user/index.vue')
  },
  {
    path: '/lottie',
    name: 'lottie',
    component: () => import('../pages/lottie/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
