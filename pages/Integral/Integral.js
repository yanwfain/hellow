var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTrue:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var url = constantFields.DUIDEILT;
    console.log(app.globalData.openId);
    console.log(app.globalData);
    console.log(app.globalData.userInfo.nickName);
  
    var put = {
      // "openId": app.globalData.openId,
      // "mobile": "",
      // "originate": 'c',
      "id": options.id,
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      // console.log(res.data.body.balance.jifen)
      wx.hideLoading();
      console.log(res)
      that.setData({
        detail: res.data.body,
        integral: parseInt(res.data.body.integral),
        currentJifen: parseInt(app.globalData.jifen),
        id: res.data.body.id,
        count: parseInt(res.data.body.count),
        shopCode: res.data.body.shopCode
      })
    console.log(that.data)
    })
    // console.log(currentJifen)
    // parseInt(res.data.body.integral)
  },
  duihuan: function (options){   
    isTrue:true; 
    var that = this;
    var url = constantFields.DUIHUANY;
    console.log(app.globalData.openId);
    var put = {
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c',
      "id":that.data.id,
      "balance": app.globalData.jifen,
      "integral": that.data.integral,
      "count": that.data.count,
      "userName": app.globalData.userInfo.nickName,
      "shopCode": that.data.shopCode
    };
    httpUtils.postRequest(url, put).then(function (res) {
      // console.log(res.data.body.balance.jifen)
      console.log(put)
      wx.hideLoading();
      console.log(res)
      if (res.data.head.errCode == 10000) {
        wx.showToast({
          title: '兑换成功',
        })
    
        setTimeout(function () {
          wx.navigateBack({
          })
        }, 500); //返回上一级页面
      } else if (res.data.head.errCode == 10001) {
        wx.showToast({
          image: '../../images/defeated.png',
          title: res.data.body.errMsg,
        })
      }
      // console.log(that.data)
    })
   
    // wx.showToast({
    //   image: '../../images/checked.png',
    //   title: '兑换成功',
    // })
  },
  // 点击确定
  cllck(){
    isTrue: false;
    var that = this;
    var url = constantFields.DUIHUANY;
    console.log(app.globalData.openId);
    var put = {
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c',
      "id": that.data.id,
      "balance": app.globalData.jifen,
      "integral": that.data.integral,
      "count": that.data.count
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      // console.log(res.data.body.balance.jifen)
      wx.hideLoading();
      // console.log(res)
      that.setData({
     
      })
      // console.log(that.data)
    })
   
  },
  not(){
    wx.showToast({
      image: '../../images/defeated.png',
      title: '积分不足',
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
  onPullDownRefresh: function (options ) {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  onShow(){
    // var that = this;
    // var url = constantFields.DUIDEILT;
    // console.log(app.globalData.openId);
    // var put = {
    //   // "openId": app.globalData.openId,
    //   // "mobile": "",
    //   // "originate": 'c',
    //   "id": options.id,
    // };
    // console.log(put)
    // httpUtils.postRequest(url, put).then(function (res) {
    //   // console.log(res.data.body.balance.jifen)
    //   wx.hideLoading();
    //   console.log(res)
    //   that.setData({
    //     detail: res.data.body,
    //     integral: parseInt(res.data.body.integral),
    //     currentJifen: parseInt(app.globalData.jifen),
    //     id: res.data.body.id,
    //     count: parseInt(res.data.body.count),
    //   })
    //   console.log(that.data)
    // })
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
  exchange(){
    
  }
})
