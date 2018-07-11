<template>
  <div style="display: inline-flex">
    <div @touchstart="detouchstart" @touchend="detouchend" :style="{background: debg}" :class="normalClass">-</div>
    <div>
      <input type="number" v-model="number" style="" :class="normalInput">
    </div>
    <div @touchstart="intouchstart" @touchend="intouchend" :style="{background: inbg}" :class="normalClass">+</div>
  </div>
</template>
<script>
  export default {
    props:{
      number:{
        type:Number,
        default: 1
      },
      size:{
        type:String,
        default:'normal'
      },
      item:{
        type: Object
      }
    },
    data(){
      return {
        debg:'#fff',
        inbg:'#fff',
        normalClass:'normal',
        normalInput:'normal-input'
      }
    },
    mounted(){
      if (this.size==='mini'){
        this.normalClass = 'mini'
        this.normalInput = 'mini-input'
      }
    },
    methods:{
      detouchstart(){
        this.debg = 'rgba(0,0,0,0.5)'
      },
      detouchend(){
        this.debg = '#fff'
        if (this.number>1)
          this.number--
        this.$emit('toNumber',this.number,this.item)
      },
      intouchstart(){
        this.inbg = 'rgba(0,0,0,0.5)'
      },
      intouchend(){
        this.inbg = '#fff'
        this.number++
        this.$emit('toNumber',this.number,this.item)
      }
    }
  }
</script>
<style scoped>
  .normal{
    padding: 10rpx 30rpx;
    border: 1rpx solid rgba(0,0,0,0.1);
    height: 50rpx;
  }
  .mini{
    padding: 0 15rpx 3rpx 15rpx;
    border: 1rpx solid rgba(0,0,0,0.1);
    height: 40rpx;
  }
  .normal-input{
    height: 50rpx;
    font-size:30rpx;
    text-align:center;
    padding: 10rpx 30rpx;
    border-top: 1rpx solid rgba(0,0,0,0.1);
    border-bottom: 1rpx solid rgba(0,0,0,0.1);
    width: 50rpx
  }
  .mini-input{
    height: 40rpx;
    font-size:20rpx;
    text-align:center;
    border-top: 1rpx solid rgba(0,0,0,0.1);
    border-bottom: 1rpx solid rgba(0,0,0,0.1);
    width: 40rpx
  }
</style>
