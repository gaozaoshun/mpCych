<template>
  <div style="position: relative;width: 100%;height: 100rpx;background: #fff;display: flex;font-weight: 300;border-top: 1rpx solid rgba(0,0,0,0.1)">
    <div style="display: flex;flex-direction: column;padding: 10rpx 30rpx 0 30rpx;border-right: 1rpx solid rgba(0,0,0,0.1)">
      <img :src="talkIcon" style="width: 50rpx;height:50rpx">
      <span style="font-size: 25rpx;color: #707070;">客服</span>
      <button
        class="contact-btn"
        open-type="contact"
        session-from="webapp">
      </button>
    </div>
    <div @click="toCarPage" style="display: flex;flex-direction: column;padding: 10rpx 30rpx 0 30rpx;">
      <div style="text-align: center;width: 50rpx;height:50rpx;margin-left: 5rpx">
        <img :src="carIcon" style="width: 50rpx;height:50rpx;">
      </div>
      <span style="font-size: 25rpx;color: #707070;">购物车</span>
    </div>
    <div @click="addToCar" style="font-size: 30rpx;background: rgb(253,114,68);color: #fff;text-align: center;line-height: 100rpx;flex-grow: 1">
      <span>加入购物车</span>
    </div>
    <div @click="toBuy" style="font-size: 30rpx;background: rgb(251,42,53);color: #fff;text-align: center;line-height: 100rpx;flex-grow: 1">
      <span>立即购买</span>
    </div>
    <div :style="{display:showMsg}" class="shadow" @click="hide"></div>
    <!--呼出商品详情-->
    <div :style="{display:showMsg}" class="prod-msg">
      <div style="display: flex;">
        <div style="width: 200rpx;height: 200rpx;border: 1rpx solid rgba(0,0,0,0.1);margin-right: 20rpx">
          <img :src="currentSize.pic" style="width: 200rpx;height: 200rpx">
        </div>
        <div style="display: flex;flex-direction: column;justify-content: space-between">
          <span style="font-size: 40rpx;font-weight: bold;color: #000;">{{product.name}}</span>
          <span style="font-size: 35rpx;font-weight: bold;color: red;">￥{{currentSize.price}}元</span>
        </div>
      </div>

      <div style="display: flex;margin-top: 30rpx">
        <div style="margin-right: 30rpx">
          <span style="font-size: 30rpx;font-weight: normal;line-height: 60rpx">规格</span>
        </div>
        <div style="flex-grow: 1;display: flex;flex-wrap: wrap;justify-content: flex-start;">
          <div @touchstart="sizeTouch(item)" v-for="item in product.sizeJson" :style="{color:item.color,background:item.bg}" class="size">{{item.desc}}</div>
        </div>
      </div>

      <div style="display: flex;margin-top: 30rpx">
        <div style="margin-right: 30rpx">
          <span style="font-size: 30rpx;font-weight: normal;line-height: 70rpx">数量</span>
        </div>
        <div style="margin-left: 30rpx">
          <number-input @toNumber="toNumber"></number-input>
        </div>
        <div style="padding: 10rpx 20rpx">
          <span style="font-size: 25rpx;color:rgba(0,0,0,0.2)">剩余{{currentSize.kc}}件</span>
        </div>
      </div>

      <div class="bottom-btn">
        <div v-if="isBuy" @click="toOrderPage" style="text-align: center;font-size: 30rpx;color:#fff;background: orangered;padding: 10rpx 50rpx">立即购买</div>
        <div v-if="!isBuy" @click="toAddCar" style="text-align: center;font-size: 30rpx;color:#fff;background: #000;padding: 10rpx 50rpx">加入购物车</div>
      </div>
    </div>
  </div>
</template>
<script>
  import NumberInput from '@/components/number-input/number-input'
  import {uuid} from '@/utils/index'

  export default {
    watch:{
      product(){
        this.product.sizeJson.map(item=>{
          item.color = 'orangered'
          item.bg = '#fff'
          item.checked = false
        })
        this.product.sizeJson[0].color = '#fff'
        this.product.sizeJson[0].bg = 'orangered'
        this.product.sizeJson[0].checked = true
        this.currentSize = this.product.sizeJson[0]
      }
    },
    props: {
      product: {
        type:Object
      }
    },
    components:{
      NumberInput
    },

    data(){
      return {
        talkIcon: require('./icon/talk.png'),
        carIcon: require('./icon/card.png'),
        showMsg: 'none',
        currentSize:{},
        isBuy: false
      }
    },
    methods:{
      toNumber(number){
        this.currentSize.number = number
      },
      // 跳转到订单页面
      toOrderPage(){
        console.log('确认订单')
        console.log(this.product)
        console.log(this.currentSize)
      },
      // 加入到购物车
      toAddCar(){
        let product = {
          uuid: uuid(),
          pid:this.product.id,
          name:this.product.name,
          pic:this.currentSize.pic,
          price:this.currentSize.price,
          desc:this.currentSize.desc,
          number: this.currentSize.number||1
        }
        let carList = wx.getStorageSync('carList')||[]
        let isFlag = false
        carList.map(item=>{
          if (product.pid === item.pid && product.desc === item.desc){
            item.number += product.number
            isFlag = true
          }
        })
        if (!isFlag){
          carList.push(product)
        }
        wx.setStorageSync('carList',carList)
      },
      hide(){
        this.showMsg = 'none'
      },
      sizeTouch(sizeObj){
        this.product.sizeJson.map(item=>{
          if (item.desc===sizeObj.desc){
            item.color = '#fff'
            item.bg = 'orangered'
            item.checked = true
            this.currentSize = item
          }else{
            item.color = 'orangered'
            item.bg = '#fff'
            item.checked = false
          }
        })
      },
      toCarPage(){
        console.log('购物车页面')
        wx.navigateTo({
          url: `../buy-car/main`
        })
      },
      addToCar(){
        this.showMsg = 'block'
        this.isBuy = false
      },
      toBuy(){
        this.showMsg = 'block'
        this.isBuy = true
      }
    }
  }
</script>
<style scoped>
  .contact-btn{
    border-color: rgba(0,0,0,0);
    position:absolute;
    top: 0;
    bottom:0;
    left:0;
    width: 100%;
    background: rgba(0,0,0,0);
    width: 100rpx;
    height: 100rpx;
    z-index: 99999999;
  }
  .contact-btn:before,.contact-btn:after{
    border:none;
  }
  .shadow{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10000rpx;
    overflow: hidden;
    background: rgba(0,0,0,0.6)
  }
  .prod-msg{
    display:flex;
    flex-direction:column;
    position: absolute;
    background: #fff;
    bottom: 0;
    width: 100%;
    z-index: 100000000000;
    padding: 20rpx 30rpx
  }
  .size{
    margin-left:30rpx;
    font-size: 30rpx;
    font-weight: 400;
    border: 1rpx solid orangered;
    padding: 10rpx 20rpx
  }
  .bottom-btn{
    width: 440rpx;
    margin: 40rpx 0 40rpx 120rpx
  }
</style>
