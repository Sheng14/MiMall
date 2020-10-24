<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
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
                img:'/imgs/slider/slide-1.jpg'
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
    .index {
        .swiper-box {
            .swiper-container {
                height: 451px;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }
</style>