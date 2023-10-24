import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import DetailPage from '../views/DetailPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ArticleForm from '../components/ArticleForm.vue'

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
    },
    {
      path: '/new-article',
      name: 'newArticle',
      component: ArticleForm
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: ArticleForm
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuthentication = ['detail', 'newArticle', 'edit'];

  if (requiresAuthentication.includes(to.name) && !localStorage.access_token) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && localStorage.access_token) {
    next({ name: 'home' });
  } else {
    next();
  }
});


export default router
