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
            <div class="ads-box">
                <a :href="'/#/product'+item.id" v-for="(item, index) in adsList" :key="index">
                    <img :src="item.img">
                </a>
            </div>
            <div class="banner">
                <a href="/#/product/30">
                    <img src="/imgs/banner-1.png" alt="">
                </a>
            </div>
        </div>
            <div class="product-box">
                <div class="container">
                    <h2>手机</h2>
                    <div class="wrapper">
                    <div class="banner-left">
                        <a href="/#/product/35"><img src="/imgs/mix-alpha.jpg" alt=""></a>
                    </div>
                    <div class="list-box">
                        <div class="list" v-for="(arr, index) in phoneList" :key="index">
                            <div class="item" v-for="(item, index) in arr" :key="index">
                                <span :class="{'new-pro':index%2===0}">新品</span>
                                <div class="item-img">
                                    <img :src="item.mainImage" alt="">
                                </div>
                                <div class="item-info">
                                    <h3>{{item.name}}</h3>
                                    <p>{{item.subTitle}}</p>
                                    <p class="price">{{item.price}}元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>                
            </div>
        <search-bar></search-bar>
        <modal
            modelType="middle" 
            title="提示"
            btnType= "1"
            sureText= "查看购物车详情"
            v-bind:showModal="true"
        >
            <template v-slot:body>
                <p>商品添加成功！</p>
            </template>
        </modal>
    </div>
</template>
<script>
import SearchBar from '../components/SearchBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Modal from '../components/Modal'
import 'swiper/swiper-bundle.css'
import axios from 'axios'

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
            ],
            adsList: [ // 模拟广告位数据
                {
                    id:33,
                    img:'/imgs/ads/ads-1.png'
                },{
                    id:48,
                    img:'/imgs/ads/ads-2.jpg'
                },{
                    id:45,
                    img:'/imgs/ads/ads-3.png'
                },{
                    id:47,
                    img:'/imgs/ads/ads-4.jpg'
                }
            ],
            phoneList: []
        }
    },
    components: {
        SearchBar,
        swiper,
        swiperSlide,
        Modal
    },
    mounted () {
        this.init()
    },
    methods: {
        init () { // 获取手机商品的数据并且拆分成二维数组
            axios.get('/products',{
                params: {
                    categoryId: 100012,
                    pageSize: 14
                }
            }).then ((res) => {
                res.list = res.list.slice(6, 14) // 因为前面的6个数据是给导航栏用的，在这里用会显得比较大，所以用后面的数据
                console.log(res.list)
                this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)] // 拆分成二维数组
            })
        }
    }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/base.scss';
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
        .ads-box{
            @include flex();
            margin-top:14px;
            margin-bottom:31px;
            a{
                width:296px;
                height:167px;
            } // 这里是引用了base.scss里面的图片样式（图片充满a标签）
        }
        .banner{
            margin-bottom:50px;
        }
        .product-box{
            background-color:$colorJ;
            padding:30px 0 50px;
            h2{
                font-size:$fontF;
                height:21px;
                line-height:21px;
                color:$colorB;
                margin-bottom:20px;
            }
            .wrapper{
                display:flex;
                .banner-left{
                    margin-right:16px;
                    img{
                        width:224px;
                        height:619px;
                    }
                }
                .list-box{
                .list{
                        @include flex();
                        width:986px; // 须定义宽度才能展开，不然会挤在一起
                        margin-bottom:14px;
                        &:last-child{
                        margin-bottom:0; // 让下面的行无需底部bottom
                    }
                    .item{
                    width:236px;
                    height:302px;
                    background-color:$colorG;
                    text-align:center;
                    span{
                        display:inline-block;
                        width:67px;
                        height:24px;
                        font-size:14px;
                        line-height:24px;
                        color:$colorG;
                        &.new-pro{
                        background-color:#7ECF68;
                        }
                        &.kill-pro{
                        background-color:#E82626;
                        }
                    }
                    .item-img{
                        img{
                        width:100%;
                        height:195px;
                        }
                    }
                    .item-info{
                        h3{
                        font-size:$fontJ;
                        color:$colorB;
                        line-height:$fontJ;
                        font-weight:bold;
                        }
                        p{
                        color:$colorD;
                        line-height:13px;
                        margin:6px auto 13px;
                        }
                        .price{
                        color:#F20A0A;
                        font-size:$fontJ;
                        font-weight:bold;
                        cursor:pointer;
                        &:after{
                            @include bgImg(22px,22px,'/imgs/icon-cart-hover.png'); // 添加购物车图片
                            content:' ';
                            margin-left:5px;
                            vertical-align: middle;
                        }
                        }
                    }
                    }
                }
                }
            }
        }        
    }
</style>