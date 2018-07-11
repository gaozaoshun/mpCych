<template>
  <div class="tab-wrapper">
    <div v-for="item in tabList" :key="item.id">
      <div @touchstart="tabItem(item)" class="tab-item" :class="{'tab-show': item.checked}">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      tabList: {
        type: Array
      }
    },
    data() {
      return {
        isTrue:false
      }
    },
    methods: {
      tabItem(item) {
        this.isTrue = !this.isTrue
        this.initTabList()
        item.checked = true
        this.$emit('tabItem', item)
      },
      initTabList() {
        this.tabList.map(item => {
          item.checked = false
        })
      }
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .tab-wrapper {
    position: relative;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 40px;
    line-height: 40px;
    z-index: 1000;
    background: #fff;
  }

  .tab-item {
    font-size: 10pt;
    box-sizing: border-box;
  }

  .tab-show {
    border-bottom: 3px solid #515151;
  }
</style>
