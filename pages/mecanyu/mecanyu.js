var app = getApp();
var req = require('../../js/require.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var QQMapWX = require('../../js/qqmap-wx-jssdk');
var DATAS = require('../../data.js');
var page = 1;
var pageSize = 10;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMoload: false,
    pceimgs:[],
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = constantFields.CANYU;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      "openId": app.globalData.openId,
      "id":options.id
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(url)
      console.log(res)
      console.log(res.data.body)
      app.globalData.accessn = res.data.body.sysShopActivityOrder1.writeCode
      console.log(app.globalData.accessn)
      that.setData({
        dateil: res.data.body.sysShopActivityOrder1,
        dateils: res.data.body.sysShopActivity1,
      })
      console.log(dateil)
    })

   
  },
  isMoloadFn() {
    wx.showLoading({
      title: '加载中',
    })

    this.setData({ isMoload: !this.data.isMoload })
    var that = this
    var url = constantFields.XIAOMA;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    console.log(app.globalData.accessn)
    var put = {
      // "openId": app.globalData.openId,
      // "id": options.id,
      "appId":"wx6c653b3b961fb92a",
      "writeCode": app.globalData.accessn,
      "index":"1"
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(url)
      console.log(res)
      console.log(res.data.body)
      that.setData({
        dateilimg: res.data.body.url,
      })
      console.log(dateil)
    })
  },
  pceimg: function (e) {
    console.log(e.currentTarget.dataset.dateilimg);
    var that = this;
    that.setData({
      pceimgs: e.currentTarget.dataset.dateilimg
    })
    console.log(that.data.pceimgs)
    var index = e.currentTarget.dataset.index;
    var imgArr = that.data.pceimgs;
    wx.previewImage({
      // current: that.data.pceimgs[index],     //当前图片地址
      urls: [imgArr],               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
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
    
  }
})