import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import router from './router'
import store from './store' // 引入vuex的状态管理实例
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入ui框架中的组件/插件以及对应的css即可在各文件引入使用

// import env from './env'

const mock = false // 定义mock是否开启的开关
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
    return Promise.reject(res) // 抛出错误，不然也会走成功逻辑（就是进入购物车页再是登录页）
  } else { // 错误状态
    Message.error(res.msg) // 引入使用方式
    return Promise.reject(res) // 抛出错误，不然会走我们后面成功的方法
  }
},(error) => { // 第一个参数拦截接口错误（200之后才会执行），第二个参数拦截服务器500错误
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error); // 需要返回否则会进入正确的then逻辑
})

Vue.use(axios, VueAxios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false
Vue.prototype.$message = Message // 现在挂载到vue实例上就可以到处不引入直接使用了

new Vue({
  store, // 挂载到vue实例上
  router,
  render: h => h(App),
}).$mount('#app')
