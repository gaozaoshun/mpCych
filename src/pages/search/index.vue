<template>
  <div>
    <div class="search-input-wrapper">
      <picker class="picker" mode="selector" :range="searchRange" range-key="name" :value="selectRangeIndex" @change="changeSelect">
        <span style="display: inline-block;vertical-align: middle">{{searchRange[selectRangeIndex].name}}</span>
        <img :src="downIcon" style="display: inline-block;vertical-align: middle;width: 20rpx;height: 20px">
      </picker>
      <div class="searchInput">
        <input type="text" placeholder="搜毒文，商品" style="width: 600rpx;height: 50rpx;line-height: 50rpx" focus="true" confirm-type="search" @confirm="searchAction">
      </div>
    </div>
    <div style="display: flex;flex-direction:column;padding: 20rpx">
      <div style="display: flex;justify-content: space-between">
        <div style="font-size: 25rpx;color:#515151;">
          <span style="vertical-align: top">历史搜索</span>
        </div>
        <div @touchstart="clearHistory">
          <img :src="deleteIcon" style="width: 30rpx;height:30rpx;vertical-align: top">
        </div>
      </div>
      <div style="display: flex;flex-wrap:wrap;justify-content: flex-start;font-size: 25rpx;color:#515151">
        <div @touchstart="toSearchPage(item)" v-for="item in searchStores" :key="index" style="margin: 20rpx 20rpx 0 0;padding:5rpx 10rpx;background: rgba(0,0,0,0.2)">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      downIcon: require('../../../static/icon/search/down.png'),
      deleteIcon: require('../../../static/icon/search/delete.png'),
      selectRangeIndex:0,
      searchRange:[
        {
          name: '毒文'
        },{
          name: '商品'
        }],
      searchStores: []
    }
  },

  components: {
  },

  methods: {
    toSearchPage(item){
      let splitList = item.split(':')

      let type = 0
      if (splitList[0]==='商品'){
        type = 1
      }
      wx.navigateTo({
        url: `../search-tab/main?type=${type}&field=${splitList[1]}`
      })
    },
    clearHistory(){
      let $this = this
      wx.showModal({
        title: '提示',
        content: '确定删除历史记录？',
        confirmText: '删除',
        success(res){
          if (res.confirm){
            wx.removeStorage({
              key: 'searchHistory',
              success: function(res) {
                $this.searchStores = []
                wx.showToast({title:'已清除历史记录'})
              }
            })
          }
        }
      })
    },
    changeSelect(e){
      this.selectRangeIndex = e.target.value
    },
    searchAction(e){
      let field = e.target.value
      this.storeHistory(field)
      // 跳转到搜索页面
      this.jumpToSearchPage(field)
    },
    jumpToSearchPage(field){
      wx.navigateTo({
        url: `../search-tab/main?type=${this.selectRangeIndex}&field=${field}`
      })
    },
    storeHistory(field){
      let history = wx.getStorageSync('searchHistory')
      if (!history || !history instanceof Array){
        history = []
      }
      if (this.selectRangeIndex===0){
        field = `毒文:${field}`
      }else{
        field = `商品:${field}`
      }
      if (history.indexOf(field)>-1){
        return
      }
      history.push(field)
      wx.setStorage({key:'searchHistory',data:history})
    }
  },
  mounted(){
    let $this = this
    wx.getStorage({
      key: 'searchHistory',
      success(res){
        $this.searchStores = res.data
      }
    })
  },
  created () {

  }
}
</script>

<style scoped>
  .search-input-wrapper{
    line-height: 100rpx;
    text-align: center;

  }
  .picker{
    width: 120rpx;
    height: 50rpx;
    font-size: 25rpx;
    text-align: center;
    line-height: 50rpx;
    display: inline-block;
    vertical-align: middle;
    background: rgba(0,0,0,0.2);
    color: #515151;
  }
  .searchInput{
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    height: 50rpx;
    background: rgba(0,0,0,0.2);
    font-size: 25rpx;
  }
</style>
