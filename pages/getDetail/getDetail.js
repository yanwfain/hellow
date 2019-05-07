var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
Page({
  data: {
    wxuser: null,
    isShowNav: true,
    isMoload:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getWxUserInfo(e) {
    var that = this;
    wx.getUserInfo({
      success: function (resFn) {
        app.globalData.userInfo = resFn.userInfo;
        that.setData({
          wxuser: resFn.userInfo
        })
        console.log(resFn.userInfo)
      },
      fail: function () {
      }
    })
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    // XIAOMA
    var url = constantFields.DUIHUANJIXQ;
    console.log(app.globalData.openId);
    console.log(app.globalData);
    var put = {
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c',
      "id": options.id,
      "userCode": options.userCode
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      console.log(res.data.body.phone)
      console.log(res.data.body.moneyDescribe)
      console.log(res.data.body.typeInfo)
      that.setData({
        detail: res.data.body,
        isShowNav:res.data.body.moneyDescribe == '积分兑换' ? true : false,
        typeInfo: res.data.body.typeInfo
      })
      app.globalData.jinsllo = res.data.body.writeCode
    })
  },
  isMoloadFn(){

    this.setData({ isMoload: !this.data.isMoload })
    var that = this;
    // XIAOMA
    var url = constantFields.XIAOMA;
    console.log(app.globalData.openId);
    console.log(app.globalData);
    var put = {
      "appId": "wx6c653b3b961fb92a",
      "writeCode": app.globalData.jinsllo,
      "index":"2"
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
     
      that.setData({
        img: res.data.body.url,
      
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
  onShow: function () {
    console.log(this.data.isMoload)
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
  onPullDownRefresh: function (options) {
    var that = this;
    // XIAOMA
    var url = constantFields.DUIHUANJIXQ;
    console.log(app.globalData.openId);
    console.log(app.globalData);
    var put = {
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c',
      "id": options.id,
      "userCode": options.userCode
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      console.log(res.data.body.phone)
      console.log(res.data.body.moneyDescribe)
      console.log(res.data.body.typeInfo)
      that.setData({
        detail: res.data.body,
        isShowNav: res.data.body.moneyDescribe == '积分兑换' ? true : false,
        typeInfo: res.data.body.typeInfo
      })
      app.globalData.jinsllo = res.data.body.writeCode
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
  // onShareAppMessage: function (res) {
  //   var that = this;
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //   }
  //   return {
  //     title: '快来善小美，悠享健康生活',
  //   }
  // },
})
function travelHomeBanner(that, options, cb) {
  let url = constantFields.DETAIL;
  let data = {
    "objCode": options.platformCode
  };

}