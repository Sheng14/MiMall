<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{payment}}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage"/>{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked': payType === 1}"  @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'chceked': payType === 2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal=false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import axios from 'axios'
import QRCode from 'qrcode'
import Modal from '../components/Modal'
import ScanPayCode from './../components/ScanPayCode'

export default {
    name: 'orderPay',
    data () {
        return {
            orderNo: this.$route.query.orderNo, // 订单号
            addressInfo: '', // 收货人地址
            orderDetail: '', // 订单详情（包含商品列表）
            showDetail: false, // 控制商品详情显示与否
            payType: '', // 支付状态
            payImg: '', // 支付二维码图片
            showPay: false, // 二维码显示与否
            showPayModal: false, // 展示二次支付确认与否
            payment: 0, // 订单总金额
            T: '', //定时器
        }
    },
    components: {
      ScanPayCode,
      Modal
    },
    methods: {
        getOrderDetail () { // 获取订单详情
            axios.get(`/orders/${this.orderNo}`).then((res) => {
                let shippingVo = res.shippingVo // 返回具体地址信息，挑需要的出来
                this.addressInfo = `${shippingVo.receiverName} ${shippingVo.receiverMobile} ${shippingVo.receiverProvince}
                 ${shippingVo.receiverCity} ${shippingVo.receiverDistrict} ${shippingVo.receiverAddress}`
                this.orderDetail = res.orderItemVoList // 商品详情
                this.payment = res.payment // 商品总金额
            })
        },
        paySubmit(payType) { // 提交支付
            this.payType = payType
            if (payType === 1) { // 如果是支付宝的话打开新窗口（需要先跳到alipay组件过渡等待一下再到支付宝支付页面）
                window.open('/#/order/alipay?orderId=' + this.orderNo, '_blank') // 需要加#哈希路由，否则跳到首页，记得新窗口打开
            } else { // 如果是支付宝接口就拿到返回对应的微信协议
               axios.post('/pay', {
                orderId: this.orderNo,
                orderName: '武侯',
                amount: 0.01, // 金额
                payType: 2 // 代表支付状态
                }).
                then((res) => { // 将微信协议转码成二维码，然后展示二维码弹窗，赋值二维码图片，开始轮询查看订单状态
                  QRCode.toDataURL(res.content).then((res) => {
                    this.showPay = true
                    this.payImg = res
                    this.loopOrderState()
                })
                .catch(() => {
                  this.$message.error('微信二维码获取失败，请稍后尝试')
                })
              })
            }
        },
        closePayModal () { // 关闭二维码弹窗展示二次支付弹窗且清除轮询（已经支付但是网络原因没有跳转或者放弃支付的情况，再轮询也没用直接让用户选）
          this.showPay = false
          this.showPayModal = true
          clearInterval(this.T)
        },
        loopOrderState () { // 对订单状态进行轮询
          this.T = setInterval(() => {
            axios.get(`/orders/${this.orderNo}`).then((res) => {
              if (res.status === 20) { // 定义一个定时器不断轮询，如果支付完成则关闭轮询且跳转到订单列表页（支付完成的情况）
                this.goOrderList()
                clearInterval(this.T)
              }
            })
          }, 1000); 
        },
        goOrderList () { // 跳转到订单列表页
          this.$router.push('/order/list')
        }
    },
    mounted () {
        this.getOrderDetail()
    }
}
</script>
<style lang="scss">
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
            .icon-up{
              transform: rotate(180deg);
            }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>