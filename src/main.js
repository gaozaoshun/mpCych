import Vue from 'vue'
import App from './App'
import {serverPath} from "@/config/index";

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',    //推荐页
      'pages/shop/main',      //商店
      'pages/prod-detail/main', //商店详情
      'pages/buy-car/main', //购物车
      'pages/me/main',        // 我的详情
      'pages/news/main',      //毒文详情
      'pages/essay-list/main',//毒文列表
      'pages/search/main',    //搜索页
      'pages/search-tab/main', //搜索结果页
      'pages/major-detail/main', //专题详情页
      'pages/major-list/main' //专题列表页
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: '创意潮货',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      color: "#fff",
      selectedColor: "#eee838",
      backgroundColor: "#000",
      list: [
        {
          iconPath: "static/icon/tab/index_default.png",
          selectedIconPath: "static/icon/tab/index_open.png",
          pagePath: "pages/index/main",
          text: "推荐"
        },
        {
          iconPath: "static/icon/tab/shop_default.png",
          selectedIconPath: "static/icon/tab/shop_open.png",
          pagePath: "pages/shop/main",
          text: "商店"
        },
        {
          iconPath: "static/icon/tab/me_default.png",
          selectedIconPath: "static/icon/tab/me_open.png",
          pagePath: "pages/me/main",
          text: "我的"
        }
      ]
    }
  }
}
