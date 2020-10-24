<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <div class="nav-menu">
                    <ul class="menu-wrapper">
                        <li class="menu-item">
                            <a href="javascript:;">手机 电话卡</a>
                            <div class="children"></div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电视 盒子</a>
                            <div class="children"></div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">笔记本 平板</a>
                            <div class="children"></div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">家电 插线板</a>
                            <div class="children"></div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">出行 穿戴</a>
                            <div class="children"></div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">智能 路由器</a>
                            <div class="children"></div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电源 配件</a>
                            <div class="children"></div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">生活 箱包</a>
                            <div class="children"></div>
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
                            display: block;
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
                        }
                    }
                }
            }
            .swiper-container {
                height: 451px;
                .swiper-button-prev {
                    left: 267px;
                }
                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }
</style>