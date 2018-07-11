<template>
  <div class="sell-wrapper">
    <div class="left-wrapper">
      <img :src="cover" class="left-img">
    </div>
    <div class="right-wrapper">
      <div style="margin: 10rpx 15rpx 0rpx 15rpx">
        <span style="font-size:30rpx;color:rgba(0,0,0,0.8);vertical-align: bottom;">{{prod.name}}</span>
      </div>
      <span style="position:absolute;bottom: 20rpx;left: 15rpx;font-weight: bold;color:red">￥{{prod.newPrice}}</span>
      <button @touchstart="toBuy(prod)" size="mini" type="warn" style="position: absolute;bottom: 20rpx;right:15rpx">去购买</button>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      prod:{
        type:Object
      }
    },
    computed:{
      cover(){
        return this.prod.covers.split(',')[0]
      }
    },
    methods:{
      toBuy(item){
        this.$emit('toBuy',item)
      }
    }
  }
</script>
<style scoped>
  .sell-wrapper{
    border: 1rpx solid #a8a8a8;
    margin:20rpx;
    display: flex;
    box-shadow: 6rpx 6rpx 8rpx rgba(0,0,0,0.2);
  }
  .left-wrapper{
    width: 200rpx;
    height: 200rpx;
    margin: 20rpx;
    border:1rpx solid rgba(0,0,0,0.1);
  }
  .left-img{
    width: 200rpx;
    height: 200rpx;
  }
  .right-wrapper{
    position: relative;
  }
</style>
