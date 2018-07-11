<template>
  <div>
    <scroll-view class="scroller-pos" scroll-y enable-back-to-top="true" @scrolltolower="scrollToLower">
      <template v-for="item in essayList">
        <news-card :news="item"></news-card>
      </template>
      <bottom-loading :show="showLoading"></bottom-loading>
    </scroll-view>

  </div>
</template>
<script>
  import {serverPath} from '@/config/index'
  import NewsCard from '@/components/news-card/news-card'
  import BottomLoading from '@/components/bottom-loading/bottom-loading'

  export default {
    data(){
      return {
        essayIds:'',
        size:3,
        isEnd:false,
        essayList:[],
        showLoading:false
      }
    },
    components:{
      NewsCard,
      BottomLoading
    },
    mounted(){

      let params = this.$root.$mp.query
      this.essayIds = params.essayIds.split(',')
      wx.setNavigationBarTitle({title:params.title})
      // 分批请求
      this.ajaxGetEssayList()
    },
    methods:{
      scrollToLower(){
        this.ajaxGetEssayList()
      },
      ajaxGetEssayList(){
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
  .scroller-pos {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>
