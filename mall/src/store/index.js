import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'

Vue.use(Vuex) // 注册vuex插件

const state = {
    username: '',
    cartCount: 0
} // 注册一个状态，其余两个写在另外的文件引入就行

export default new Vuex.Store({
    state,
    mutations,
    actions
})