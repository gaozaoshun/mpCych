<template>
  <div class="prod-card-wrapper" :style="{background:theme}" @click="toPage">
    <div style="position: relative">
      <img :src="prod.cover" class="prod-img">
      <span style="display:block;position:absolute;bottom:10rpx;right:10rpx;color:red;font-size: 25rpx;font-weight: bold" v-if="prod.newPrice">￥{{prod.newPrice}}</span>
    </div>
    <div style="padding: 0 10rpx">
      <div class="text" :style="{color:color}" v-if="prod.name">{{prod.name}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    props:{
      prod:{
        type:Object
      },
      theme:{
        type:String,
        default: '#000'
      }
    },
    computed:{
      color(){
        if (this.theme==='#000'){
          return '#fff'
        }else{
          return '#000'
        }
      }
    },
    methods:{
      toPage(){
        wx.navigateTo({
          url: `../prod-detail/main?pid=${this.prod.id}`
        })
      }
    }
  }
</script>
<style scoped>
  .prod-card-wrapper{
    display: flex;
    flex-direction: column;
    width: 200rpx;
    height: 290rpx;
    border:1px solid rgba(0,0,0,0.1);
    box-shadow: 3rpx 3rpx 4rpx rgba(0,0,0,0.1);
  }
  .prod-img{
    width: 200rpx;
    height: 200rpx;
  }
  .text{
    width: 180rpx;
    font-size: 22rpx;
    display: -webkit-box;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
