var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tet: '及及在身边广告投放金规则：\n1、新用户可得到680的广告投放金；\n2、开店，即获赠680广告投放金；\n3、推荐1个朋友真实开店（发1个真实促销和1个真实产品即可），即获赠680广告投放金（推荐时将您的开店邀请码告知朋友）；\n4、广告投放金可以转让给其他店；\n5、广告投放金只能用于转让、投放广告，不能用来购买商品、提现；\n6、1个开店邀请码最多能推荐300个朋友开店。\n'
  },
  goTar:function(e){
    switch(e.currentTarget.dataset.id){
      case '1':
        wx.navigateTo({
          url: '../inviteShop/inviteShop',
        })
        break;
      case '2':
        wx.navigateTo({
          url: 'transfer/transfer?gold=' + this.data.total.sumMonery,
        })
        break;
      case '3':
        wx.navigateTo({
          url: '../detail/detail',
        })
        break;
      case '4':
        wx.navigateTo({
          url: '../onGlod/onGlod',
        })
        break;
    }
  },
  // 获取页面初始数据
  getdatas:function(that){
    var url = constantFields.TOTAL;
    console.log(app);
    var put = {
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };
    httpUtils.postRequest(url, put).then(function (res) {
      console.log(res)
      that.setData({
        total: res.data.body
      })
    })
  },
  onLoad: function (options) {
    
    
  },

  onReady: function () {

  },

  onShow: function () {
    var that = this;
    that.getdatas(that)
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})