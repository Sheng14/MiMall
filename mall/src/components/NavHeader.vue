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
                    <a href="javascript:;">登录</a>
                    <a href="javascript:;">注册</a>
                    <a href="javascript:;" class="my-cart"><span class="icon-cart"></span>购物车</a>
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
                                <li class="product">
                                    <a href="">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f515ab05232ed14ccd78ec67e024495a.png">
                                        </div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f515ab05232ed14ccd78ec67e024495a.png">
                                        </div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f515ab05232ed14ccd78ec67e024495a.png">
                                        </div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f515ab05232ed14ccd78ec67e024495a.png">
                                        </div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f515ab05232ed14ccd78ec67e024495a.png">
                                        </div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f515ab05232ed14ccd78ec67e024495a.png">
                                        </div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children"></div>
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
export default {
    name: 'nav-header'
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
                            }
                        }
                        .children {
                            position: absolute; // 相对于container
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 220px; // 先固定一个存放所有商品的安全区域
                            border-top: 1px solid #e5e5e5;
                            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
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