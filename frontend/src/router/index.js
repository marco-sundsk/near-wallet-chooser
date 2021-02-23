/*
 * @Author: your name
 * @Date: 2021-02-15 15:55:31
 * @LastEditTime: 2021-02-18 14:43:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /swap-select/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/*',
    // redirect: '/index',
    name: 'Home',
    component: Index
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
