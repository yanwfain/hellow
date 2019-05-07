// pages/nearBycuxiao/nearBycuxiao.js
var app = getApp();
var DATAS = require('../../data.js');
var txt = require('../../js/txt.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var page = 1;
var pageSize = 10;
var searchKey = "";
var shopType = "";
Page({
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    options.distance = 30000;
    page = 1;
    var that = this;
    that.setData({
      options: options,
    })
    options.off == 'true'? that.setData({off:true}):'';
    wx.setNavigationBarTitle({
      title: options.typename,
    })
    // 行业banner
    DATAS.getBanner(that, options);
    // 行业店铺
    DATAS.getShop(that, options,page,pageSize);

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    // 获取更多的附近的店的数据
    page += 1;
    DATAS.getShop(that, that.data.options, page);
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
  // 去商店页
  getShopCode: function(e) {
    let code = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../travelIndex/index?shopCode=' + code,
    })
  },
})