// pages/mine/mycollection/mycollection.js
var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
var app = getApp();
var page = 1;
var pageSize = 10;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList: [],
    add:'0',
    scope: ["店铺收藏", "促销收藏","产品收藏"],
  },
  // 分类
  bindPickerChange: function (e) {
    this.setData({
      add: e.detail.value
    })
    console.log(this.data.add)
    getCollection(this)
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
    page = 1;
    var that = this;
    // 加载收藏列表数据
    getCollection(that);
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
    getMoreList(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 跳转
  goShop: function(e){
    this.setData({
      collectionList:[]
    })
    switch(this.data.add){
      case '0':
        wx.navigateTo({
          url: '../../index/index?shopCode=' + e.currentTarget.dataset.objcode,
        });
        break;
      case '1':
        wx.navigateTo({
          url: '../../activeDetail/activeDetail?activeCode=' + e.currentTarget.dataset.objcode,
        });
        break;
      case '2':
        wx.navigateTo({
          url: '../../details/details?shopCode=' + e.currentTarget.dataset.shopCode + '&productCode='  + e.currentTarget.dataset.objcode,
        });
        break;
    };
    
  }
})


function getCollection(that){
  console.log(page);
  wx.showLoading({
    title: '玩命加载中',
  })
  console.log(app)
  var url = constantFields.FINDSHOUCANGLIST;
  var data = {
    "openId": app.globalData.openId,
    "enshrineType": that.data.add,
    "status": "NORMAL",
    "pageNo": page,
    "pageSize": pageSize,
  }

  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    if(res.data.body.length != 0){
      wx.showToast({
        title: '加载完成',
      })
      that.setData({
        collectionList: res.data.body
      })
      return;
    }

    wx.showToast({
      title: '您还没有收藏',
    })
  })
}

function getMoreList(that){
  page = page + 1;
  console.log(page);
  wx.showLoading({
    title: '玩命加载中',
  })

  var url = constantFields.FINDSHOUCANGLIST;
  var data = {
    "openId": app.globalData.openId,
    "enshrineType": that.data.add,
    "pageNo": page,
    "pageSize": pageSize,
  }
  console.log(data)
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    if (res.data.body.length != 0) {
      wx.showToast({
        title: '加载完成',
      })
      var moment_list = that.data.collectionList;

      for (var i = 0; i < res.data.body.length; i++) {
        moment_list.push(res.data.body[i]);
      }
      // 设置数据  
      that.setData({
        collectionList: that.data.collectionList
      })
      return;
    }

    wx.showToast({
      title: '没有更多',
    })
  })
}