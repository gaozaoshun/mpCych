<template>
  <div :style="{width:width+'px',height:height+'px'}" class="textImg-wrapper" @click="toPage">
    <img :src="value.cover" :style="{width:width+'px',height:height+'px'}"/>
    <div class="title" :style="{top:titleTop+'px',height:titleHeight+'px',fontSize: titleFontSize+'px',letterSpacing: letterSpacing+'px',textIndent: letterSpacing+'px'}">{{value.title}}</div>
    <div class="letter" :style="{height:letterHeight+'px',fontSize: titleFontSize+'px',top: letterTop+'px'}">X</div>
    <div class="content" :style="{top:contentTop+'px',height:contentHeight+'px',letterSpacing: letterSpacing+'px',textIndent: letterSpacing+'px',fontSize: contentFontSize+'px'}">『{{value.content}}』</div>
    <div class="shadow"></div>
    <div :style="{display:display}" class="shadow-more">
      <span :style="{fontSize:titleFontSize+'px'}" class="shadow-text">{{shadowText}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    computed:{
      height(){
        return this.width/2
      },
      titleTop(){
        return this.width/7
      },
      titleFontSize(){
        return this.width/20
      },
      titleHeight(){
        return this.width/20
      },
      letterSpacing(){
        return this.width/80
      },
      letterHeight(){
        return this.width/70
      },
      letterTop(){
        return this.width/4.5
      },
      contentFontSize(){
        return this.width/15
      },
      contentHeight(){
        return this.width/7
      },
      contentTop(){
        return this.width/3.4
      },
      display(){
        return this.value.showMore?'block':'none'
      }
    },
    props:{
      value:{
        type:Object
      },
      title:{
        type:String
      },
      content:{
        type: String
      },
      cover:{
        type: String
      },
      width:{
        type: Number
      },
      shadowText:{
        type: String,
        default: '更多专题'
      }
    },
    methods:{
      toPage(){
        this.$emit('toPage',this.value);
      }
    }
  }
</script>
<style scoped>
  .textImg-wrapper{
    position: relative;

  }
  .title{
    position: absolute;
    width:100%;
    color: #fff;
    text-align: center;
    z-index:999;
  }
  .title:before,.title:after{
    content: '';
    position: absolute;
    width: 15%;
    height: 2rpx;
    top:65%;
    background: #fff;
  }
  .title:before{
    left: 15%
  }
  .title:after{
    right: 15%;
  }
  .letter{
    z-index:999;
    position: absolute;
    width:100%;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
  .content{
    z-index:999;
    position: absolute;
    width:100%;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
  .shadow{
    position: absolute;
    background: rgba(0,0,0,0.4);
    width: 100%;
    height: 100%;
    top:0;
    left:0;
  }
  .shadow-more{
    position: absolute;
    background: rgba(0,0,0,0.7);
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    z-index:1000;
    text-align: center;
    color:#fff;
  }
  .shadow-text{
    display: block;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .shadow-text:before,.shadow-text:after{
    content:'';
    position: absolute;
    width: 50%;
    height: 2rpx;
    background: #fff;
    top:50%;
  }
  .shadow-text:before{
    left: 140%;
  }
  .shadow-text:after{
    right: 140%
  }
</style>
