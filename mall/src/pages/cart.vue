<template>
    <div class="cart">
        <order-header title="购物车页面">
            <template v-slot:tip>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="cart-box">
                <ul class="cart-item-head">
                    <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
                    <li class="col-3">商品名称</li>
                    <li class="col-1">单价</li>
                    <li class="col-2">数量</li>
                    <li class="col-1">小计</li>
                    <li class="col-1">操作</li>
                </ul>
                <ul class="cart-item-list">
                    <li class="cart-item" v-for="(item,index) in list" v-bind:key="index">
                    <div class="item-check">
                        <span class="checkbox" v-bind:class="{'checked':item.productSelected}" @click="updateCart(item)"></span>
                    </div>
                    <div class="item-name">
                        <img v-lazy="item.productMainImage" alt="">
                        <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
                    </div>
                    <div class="item-price">{{item.productPrice}}</div>
                    <div class="item-num">
                        <div class="num-box">
                        <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                        <span>{{item.quantity}}</span>
                        <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                        </div>
                    </div>
                    <div class="item-total">{{item.productTotalPrice}}</div>
                    <div class="item-del" @click="delProduct(item)"></div>
                    </li>
                </ul>
                </div>
                <div class="order-wrap clearfix">
                <div class="cart-tip fl">
                    <a href="/#/index">继续购物</a>
                    共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
                </div>
                <div class="total fr">
                    合计：<span>{{cartTotalPrice}}</span>元
                    <a href="javascript:;" class="btn" @click="order">去结算</a>
                </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import OrderHeader from '../components/OrderHeader'
import NavFooter from '../components/NavFooter'
import ServiceBar from './../components/SearchBar'
import axios from 'axios'
export default {
    name: 'cart',
    components: {
        OrderHeader,
        NavFooter,
        ServiceBar
    },
    data () {
        return {
            list: [], // 在购物车里面的商品数组
            cartTotalPrice: '', //商品总价
            checkedNum: 0, //选中商品数量
            allChecked:false,//是否全选
        }
    },
    mounted () {
        this.getCartList()
    },
    methods: {
        getCartList () { // 获取购物车列表
            axios.get('/carts').then((res) => {
                this.renderData(res)
            })
        },
        toggleAll () { // 全选或者取消全选
            let url = this.allChecked? '/carts/unSelectAll': '/carts/selectAll' // 确定是全选还是全不选
            axios.put(url).then((res) => {
                this.renderData(res) // 依然要全部数据重新渲染一遍,不然就只能切换一半什么的
            })
        },
        updateCart (item, type) { // 更新商品数量和选中状态
            let quantity = item.quantity // 获取商品的当前数量
            let selected = item.productSelected // 获取商品当前的选中状态
            if (type === '-') {
                if (quantity === 1) {
                    alert('商品数量至少为1')
                    return
                }
                --quantity // 记得--在前，不然要下次计算才会更新数据
            } else if (type === '+') {
                if (quantity > item.productStock) {
                    alert('购买的商品不能超过库存数量')
                    return
                }
                ++quantity
            } else {
                selected = !item.productSelected // 选中状态就是对当前选中状态取反就行
            }
            axios.put(`/carts/${item.productId}`, { // 最后发送商品数量与选中状态给后端计算拿到数据重新渲染
                quantity,
                selected
            }).then((res) => {
                this.renderData(res)
            })
        },
        delProduct (item) { // 删除商品的方法
            axios.delete(`/carts/${item.productId}`).then((res) => {
                this.renderData(res)
            })
        },
        order () { // 下单
            let isCheck = this.list.every(item => !item.productSelected) // 判断商品列表是否都是未选中的状态
            if (isCheck) {
                alert('请至少选择一件商品')
            }else {
                this.$router.push('/order/confirm')
            }
        },
        renderData (res) { // 渲染购物车数据的公共方法
                this.list = res.cartProductVoList || []
                this.cartTotalPrice = res.cartTotalPrice
                this.allChecked = res.selectedAll
                this.checkedNum = this.list.filter(item => item.productSelected).length // 过滤拿到只有选中商品的数组的长度
        }
    }
}
</script>
<style lang="scss">
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>