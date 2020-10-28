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
    this.getUser()
    this.getCartCount()
  },
  methods: {
    getUser () {
      axios.get('/user').then((res) => {
        console.log(res)
      })
    },
    getCartCount () {
      axios.get('/carts/products/sum').then((res) => {
        console.log(res)
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
