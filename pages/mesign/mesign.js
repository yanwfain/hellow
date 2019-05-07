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
    selected: true,
    selected1: false,
    selected2: false,
    selected0: false,
    // selected3: false,
    access_token:null,
  },
  selected: function (e) {

    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      selected1: false,
      selected0: false,
      selected2: false,
      selected: true
    })

    var that = this;
    var url = constantFields.PEIXUN;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      "openId": app.globalData.openId,
      // "state": "1"
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(url)
      console.log(res)
      console.log(res.data.body)
      if (res.data.body.sysShopActivities == "") {
        wx.showToast({
          title: '暂无数据',
        })
      }
      that.setData({
        dateil: res.data.body.sysShopActivities,
        dateils: res.data.body,
      })
      console.log(dateil)
    })



  },
  selected1: function (e) {
   
    this.setData({
      selected0: false,
      selected2: false,
      selected: false,
      selected1: true
    })
    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    var url = constantFields.PEIXUN;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      "openId": app.globalData.openId,
      "state": "1"
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      if (res.data.body.sysShopActivities == "") {
        wx.showToast({
          title: '暂无数据',
        })
      }
      console.log(url)
      console.log(res)
      console.log(res.data.body)
      that.setData({
        dateil: res.data.body.sysShopActivities,
        dateils: res.data.body,
      })
      console.log(dateil)
    })
  },
  selected2: function (e) {
  
    this.setData({
      selected0: false,
      selected2: true,
      selected: false,
      selected1: false
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = constantFields.PEIXUN;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      "openId": app.globalData.openId,
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      if (res.data.body.list == "") {
        wx.showToast({
          title: '暂无数据',
        })
      }
      console.log(url)
      console.log(res)
      console.log(res.data.body)
      that.setData({
        dateils: res.data.body.list,
        dateil: res.data.body,
        ren: res.data.body.ren
      })
      console.log(dateil)
    })
  },
  selected0: function (e) {
    
    this.setData({
      selected0: true,
      selected2: false,
      selected: false,
      selected1: false
    })
   
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = constantFields.PEIXUN;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      "openId": app.globalData.openId,
      "state": "0"
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
     
      console.log(url)
      console.log(res)
      console.log(res.data.body)
      that.setData({
        dateil: res.data.body.sysShopActivities,
        dateils: res.data.body,
      })
      if (res.data.body.sysShopActivities == "") {
        wx.showToast({
          title: '暂无数据',
        })
      }
      console.log(dateil)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // PEIXUN

    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    var url = constantFields.PEIXUN;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      "openId": app.globalData.openId,
      // "mobile": "",
      // "originate": 'c'
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      if (res.data.body.sysShopActivities == "") {
        wx.showToast({
          title: '暂无数据',
        })
      }
      console.log(url)
      console.log(res)
      console.log(res.data.body)
      that.setData({
        dateil: res.data.body.sysShopActivities,
        dateils: res.data.body,
      })
      console.log(dateil)
    })



   
  },

  gobao(e){

    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../signdeail/signdeail?activityCode=' + e.currentTarget.dataset.activitycode + '&shopCode=' + e.currentTarget.dataset.shopcode + '&count=' + e.currentTarget.dataset.count
    })
  },
  gobaodeil(e){
    wx.navigateTo({
      url: '../mecanyu/mecanyu?id=' + e.currentTarget.dataset.id
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
    }
    return {
      title: '快来善小美,悠享健康生活',
    }

  },
  
})