// pages/lifeWisdom/lifeWisdom.js
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
var page = 0;
var pageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getLifeWisdomList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    page = 0;
    // 获取文章列表
    getLifeWisdom(that);
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
    // 上拉加载更多
    getMoreWisdom(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
  //去智慧详情页
  goLifeInfo: function(e){
    console.log(e);
    console.log(e.currentTarget.dataset.articlecode);
    var articleCode = e.currentTarget.dataset.articlecode;
    wx.navigateTo({
      url: 'wisdom/wisdom?articleCode=' + articleCode
    })
  }

})



// 获取所有文章
function getLifeWisdom(that){
  page++;
  console.log(page,"---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })
  
  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: page,
    pageSize: pageSize 
  };

  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    var wisdomList = res.data.body;

    if (wisdomList.length != 0){
      wx.showToast({
        title: '加载完成',
      })
      that.setData({
        getLifeWisdomList: wisdomList
      })
      return;
    }

    wx.showToast({
      title: '加载失败',
    })

  }) 

}

// 上拉加载更多文章
function getMoreWisdom(that){
  page++;
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })

  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: page,
    pageSize: pageSize
  };

  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);

    if (res.data.body) {

      if (res.data.body == "" || res.data.body == undefined || res.data.body == null) {
        wx.showToast({
          title: '到底了',
          icon: 'success',
          duration: 2000
        })
        return;
      }

      // 回调函数  
      var moment_list = that.data.getLifeWisdomList;
      for (var i = 0; i < res.data.body.length; i++) {
        moment_list.push(res.data.body[i]);
      }
      // 设置数据  
      that.setData({
        getLifeWisdomList: that.data.getLifeWisdomList
      })
      wx.showToast({
        title: '加载完成',
      })

    }

  })
}