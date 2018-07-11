<template>
  <div>
    <!--菜单-->
    <div style="position: fixed;top: 0;left:0;width:100%;height: 60rpx;background: #000;z-index: 999999;">
      <scroll-view scroll-x :scroll-left="scrollLeft" style="overflow: hidden;white-space: nowrap;">
        <template v-for="item in prodTypeList" >
          <div @click="tabItem(item,$event)" :style="{fontSize:item.fontSize,color:item.color,fontWeight:item.fontWeight}" :key="item.id" class="tab-item">
            {{item.name}}
          </div>
        </template>
      </scroll-view>
    </div>

    <!--推荐-->
    <div :style="{display:prodTypeList[0].display}">
      <scroll-view scroll-y @scrolltolower="scrollToLower(prodTypeList[0])" style="position: absolute;top: 60rpx;bottom: 0;width: 100%">
        <div style="position: relative;top: 0rpx;width: 100%;display: flex;flex-direction: column">

          <!--焦点banner图-->
          <div>
            <swiper indicator-dots autoplay circular :style="{width: screenWidth+'px',height: swiperHeight+'px'}">
              <template v-for="(item,index) in navbarList">
                <swiper-item>
                  <img :src="item.img" :style="{width: screenWidth+'px',height: swiperHeight+'px'}">
                </swiper-item>
              </template>
            </swiper>
          </div>

          <!--商品滚动banner-->
          <div style="display:flex;flex-direction:column;border-top: 20rpx solid rgba(0,0,0,0.1);position: relative">
            <div style="font-size: 25rpx;color:#515151;padding-left: 20rpx;margin-top: 20rpx">毒家新品
              <img @click="toProdPage" :src="rightIcon" style="position:absolute;width: 30rpx;height: 30rpx;top: 25rpx;right: 20rpx">
            </div>
            <div>
              <scroll-view scroll-x style="overflow: hidden;white-space: nowrap;">
                <div style="position:relative;display: inline-block;padding: 20rpx" v-for="item in newProdList" :key="item.id">
                  <prod-card :prod="item" theme="#fff"></prod-card>
                </div>
                <div @click="toProdPage" style="position:absolute;padding: 20rpx;display: inline-block;width: 200rpx;height: 290rpx;">
                  <div style="width: 200rpx;height: 200rpx;border: 1rpx solid rgba(0,0,0,0.1);box-shadow: 3rpx 3rpx 4rpx rgba(0,0,0,0.1); text-align: center;line-height: 180rpx">
                    <div style="width: 200rpx;height: 200rpx;">
                      <div style="font-size: 25rpx;color: #515151;height: 30rpx">查看全部</div><br>
                      <div style="display:inline-block;letter-spacing: 10rpx;text-indent: 10rpx;font-size: 20rpx;color:rgba(0,0,0,0.2);height: 30rpx">MORE</div>
                    </div>
                  </div>
                </div>
              </scroll-view>
            </div>
          </div>

          <!--专题列表-->
          <div style="display:flex;flex-direction:column;border-top: 20rpx solid rgba(0,0,0,0.1);">
            <div style="text-align: center;padding-top: 10rpx">
              <img :src="majorIcon" style="width: 30rpx;height: 30rpx;vertical-align: middle">
              <span style="font-size: 25rpx;color:#515151;vertical-align: middle"> 专题</span>
            </div>
            <template v-for="item in bigMajorList">
              <div :style="{padding: textImgPad+'rpx',paddingBottom:'0rpx'}" :key="item.id">
                <text-img :value="item" :width="textImgWidth" @toPage="toPage"></text-img>
              </div>
            </template>
            <div :style="{padding: textImgPad+'rpx'}" class="text-img-hr">
              <text-img  @toPage="toPage" v-for="item in smallMajorList" :key="item.id" :value="item" :width="textImgWidth/2-5"></text-img>
            </div>
          </div>

          <!--大家推荐-->
          <div style="display:flex;border-top: 20rpx solid rgba(0,0,0,0.1);padding:20rpx">
            <div style="flex-grow: 1;display: flex;flex-direction: column">
              <div style="font-size:30rpx">毒友推荐</div>
              <div style="font-size: 25rpx;color:orangered;margin-bottom: 8rpx">大家都在买</div>
              <div style="display: flex;justify-content: space-between">
                <div v-for="item in recommendList" @click="toProductPage(item)">
                  <img :src="item.cover" :style="{width:(width-50)/4+'px',height:(width-50)/4+'px'}">
                </div>
              </div>
            </div>
          </div>

          <!--菜单推荐-->
          <div v-for="item in prodInfoList" style="border-top: 20rpx solid rgba(0,0,0,0.1);">
            <type-card :title="item.prodType.name" :cover="item.prodType.icon" :prodList="item.prodList"></type-card>
          </div>

          <!--菜单列表-->
          <div style="display: flex;justify-content: space-between;flex-wrap: wrap;padding: 40rpx">
            <div v-for="item in prodTypeList" style="position: relative;">
              <img :src="item.icon" style="width: 150rpx;height: 100rpx;">
              <div style="position: absolute;top: 50%;left: 50%;transform:translate(-50%,-50%);font-size: 25rpx;color: #fff;z-index: 1000">{{item.name}}</div>
              <div style="position: absolute;top: 0;left: 0;width: 150rpx;height: 100rpx;background: rgba(0,0,0,0.5);z-index: 100"></div>
            </div>
          </div>

          <!--全部毒物-->
          <div style="display: flex;flex-direction: column">
            <div class="all-prod-wrapper">全部毒物</div>
            <div style="display: flex;flex-wrap: wrap;justify-content: space-between;padding: 40rpx 20rpx">
              <div v-for="item in prodList" :key="item.id" style="padding: 10rpx">
                <prod-card2 :prod="item"></prod-card2>
              </div>
            </div>
          </div>
        </div>
        <bottom-loading :show="showLoading"></bottom-loading>
        <finish-line :show="isEnd"></finish-line>
      </scroll-view>
    </div>

    <!--其他菜单-->
    <div v-for="(prodType,typeIndex) in prodTypeList" :key="typeIndex" :style="{display:prodType.display}" v-if="typeIndex>0" class="other-menu">
      <scroll-view scroll-y style="position: absolute;top: 60rpx;bottom: 0;width: 100%" @scrolltolower="scrollToLower(prodType)">
        <!--焦点banner图-->
        <div>
          <swiper indicator-dots autoplay circular :style="{width: screenWidth+'px',height: swiperHeight+'px'}">
            <template v-for="(item,index) in navbarList">
              <swiper-item>
                <img :src="item.img" :style="{width: screenWidth+'px',height: swiperHeight+'px'}">
              </swiper-item>
            </template>
          </swiper>
        </div>

        <div style="display: flex;flex-direction: column;margin-top: 40rpx">
          <div class="all-prod-wrapper">{{prodType.name}}</div>
          <div style="display: flex;flex-wrap: wrap;justify-content: space-between;padding: 40rpx 20rpx">
            <div v-for="item in prodType.prodList" :key="item.id" style="padding: 10rpx">
              <prod-card2 :prod="item"></prod-card2>
            </div>
          </div>
        </div>
        <bottom-loading :show="showLoading"></bottom-loading>
        <finish-line :show="prodType.isEnd"></finish-line>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import {serverPath} from '@/config/index'
  import ProdCard from '@/components/prod-card/prod-card'
  import ProdCard2 from '@/components/prod-card/prod-card2'
  import TypeCard from '@/components/type-card/type-card'
  import TextImg from '@/components/text-img/text-img'
  import BottomLoading from '@/components/bottom-loading/bottom-loading'
  import FinishLine from '@/components/finish-line/finish-line'

  export default {
    data () {
      return {
        majorIcon: require('../../../static/icon/shop/major.png'),
        cover: require('../../../static/image/textImg.jpeg'),
        rightIcon: require('../../../static/icon/shop/right.png'),
        moreIcon: require('../../../static/icon/shop/more.png'),
        prodTypeList:[],
        scrollLeft: 0,
        screenWidth: 0,
        swiperHeight: 0,
        navbarList: [],
        newProdList:[],
        prodList:[],
        majorList:[],
        recommendList:[],
        prodInfoList:[],
        start:0,
        offset:10,
        orderBy:0,
        textImgWidth:0,
        textImgPad:20,
        width: wx.getSystemInfoSync().screenWidth,
        showLoading: false,
        prodStart:0,
        isEnd:false
      }
    },
    computed:{
      bigMajorList(){
        return this.majorList.slice(0,2)
      },
      smallMajorList(){
        return this.majorList.slice(2,4)
      }
    },

    components: {
      ProdCard,
      TextImg,
      TypeCard,
      ProdCard2,
      BottomLoading,
      FinishLine
    },
    methods: {
      scrollToLower(prodType){
        // 推荐滚动
        if (prodType.id===1){
          this.ajaxProdRecList()
        // 其他菜单
        }else{
          this.ajaxProdListForBrowerNum(prodType)
        }

      },
      toProductPage(item){
      },
      toPage(major){
        if (major.showMore){
          wx.navigateTo({
            url:`../major-list/main`
          })
        }else{
          wx.setStorageSync('major',major)
          wx.navigateTo({
            url:`../major-detail/main`
          })
        }
      },
      ajaxRecommendList(){
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/products/recommend/0/4`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              $this.recommendList = result.data.map(item=>{
                item.cover = item.covers.split(',')[0]
                return item
              })
            }else {
              wx.showToast({title:result.msg,mask:true})
            }
          },
          fail(res){
            wx.showToast({title:'数据加载出错',mask:true})
          }
        })
      },
      ajaxProdRecList(){
        if (this.isEnd){
          return
        }
        this.showLoading=true
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/products/browerNum/0/${$this.prodStart}/${$this.offset}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              let data = result.data
              data.map(item=>{
                item.cover = item.covers.split(',')[0]
                item.detail = null
                return item
              })
              $this.prodList = $this.prodList.concat(data)
              if (data.length === $this.offset){
                $this.prodStart += $this.offset
              }else{
                $this.isEnd=true
              }
            } else {
              wx.showToast({title:result.msg,mask:true})
            }
            $this.showLoading=false
          },
          fail(res){
            $this.showLoading=false
            wx.showToast({title:'数据加载出错',mask:true})
          }
        })
      },
      ajaxMajors(){
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/majors/order/0/0/4`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              let data = result.data
              data.map(item=>{
                item.showMore = false
                item.title = item.name.split('-')[0]||''
                item.content = item.name.split('-')[1]||''
              })
              data[data.length-1].showMore = true
              $this.majorList = data
            }else {
              wx.showToast({title:result.msg,mask:true})
            }
          },
          fail(res){
            wx.showToast({title:'数据加载出错',mask:true})
          }
        })
      },
      toProdPage(){
      },
      setProdTypeList(){
        let originProdTypeList = wx.getStorageSync('prodTypeList')
        originProdTypeList[0].name = '推荐'
        this.prodTypeList = originProdTypeList.map(item=>{
          item.color = '#eee'
          item.fontSize = '25rpx'
          item.fontWeight = '300'
          item.display = 'none'
          item.prodList = []
          item.start = 0
          item.offset = 10
          item.isEnd = false
          this.ajaxProdListForBrowerNum(item)
          return item
        })
        this.changeItemStyle(this.prodTypeList[0])
      },
      ajaxProdListForBrowerNum(prodType){
        if (prodType.isEnd){
          return
        }
        this.showLoading=true
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/products/type/${prodType.id}/browerNum/0/${prodType.start}/${prodType.offset}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              let data = result.data
              data.map(item=> {
                item.cover = item.covers.split(',')[0]
                item.covers = null
                item.detail = null
              })
              prodType.prodList = prodType.prodList.concat(data)
              if (data.length===prodType.offset){
                prodType.start += prodType.offset
              }else{
                prodType.isEnd = true
              }
              console.log(prodType.prodList)
            }else if(result.code==='666'){
              prodType.isEnd = true
            }else{
              wx.showToast({title:result.msg,mask:true})
            }
            $this.showLoading=false
          },
          fail(res){
            $this.showLoading=false
            wx.showToast({title:'数据加载出错',mask:true})
          }
        })
      },
      tabItem(item,e){
        // 选项居中
        this.scrollLeft = e.currentTarget.offsetLeft
        this.changeItemStyle(item)
      },
      changeItemStyle(prodType){
        this.prodTypeList.map(item=>{
          if (item.id === prodType.id){
            item.color = '#EE583A'
            item.fontSize = '35rpx'
            item.fontWeight = 'bold'
            item.display = 'block'
          }else{
            item.color = '#eee'
            item.fontSize = '25rpx'
            item.fontWeight = '300'
            item.display = 'none'
          }
          return item
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
      ajaxProdList(){
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/products/publishTime/${$this.orderBy}/${$this.start}/${$this.offset}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              result.data.map(item=>{
                item.cover = item.covers.split(',')[0]
              })
              $this.newProdList = $this.newProdList.concat(result.data)
            }else {
              wx.showToast({title:result.msg,mask:true})
            }
          },
          fail(res){
            wx.showToast({title:'数据加载出错',mask:true})
          }
        })
      },
      ajaxRecommendListForType(){
        this.prodInfoList = []
        this.prodTypeList.forEach(item=>{
          let $this = this
          wx.request({
            method: 'GET',
            url: `${serverPath}/api/v1/products/recommend/${item.id}/0/10`,
            success(res){
              let result = res.data
              if (result.code==='000'){
                let prodData = {prodType:item}
                prodData.prodList = result.data.map(item=>{
                  item.cover = item.covers.split(',')[0]
                  return item
                })
                $this.prodInfoList.push(prodData)
              }else {
                wx.showToast({title:result.msg,mask:true})
              }
            },
            fail(res){
              wx.showToast({title:'数据加载出错',mask:true})
            }
          })
        })
      }
    },
    onReady(){
      this.setProdTypeList()
    },
    mounted(){
      this.scrollLeft = 0
      this.screenWidth = wx.getSystemInfoSync().screenWidth
      this.swiperHeight = this.screenWidth / 2
      this.start = 0
      this.prodStart = 0
      this.offset = 10
      this.orderBy = 0
      this.newProdList = []
      this.majorList = []
      this.prodList = []
      this.textImgPad = 20
      this.textImgWidth = this.screenWidth - this.textImgPad
      this.isEnd = false
      this.showLoading = false
      // 请求Navbar
      this.ajaxNavBarList()
      // 请求prodTypeList
      this.ajaxProdList()
      // 请求专题
      this.ajaxMajors()
      // 请求推荐列表
      this.ajaxRecommendList()
      // 请求对应菜单的推荐产品列表
      this.ajaxRecommendListForType()
      // 请求全部毒品
      this.ajaxProdRecList()
    },
    created () {
    }
  }
</script>

<style scoped>
  .tab-item{
    display: inline-block;
    width: 100rpx;
    line-height:60rpx;
    text-align: center;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .text-img-hr{
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rpx;
  }
  .all-prod-wrapper{
    text-align: center;
    font-size: 25rpx;
    position: relative;
  }
  .all-prod-wrapper:before,.all-prod-wrapper:after{
    content: '';
    position: absolute;
    width: 20%;
    height: 2rpx;
    background: #000;
    top:50%;
  }
  .all-prod-wrapper:before{
    left: 20%;
  }
  .all-prod-wrapper:after{
    right: 20%;
  }
  .other-menu{
    position: absolute;
    top:0;
    bottom: 0;
    width: 100%;
  }
</style>
