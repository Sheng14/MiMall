<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
 import axios from 'axios'
// import jsonp from 'jsonp'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      age: 30
    }
  },
 /* mounted () {
    let url = 'https://www.imooc.com/search/hotwords'
    jsonp(url, (err, res) => {
      console.log(res)
    })
  }*/
  
  mounted () {
   // let url = 'https://www.easy-mock.com/mock/5b012c1fe6e1035843cd3aff/mockapi/table/list'
   let url1 = '/api/learningpath/relatedpath'
    // 真实路径：https://coding.imooc.com/learningpath/relatedpath 转发路径： http://localhost:8080/api/learningpath/relatedpath
   let url2 = '/api/index/getadver' 
   // 真实路径： https://coding.imooc.com/index/getadver 转发路径： http://localhost:8080/api/index/getadver
   let url3 = '/api/class/ajaxprelearn'
    // 真实路径： https://coding.imooc.com/class/ajaxprelearn 转发路径： http://localhost:8080/api/class/ajaxprelearn
   axios.get(url1).then((info) => {
      console.log(info)
   })
   axios.get(url2).then((info) => {
      console.log(info)
   })
   axios.get(url3).then((info) => {
      console.log(info)
   })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
