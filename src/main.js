// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
require('es6-promise').polyfill()
import Vue from 'vue' // 自带
import App from './App' // 自带
import router from './router' // 自带
import iview from 'iview'
import echarts from 'echarts'
import $ from 'jquery' // desc:引入jQuery插件 time:2017-12-11 author:coolfxl
import VueParticles from 'vue-particles'

import 'iview/dist/styles/iview.css'
import './assets/css/index.styl'

import store from './store'

Vue.config.productionTip = false // 自带


Vue.use(VueParticles)
Vue.use(iview)
/* eslint-disable no-new */
new Vue({
  el: '#app', // 自带
  credentials: true, // 允许携带cookie
  router, // 自带
  store,
  template: '<App/>', // 自带
  render: h => h(App), // iviewUI框架渲染使用
  components: { 
    App 
  },
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    Bus: new Vue()
  }
})
