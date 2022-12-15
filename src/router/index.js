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
      path: '/teams/:id',
      name: 'team',
      component : () => import('../views/TeamPokemonView.vue')
    },
    {
      path: '/tuto',
      name: 'tuto',
      component : () => import('../views/TutoView.vue')
    }
  ]
})

export default router
