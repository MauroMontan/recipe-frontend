import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import register from "../views/register.vue"
import recipies from "../views/recipies.vue"
import store from "../store/index.js"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/recipies",
    name: "recipes",
    component: recipies,
    beforeEnter: (to, from, next) => {
      if (store.getters.getLoggedStatus == false) {
        next("/")
      } else {
        next();
      }
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
