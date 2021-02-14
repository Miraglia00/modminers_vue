import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register';
import Login from '../views/Login';
import SocketTest from '../views/SocketTest';
import Logout from '../views/Logout';
import Profile from '../views/user/Profile';
import Adminpanel from '../views/admin/Adminpanel';
import Users from '../views/admin/Users';
import VerifyUsers from '../views/admin/VerifyUsers';
import PageSettings from '../views/admin/PageSettings';

import Auth from '../api/Authentication'

import store from '../store/index'

const NProgress = require('nprogress');

import EmailVerification from '../views/user/EmailVerification';
import newPassword from '../views/user/NewPassword';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(store.getters.loggedIn === true) next()
      else {next({name: 'Login'})}
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(store.getters.loggedIn === false) next()
      else next({name: "Home"})
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.getters.loggedIn === false) {
        next()
      }
      else {
        next({name: "Home"})
      }
    }
  },
  {
    path: '/user/verifyEmail',
    name: 'EmailVerification',
    component: EmailVerification
  },
  {
    path: '/user/newPassword',
    name: 'newPassword',
    component: newPassword
  },
  {
    path: '/socket',
    name: 'SocketTest',
    component: SocketTest
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: (to, from, next) => {
      if(store.getters.loggedIn === true) {next()}
      else {next({name: 'Login'})}
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if(store.getters.loggedIn === true) next()
      else {next({name: 'Login'})}
    }
  },
  {
    path: '/adminpanel',
    component: Adminpanel,
    children: [
      {
        name: 'Users',
        path: '',
        components: {
          users: Users,
          verify_users: VerifyUsers,
          page_settings: PageSettings
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      if(store.getters.loggedIn && store.getters.isAdmin) {
        Auth.verifyT(store.getters.getToken)
        .then(res => next())
        .catch((err) => {next({name: 'Login'}); console.log(err)})
      }
      else {next({name: 'Login'})}
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  store.dispatch("CHECK_LOGOUT")
  .then(res => {
    if(res === true && store.getters.loggedIn)
      next({name: "Logout"})
    else {
      if(store.getters.loggedIn) {
        store.dispatch("SET_NOTIFICATION_COUNTS")
        store.dispatch("GET_SETTINGS")
      }
      next()
    }
  })
  .catch(err => console.log(err))
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
