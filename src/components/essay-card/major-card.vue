<template>
  <div style="display: flex;flex-direction: column" @click="jumpToEssay">
    <div>
      <img :src="essay.cover" :style="{width: width+'px',height:width/2+'px'}">
    </div>
    <div style="font-size: 30rpx;color:#515151;padding: 20rpx 0;border-bottom: 1rpx solid rgba(0,0,0,0.2)">{{essay.title}}</div>
    <div style="display: flex;justify-content: space-between;padding: 20rpx 0 ">
      <div>
        <img :src="essay.avatar" style="width: 50rpx;height: 50rpx;vertical-align: middle;border-radius: 50%">
        <span style="font-size: 25rpx;color:#515151;vertical-align: middle;display: inline-block;width: 300rpx;overflow: hidden;white-space:nowrap;text-overflow: ellipsis"> {{essay.author}}</span>
      </div>
      <div style="display: flex;justify-content: space-between">
        <div style="margin-right: 40rpx">
          <img :src="pvImg" style="width:40rpx;height:40rpx;vertical-align: middle">
          <span style="font-size: 20rpx;color:#515151;vertical-align: middle"> {{essay.browserNum}}</span>
        </div>
        <div>
          <img :src="fwImg" style="width:40rpx;height:40rpx;vertical-align: middle">
          <span style="font-size: 20rpx;color:#515151;vertical-align: middle"> {{essay.sendNum}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      essay: {
        type: Object
      },
      width:{
        type: Number
      }
    },
    data() {
      return {
        pvImg: require('../../../static/icon/card/browse.png'),
        fwImg: require('../../../static/icon/card/send.png')
      }
    },
    methods: {
      jumpToEssay() {
        wx.navigateTo({
          url: `../news/main?id=${this.essay.id}`
        })
      }
    }
  }
</script>
<style scoped>

</style>
