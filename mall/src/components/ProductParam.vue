<template>
    <div class="nav-bar" :class="{'is_fixed': isFixed}">
        <div class="container">
            <div class="pro-title">
                小米
            </div>
            <div class="pro-param">
                <a href="javascript:;">概述</a><span>|</span>
                <a href="javascript:;">参数</a><span>|</span>
                <a href="javascript:;">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'nav-bar',
    data () {
        return {
            isFixed: false // 是否需要吸顶
        }
    },
    mounted () {
        window.addEventListener('scroll', this.initHeight) // 一开始就监听滚动事件，不过事件需要抽离出来
    },
    methods: {
        initHeight () {
            let srollTop = window.pageYOffset || document.documentElement.srollTop || document.body.srollTop // 兼容性获取滚动高度
            this.isFixed = srollTop > 150 ? true :false // 超出一定高度则应用样式
        }
    },
    destroyed () {
        window.removeEventListener('scroll', this.initHeight, false) // 页面关闭时记得冒泡的方式销毁全部滚动事件避免其它页面也监听造成浪费
    }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
.nav-bar {
    height: 70px;
    line-height: 70px;
    border-top:1px solid $colorH;
    background-color:$colorG;
    &.is_fixed {
        position: fixed;
        top: 0;
        width: 100%; // 指定宽度才能让它充满页面（宽）
        box-shadow: 0 5px 5px $colorE;
    }
    .container {
        @include flex();
        .pro-title{
            font-size:$fontH;
            color:$colorB;
            font-weight:bold;
        }
        .pro-param {
            font-size: $fontJ;
            span {
                margin: 0 10px;
            }
            a {
                color: $colorC;
            }
        }
    }
}
</style>