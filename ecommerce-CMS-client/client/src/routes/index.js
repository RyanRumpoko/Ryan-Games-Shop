import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import AboutPage from '../views/AboutPage'
import Login from '../views/Login'
import Register from '../views/Register'
import NotFoundPage from '../views/NotFoundPage'
import AddProduct from '../views/AddProduct'
import EditProduct from '../views/EditProduct'

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
    component: AboutPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/edit',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.token
  if (to.name === 'Login' && auth) next({ name: 'Home' })
  if (to.name === 'Register' && auth) next({ name: 'Home' })
  if (to.name === 'Home' && !auth) next({ name: 'Login' })
  else next()
})
export default router
