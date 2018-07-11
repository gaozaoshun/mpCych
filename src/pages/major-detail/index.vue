<template>
  <div>
    <scroll-view scroll-y style="position: absolute;top: 0;bottom: 0;width: 100%" enable-back-to-top="true" @scrolltolower="scrollToLower" @scroll="scrollAction">
      <div style="display: flex;flex-direction: column">

        <div :style="{position: 'relative',width:width+'px',height:width/2+'px'}">
          <img :src="major.cover" :style="{width:width+'px',height:width/2+'px'}">
          <div style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5)"></div>
          <div style="position: absolute;top: 40%;left:0;z-index: 100;width:100%;color: #fff;letter-spacing: 7rpx;text-indent: 7rpx;text-align: center">
            <span>{{major.name}}</span>
          </div>
        </div>

        <div style="padding: 50rpx 40rpx">
          <span style="font-size: 25rpx;color:#515151">{{major.descp}}</span>
        </div>

        <div v-for="item in essayList" style="padding: 20rpx">
          <major-card :essay="item" :width="width-20"></major-card>
        </div>

      </div>
      <bottom-loading :show="showLoading"></bottom-loading>
      <finish-line :show="isEnd"></finish-line>
    </scroll-view>
  </div>
</template>
<script>
  import {serverPath} from '@/config/index'
  import MajorCard from '@/components/essay-card/major-card'
  import FinishLine from '@/components/finish-line/finish-line'
  import BottomLoading from '@/components/bottom-loading/bottom-loading'

  export default {
    data(){
      return {
        essayIds:[],
        width: wx.getSystemInfoSync().screenWidth,
        major: wx.getStorageSync('major'),
        essayList:[],
        size:3,
        isEnd: false,
        showLoading:false
      }
    },
    components:{
      MajorCard,
      BottomLoading,
      FinishLine
    },
    mounted(){
      this.essayList = []
      this.essayIds = this.major.essayIds.split(',')
      // 设置标题
      wx.setNavigationBarTitle({title:this.major.name})
      // 请求专题对应的毒文列表
      this.ajaxEssayList()
    },
    methods:{
      scrollAction(event){

      },
      scrollToLower(){
        this.ajaxEssayList()
      },
      ajaxEssayList(){
        if (this.isEnd){
          return;
        }
        this.showLoading = true
        let ids = ''
        for (let i=0;i<this.size;i++){
          let id = this.essayIds.shift()
          if (id){
            ids+=(id+',')
          }else {
            this.isEnd = true
            break
          }
        }
        ids = ids.substring(0,ids.length-1)
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/essays/id/${ids}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              $this.essayList = $this.essayList.concat(result.data)
            }else{
              wx.showToast({title:result.msg})
            }
            $this.showLoading = false
          },
          fail(res){
            $this.showLoading = false
            wx.showToast({title:'网络错误'})
          }
        })
      }
    }
  }
</script>
<style scoped>

</style>
