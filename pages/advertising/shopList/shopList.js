// pages/index/shopList/shopList.js
// var httpUitls = require('../../../js/httpUtils.js');
// var constantFields = require('../../../js/constantFields.js');
// var app = getApp();
// var pageNo = 1;
// var pageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

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
    var that = this;
    getMoreShopList(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})



function getMoreShopList(that){
  pageNo = pageNo + 1;

  wx.showLoading({
    title: '玩命加载中',
  })

  var url = constantFields.SHOP_LIST_BY_OPENID;
  var shopListParams = {
    // app.globalData.openId
    openId: app.globalData.openId,
    pageNo: pageNo,
    pageSize: pageSize
  };
  httpUitls.postRequest(url, shopListParams).then(function (res) {
    console.log(res)
    let shopLists = res.data.body;

    if (shopLists.length != 0){
      wx.showToast({
        title: '加载完成',
      })

      var moment_list = that.data.shopList;

      for (var i = 0; i < shopLists.length; i++) {
        moment_list.push(res.data.body[i]);
      }

      that.setData({
        shopList: moment_list
      })
      return;
    }

    wx.showToast({
      title: '没有更多',
    })
  })

}