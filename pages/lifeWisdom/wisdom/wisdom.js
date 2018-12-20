// pages/lifeWisdom/wisdom/wisdom.js
var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
var app = getApp();
var itemInfo={};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: [],
    lable: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    itemInfo = options;
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
    var that = this;
    // 获取文章详情
    getInfoList(that);
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
  
  },

  // 去平台
  goPintai: function(){
    wx.switchTab({
      url: '../../snIndex/snIndex',
    })
  }
})



// 获取文章详情
function getInfoList(that) {
  wx.showLoading({
    title: '玩命加载中',
  })

  var url = constantFields.LIFEWISDOM;
  var data = {
    "articleCode": itemInfo.articleCode
  };

  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body.list);
    var infoList = res.data.body.list;
    var lable = infoList[0].title;

    console.log(infoList[0].articleImgInfo);

    if (infoList.length != 0) {
      wx.showToast({
        title: '加载完成',
      })
   
      that.setData({
        infoList: infoList,
      })
      console.log(that.data.infoList)
      return;
    }

    wx.showToast({
      title: '加载失败',
    })

  })

}