import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import ArticleDetailComp from '../components/ArticleListComp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/Publish.vue')
  },
  {
    path: '/article/:article_id', component: () => import('../views/Article.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
