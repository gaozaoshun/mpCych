<template>
  <div>
    <img :src="news.cover" style="width: 100%">
    <span style="display:inline-block;font-size: 36rpx;letter-spacing:1rpx;font-weight: bold;padding: 20rpx">{{news.title}}</span><br>
    <div>
      <rich-text :nodes="news.content"></rich-text>
    </div>
    <div class="prods-wrapper">
      <div style="text-align: center;margin-top: 20rpx">
        <img :src="linkIcon" style="width: 30rpx;height: 30rpx;vertical-align: middle">
        <span style="font-size: 30rpx;vertical-align: middle"> 解毒传送门</span>
      </div>
      <template v-for="item in products">
        <sell-card :prod="item" @toBuy="toBuy"></sell-card>
      </template>
    </div>
  </div>
</template>
<script>
  import {serverPath} from '@/config/index'
  import SellCard from '@/components/sell-card/sell-card'

  export default {
    data(){
      return {
        linkIcon: require('../../../static/icon/news/link.png'),
        news:{},
        products:[]
      }
    },
    components:{
      SellCard
    },
    watch:{
      news(){
        this.ajaxGetProducts(this.news.prodIds)
      }
    },
    mounted(){
      // loading动画
      wx.showLoading({title: '加载中'})
      let params = this.$root.$mp.query
      let id = params.id
      this.ajaxGetEssay(id)
    },
    methods:{
      toBuy(item){
      },
      ajaxGetEssay(id){
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/essay/${id}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              $this.news = result.data

            }else{
              wx.showToast({title:result.msg})
            }
            wx.hideLoading()
          },
          fail(res){
            wx.showToast({title:'网络错误'})
            wx.hideLoading()
          }
        })
      },
      ajaxGetProducts(ids){
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/products/id/${ids}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              $this.products = result.data
            }else{
              wx.showToast({title:result.msg})
            }
          },
          fail(res){
            wx.showToast({title:'网络错误'})
          }
        })
      }
    }
  }
</script>
<style scoped>
  .prods-wrapper{
    border-top: 20rpx solid rgba(0,0,0,0.2);
  }
</style>
