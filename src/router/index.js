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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/article/:article_id', component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
