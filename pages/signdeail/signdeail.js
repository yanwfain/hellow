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
    ren:0,
    tel:null,
    phone:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    

    // PEIXUN
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    console.log(app.globalData.userInfo.avatarUrl +"微信头像")
    that.setData({
      ren:options.count
    })
    var url = constantFields.PEIDEiL;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put = {
      "activityCode": options.activityCode,
      "shopCode": options.shopCode,
      "openId": app.globalData.openId,
    };
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(url)
      console.log(res)
      console.log(res.data.body)
      console.log(res.data.body.img)
      that.setData({
        dateil: res.data.body,
        imgdeteil: res.data.body.img,
        tel: res.data.body.sysShopActivity.phone
      })
      console.log(dateil)
      console.log(imgdeteil)
    })


    var url1 = constantFields.BAOMINGNUM;
    console.log(url)
    console.log(app);
    console.log(app.globalData)
    var put1 = {
      "activityCode": options.activityCode,
    };
    console.log(put1)
    httpUtils.postRequest(url1, put1).then(function (res) {
      wx.hideLoading();
      console.log(res)
      console.log(res.data.body)
      console.log(res.data.body.img)
      that.setData({
        numren: res.data.body.sysShopActivityOrder1,
      })
    })

  },
  tel: function () {
    var that = this
    console.log(this.data.tel)
    wx.makePhoneCall({
      phoneNumber: that.data.tel,
    })
  },
  goOpenbao(e){
    console.log(e.currentTarget.dataset.activitycode)
    wx.navigateTo({
      url: '../signm/signm?activityCode=' + e.currentTarget.dataset.activitycode + '&money=' + e.currentTarget.dataset.money + "&shopCode=" + e.currentTarget.dataset.shopcode
    })
  },
  isMoloadFn() {
    this.setData({ isMoload: !this.data.isMoload })
  }, 

  copyText: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset)
    var that = this;
    that.setData({
      phone: e.currentTarget.dataset
    })
    console.log(that)
    console.log(that.data.phone)
    console.log(that.data.phone.wechatnumber)
    wx.setClipboardData({
      data: that.data.phone.wechatnumber,
      success: function (res) {
        console.log(res)
        wx.getClipboardData({
          success: function (res) {
            console.log(res)
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  pinzhen(e){
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