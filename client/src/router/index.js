import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import DetailPage from '../views/DetailPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && localStorage.access_token) {
    next({ name: 'home' })
  } else if (to.name === 'register' && localStorage.access_token) {
    next({ name: 'home' })
  } else if (to.name === 'detail' && !localStorage.access_token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
