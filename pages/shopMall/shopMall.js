var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
let page = 1;
let pageSize = 10;
Page({
  data: {
    navList: [
      { typeName: '商户促销', imgUrl: "../../images/nav1.jpg" },
      { typeName: '商户招聘', imgUrl: "../../images/nav2.jpg" },
      { typeName: '商场活动', imgUrl: "../../images/nav3.jpg" },
      { typeName: '商场招商', imgUrl: "../../images/nav4.jpg" },
    ],
    navClass: [
      { name: '综合排序' },
      { name: '美豆排序' },
      { name: '时间排序' },
      { name: '推荐' },
    ],
    bigClassTxtNumber:0,
    navClassTitle: 0,
    AdvList:[],
    off:1
  },
  // 切换排序
  cut(e) {
    console.log(e)
    page = 1;
    let that = this;
    that.setData({
      navClassTitle: e.currentTarget.dataset.index,
      off:0
    })
    switch (e.currentTarget.dataset.index){
      case 0:
        // 促销列表
        getMakerIndexAdvList(that, constantFields.getMakerIndexAdvList);
      break;
      case 1:
        // 广告投放金排序促销列表getActivityIndexTel
        getMakerIndexAdvList(that, constantFields.getActivityIndexGold);
      break;
      case 2:
        // 时间排序促销列表
        getMakerIndexAdvList(that, constantFields.getActivityIndexDate);
      break;
      case 3:
        // 推荐排序促销列表
        getMakerIndexAdvList(that, constantFields.getActivityIndexTel);
      break;
    }
  },
  // 切换分类
  bigClassTxt(e){
    let that = this;
    that.setData({
      bigClassTxtNumber: e.currentTarget.dataset.index
    })
  },
  // 导航
  goShopLoc(){
    wx.openLocation({
      name: this.data.MakerDetail.sysShopInfo.name,
      latitude: this.data.MakerDetail.sysShopInfo.latFloat,
      longitude: this.data.MakerDetail.sysShopInfo.lngFloat,
    })
  },
  // 相册
  pohotos(){
    wx.showToast({
      title: '敬请期待',
    })
  },
  // 去活动详情页
  goActive: function (e) {
    let code = e.currentTarget.dataset.code;
    let shopcode = e.currentTarget.dataset.shopcode;
    let shopName = e.currentTarget.dataset.shopName;
    wx.navigateTo({
      url: '../activeDetail/activeDetail?activeCode=' + code + '&shopName=' + shopName + '&shopCode=' + shopcode + '&id=' + e.currentTarget.dataset.id + "&shopCodeP=" + e.currentTarget.dataset.shopcodep,
    })
  },
  
  onLoad: function (options) {
    console.log(app)
    wx.setNavigationBarTitle({
      title: options.name,
    })
    let that = this;
    that.setData({
      options:options
    });
    // 初始 数据
    getMakerDetail(that);
    // 商场促销分类
    getMakerClass(that);
    // banner
    getMakerIndexBanner(that);
    // 促销列表
    getMakerIndexAdvList(that, constantFields.getMakerIndexAdvList);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '精准匹配营销,让生意及所能及',
      path: '/pages/index/index?shopCode=' + options.code,
      success: function (res) {
        wx.showToast({
          title: '转发成功',
        })
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败');
      }
    }
  }
})
// 商场数据
function getMakerDetail (that){
  wx.showLoading({
    title: '加载中',
  })
  let data = {
    "shopCode":that.data.options.code
  }
  httpUtils.postRequest(constantFields.getMakerDetail,data).then(function(res){
    console.log(res)
    wx.hideLoading();
    if(res.data.head.errCode == 10000){
      that.setData({
        MakerDetail:res.data.body
      })
    }
  })
}
// 商场促销分类
function getMakerClass(that){
  let data={
    "shopCodep":that.data.options.code
  };
  httpUtils.postRequest(constantFields.getMakerClass,data).then(function(res){
    if(res.data.head.errCode == 10000){
      that.setData({
        MakerClass: res.data.body
      })
    }
  })
}
// 商场Banner
function getMakerIndexBanner (that){
  let data = {
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "city":app.globalData.city
  };
  httpUtils.postRequest(constantFields.getMakerIndexBanner,data).then(function(res){
    if (res.data.head.errCode == 10000) {
      that.setData({
        lbList: res.data.body.list
      })
    }
  })
};
// 商场促销列表
function getMakerIndexAdvList (that,url){
  let data = {
    "shopCodep": that.data.options.code,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
  };
  httpUtils.postRequest(url,data).then(function(res){
    if (res.data.head.errCode == 10000) {
      // 切换类型清除遍历数据
      if(that.data.off == 0){
        that.setData({
          AdvList: [],
          off:1
        })
      }
      that.setData({
        AdvList: that.data.AdvList.concat(res.data.body) 
      })
    }
  })
}