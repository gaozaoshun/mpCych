<template>
  <div>
    <div class="top-wrapper" :style="{background: topBg}">
      <div class="pad-20">
        <img :src="searchIcon" class="top-icon" @touchstart="showSearchList">
      </div>
      <div>
        <img :src="ownIcon" class="top-icon" style="height: 100rpx;width: 100rpx">
      </div>
      <div class="pad-20">
        <img :src="scanIcon" class="top-icon" @touchstart="showScanner">
      </div>
    </div>

    <scroll-view class="scroller-pos" scroll-y :scroll-into-view="scrollView" :scroll-top="scrollTop" enable-back-to-top="true" @scrolltolower="scrollToLower" @scroll="scrollAction">
      <div id="scrollTopIndex"></div>
      <swiper indicator-dots autoplay circular :style="{width: screenWidth+'px',height: screenWidth+'px'}">
        <template v-for="(item,index) in navbarList">
          <swiper-item>
            <img :src="item.img" :style="{width: screenWidth+'px',height: screenWidth+'px'}" @click="clickNavbar(item)">
          </swiper-item>
        </template>
      </swiper>

      <div class="type-wrapper">
        <div v-for="item in hotTypeList" :key="item.id">
          <div class="type-img" style="position: relative;margin: 20rpx 10rpx;" @click="showNewsList(item)">
            <img :src="item.icon" class="type-img">
            <span class="type-name">{{item.name}}</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 10rpx" v-for="(item,index) in recommendList">
        <list-card :newsList="item.newsList" :hotTypeImg="item.hotTypeImg" :prodList="item.prodList" @showNewsDetail="showNewsDetail"></list-card>
      </div>

     <bottom-loading :show="showLoading"></bottom-loading>
    </scroll-view>
    <div :style="{display:showTop}" class="to-top" @touchstart="scrollToTop">
      <img :src="toTopIcon" style="width: 80rpx;height:80rpx">
    </div>
  </div>
</template>

<script>
  import ListCard from '@/components/list-card/list-card'
  import BottomLoading from '@/components/bottom-loading/bottom-loading'
  import {serverPath} from '@/config/index'

  export default {
    data() {
      return {
        topBg: 'rgba(0,0,0,0.01)',
        searchIcon: require('../../../static/icon/index/search_list.png'),
        scanIcon: require('../../../static/icon/index/scan.png'),
        ownIcon: require('../../../static/icon/index/fac.png'),
        toTopIcon: require('../../../static/icon/index/totop.png'),
        userInfo: {},
        navbarList: [],
        typeList: [],
        hotTypeList: [],
        screenWidth: 0,
        showLoading: false,
        recommendList: [],
        showTop: 'none',
        currentScrollTop: 0,
        scrollView: '',
        offset: 3,
        start:0,
        isFinished: false
      }
    },
    mounted() {
      // 请求Navbar
      this.ajaxNavBarList()
      // 请求ProdTypeList
      this.ajaxProdTypeList()
      // 请求listCard
      this.ajaxListCard()
      this.screenWidth = wx.getSystemInfoSync().screenWidth
    },
    components: {
      ListCard,
      BottomLoading
    },
    methods: {
      ajaxListCard(){
        if (this.isFinished){
          return
        }
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/listCard/${$this.start}/${$this.offset}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              let newsList = result.data.newsList
              newsList.map(item=>{
                item.content = null
                return item
              })
              let prodList = result.data.prodList
              prodList.map(item=>{
                item.cover = item.covers.split(',')[0]
                item.showMore = 'none'
                item.detail = null
                item.covers = null
                item.oldPrice=null
                return item
              })
              prodList[prodList.length-1].showMore = 'block'
              $this.recommendList.push(result.data)
              $this.start += $this.offset
            }else if (result.code==='666'){
              $this.isFinished = true
              wx.showToast({title:result.msg,mask:true})
            }else{
              wx.showToast({title:result.msg,mask:true})
            }
            $this.showLoading = false
          },
          fail(res){
            wx.showToast({title:'数据加载出错',mask:true})
          }
        })
      },
      ajaxProdTypeList(){
        let $this = this
          wx.request({
            method: 'GET',
            url: `${serverPath}/api/v1/prodTypes`,
            success(res){
              let result = res.data
              if (result.code==='000'){
                $this.typeList = result.data
                wx.setStorage({
                  key: 'prodTypeList',
                  data: $this.typeList
                })
                // 热门类型：前四个
                $this.splitHotTypeList()
              }else {
                wx.showToast({title:result.msg,mask:true})
              }
            },
            fail(res){
              wx.showToast({title:'数据加载出错',mask:true})
            }
          })
      },
      clickNavbar(item){
        wx.navigateTo({
          url: `../news/main?id=${item.essayId}`
        })
      },
      ajaxNavBarList(){
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/navbars`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              $this.navbarList = result.data
            }else {
              wx.showToast({title:result.msg,mask:true})
            }
          },
          fail(res){
            wx.showToast({title:'数据加载出错',mask:true})
          }
        })
      },
      showNewsDetail(news){
        wx.navigateTo({
          url: `../news/main?id=${news.id}`
        })
      },
      scrollToTop(){
        this.scrollView = 'scrollTopIndex'
      },
      scrollAction(event) {
        this.scrollView = ''
        // 向下滚动显示回到顶部图标
        let scrollTop = event.target.scrollTop
        if (scrollTop > this.currentScrollTop) {
          this.showTop = 'block'
        }else{
          this.showTop = 'none'
        }
        this.currentScrollTop = scrollTop
        let percent = event.target.scrollTop / event.target.scrollHeight
        this.topBg = `rgba(0,0,0,${percent})`
      },
      showNewsList(item) {
        // 点击更多
        if (item.id === 0) {
          this.hotTypeList = [].concat(this.typeList)
          this.hotTypeList.push({
            id: -1,
            icon: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665768463,1379528697&fm=200&gp=0.jpg',
            name: '收起'
          })
          // 点击收起
        } else if (item.id === -1) {
          this.splitHotTypeList()
          // 商店
        }else if(item.id === 1){
          wx.switchTab({
            url: '../shop/main'
          });
          // 点击商品类型
        }else{
          wx.navigateTo({
            url: `../essay-list/main?essayIds=${item.essayIds}&title=${item.name}`
          })
        }
      },
      splitHotTypeList() {
        this.hotTypeList = this.typeList.filter((item, index) => {
          return index < 4
        })
        this.hotTypeList.push({
          id: 0,
          icon: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665768463,1379528697&fm=200&gp=0.jpg',
          name: '更多'
        })
      },
      scrollToLower() {
        this.showLoading = true
        this.ajaxListCard()
      },
      showSearchList() {
        wx.navigateTo({
          url: `../search/main`
        })
      },
      showScanner() {
        wx.scanCode({
          success(res) {
            let result = res.result
            //todo 跳转到对应的毒文或产品页
          }
        })
      }
    },
    created() {
      // loading动画
      wx.showLoading({title: '加载中'})
      this.userInfo = wx.getStorageSync('userInfo')
      console.log(this.userInfo)
      wx.hideLoading()
    }
  }
</script>

<style scoped>
  .top-wrapper {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    line-height: 120rpx;
  }

  .scroller-pos {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  .top-icon {
    height: 50rpx;
    width: 50rpx;
  }

  .pad-20 {
    padding-left: 20rpx;
    padding-right: 20rpx;
  }

  .type-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.01);
  }

  .type-img {
    width: 120rpx;
    height: 120rpx;

  }

  .type-name {
    display: block;
    position: absolute;
    z-index: 100;
    top: 40rpx;
    left: 32rpx;
    font-size: 28rpx;
    color: #fff;
  }


  .to-top {
    position: fixed;
    bottom: 20rpx;
    right: 20rpx;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%
  }
</style>
