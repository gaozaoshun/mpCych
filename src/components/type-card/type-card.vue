<template>
  <div :style="{width:width+'px',height:width*0.75+'px'}" class="wrapper">
    <img :src="cover" :style="{width:width+'px',height:width*0.75+'px'}">
    <div style="position: absolute;top: 0;bottom: 0;width: 100%;background: rgba(0,0,0,0.5)"></div>
    <div class="title">{{title}}</div>
    <div class="content">
      <scroll-view scroll-x style="overflow: hidden;white-space: nowrap">
        <div style="display: flex;">
        <div v-for="item in productList" :key="item.id" style="margin: 0 20rpx 20rpx 20rpx;position: relative">
          <prod-card theme="#fff" :prod="item"></prod-card>
          <div @click="skipShop" v-bind:style="{display:item.showMore,position: 'absolute',top: '0',left:'0',width: '205rpx',height: '295rpx',textAlign:'center',background: 'rgba(0,0,0,0.6)',zIndex: '99999'}">
            <span style="line-height:290rpx;font-size:25rpx;color: #fff;border: 1rpx solid #fff;border-radius: 40rpx;letter-spacing: 2rpx;padding: 5rpx 20rpx 5rpx 24rpx">查看更多</span>
          </div>
        </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
  import ProdCard from '@/components/prod-card/prod-card'

  export default {

    components:{
      ProdCard
    },
    data(){
      return {
        width: wx.getSystemInfoSync().screenWidth
      }
    },
    props:{
      title: {
        type: String,
        default: '推荐'
      },
      cover:{
        type:String
      },
      prodList:{
        type: Array
      }
    },
    computed:{
      productList(){
        let prodList = this.prodList.map(item=>{
          item.showMore = 'none'
          return item
        })
        prodList[prodList.length-1].showMore = 'block'
        return prodList
      }
    }
  }
</script>
<style scoped>
  .wrapper{
    position: relative;
  }
  .title{
    position: absolute;
    top: 40rpx;
    left: 50%;
    transform: translate(-50%,0);
    font-weight: bold;
    font-size: 50rpx;
    color:#fff;
    z-index: 1000;
  }
  .title:before,.title:after{
    content: '';
    position: absolute;
    width: 200rpx;
    height: 4rpx;
    top:50%;
    background: #fff;
  }
  .title:before{
    left: 150%;
  }
  .title:after{
    right:150%;
  }
  .content{
    position: absolute;
    width: 100%;
    top:160rpx;
    left: 0;
    z-index: 1000;

  }
</style>
