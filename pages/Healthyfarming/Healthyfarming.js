
var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
const result = require('../../datas/jijihangye.js')
var pageNo = 1;
var pages = 30;
Page({
  /**
   * 页面的初始数据
   */
  data: {
	...result,
    showViewo: false,
    showViewt: false,
    showViewh: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNo = 1;
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    // var url = constantFields.NONGCHAN;
    var url = constantFields.SHAIXUAN;
    console.log(app.globalData.openId);
    var put = {
      "pageNo": pageNo,
      "pageSize": pages,
      "scenicCode": options.scenicCode
    };
    console.log(options.id)
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      if(res.data.body == ""){
        wx.showToast({
          title: '暂无商品',
        })
      }
      that.setData({
        detail: res.data.body,
            id: options.id,
        platformcode: options.platformCode,
        isShowNav: options.id == '6' || '7' ? false : true,
        isShowNav: options.id == '4' ? true : false,
        // isShowNav: options.id == '7' ? false : true,
        banner: that.data[`banner${options.id}`],
        navViewList: that.data[`navViewList${options.id}`],
        arr: that.data[`arr${options.id}`],
        navTitle: that.data[`navTitle${options.id}`]
      })
    })
    showViewo: (options.showViewo == "true" ? true : false)
    showViewt: (options.showViewt == "true" ? true : false)
    showViewh: (options.showViewh == "true" ? true : false)
    // travelHomeBanner(that, options, function (res) {
    //   that.setData({
    //     id: options.id,
    //     platformcode: options.platformCode,
    //     isShowNav: options.id == '6' || '7' ? false : true,
    //     isShowNav: options.id == '4' ? true : false,
    //     // isShowNav: options.id == '7' ? false : true,
    //     banner: that.data[`banner${options.id}`],
    //     navViewList: that.data[`navViewList${options.id}`],
    //     arr: that.data[`arr${options.id}`],
    //     navTitle: that.data[`navTitle${options.id}`]
    //   })
    // }); 
  },
  onchangClicko:function() {
    var that = this;
    that.setData({
      showViewo: (!that.data.showViewo)
    })
  },
  onchangClickt: function () {
    var that = this;
    that.setData({
      showViewt: (!that.data.showViewt)
    })
  },
  onchangClickh: function () {
    var that = this;
    that.setData({
      showViewh: (!that.data.showViewh)
    })
  },
  goshoping(e) {
    console.log(e.currentTarget.dataset.shopcode)
    console.log(e.currentTarget.dataset.code)
    wx.navigateTo({
      url: "../travelOfficialshop/travelOfficialshop?scenicCode=" + e.currentTarget.dataset.shopcode + '&subordinate=' + e.currentTarget.dataset.subordinate + `&id=6`,
    })
  },
  deilsFn(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detailsShop/detailsShop?id=' + e.currentTarget.dataset.id + '&code=' + e.currentTarget.dataset.code,
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
      // 来自页面内转发按钮
    }
    return {
      title: '快来善小美，悠享健康生活',
    }
  },
  click(event) {
    Show:true;
  }
  
})