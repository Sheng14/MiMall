<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
 import axios from 'axios'
// import jsonp from 'jsonp'
export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      
    }
  },
  mounted () {
    if (this.$cookie.get('userId')) { // 有登录才调用这些接口，避免无意义调用（前提是我cookie的过期时间与后台的对话级别一致）
        this.getUser()
        this.getCartCount()
    }
  },
  methods: { // 这里再派发一次事件，避免刷新后数据丢失
    getUser () {
      axios.get('/user').then((res = {}) => { // 加了默认值{}
        this.$store.dispatch('saveUsername', res.username)
      })
    },
    getCartCount () {
      axios.get('/carts/products/sum').then((res = 0) => { // 加了默认值0
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
