// pages/goJionList/goJionList.js
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
var searchKey = "";
var page = 1;
var pageSize = 10;
var shopCode = "";
Page({
  data: {
    activityList: []
  },
  onLoad: function (options) {
    shopCode = options.shopCode;
    let that = this;
    // 获取活动列表
    getActivityList(that, options);
  },
  onReady: function () {
  
  },
  onShow: function () {
    searchKey = "";
    page = 1;
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
    let that = this;
    page = page + 1;
    console.log("当前page:" + page);
    wx.showLoading({
      title: '玩命加载中',
    })
    let url = constantFields.FINEDDDSHOPLIST;
    let data = {
      "searchKey": searchKey,
      "shopCode": shopCode,
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
  onShareAppMessage: function () {
  
  },
  goJionDetail: function (e) {
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
function getActivityList(that, options) {
  console.log(options);
  wx.showLoading({
    title: '玩命加载中',
  })
  let url = constantFields.FINEDDDSHOPLIST;
  let data = {
    "searchKey": searchKey,
    "shopCode": options.shopCode,
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