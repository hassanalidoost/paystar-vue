import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue"
import Profile from "@/views/Profile.vue"
import Products from "@/views/Products.vue"
import Checkout from "@/views/Checkout.vue"
import NotFound from "@/views/NotFound.vue"
import Result from "@/views/Result.vue"
import {userStore} from "@/stores/userStore";
import axios from "@/plugins/axios";
import {paymentStatusStore} from "@/stores/paymentStatusStore";
import Callback from "@/views/Callback.vue";

const router = createRouter({
  mode: history,
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
      meta: {
        requiresAuth: true,
      },
      beforeEnter: (to, from, next) => {
        // Check the payment status from the Vuex store
        const paymentStore = paymentStatusStore()

        if (paymentStore.paymentStatus === 'completed') {
          next(); // Allow access to the route
        } else {
          next('/'); // Redirect to another route if payment is not completed
        }
      },
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
      meta: {
        requiresAuth: true,
      },
      beforeEnter: (to, from, next) => {
        // Check the payment status from the Vuex store
        const paymentStore = paymentStatusStore()

        if (paymentStore.paymentStatus === 'completed') {
          next(); // Allow access to the route
        } else {
          next('/'); // Redirect to another route if payment is not completed
        }
      },
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
    },
    {
      path: '/login',
      beforeEnter: (to, from, next) => {
        userStore().id ? next('/') : next()
      },
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      beforeEnter: (to, from, next) => {
        userStore().id ? next('/') : next()
      },
      name: 'register',
      component: Register
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound,
    },
  ]
})

router.beforeEach((to,from, next) => {
  const user = userStore()
  const userLocal = JSON.parse(localStorage.getItem('user'))

  if (userLocal){
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires authentication
    if (userLocal.token !== null) {
      // User is logged in, proceed with navigation
      next();
    } else {
      // User is not logged in, redirect to the login page or show an error message
      next('/login'); // Replace '/login' with your login page path
    }
  } else {
    // Route does not require authentication, proceed with navigation
    next();
  }
})

export default router
