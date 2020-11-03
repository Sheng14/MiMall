<template>
    <div class="ali-pay">
        <Loading v-if="loading"></Loading>
        <div class="form" v-html="content"></div>
    </div>
</template>
<script>
import Loading from '../components/Loading'
import axios from 'axios'
export default {
    name: 'alipay',
    components: {
        Loading
    },
    data () {
        return {
            orderId: this.$route.query.orderId, // 获取订单号
            content: '', // 存放html源码，可以通过v-html完全取代本来的div标签，就是传什么就代替掉原来的div，变成传来的代码（这里就是form啦）
            loading: true // 是否显示加载动画
        }
    },
    methods: {
        paySubmit() { // 走后端提供的支付接口
            axios.post('/pay', {
                orderId: this.orderId,
                orderName: '武侯',
                amount: 0.01, // 金额
                payType: 1 // 代表支付状态
            }).then((res) => {
                this.content = res.content // 拿到html源码替代给我们的div，但是只是一串代码，并不会提交，需要手动提交，替代（渲染）需要时间
                setTimeout(() => {
                    document.forms[0].submit()
                }, 100) // 延时等待表单渲染完成然后提交表单
            })
        }
    },
    mounted () {
        this.paySubmit()
    }
}
</script>
