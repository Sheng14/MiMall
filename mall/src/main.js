import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import router from './router'
// import env from './env'

const mock = true // 定义mock是否开启的开关
if (mock) {
  require('./mock/api')
}

// axios的默认配置，需要根据前端的跨域方式进行调整
 axios.defaults.baseURL = '/api'
 axios.defaults.timeout = 8000

// 根据环境变量的不同获取不同的请求地址
// axios.defaults.baseURL = env.baseURL

// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data
  let path = location.hash // 获取当前的哈希路由
  if(res.status == 0) { // 成功状态
    return res.data
  } else if (res.status === 10) { // 未登录状态
    if (path !== "#/index") { // 如果是首页出现10错误就无需强制跳转到登录页，游客有权限查看首页
      window.location.href = '/#/login'
    }
  } else { // 错误状态
    alert(res.msg)
    return Promise.reject(res) // 抛出错误，不然会走我们后面成功的方法
  }
})

Vue.use(axios, VueAxios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
