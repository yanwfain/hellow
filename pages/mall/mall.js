var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
let page = 1;
let pageSize = 10;
Page({
  data: {
    navClass:[
      { name: '综合排序', controller:""},
      { name: '距离排序', controller:"d"},
      { name: '广告投放金排序', controller:"g" },
    ],
    navClassTitle:'',
    shopItemInfo:[],
    off:1
  },
// 切换排序
  cut(e){
    page = 1;
    let that = this;
    that.setData({
      navClassTitle: e.currentTarget.dataset.controller,
      off:0
    })
    // 促销列表
    getMakerAdvList(that, e.currentTarget.dataset.controller);
    
  },
  // 去商场
  getShopCode(e){
    wx.navigateTo({
      url: '../shopMall/shopMall?code=' + e.currentTarget.dataset.code + "&name=" + e.currentTarget.dataset.name,
    })
  },
  // banner跳转
  goActiveInfo: function (e) {
    var activecode = e.target.dataset.activecode;
    var activename = e.target.dataset.activename;
    if (activecode != undefined && activecode != "") {
      wx.navigateTo({
        url: '../activeDetail/activeDetail?activeCode=' + activecode + '&activeName=' + activename,
      })
      return;
    }
  },
  onLoad: function (options) {
    page = 1;
    let that = this;
    // banner
    getShopMarketBanner(that);
    // 商场列表
    getShopList(that);
    // 促销列表
    getMakerAdvList(that,"");
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    // 促销列表
    getMakerAdvList(that, that.data.controller);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// banner
let  getShopMarketBanner = (that)=>{
  let data={
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude
  }
  httpUtils.postRequest(constantFields.getShopMarketBanner,data).then((res)=>{
    console.log(JSON.stringify(res)+"只是商场banner")
    if(res.data.head.errCode == 10000){
      that.setData({
        lbList:res.data.body.list
      })
    }
  })
}
// 商场列表
 let getShopList = (that) =>{
   wx.showLoading({
     title: '加载中',
   })
   let data = {
     "lat": app.globalData.latitude,
     "lng": app.globalData.longitude,
     "pageNo":1,
     "pageSize":10
   }
   httpUtils.postRequest(constantFields.getShopList, data).then((res) => {
     wx.hideLoading();
     if (res.data.head.errCode == 10000) {
       that.setData({
         shopItemInfos: res.data.body
       })
     }
   })
 }
//  商场促销
let getMakerAdvList = (that, controller) => {
  let data = {
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "controller": controller,
    "pageNo": page,
    "pageSize": pageSize
  };
  httpUtils.postRequest(constantFields.getMakerAdvList,data).then((res)=>{
    console.log(res)
    if(res.data.head.errCode == 10000){
      if(res.data.body.length > 0){
        // 切换类型清除遍历数据
        if(that.data.off == 0){
          that.setData({
            shopItemInfo: [],
            off:1
          });
        }
        page++;
        that.setData({
          shopItemInfo: that.data.shopItemInfo.concat(res.data.body)
        });
        return;
      }
      // wx.showToast({
      //   image:'../../images/defeated.png',
      //   title: '暂无数据',
      // })
    }
  })
}