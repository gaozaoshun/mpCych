<template>
  <div class="loading" :style="{display:loadingShow}">
    <img :src="loadingIcon" style="width: 26rpx;height: 26rpx;">
  </div>
</template>
<script>
  export default {
    data(){
      return {
        loadingIcon: require('../../../static/gif/loading.gif')
      }
    },
    props:{
      show:{
        type:Boolean,
        default: false
      }
    },
    computed:{
      loadingShow(){
        return this.show?'block':'none'
      }
    }
  }
</script>
<style scoped>
  .loading {
    width: 100%;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
  }
</style>
