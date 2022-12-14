import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component : () => import('../views/LoginView.vue')
    },
    {
      path: '/build-team',
      name: 'teamBuilder',
      component : () => import('../views/TeamBuilderView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/collection',
      name: 'collection',
      component : () => import('../views/CollectionView.vue')
    },
    {
      path: '/team/:id',
      name: 'team',
      component : () => import('../views/TeamPokemonView.vue')
    }
  ]
})

export default router
