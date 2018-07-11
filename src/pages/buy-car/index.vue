<template>
  <div>
    <div style="display: flex;flex-direction: column">
      <div style="display: flex;justify-content: space-between;padding: 20rpx 40rpx; font-size: 25rpx;border-bottom: 1rpx solid rgba(0,0,0,0.1);letter-spacing: 3rpx">
        <div>
          <span style="vertical-align: middle">毒物商店 </span>
          <span style="vertical-align: middle;color: orangered;">[满399.0顺丰包邮]</span>
        </div>
        <div>
          <img :src="rightIcon" style="width: 30rpx;height: 30rpx;vertical-align: middle">
        </div>
      </div>
      <checkbox-group @change="change">
        <div @click="chooseItem(item)" :style="{background:item.bg}" v-for="(item,index) in prodList" :key="index" class="item">
          <div style="line-height: 200rpx">
            <checkbox :value="item.uuid" :checked="item.checked" color="#000"/>
          </div>
          <div>
            <img :src="item.pic" style="width: 200rpx;height: 200rpx;border: 1rpx solid rgba(0,0,0,0.1);">
          </div>
          <div style="display: flex;flex-direction: column;font-size: 30rpx;margin-left: 20rpx;flex-grow: 1">
            <div style="height: 100rpx">
              <span>{{item.name}}</span>
            </div>
            <div style="height:40rpx">
              <span style="font-size: 25rpx;color: rgba(0,0,0,0.5);">规格：{{item.desc}}</span>
            </div>
            <div style="display: flex;justify-content: space-between;height: 60rpx">
              <div style="padding-top: 20rpx;width: 150rpx">
                <span style="color: red">￥{{item.price}}</span>
              </div>
              <div style="padding-top: 20rpx;width: 170rpx">
                <number-input @toNumber="toNumber" :item="item" :number="item.number" size="mini"></number-input>
              </div>
              <div style="padding-top: 20rpx;">
                <div style="color: #fff;background:red;padding: 9rpx 20rpx;font-size: 20rpx;display: inline-block;text-align: right;vertical-align: top " @click="delBtn(item)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </checkbox-group>
    </div>

    <div style="color: #fff;position: fixed;bottom: 0;width: 100%;height: 100rpx;background: #000;display: flex;justify-content: space-around">
      <div style="padding-top: 20rpx">
        <checkbox-group @change="changeAll">
          <checkbox value="0" color="#000"/>
          <span style="vertical-align: middle">全选</span>
        </checkbox-group>
      </div>
      <div style="padding-top: 20rpx">
        <span style="vertical-align: middle">合计：</span>
        <span style="vertical-align: middle">{{total}}元</span>
      </div>
      <div style="padding-top: 20rpx">
        <div style="padding: 14rpx 20rpx;background: red;color: #fff;font-size: 25rpx">去结算</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {serverPath} from '@/config/index'
  import NumberInput from '@/components/number-input/number-input'
  import {uuid} from '@/utils/index'

  export default {
    data(){
      return {
        rightIcon: require('../../../static/icon/shop/right.png'),
        prodList:[],
        checkedAll: false,
        total: 0,

      }
    },
    components:{
      NumberInput
    },
    created(){
      // 第一次打开页面时初始化微信存储中的carList
      this.ajaxProdList()
    },
    mounted(){
      this.getProdList()
    },
    methods:{
      changeAll(e){
        if(e.target.value[0]){

        }
      },
      toNumber(number,prod){
        this.prodList.map(item=>{
          if (prod.pid===item.pid&&prod.desc===item.desc){
            item.number = number
          }
        })
        wx.setStorageSync('carList',this.prodList)
      },
      delBtn(prod){
        let $this = this
        wx.showModal({
          title: '提示',
          content: '确定删除商品？',
          success(res){
            if (res.confirm){
              let carList = wx.getStorageSync('carList')
              carList = carList.filter(item=>{
                return !(item.pid === prod.pid && item.desc === prod.desc)
              })
              wx.setStorageSync('carList',carList)
              $this.prodList = carList
            }
          }
        })
      },
      chooseItem(prod){
        this.prodList.map(item=>{
          if (item.pid === prod.pid && item.desc === prod.desc){
            item.checked = !item.checked
            item.bg = item.checked?'rgba(0,0,0,0.5)':'rgba(0,0,0,0)'
          }
        })
      },
      change(e){
        let list = e
        console.log(list)
      },
      ajaxProdList(){
        let uid = wx.getStorageSync('userInfo').id
        let $this = this
        wx.request({
          method:'GET',
          url:`${serverPath}/api/v1/carList/${uid}`,
          success(res){
            let result = res.data
            if (result.code==='000'){
              result.data.map(item=>{
                item.uuid = uuid()
                return item
              })
              wx.setStorageSync('carList',result.data)
            }else {
              wx.showToast({title:result.msg})
            }
          }
        })
      },
      getProdList(){
        this.prodList = wx.getStorageSync('carList')
        this.prodList.map(item=>{
          item.checked = false
          item.bg = 'rgba(0,0,0,0)'
        })
      }
    }
  }
</script>
<style scoped>
  .item{
    display: flex;
    padding: 20rpx;
    border-bottom: 1rpx solid rgba(0,0,0,0.1);
  }
</style>
