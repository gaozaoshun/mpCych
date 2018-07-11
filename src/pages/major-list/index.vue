<template>
  <div>
    <scroll-view scroll-y style="position: absolute;top: 0;bottom: 0;width: 100%" enable-back-to-top="true"
                 @scrolltolower="scrollToLower" @scroll="scrollAction">
      <div style="display: flex;flex-direction: column">
        <div v-for="item in majorList" :key="item.id" style="padding: 20rpx 20rpx 0 20rpx">
          <text-img :value="item" :width="width-20"></text-img>
        </div>
      </div>
      <bottom-loading :show="showLoading"></bottom-loading>
      <finish-line :show="isEnd"></finish-line>
    </scroll-view>
  </div>
</template>
<script>
  import {serverPath} from '@/config/index'
  import FinishLine from '@/components/finish-line/finish-line'
  import BottomLoading from '@/components/bottom-loading/bottom-loading'
  import TextImg from '@/components/text-img/text-img'

  export default {
    data() {
      return {
        width: wx.getSystemInfoSync().screenWidth,
        majorList: [],
        start: 0,
        offset: 6,
        isEnd: false,
        showLoading: false
      }
    },
    components: {
      BottomLoading,
      FinishLine,
      TextImg
    },
    mounted() {
      this.majorList = []
      this.start = 0
      this.offset = 6
      this.isEnd = false
      this.showLoading = false
      this.ajaxMajors()
    },
    methods: {
      scrollAction(event) {

      },
      scrollToLower() {
        this.ajaxMajors()
      },
      ajaxMajors() {
        if (this.isEnd) {
          return
        }
        this.showLoading = true
        let $this = this
        wx.request({
          method: 'GET',
          url: `${serverPath}/api/v1/majors/order/0/${$this.start}/${$this.offset}`,
          success(res) {
            let result = res.data
            if (result.code === '000') {
              let data = result.data
              data.map(item => {
                item.showMore = false
                item.title = item.name.split('-')[0] || ''
                item.content = item.name.split('-')[1] || ''
              })
              $this.majorList = $this.majorList.concat(data)
              $this.start += $this.offset
              if (data.length < $this.offset) {
                $this.isEnd = true
              }
            } else {
              wx.showToast({title: result.msg, mask: true})
            }
            $this.showLoading = false
          },
          fail(res) {
            $this.showLoading = false
            wx.showToast({title: '数据加载出错', mask: true})
          }
        })
      }
    }
  }
</script>
<style scoped>

</style>
