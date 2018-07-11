<template>
  <div style="position: relative;bottom: 100rpx">

    <!--底部栏-->
    <div style="position: fixed;bottom: 0;width:100%;z-index: 999999;">
      <goods-action :product="product"></goods-action>
    </div>


    <!--焦点banner图-->
    <div>
      <swiper indicator-dots autoplay circular :style="{width: screenWidth+'px',height: screenWidth+'px'}">
        <template v-for="(item,index) in product.covers">
          <swiper-item>
            <img :src="item" :style="{width: screenWidth+'px',height: screenWidth+'px'}">
          </swiper-item>
        </template>
      </swiper>
    </div>

    <!--已售数量-->
    <div :style="{top: tipTop+'px'}" class="tooltip">
      <div style="line-height: 50rpx">
        <img :src="fireIcon" style="width:30rpx;height: 30rpx;vertical-align: middle">
        <div style="display:inline-block;font-size: 20rpx;color: #fff;vertical-align: middle"> 已售数量:{{product.sellNum}}</div>
      </div>
    </div>


    <div style="display: flex;flex-direction: column">
      <div style="padding: 20rpx;border-bottom: 1rpx solid rgba(0,0,0,0.1)">
        <div style="font-size: 38rpx;margin-bottom: 30rpx">{{product.name}}</div>
        <span style="color: red;font-size: 30rpx">￥{{product.newPrice}} </span>
        <span style="color: red;font-size: 25rpx;text-decoration: line-through"> ￥{{product.oldPrice}}</span>
      </div>

      <div style="display: flex;justify-content: space-between;padding: 20rpx;border-bottom: 20rpx solid rgba(0,0,0,0.05)">
        <div style="display: flex;">
          <div style="background: #000;border-radius: 50%;width: 100rpx;height: 100rpx">
            <img :src="facIcon" style="width: 100rpx;height: 100rpx">
          </div>
          <div style="padding-left: 20rpx">
            <div>
              <span style="font-size: 30rpx;vertical-align: middle;">毒物商店 </span>
              <img :src="webIcon" style="vertical-align: middle;width: 30rpx;height: 30rpx">
            </div>
            <div>
              <span style="font-size: 25rpx;vertical-align: middle;color: rgba(0,0,0,0.5)">正品保证 | 顺丰邮寄</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 28rpx">
          <div style="border: 1rpx solid #515151;padding: 10rpx 20rpx;font-size: 25rpx;color:#515151;border-radius: 10rpx">进入商店</div>
        </div>
      </div>

      <div>
        <tab :tabList="tabList"></tab>

        <div v-for="item in tabList" v-show="item.checked">
          <!--商品详情-->
          <div v-if="item.id===1" v-html="product.detail"></div>
          <!--购买记录-->
          <div v-if="item.id===2" style="display: flex;flex-direction: column">
            <div v-for="(record,recordIndex) in product.recordList" style="display: flex;justify-content: space-between;padding: 20rpx;border-bottom: 1rpx solid rgba(0,0,0,0.1)">
              <div>
                <img :src="record.avatar" style="width: 100rpx;height: 100rpx;border-radius: 50%;vertical-align: middle">
                <span style="font-size: 25rpx;vertical-align: middle;letter-spacing: 5rpx"> {{record.nickname}}</span>
              </div>
              <div style="font-size: 25rpx;padding-top: 30rpx;letter-spacing: 5rpx">
                <div>解毒{{record.buyNum}}件</div>
                <div>{{record.inTime}}</div>
              </div>
            </div>
          </div>
          <!--热销商品-->
          <div v-if="item.id===3" style="display: flex;flex-wrap: wrap;justify-content: space-between;padding: 40rpx 20rpx">
            <div v-for="(hotProduct,prodIndex) in product.hotProdList" :key="hotProduct.id" style="padding: 10rpx">
              <prod-card2 :prod="hotProduct"></prod-card2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {serverPath} from '@/config/index'
  import Tab from '@/components/tab/tab'
  import {formatDate} from '@/utils/index'
  import ProdCard2 from '@/components/prod-card/prod-card2'
  import GoodsAction from '@/components/goods-action/goods-action'

  export default {
    data(){
      return {
        webIcon: require('../../../static/icon/shop/web.png'),
        facIcon: require('../../../static/icon/index/fac.png'),
        fireIcon: require('../../../static/icon/shop/fire.png'),
        screenWidth:wx.getSystemInfoSync().screenWidth,
        product:{},
        tabList:[],
      }
    },
    computed:{
      tipTop(){
        return this.screenWidth-22
      }
    },
    components:{
      Tab,
      ProdCard2,
      GoodsAction
    },
    methods:{
      ajaxProduct(pid){
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/product/id/${pid}`,
          success(res){
            let result = res.data
            if(result.code==='000'){
              let data = result.data

              data.recordList.map(item=>{
                item.inTime = formatDate(item.inTime)
              })
              data.hotProdList.map(item=>{
                item.cover = item.covers.split(',')[0]
              })
              data.covers = data.covers.split(',')
              data.cover = data.covers[0]
              $this.product = data
            }else{
              wx.showToast({title:result.msg,mask:true})
            }
          },
          fail(res){
            wx.showToast({title:'数据加载出错',mask:true})
          }
        })
      },
      initTabList(){
        this.tabList = [
          {
            id:1,
            name:'商品详情',
            checked: true
          },
          {
            id:2,
            name:'购买记录',
            checked: false
          },
          {
            id:3,
            name:'热销推荐',
            checked: false
          }
        ]
      }
    },
    mounted(){
      let pid = this.$root.$mp.query.pid
      this.ajaxProduct(pid)
      // 初始化TabList
      this.initTabList()
    },
  }
</script>
<style scoped>
  .tooltip{
    position: absolute;
    right: 0;
    background: #000;
    padding: 0 20rpx;
    border-radius: 40rpx 0 0 40rpx;
  }
</style>
