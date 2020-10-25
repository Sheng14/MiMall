<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <div class="nav-menu">
                    <ul class="menu-wrapper">
                        <li class="menu-item">
                            <a href="javascript:;">手机 电话卡</a>
                            <div class="children">
                                <ul v-for="(item, index) in menuList" :key="index">
                                    <li v-for="(sub, index) in item" :key="index">
                                        <a :href="sub? '/#/product'+sub.id : ''">
                                            <img :src="sub? sub.img:'/imgs/item-box-1.png'">
                                            {{sub? sub.name: '假小米'}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电视 盒子</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">笔记本 平板</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">家电 插线板</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">出行 穿戴</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">智能 路由器</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电源 配件</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">生活 箱包</a>
                        </li>
                    </ul>
                </div>
                <swiper v-bind:options="swiperOption">
                    <swiper-slide v-for="(item, index) in slideList" :key="index">
                        <a :href="'/#/product'+item.id"><img :src="item.img"></a>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <div class="ads-box"></div>
            <div class="banner"></div>
            <div class="product-box"></div>
        </div>
        <search-bar></search-bar>
    </div>
</template>
<script>
import SearchBar from '../components/SearchBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
    name: 'index',
    data () {
        return {
            swiperOption: {
                autoplay: true,
                loop: true,
                effect: 'cube',
                cubeEffect: {
                    shadowOffset: 100,
                    shadowScale: 0.6
                },                
                pagination: {
                    el: '.swiper-pagination', // 寻找渲染分页器的元素
                    clickable:true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                } // 寻找渲染上下页的元素
            }, // 轮播图配置
            slideList:[
            {
                id:'42',
                img:'/imgs/slider/slide-1.jpg'
            },
            {
                id:'45',
                img:'/imgs/slider/slide-2.jpg'
            },
            {
                id:'46',
                img:'/imgs/slider/slide-3.jpg'
            },
            {
                id:'',
                img:'/imgs/slider/slide-4.jpg'
            },
            {
                id:'',
                img:'/imgs/slider/slide-5.jpg'
            }
            ],
            menuList: [ // 模拟菜单数据
                [
                    {
                        id: 30,
                        img: '/imgs/item-box-1.png',
                        name: '小米CC9'
                    },
                    {
                        id:31,
                        img:'/imgs/item-box-2.png',
                        name:'小米8青春版',
                    },
                    {
                        id:32,
                        img:'/imgs/item-box-3.jpg',
                        name:'Redmi K20 Pro',
                    },
                    {
                        id:33,
                        img:'/imgs/item-box-4.jpg',
                        name:'移动4G专区',
                    }
                ],
                [0 , 0, 0, 0], [0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]
            ]
        }
    },
    components: {
        SearchBar,
        swiper,
        swiperSlide
    }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
    .index {
        .swiper-box {
            .nav-menu {
                position: absolute;
                width: 264px;
                height: 451px;
                padding: 26px 0;
                box-sizing: border-box;
                background-color: #55585a7a;
                z-index: 2;
                .menu-wrapper {
                    .menu-item {
                        height: 50px;
                        line-height: 50px;
                        a {
                            color: #ffffff;
                            font-size: 16px;
                            padding-left: 30px;
                            display: block; // 设置这个才能占满一行，我们的定位才会正确
                            position: relative;
                            &:after {
                                position: absolute;
                                right: 30px;
                                top: 17.5px;
                                content: ' ';
                                @include bgImg(10px, 15px, '/imgs/icon-arrow.png')
                            }
                        }
                        &:hover {
                            background-color: $colorA;
                            .children {
                                display: block; // 显示子菜单
                            }
                            transition: all .5s;
                        }
                        .children {
                            display: none; // 默认不展示子菜单
                            width: 962px;
                            height: 451px;
                            background-color: #ffffff;
                            top: 0;
                            left: 264px;
                            position: absolute;
                            ul {
                                display: flex;
                                justify-content: space-between;
                                height: 75px; // 定义每一行对齐
                                li {
                                    height: 75px;
                                    flex: 1;
                                    padding-left: 27px; // 定义每一个占据的宽高
                                    a {
                                        color: $colorB;
                                        font-size: 14px;
                                    }
                                    img {
                                        width: 42px;
                                        height: 35px;
                                        vertical-align: middle;
                                        margin-right: 15px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .swiper-container {
                height: 451px;
                .swiper-button-prev {
                    left: 267px; // 移动左箭头
                }
                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }
</style>