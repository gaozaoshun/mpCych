<script>
import {serverPath} from '@/config/index'
import {uuid} from '@/utils/index'

export default {
  data(){
    return{

    }
  },
  mounted(){

  },
  onHide(){
    // 隐藏时保存购物车carList
    this.ajaxSaveCarList()
  },
  created () {
    let $this = this
    wx.getSetting({
      success(res){
        //已授权
        if (res.authSetting['scope.userInfo']) {
          $this.wxLogin()
          //未授权
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success(){
              $this.wxLogin()
            }
          })
        }
      }
    })
  },
  methods: {
    ajaxSaveCarList(){
      let uid = wx.getStorageSync('userInfo').id
      let data = wx.getStorageSync('carList')||[]
      data.map(item=>{
        item.uid = uid
        return item
      })
      wx.request({
        method:'POST',
        url:`${serverPath}/api/v1/carList`,
        data: data,
        success(res){
          let result = res.data
          if (result.code==='000'){
            console.log(result.data)
          }else{
            wx.showToast({title:result.msg})
          }
        }
      })
    },
    wxLogin(){
      wx.login({
        success(res){
          if (res.code) {
            // 获取登录信息
            wx.getUserInfo({
              withCredentials: true,// 是否带上登录态信息
              lang: 'zh_CN',// 指定返回用户信息的语言
              success(resp){
                resp['js_code'] = res.code
                resp['grant_type'] ='authorization_code'
                // 发起登录请求
                wx.request({
                  method: 'POST',
                  url: `${serverPath}/api/v1/wxLogin`,
                  data: resp,
                  success(res){
                    let result = res.data
                    if (result.code==='000'){
                      console.log(result.data)
                      wx.setStorageSync('userInfo',result.data)
                    }else{
                      wx.showToast({title:result.msg})
                    }
                  }
                })
              }
            })
          } else {
            wx.showToast({title:res.errMsg})
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
