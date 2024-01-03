import { userUID } from '@/js/signin-user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/panel',
      name: 'panel',
      component: () => import('@/views/panel.vue'),
      beforeEnter: (to, from, next) => {
        userUID()
        .then(() => {
          next()
        })
        .catch(() => {
          next("/")
        })
      }
    }
  ]
})

export default router
