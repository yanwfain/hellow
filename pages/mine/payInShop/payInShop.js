// pages/mine/payInShop/payInShop.js
var api = require('../../../js/constantFields.js');
var httpUtils = require('../../../js/httpUtils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:null,
    downprice:0,
    inputMoney:'',
    isscan:false,
    focusStatus: true
  },
  gotoindex(e){
    // console.log(e);
    // wx.switchTab({
    //   url: '../../index/index',
    // })
    wx.redirectTo({
      url: '../../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var shopCode = decodeURIComponent(options.shopCode);
    //绑定店铺，生成顾客code
    if (shopCode != null && shopCode != "undefined" && shopCode != undefined){
      var wxlogin = httpUtils.httpPromise(wx.login);
      wxlogin().then(function(res){
        var params={
          appId: api.APP_ID,
          code:res.code
        }
        return httpUtils.postRequest(api.GET_OPENID,params);
      }).then(function(res){
        //不管之前有没有进过店铺，都去绑定店铺
        var bindShopUrl = api.BIND_SHOP_OPENID;
        var bindparams = {
          'shopCode': shopCode,
          'openId': res.data.body.openId
        }
        that.setData({
          openId: res.data.body.openId
        })
        return httpUtils.postRequest(bindShopUrl, bindparams);
      }).then(function(res){
        var shopUrl = api.SHOP_INFO_BY_OPENID;
        var shopInfoParams = {
          'openId': res.data.body.openId
        }
        return httpUtils.postRequest(shopUrl, shopInfoParams);
      }).then(function(res){
        app.globalData.shopInfo = res.data.body.sysShopInfoList[0];
        that.setData({
          isscan:true,
          customerCode: res.data.body.sysShopInfoList[0].customerCode,
          shop: res.data.body.sysShopInfoList[0]
        })
      })
    }else{//不是扫码进去此页面而是从其他页面跳转进来，所以先去根据openID查询之前绑定的店铺，因为上个页面已经过滤掉了没有店铺的情况；
    //这里有个隐患，会不会出现：我在这里查询的店铺和首页选择的店铺不一致。
    //所以这里是重新去获取还是从全局里面取？
      var wxlogin = httpUtils.httpPromise(wx.login);
      wxlogin().then(function (res) {
        var params = {
          appId: api.APP_ID,
          code: res.code
        }
        return httpUtils.postRequest(api.GET_OPENID, params);
      }).then(function (res) {
        var getShopparams = {
          'openId': res.data.body.openId
        }
        that.setData({
          openId: res.data.body.openId
        })
        return httpUtils.postRequest(api.SHOP_INFO_BY_OPENID, getShopparams);
      }).then(function(res){
        that.setData({
          isscan:false,
          customerCode: res.data.body.sysShopInfoList[0].customerCode,
          shop:res.data.body.sysShopInfoList[0]
        })
      })
    }
  },
  checkMoney(e){
    var input = e.detail.value;
    var reg = /^\d+(\.\d{0,2})?$/;//输入两位小数
    var regStrs = [
      ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
      ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
      ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
      ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
    ];
    for (var i = 0; i < regStrs.length; i++) {
      var reg = new RegExp(regStrs[i][0]);
      input = input.replace(reg, regStrs[i][1]);
    }
    this.setData({
      inputMoney: input
    })
   
  },
  payInShop(e){
    var that = this;
    var handInputMoney = e.detail.value.handinput;
    if(handInputMoney ==""){
      wx.showToast({
        title: '请输入支付金额',
      })
    }else{
      if(handInputMoney == "0"){
        wx.showToast({
          title: '支付金额不能为0',
        })

      }else{
        if (isNaN(handInputMoney)){
          wx.showToast({
            title: '输入正确的支付金额',
          })
        }else{
          var money = handInputMoney*10*10;
          var params = {};
          var downprice = that.data.downprice;
          if (money>=1000){//10块钱以上随机立减
            var totalDown = money * parseInt(app.globalData.shopInfo.sysShopActivityInfo.offlinePreferentialRateA)/100;
            //随机立减金额
            var downprice = parseInt(totalDown * parseInt(app.globalData.shopInfo.sysShopActivityInfo.offlinePreferentialRateC)
 / 100);
            that.setData({
              downprice: downprice
            })
          }
          
          params.appId = api.APP_ID;
          params.openId = that.data.openId;
          params.customerCode = that.data.customerCode;
          params.shopCode = that.data.shop.code;
          params.originPrice = money;
          params.salePrice = money - downprice;
          params.preferentialFee = downprice;
          httpUtils.postRequest(api.OFFLINE_PAY,params).then(function(res){
            var paymentParams = {
              'timeStamp': res.data.body.timeStamp,
              'nonceStr': res.data.body.nonceStr,
              'package': 'prepay_id=' + res.data.body.prepay_id,
              'signType': 'MD5',
              'paySign': res.data.body.paySign,
              'success': function (res) {

              },
              'fail': function (res) {

              }
            }
            return httpUtils.httpPromise(wx.requestPayment)(paymentParams);
          }).then(function (res) {
            app.globalData.selectProducts = [];
            wx.showModal({
              title: '提示',
              content: '支付成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../../index/index',
                  })
                }
              }
            })
          }, function (err) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '支付失败',
              success: function (res) {
                // if (res.confirm) {
                //   wx.navigateBack({
                //     delta: delta
                //   })
                // }
              }
            })

          })
        }
      }
    }
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
  
  }
})