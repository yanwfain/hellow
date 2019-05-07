var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var page = 0;
var pages = 30;
Page({


  data: {

  },

  onLoad: function (options) {
    var that = this;
    var url = constantFields.INVITESHOP;
    page = 0;
    var put = {
      "page": page,
      "pageSize": pages,
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      var inviteShop = res.data.body;
      for(let i = 0;i<inviteShop.length;i++){
        var ind = inviteShop[i].creatAt.indexOf(' ')
        inviteShop[i].creatAt = inviteShop[i].creatAt.substring(0,ind)
      }
      console.log(res)
      that.setData({
        inviteShop: inviteShop
      })
    })
  },


  onReachBottom: function () {
    console.log('ok')
    page += 1;
    console.log(page)
    var that = this;
    var url = constantFields.INVITESHOP;
    console.log(app.globalData.openId);
    var put = {
      "page": page,
      "pageSzie": pages,
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };
    httpUtils.postRequest(url, put).then(function (res) {
      console.log(res)
      var inviteShops = that.data.inviteShop;
      var inviteShop = res.data.body 
      for (let i = 0; i < inviteShop.length; i++) {
        var ind = inviteShop[i].creatAt.indexOf(' ')
        inviteShop[i].creatAt = inviteShop[i].creatAt.substring(0, ind)
      }
      // inviteShops = inviteShops.concat(inviteShop)
      // that.setData({
      //   inviteShop: inviteShop
      // })
    })
  },

 
  onShow: function () {

  },


  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  // onShareAppMessage: function (res) {
  //   var that = this;
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //   }
  //   return {
  //     title: '快来善小美，悠享健康生活',
  //   }
  // },
})