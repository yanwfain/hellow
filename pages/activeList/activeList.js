// pages/goJionList/goJionList.js
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
var searchKey = "";
var page = 1;
var pageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: []
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
    searchKey = "";
    page = 1;
    let that = this;

    // 获取活动列表
    getActivityList(that);
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
    let that = this;

    page = page + 1;

    console.log("当前page:" + page);

    wx.showLoading({
      title: '玩命加载中',
    })

    let url = constantFields.JULIZUIJIN;

    let data = {
      "searchKey": searchKey,
      "city": app.globalData.city,
      "lat": app.globalData.latitude,
      "lng": app.globalData.longitude,
      "pageNo": page,
      "pageSize": pageSize
    }

    httpUtils.postRequest(url, data).then(function (res) {

      if (res.data.head.errCode != 10000) {
        wx.hideLoading();
        wx.showToast({
          title: '出错了',
        })
        return;
      } else {
        wx.hideLoading();
        console.log(res.data.body, "返回的数据", "数据类型：" + typeof (res.data.body));
        if (res.data.body.length != 0) {

          // 回调函数  
          var moment_list = that.data.activityList;

          for (var i = 0; i < res.data.body.length; i++) {
            moment_list.push(res.data.body[i]);
          }

          that.setData({
            activityList: that.data.activityList
          })
          return;
        }

        wx.showToast({
          title: '没有更多',
        })
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 进入对应的活动详情页
  goJionDetail: function (e) {

    console.log(e);

    let item = e.currentTarget.dataset.item;

    wx.navigateTo({
      url: '../activeDetail/activeDetail?activeCode=' + item.code + '&shopCode=' + item.shopCode + '&cover=' + item.cover + '&activeName=' + item.activeName + '&time=' + item.beginTime + '-' + item.endTime,
    })
  },

  // 监听输入框状态
  text: function (e){
    console.log(e.detail);
    searchKey = e.detail.value;
  },

  // 点击完成按钮
  statusText: function (e){
    var that = this;
    console.log(e.detail.value);
    getActivityList(that);
  }

})




// 获取活动列表
function getActivityList(that) {
  
  console.log("当前page:"+ page);

  wx.showLoading({
    title: '玩命加载中',
  })

  let url = constantFields.JULIZUIJIN;

  let data = {
    "searchKey": searchKey,
    "city": app.globalData.city,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": page,
    "pageSize": pageSize
  }

  httpUtils.postRequest(url, data).then(function (res) {

    if (res.data.head.errCode != 10000) {
      wx.hideLoading();
      wx.showToast({
        title: '出错了',
      })
      return;
    } else {
      wx.hideLoading();
      console.log(res.data.body, "返回的数据", "数据类型：" + typeof (res.data.body));
      if (res.data.body.length != 0) {
        that.setData({
          activityList: res.data.body
        })
        return;
      }

      wx.showToast({
        title: '没有更多',
      })
    }

  })



}