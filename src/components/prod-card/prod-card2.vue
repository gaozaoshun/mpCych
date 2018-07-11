<template>
  <div style="display: flex;flex-direction: column; border: 1rpx solid rgba(0,0,0,0.2);width: 330rpx;height: 490rpx">
    <div style="border-bottom: 1rpx solid rgba(0,0,0,0.1);width: 330rpx;height: 330rpx">
      <img :src="prod.cover" style="width: 330rpx;height: 330rpx">
    </div>
    <div style="height:65rpx;padding: 20rpx 10rpx">
      <span style="width: 320rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size: 25rpx;color: #515151;">{{prod.name}}</span>
    </div>
    <div style="display: flex; justify-content: space-between;padding: 0 10rpx">
      <div style="font-size: 25rpx;color: red;line-height: 34rpx">￥{{prod.newPrice}}元</div>
      <div style="width: 45rpx;height: 45rpx;text-align: center;line-height: 45rpx">
        <img :src="bag" style="width: 30rpx;height: 30rpx;">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        bag: require('../../../static/icon/shop/bag.png')
      }
    },
    props: {
      prod:{
        type: Object
      }
    },
    methods:{

    }
  }
</script>
