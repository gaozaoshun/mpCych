<template>
  <div class="card-wrapper" @click="showNewsDetail">
    <div>
      <img :src="news.cover" style="width: 100%">
    </div>
    <div style="padding: 0 25rpx">
      <span style="display:inline-block;font-size: 36rpx;letter-spacing:1rpx;font-weight: bold;padding: 18rpx 0 10rpx 0">{{news.title}}</span><br>
      <span style="font-size: 25rpx;letter-spacing:1rpx;color:rgba(0,0,0,0.5)">{{news.descp}}</span><br>
      <div class="item-div">
        <img :src="pvImg" class="icon-img">
        <span class="pv-text">{{news.browserNum}}</span>
      </div>
      <div class="item-div">
        <img :src="fwImg" class="icon-img">
        <span class="pv-text">{{news.sendNum}}</span>
      </div>
      <div class="item-div" style="position: relative;">
        <span class="pv-text" style="border: 1px solid #a8a8a8;font-size: 25rpx;color:#a8a8a8;padding: 4rpx 8rpx;position: absolute;top: -10rpx;right: -30rpx;">详情</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        pvImg: require('../../../static/icon/card/browse.png'),
        fwImg: require('../../../static/icon/card/send.png')
      }
    },
    props: {
      news:{
        type:Object
      }
    },
    methods:{
      showNewsDetail(){
        this.$emit('showNewsDetail',this.news)
      }
    }
  }
</script>

<style scoped>
  .card-wrapper{
    display: flex;
    flex-direction: column;
  }
  .icon-img{
    width: 40rpx;
    height: 40rpx;
  }
  .pv-text{
    font-size: 27rpx;
    color: #a8a8a8;
    vertical-align: top;
  }
  .item-div{
    display: inline-block;
    width: 200rpx;
    padding: 20rpx 20rpx 20rpx 0;
  }
</style>
