<template>
  <div style="display: flex;margin: 20rpx;border: 1rpx solid rgba(0,0,0,0.1);box-shadow: 3rpx 3rpx 4rpx rgba(0,0,0,0.1)" @click="jumpToEssay">
    <div style="padding: 20rpx;width: 200rpx;height: 200rpx">
      <img :src="essay.cover" style="width: 200rpx;height: 200rpx">
    </div>
    <div style="display: flex;flex-direction: column;padding: 20rpx;justify-content: space-between">
      <div style="font-size: 30rpx;color: rgba(0,0,0,0.7)">{{essay.title}}</div>
      <div style="display: flex;justify-content: space-between">
        <div>
          <img :src="essay.avator" style="width: 40rpx;height: 40rpx;vertical-align: middle;border-radius: 50%">
          <span style="font-size:25rpx;vertical-align: middle;margin-left: 10rpx;">{{essay.author}}</span>
        </div>
        <div>
          <img :src="pvImg" style="width: 40rpx;height: 40rpx;vertical-align: middle">
          <span style="font-size:20rpx;color: #515151;vertical-align: middle">{{essay.browserNum}}</span>
        </div>
        <div>
          <img :src="fwImg" style="width: 40rpx;height: 40rpx;vertical-align: middle">
          <span style="font-size:20rpx;color: #515151;vertical-align: middle">{{essay.sendNum}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      essay:{
        type: Object
      }
    },
    data(){
      return {
        pvImg: require('../../../static/icon/card/browse.png'),
        fwImg: require('../../../static/icon/card/send.png')
      }
    },
    methods:{
      jumpToEssay(){
        wx.navigateTo({
          url: `../news/main?id=${this.essay.id}`
        })
      }
    }
  }
</script>
<style scoped>

</style>
