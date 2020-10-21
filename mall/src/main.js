import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import env from './env'

// axios的默认配置，需要根据前端的跨域方式进行调整
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

// 根据环境变量的不同获取不同的请求地址
axios.defaults.baseURL = env.baseURL

// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data
  if(res.status == 0) { // 成功状态
    return res.data
  } else if (res.status === 10) { // 未登录状态
    window.location.href = '/#/login'
  } else { // 错误状态
    alert(res.msg)
  }
})

Vue.use(axios, VueAxios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
