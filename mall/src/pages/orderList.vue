<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
        <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <div class="load-more" v-if="false">
            <el-button type="primary" :loading="loading" @click="loadMore" v-if="showNextPage">加载更多</el-button>
          </div>
          <div class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="300"
            v-if="false"
          >
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div>
          <el-pagination
            v-if="true"
            background
            class="pagination"
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
          ></el-pagination>
          <no-data v-if="!loading && list.length === 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
import { Pagination, Button } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import axios from 'axios'
export default {
    name: 'orderList',
    components: {
        OrderHeader,
        Loading,
        NoData,
        [Pagination.name]: Pagination,
        [Button.name]: Button
    },
    directives: {
      infiniteScroll
    },
    data () {
        return {
            list: [], // 商品列表
            loading: false ,// 显示等待数据图标与否（包括按钮的等待效果）
            total: 0, //总共多少条数据
            pageSize: 2, // 每页加载多少条数据（写死默认是10）
            pageNum: 1, // 当前是第几页
            showNextPage: true, // 是否显示加载更多的按钮
            busy: false // 是否繁忙（繁忙则不允许滚动）
        }
    },
    mounted() {
        this.getOrderList()
    },
    methods: {
        getOrderList () { // 获取商品列表,展示加载动画
            this.busy = true // 一开始就不允许滚动，不然会触发滚动事件
            this.loading = true
            axios.get('/orders', {
              params: {
                pageNum: this.pageNum, // 控制当前页是哪一页
                pageSize: this.pageSize // 控制每页加载的数据
              }
            })
            .then((res) => {
              //  this.list = [] || res.list
              //  this.list = this.list.concat(res.list) // 合并之前查询的数据，不需要之前的数据可以是去掉concat
                this.list = res.list
                this.loading = false // 如果我请求回来了则关闭加载动画
                this.total = res.total // 拿到一共有多少条数据
                this.busy = false // 在首次加载完毕才释放滚动
                this.showNextPage = res.hasNextPage
            })
            .catch(() => {
                this.loading = false // 请求失败我也关掉
            })
        },
        goPay(orderNo) { // 前往支付页面（带上订单号）
            /*三种路由跳转方式
            this.$router.push('/order/pay')
            this.$router.push({
                name: 'order-pay',
                query: {
                    orderNo
                }
            })*/
            this.$router.push({
                path: '/order/pay',
                query: {
                    orderNo
                }
            })
        },
        handleChange (pageNum) { // 当前页改变的时候触发（点击页码和箭头），修改当前页重新请求当前页数据
          this.pageNum = pageNum
          this.getOrderList()
        },
        loadMore () { // 加载更多
          this.pageNum++ // 页数加一页再请求一次数据就可以拿到下一页的数据
          this.getOrderList()
        },
        scrollMore () { // 滚动事件，禁用滚动，调用对应接口获取下一页的数据，500ms后才继续滚动
          this.busy = true
          setTimeout(() => {
            this.pageNum++
            this.getList()
          },500)
        },
        // 专门给scrollMore使用
        getList(){
          this.loading = true;
          axios.get('/orders',{
            params:{
              pageSize:2,
              pageNum:this.pageNum
            }
          }).then((res)=>{
            this.list = this.list.concat(res.list);
            this.loading = false;
            if(res.hasNextPage){ // 判断是不是最后一页决定是否禁用滚动
              this.busy=false;
            }else{
              this.busy=true;
            }
            this.showNextPage = res.hasNextPage
          });
        }       
    }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align:right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>