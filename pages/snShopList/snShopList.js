// pages/snShopList/snShopList.js
var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: null,
    shopItemInfo: null,
    status: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    // 动态设置页面顶部文本
    wx.setNavigationBarTitle({
      title: options.typename
    })
    // 接收店铺数据
    getSelectCode(that, options);
    that.setData({
      options: options
    })
  },
  onShow: function () {
    app.globalData.selectProducts = [];
    console.log(app.globalData.selectProducts, '把expertList置空')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    console.log(page);
    // 页数+1  
    page = page + 1;
      // 上拉加载买过的店的数据
      var url = constantFields.NEARBY;
      var data = {
        "lat": app.globalData.latitude,
        "lng": app.globalData.longitude,
        "pageNo": page,
        "pageSize": 10,
        "city": that.data.options.city,
        "typeCode": that.data.options.typecode
      };
      // 发送请求
      httpUtils.postRequest(url, data).then(function (res) {
        if (res.data.body) {
          console.log(res.data.body,"上拉加载返回的数据");
          if (res.data.body == "" || res.data.body == undefined || res.data.body == null){
            wx.showToast({
              title: '到底了',
              icon: 'success',
              duration:2000
            })
            // 隐藏加载框  
            wx.hideLoading();
            return;
          }

          // 回调函数  
          var moment_list = that.data.shopItemInfo;

          for (var i = 0; i < res.data.body.length; i++) {
            moment_list.push(res.data.body[i]);
          }
          // 设置数据  
          that.setData({
            shopItemInfo: that.data.shopItemInfo
          })

          // 隐藏加载框  
          wx.hideLoading();
        }
      })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 监听输入框状态
  statusText: function (e) {
    var that = this;
    console.log(e.detail.value);
    // 点击完成按钮查询数据
    findShop(that, e.detail.value);
  },
    // 获取当前点击店code
  getShopCode(e) {
    console.log(e.currentTarget.dataset.code, "code");
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + shopCode,
    })
  },
})


function getSelectCode(that, options){
  console.log(app.globalData.latitude, app.globalData.longitude, options.city, options.typecode);
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.NEARBY;
  var data = {
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": 1,
    "pageSize": 10,
    "city": options.city,
    "typeCode": options.typecode
  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    if (res.data.body) {
      console.log(res.data.body);
      var shopItemInfo = res.data.body;

      if (shopItemInfo.length == 0) {
        that.setData({
          status: false,
        })
      }
      that.setData({
        shopItemInfo: shopItemInfo,
      })
      // 隐藏加载框  
      wx.hideLoading();
    }
  })
}
// 查询店铺
function findShop(that, value){
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.NEARBY;
  var data = {
    "searchKey": value,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": 1,
    "pageSize": 100,
    "city": that.data.options.city,
    "typeCode": that.data.options.typecode,
  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    if (res.data.body.length != 0) {
      console.log(res.data.body);
      var shopItemInfo = res.data.body;
      that.setData({
        shopItemInfo: shopItemInfo,
      })
      // 隐藏加载框  
      wx.hideLoading();
    }else{
      wx.showToast({
        title: '没有查询到店铺',
        icon: 'success',
        duration: 2000
      })
    }
  })
}