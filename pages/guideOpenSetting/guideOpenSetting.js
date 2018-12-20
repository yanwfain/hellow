// pages/guideOpenSetting/guideOpenSetting.js
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var openId = null;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIGetUserInfo: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //过渡页面，如果搜索进入。首先判断是否有绑定过商店。没有的话提示去扫码，绑定过直接进入首页
    var url = constantFields.GET_OPENID;
    var params = {};
    params.appId = constantFields.APP_ID;
    var wxlogin = httpUtils.httpPromise(wx.login);
    wxlogin().then(function (res) {
      params.code = res.code;
      return httpUtils.postRequest(url, params);
    }).then(function (res) {
      var searchUrl = constantFields.SHOP_INFO_BY_OPENID;
      var searchParams = {
        'openId': res.data.body.openId
      }
      return httpUtils.postRequest(searchUrl, searchParams);
    }).then(function (res) {
      wx.hideLoading();
      console.log(res);
      if (res.data.body.sysShopInfoList == null || res.data.body.sysShopInfoList.length == 0) {//未绑定过店 
      
        // wx.showModal({
        //   title: '扫码绑定商店',
        //   content: '直接扫描店家二维码进入指定店铺',
        // })
        //一下代码为了体验写的
      var bindShopUrl = constantFields.BIND_SHOP_OPENID;
            var bindparams = {
              'shopCode': 'SYSSHOPINFO201803241200090645114',
              'openId': res.data.body.openId
            }
            wx.setStorage({
              key: 'bindShop',
              data: "SYSSHOPINFO201803241200090645114",
            })
           httpUtils.postRequest(bindShopUrl, bindparams).then(function(res){
             wx.setStorage({
               key: 'customerCode',
               data: res.data.body.customerCode,
             })
             wx.switchTab({
               url: '../index/index',
             })
           });

      } else {//进过店,绑定过shopCode
        app.globalData.shopInfo = res.data.body.sysShopInfoList[0];
        wx.setStorage({
          key: 'bindShop',
          data: res.data.body.sysShopInfoList[0].code,
        });
        wx.setStorage({
          key: 'customerCode',
          data: res.data.body.sysShopInfoList[0].customerCode,
        })
        wx.switchTab({
          url: '../index/index',
        })
      }
    })

    // //启动之后进入过渡界面，申请授权；如果拒绝授权提示必须授权
    // var that = this;
    // var authorize = httpUtils.httpPromise(wx.authorize);
    // var setStorage = httpUtils.httpPromise(wx.setStorage);
    // var getUserInfo = httpUtils.httpPromise(wx.getUserInfo);
    // authorize({ scope: 'scope.userInfo'}).then(function(res){
    //   console.log("成功");
    //   wx.switchTab({
    //     url: '../home/home',
    //   })
    //   return getUserInfo();
    // },function(err){
    //   console.log("失败")
    //   that.setData({
    //     canIGetUserInfo: false
    //   })
    // }).then(function(res){
    //   setStorage({key:'wxuser',data:res.userInfo})
    // })
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
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.errMsg.length == 14) {//"getUserInfo:ok"的长度是14，说明是用户已授权
      this.setData({
        canIGetUserInfo: true
      });
      wx.setStorage({
        key: 'wxuser',
        data: e.detail.userInfo,
      })
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      this.setData({
        canIGetUserInfo: false
      })
    }
  }
})