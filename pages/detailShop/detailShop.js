// pages/tabCuxiao/tabCuxiao.js
var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var page = 1;
var pages = 30;
Page({
  data: {
      isTrue:true
  },
  onLoad: function (options) {
    page = 1;
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = constantFields.DETAIL;
    console.log(app.globalData.openId);
    var put = {
      "page": page,
      "pageSize": pages,
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };  
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      that.setData({
        detail: res.data.body
      })
      if(res.data.body.length<11){
        that.setData({
          isTrue:false
        })
      }
    })
  },
  // 去详情
  goGetdetail(e){
    console.log(e.currentTarget.dataset)
    console.log(e.currentTarget.dataset.advertisingcode)
    wx.navigateTo({
      url: '../getDetail/getDetail?id=' + e.currentTarget.dataset.id 
    })
  },
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
    if(this.data.isTrue){
      wx.showLoading({
        title: '加载中',
      })
      page = page + 1;
      console.log(page)
      var that = this;
      var url = constantFields.JiFENSHOP;
      console.log(app.globalData.openId);
      var put = {
        "page": page,
        "pageSize": pages,
        "openId": app.globalData.openId,
        "mobile": "",
        "originate": 'c'
      };
      console.log(put)
      httpUtils.postRequest(url, put).then(function (res) {
        wx.hideLoading();
        console.log(res)
        if(res.body.length!=0){
          var detail = that.data.detail;
          detail = detail.concat(res.data.body)
          that.setData({
            detail: detail
          })
        }else{
          wx.showLoading({
            title: '没有更多了',
            duration:2000
          })
        }
      })
    }
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