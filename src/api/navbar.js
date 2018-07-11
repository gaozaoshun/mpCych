
export function ajaxNavBarList(){
  let $this = this
  wx.request({
    method: 'GET',
    url: `${serverPath}/api/v1/navbars`,
    success(res){
      let result = res.data
      if (result.code==='000'){
        $this.navbarList = result.data
      }else {
        wx.showToast({title:result.msg,mask:true})
      }
    },
    fail(res){
      wx.showToast({title:'数据加载出错',mask:true})
    }
  })
}
