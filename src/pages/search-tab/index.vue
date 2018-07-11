<template>
  <div>
    <div v-if="type===0">
      <tab :tabList="tabList" @tabItem="tabItem"></tab>
      <div v-show="isEmpty" style="margin-top: 200rpx">
        <img :src="emptyIcon" style="width: 100%;">
      </div>
      <scroll-view scroll-y enable-back-to-top="true" @scrolltolower="scrollToLower" style="position: absolute;top:100rpx;bottom: 0;width: 100%">
        <div v-for="(item,tabIndex) in tabList" :key="item.id">
          <div v-show="showEssay" v-for="item in essayList">
            <essay-card :essay="item"></essay-card>
          </div>
          <div v-show="!showEssay"></div>
        </div>
        <bottom-loading :show="showLoading"></bottom-loading>
        <finish-line :show="isFinished"></finish-line>
      </scroll-view>
    </div>
    <div v-if="type===1">
      <scroll-view scroll-y enable-back-to-top="true" @scrolltolower="scrollToLower" style="position: absolute;top:0;bottom: 0;width: 100%">
        <div v-for="item in prodList" :key="item.id">
          <sell-card :prod="item"></sell-card>
        </div>
        <bottom-loading :show="showLoading"></bottom-loading>
        <finish-line :show="isFinished"></finish-line>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import Tab from '@/components/tab/tab'
  import EssayCard from '@/components/essay-card/essay-card'
  import SellCard from '@/components/sell-card/sell-card'
  import BottomLoading from '@/components/bottom-loading/bottom-loading'
  import FinishLine from '@/components/finish-line/finish-line'
  import {serverPath} from '@/config/index'

  export default {
    data() {
      return {
        type: 0, // 0-毒文，1-商品
        field: '', // 搜索字段
        tabList: [{
          id: 1,
          name: '毒文',
          checked: true
        },{
          id: 2,
          name: '毒辑',
          checked: false
        }],
        showEssay: true,
        essayList: [],
        prodList: [],
        start:0,
        offset:6,
        showLoading: false,
        isFinished: false,
        isEmpty: false,
        emptyIcon: require('../../../static/icon/empty.png')
      }
    },
    components: {
      Tab,
      EssayCard,
      BottomLoading,
      SellCard,
      FinishLine
    },

    methods: {
      scrollToLower(){
        if (this.type === 0){
          this.ajaxEssayList()
        }else{
          this.ajaxProdList()
        }
      },
      tabItem(item){
        if (item.id===1){
          this.showEssay = true
        }else{
          this.showEssay = false
        }
      },
      ajaxEssayList(){
        if (this.isFinished){
          return
        }
        this.showLoading = true
        let $this = this
        wx.request({
          method:'GET',
          url: `${serverPath}/api/v1/essays/query/${this.field}/${this.start}/${this.offset}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              let essayList = result.data
              essayList.map(item=>{
                item.content = undefined
                item.descp = undefined
                // todo 默认essay的头像和作者
                item.avator = require('../../../static/icon/news/avator.jpg')
                item.author = '小猪佩奇'
                return item
              })
              $this.essayList = $this.essayList.concat(essayList)
              $this.start += $this.offset
            }else if (result.code==='666'){
              $this.isFinished = true
              if ($this.start===0){
                $this.isEmpty = true
              }else {
                wx.showToast({title:result.msg,mask:true})
              }
            }else{
              wx.showToast({title:result.msg,mask:true})
            }
            $this.showLoading = false
          },
          fail(){
            wx.showToast({title:'数据加载出错',mask:true})
            $this.showLoading = false
          }
        })
      },
      ajaxProdList(){
        if (this.isFinished){

          return
        }
        this.showLoading = true
        let $this = this
        wx.request({
          method:'GET',
          url: `${serverPath}/api/v1/products/query/${this.field}/${this.start}/${this.offset}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              let prodList = result.data
              prodList.map(item=>{
                item.descp = null
                return item
              })
              $this.prodList = $this.prodList.concat(prodList)
              $this.start += $this.offset
            }else if (result.code==='666'){
              $this.isFinished = true
              if ($this.start===0){
                $this.isEmpty = true
              }else {
                wx.showToast({title:result.msg,mask:true})
              }
            }else{
              wx.showToast({title:result.msg,mask:true})
            }
            $this.showLoading = false
          },
          fail(){
            wx.showToast({title:'数据加载出错',mask:true})
            $this.showLoading = false
          }
        })
      }
    },
    mounted() {
      // 坑：查询出来的都是字符串类型，数值需要强制转换
      let queryParams = this.$root.$mp.query
      this.type = Number(queryParams.type)
      this.field = queryParams.field
      // 初始化
      this.showEssay = true
      this.essayList = []
      this.prodList = []
      this.start=0
      this.offset=6
      this.showLoading=false
      this.isFinished=false
      this.isEmpty=false
      if (this.type===0){
        // 请求EssayList
        this.ajaxEssayList()
      }else{
        // 请求ProdList
        this.ajaxProdList()
      }
    }
  }
</script>

<style scoped>

</style>
