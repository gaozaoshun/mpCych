<template>
  <div v-show="show" class="nomore-wrapper">
    <span class="nomore">{{text}}</span>
  </div>
</template>
<script>
  export default {
    props:{
      text:{
        type:String,
        default: '我是有底线的'
      },
      show:{
        type:Boolean,
        default: false
      }
    }
  }
</script>
<style scoped>
  .nomore-wrapper{
    position: relative;
    font-size: 25rpx;
    text-align: center;
    line-height: 100rpx;
    height: 100rpx;
    color:rgba(0,0,0,0.3)
  }
  .nomore:before,.nomore:after{
    position: absolute;
    content: '';
    width: 10%;
    height: 2rpx;
    top:50%;
    background: rgba(0,0,0,0.3);
  }
  .nomore:before{
    left: 20%;
  }
  .nomore:after{
    right: 20%;
  }
</style>
