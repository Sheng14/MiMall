<template>
    <div>
        <order-header :title="title">
            <template v-slot:tip>
                <span>{{tip}}</span>
            </template>
        </order-header>
        <router-view></router-view>
        <search-bar></search-bar>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavFooter from '../components/NavFooter'
import OrderHeader from '../components/OrderHeader'
import SearchBar from '../components/SearchBar'
export default {
    name: 'order',
    components: {
        NavFooter,
        OrderHeader,
        SearchBar
    },
    data () {
        return {
            title: '',
            tip: ''
        }
    },
    mounted () {
        let path = this.$route.path // 获取当前页面路由
        if (path === '/order/confirm') { // 根据不同路由给予不同的title和tip
            this.title = '订单确认'
            this.tip = '请认真填写收货地址'
        } else if (path === '/order/list') {
            this.title = '订单列表'
            this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>'
        } else if (path === '/order/pay') {
            this.title = '订单支付'
            this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>'
        } else {
            this.title = '订单支付'
            this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>'            
        }
    }
}
</script>