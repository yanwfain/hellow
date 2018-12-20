var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
var DATAS = require('../../data.js');
var page = 1;
var pageSize = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:DATAS.apps.city,
  },
  // 选择城市
  goCity(e){
    wx.navigateTo({
      url: '../switchcity/switchcity',
    })
  },
  // 旅游官网跳转
  goTravelOfficial(e) {
    wx.navigateTo({
      url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode,
    })
  },
  onLoad: function (options) {
    var that = this;
    // 景区官网列表
    DATAS.scenicWeb(that,options)
    that.setData({
      city:DATAS.apps.city
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
      title: '精准匹配营销,生意及所能及',
    }
  },
})