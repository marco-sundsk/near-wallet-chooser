/*
 * @Author: your name
 * @Date: 2021-02-15 15:55:31
 * @LastEditTime: 2021-02-22 16:35:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit'
 * @FilePath: /swap-select/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/base.css'
import { initContract } from './utils/utils'
import './utils/rem'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  async created () {
    await initContract()
  }
}).$mount('#app')
