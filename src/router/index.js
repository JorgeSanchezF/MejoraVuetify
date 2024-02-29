import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/Login.vue'
import ListadoViewVue from '@/views/ListadoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/listado',
      name: 'listado',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ListadoViewVue
    }
  ]
})

export default router
