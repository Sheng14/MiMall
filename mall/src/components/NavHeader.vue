<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username">我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item, index) in phoneList" :key="index">
                                    <a v-bind:href="'/#/product/'+item.id" target="_blank">
                                        <div class="pro-img">
                                            <img :src="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                 <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="/imgs/nav-img/nav-3-1.jpg">
                                        </div>
                                        <div class="pro-name">小米电视12寸</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="/imgs/nav-img/nav-3-2.jpg">
                                        </div>
                                        <div class="pro-name">小米电视22寸</div>
                                        <div class="pro-price">2799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="/imgs/nav-img/nav-3-3.png">
                                        </div>
                                        <div class="pro-name">小米电视32寸</div>
                                        <div class="pro-price">3799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="/imgs/nav-img/nav-3-4.jpg">
                                        </div>
                                        <div class="pro-name">小米电视42寸</div>
                                        <div class="pro-price">4799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="/imgs/nav-img/nav-3-5.jpg">
                                        </div>
                                        <div class="pro-name">小米电视52寸</div>
                                        <div class="pro-price">5799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="/imgs/nav-img/nav-3-6.png">
                                        </div>
                                        <div class="pro-name">查看全部</div>
                                        <div class="pro-price">查看全部</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>                    
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" name="keyword">
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div></template>
<script>
import axios from 'axios'
export default {
    name: 'nav-header',
    data () {
        return {
            username: 'jack',
            phoneList: [] // 储存手机列表
        }
    },
    filters: { // 过滤器
        currency (val) {
            if (!val) return ''
            return '￥' + val.toFixed(2) + '元'
        } // 对手机价格进行过滤，仅保留两位小数
    },
    mounted () {
        this.getProductList();
    },
    methods: {
        login () {
            this.$router.push('/login')
        }, // 跳转到登录页
        getProductList () {
           axios.get('/products', {
                params: {
                    categoryId: '100012'
                }
            })
            .then((res) => {
                if (res.list.length > 6) {
                   this.phoneList = res.list.splice(0, 6)
                }
                console.log(res.list)
            })
        }, // 获取手机商品列表（只获取6个）
        goToCart () {
            this.$router.push('/cart')
        } // 跳转到商城页
    }
}
</script>
<style lang="scss">
    @import './../assets/scss/base.scss';
    @import './../assets/scss/mixin.scss';
    @import './../assets/scss/config.scss';
    .header{
        .nav-topbar {
            height: 39px;
            line-height: 39px;
            background-color: #333333;
            color: #b0b0b0;
            .container {
                @include flex();
                a {
                    display: inline-block;
                    color: #b0b0b0;
                    margin-right: 17px;
                }
                .my-cart {
                    width: 110px;
                    background-color: #FF6600;
                    text-align: center;
                    color: #ffffff;
                    .icon-cart {
                        @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png', contain);
                        margin-right: 4px;
                    }
                }
            }
        }
        .nav-header {
            .container {
                height: 112px;
                position: relative;
                @include flex();
                .header-logo {
                    display: inline-block;
                    width: 55px;
                    height: 55px;
                    background-color: #FF6600;
                    a {
                        display: inline-block;
                        width: 110px;
                        height: 55px;
                        &:before {
                            content: ' ';
                            @include bgImg(55px, 55px, '/imgs/mi-logo.png', 55px);
                            transition: margin .2s;
                        }
                        &:after {
                            content: ' ';
                            @include bgImg(55px, 55px, '/imgs/mi-home.png', 55px);                            
                        }
                        &:hover:before {
                            margin-left: -55px;
                            transition: margin .2s;
                        }
                    }
                }
                .header-menu {
                    display: inline-block;
                    width: 643px;
                    padding-left: 209px;
                    .item-menu {
                        display: inline-block;
                        color: #333333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;
                        margin-right: 20px;
                        span {
                            cursor: pointer;
                        }
                        &:hover {
                            color: $colorA;
                            .children {
                                height: 220px;
                                opacity: 1;
                            }
                        }
                        .children {
                            position: absolute; // 相对于container
                            top: 112px;
                            left: 0;
                            width: 1226px; // 先固定一个存放所有商品的安全区域
                            height: 0px;
                            opacity: 0;
                            overflow: hidden; // 避免鼠标未到文字就已经触发了hover
                            border-top: 1px solid #e5e5e5;
                            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                            transition: all .5s;
                            .product {
                                position: relative;
                                float: left; // 右浮动让全部商品排在一行
                                width: 16.6%; // 6个商品，100%去除
                                height: 220px;
                                font-size: 12px;
                                line-height: 12px;
                                text-align: center;
                                a {
                                    display: inline-block; // 主要是为了让a能被选中耳
                                }
                                img {
                                    width: auto;
                                    height: 110px; // 图片只需要定义一个宽/高，另一个auto即可
                                    margin-top: 26px;
                                }
                                .pro-img {
                                    height: 137px; // 容器太大，缩小一下
                                }
                                .pro-name {
                                    font-weight: 800;
                                    margin-top: 19px;
                                    margin-bottom: 8px;
                                    color: $colorB;
                                }
                                .pro-price {
                                    color: $colorA;
                                }
                                &:before {
                                    content: ' ';
                                    width: 1px;
                                    height: 100px;
                                    position: absolute; // 添加一个右边的线，相对于product
                                    top: 26px;
                                    right: 0;
                                    border-left: 1px solid $colorF;
                                }
                                &:last-child:before {
                                    border: none; // 去掉最后面的线
                                }
                            }
                        }
                    }
                }
                .header-search {
                    width: 319px;
                    .wrapper {
                        height: 50px;
                        border: 1px solid #e0e0e0;
                        display: flex;
                        align-items: center;
                        input {
                            height: 50px;
                            width: 264px;
                            box-sizing: border-box;
                            padding-left: 17px;
                            border: none;
                            border-right: 1px solid #e0e0e0;
                        }
                        a {
                            @include bgImg(18px, 18px, '/imgs/icon-search.png', contain);
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>