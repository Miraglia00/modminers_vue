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

import store from '../store/index'

const NProgress = require('nprogress');

import EmailVerification from '../views/user/EmailVerification';
import newPassword from '../views/user/NewPassword';
import UserFunc from '../api/UserFunctions'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(store.getters.loggedIn === false) next()
      else next(false)
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
        console.log("true login")
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
      else next(false)
    }
  },
  {
    path: '/adminpanel',
    name: 'Adminpanel',
    component: Adminpanel,
    children: [
      {
        name: 'Users',
        path: 'users',
        component: Users
      }
    ]
    /*beforeEnter: (to, from, next) => {
      if(store.getters.loggedIn === true && store.getters.isAdmin === true) next()
      else next(false)
    }*/
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
  next()
  /*if(store.getters.loggedIn === true) {
    store.dispatch("GET_SKILLS")
      .then(res=> {
        if(store.getters.getLogout) {
          next({name: "Logout"})
        }else {
          console.log("meghiv")
          next()
        }
      })
      next()
  }else{
    console.log("not logged")
    next({name: "Logout"})
  }*/
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
