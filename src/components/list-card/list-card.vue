<template>
  <div>
      <div class="news-wrapper">
        <template v-for="item in newsList">
          <news-card :news="item" @showNewsDetail="showNewsDetail"></news-card>
        </template>
      </div>
      <div>
        <img :src="hotTypeImg" style="width: 100%">
      </div>

      <div class="bg-img">
        <div style="position:relative;width: 100%;height: 80rpx;text-align: center;line-height: 80rpx">
          <span style="color: #fff;font-size: 30rpx;">商店精选</span>
          <img @click="skipShop" :src="rightIcon" style="position:absolute;width: 30rpx;height: 30rpx;top: 25rpx;right: 20rpx">
        </div>
        <scroll-view scroll-x>
          <div style="display: flex;">
            <template v-for="(item,index) in prodList">
              <div style="margin: 0 20rpx 20rpx 20rpx;position: relative">
                <prod-card :prod="item"></prod-card>
                <div @click="skipShop" v-bind:style="{display:item.showMore,position: 'absolute',top: '0',left:'0',width: '200rpx',height: '280rpx',textAlign:'center',background: 'rgba(0,0,0,0.6)',zIndex: '99999'}">
                  <span style="line-height:290rpx;font-size:25rpx;color: #fff;border: 1rpx solid #fff;border-radius: 40rpx;letter-spacing: 2rpx;padding: 5rpx 20rpx 5rpx 24rpx">查看更多</span>
                </div>
              </div>
            </template>
          </div>
        </scroll-view>
      </div>
  </div>
</template>

<script>
  import NewsCard from '@/components/news-card/news-card'
  import ProdCard from '@/components/prod-card/prod-card'

  export default {
    props:{
      newsList:{
        type:Array
      },
      hotTypeImg:{
        type:String
      },
      prodList:{
        type:Array
      }
    },
    data() {
      return {
        rightIcon: require('../../../static/icon/index/right.png'),
        screenWidth:0,
      }
    },
    components: {
      NewsCard,
      ProdCard
    },
    methods: {
      skipShop(){
        wx.switchTab({
          url:'../shop/main'
        })
      },
      showNewsDetail(news){
        this.$emit('showNewsDetail',news)
      }
    }
  }
</script>

<style scoped>
  .news-wrapper{
    display: flex;
    flex-direction: column;
  }

  .bg-img{
    width: 100%;
    height: 400rpx;
    background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523449437811&di=c62ef961558652177b221e84c61013d1&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F13%2F20%2F25%2F38458PICFpB_1024.jpg') no-repeat center;
  }

</style>
