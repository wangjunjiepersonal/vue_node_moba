import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

//引入http.js 并将这个方法挂在到Vue的原型上
import http from './http'
Vue.prototype.$http = http

//全局使用的mixin
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})
//引入css文件 
import './style.css'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
