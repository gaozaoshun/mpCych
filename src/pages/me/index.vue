<template>
  <div style="display: flex;flex-direction: column;color: #515151;">

    <div>
      <div style="text-align: center;border-bottom: 16rpx solid rgba(0,0,0,0.1)">
        <div style="display:inline-block;margin-top:30rpx;width: 150rpx;height: 150rpx;border-radius: 50%;border: 4rpx solid #fff;box-shadow: 3rpx 3rpx 4rpx rgba(0,0,0,0.2)">
          <img :src="userInfo.avatarUrl" style="width: 150rpx;height: 150rpx;border-radius: 50%;">
        </div>
        <div style="font-size: 25rpx;margin: 20rpx auto 40rpx auto">{{userInfo.nickName}}</div>
      </div>
    </div>

    <div style="display: flex;justify-content: space-between;padding: 20rpx;border-bottom: 16rpx solid rgba(0,0,0,0.1)">
      <div>
        <img :src="phoneIcon" style="width: 30rpx;height: 30rpx;vertical-align: middle">
        <span style="font-size: 25rpx;vertical-align: middle;color: #515151;"> 找不到订单或优惠券？绑定手机试试</span>
      </div>
      <div>
        <span @touchstart="bindPhone" style="border: 1rpx solid orangered;color: orangered;font-size: 20rpx;padding: 7rpx 15rpx;vertical-align: middle;display:inline-block;box-shadow: 10rpx">立即绑定</span>
      </div>
    </div>

    <div style="display: flex;flex-direction: column;border-bottom: 16rpx solid rgba(0,0,0,0.1)">
      <div style="display:flex;justify-content:space-between;padding: 20rpx 20rpx 20rpx 0;margin-left: 20rpx;border-bottom: 1rpx solid rgba(0,0,0,0.1)">
        <div>
          <span style="font-size:25rpx;vertical-align: middle">我的订单</span>
        </div>
        <div @click="queryALlOrder">
          <span style="font-size: 20rpx;vertical-align: middle">查看全部订单 </span>
          <img :src="rightIcon" style="width: 20rpx;height: 20rpx;vertical-align: middle">
        </div>
      </div>
      <div style="display: flex;justify-content: space-around;margin: 40rpx 0">
        <div style="display: flex;flex-direction: column;justify-content: space-around;">
          <div style="text-align: center;">
            <img :src="toPayIcon" style="width: 45rpx;height: 45rpx">
          </div>
          <div>
            <span style="font-size: 20rpx">待付款</span>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: space-around">
          <div style="text-align: center;">
            <img :src="toSendIcon" style="width: 45rpx;height: 45rpx">
          </div>
          <div>
            <span style="font-size: 20rpx">待发货</span>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: space-around">
          <div style="text-align: center;">
            <img :src="sendedIcon" style="width: 45rpx;height: 45rpx">
          </div>
          <div>
            <span style="font-size: 20rpx">已发货</span>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: space-around">
          <div style="text-align: center;">
            <img :src="finishIcon" style="width: 45rpx;height: 45rpx">
          </div>
          <div>
            <span style="font-size: 20rpx">已完成</span>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex;justify-content: space-between;padding: 20rpx ;border-bottom: 16rpx solid rgba(0,0,0,0.1)">
      <div>
        <span style="font-size:25rpx;vertical-align: middle">购物车</span>
      </div>
      <div @click="queryShopCar">
        <img :src="rightIcon" style="width: 20rpx;height: 20rpx;vertical-align: middle">
      </div>
    </div>

    <div style="display: flex;flex-direction: column">
      <div style="display: flex;justify-content: space-between;padding: 20rpx 20rpx 20rpx 0;margin-left:20rpx;border-bottom: 1rpx solid rgba(0,0,0,0.1)">
        <div>
          <span style="font-size:25rpx;vertical-align: middle">地址管理</span>
        </div>
        <div @click="queryAddress">
          <img :src="rightIcon" style="width: 20rpx;height: 20rpx;vertical-align: middle">
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;padding: 20rpx 20rpx 20rpx 0;margin-left:20rpx;border-bottom: 1rpx solid rgba(0,0,0,0.1)">
        <div>
          <span style="font-size:25rpx;vertical-align: middle">我的会员卡</span>
        </div>
        <div @click="queryShopCar">
          <img :src="rightIcon" style="width: 20rpx;height: 20rpx;vertical-align: middle">
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;padding: 20rpx 20rpx 20rpx 0;margin-left:20rpx;border-bottom: 1rpx solid rgba(0,0,0,0.1)">
        <div>
          <span style="font-size:25rpx;vertical-align: middle">我的积分</span>
        </div>
        <div @click="queryShopCar">
          <img :src="rightIcon" style="width: 20rpx;height: 20rpx;vertical-align: middle">
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;padding: 20rpx 20rpx 20rpx 0;margin-left:20rpx;border-bottom: 1rpx solid rgba(0,0,0,0.1)">
        <div>
          <span style="font-size:25rpx;vertical-align: middle">我的优惠券</span>
        </div>
        <div @click="queryShopCar">
          <img :src="rightIcon" style="width: 20rpx;height: 20rpx;vertical-align: middle">
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;padding: 20rpx 20rpx 20rpx 0;margin-left:20rpx;">
        <div>
          <span style="font-size:25rpx;vertical-align: middle">我的优惠码</span>
        </div>
        <div @click="queryShopCar">
          <img :src="rightIcon" style="width: 20rpx;height: 20rpx;vertical-align: middle">
        </div>
      </div>
    </div>

    <div style="width: 100%;height: 100rpx;background: rgba(0,0,0,0.1);text-align: center;line-height: 100rpx;font-size: 20rpx">
      高灶顺
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      rightIcon: require('../../../static/icon/me/right.png'),
      phoneIcon: require('../../../static/icon/me/phone.png'),
      toPayIcon: require('../../../static/icon/me/topay.png'),
      toSendIcon: require('../../../static/icon/me/tosend.png'),
      sendedIcon: require('../../../static/icon/me/sended.png'),
      finishIcon: require('../../../static/icon/me/finished.png'),
      userInfo: wx.getStorageSync('userInfo')
    }
  },

  components: {

  },

  methods: {
    // 立即绑定
    bindPhone(){

    },
    // 查看全部订单
    queryALlOrder(){

    },
    // 查看购物车
    queryShopCar(){

    },
    // 地址管理
    queryAddress(){

    }
  },

  created () {
    // loading动画
    wx.showLoading({title: '加载中'})
    wx.hideLoading()
  }
}
</script>

<style scoped>

</style>
