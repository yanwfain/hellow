// pages/mine/mine.js
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxuser: null,
    shopInfo: null,
    sh: '1',
  },
  // 提示弹出层
  tishi(e) {
    this.setData({
      sh: e.currentTarget.dataset.id
    })
  },
  // 签到
  goSign() {
    wx.navigateTo({
      url: '../signIn/signIn',
    })
  },
  //积分详情
  jupmDeile(e){
    console.log(e.currentTarget.dataset)
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../Integral/Integral?id=' + e.currentTarget.dataset.id,
    })
  },
  // 转美豆
  zhuandou(){
    wx.navigateTo({
      url: '../earnpoints/earnpoints',
    })
  },
  // 兑换
  duihuan(){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  // 广告金
  /**
   * 线下支付，未在线上购买，而是在实体店内购买，支付给店家；
   */
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = constantFields.DUIHUAN;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      // "openId": app.globalData.openId,
      // "mobile": "",
      // "originate": 'c'
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(url)
      console.log(res)
      that.setData({
        dateil: res.data.body,
        // invitatuonNum: res.data.body.invitationNum
      })
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

  // 积分显示
  onShow: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        app.globalData.userInfo = res.userInfo;
        that.setData({
          wxuser: res.userInfo
        })
      },
      fail: function () {
      }
    })
    if (app.globalData.shopInfo == undefined) {
      this.setData({
        phone: "请扫描店家二维码"
      })
    } else {
      this.setData({
        shopInfo: app.globalData.shopInfo,
        phone: app.globalData.shopInfo.servicePhone
      })
    }
    var url = constantFields.MYPUT;
    console.log(app);
    var put = {
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };
    httpUtils.postRequest(url, put).then(function (res) {
      console.log(res)
      that.setData({
        balance: res.data.body.balance,
        invitatuonNum: res.data.body.invitationNum
      })
      app.globalData.jifen = res.data.body.balance
    })
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = constantFields.DUIHUAN;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      // "openId": app.globalData.openId,
      // "mobile": "",
      // "originate": 'c'
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(url)
      console.log(res)
      that.setData({
        dateil: res.data.body,
        // invitatuonNum: res.data.body.invitationNum
      })
    })
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
      // 来自页面内转发按钮
    }
    return {
      title: '快来善小美，悠享健康生活',
    }
  },  

})