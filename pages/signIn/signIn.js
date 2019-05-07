var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var timeFormatUtils = require("../../js/timeFormatUtils.js");
var page = 1;
var pages = 30;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off:true
  },
  onLoad: function (options) {
    page = 1;
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = constantFields.DETAIL;
    console.log(app.globalData.openId);
    var put = {
      "page": page,
      "pageSize": pages,
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      that.setData({
        detail: res.data.body.filter(i => i.moneyDescribe == '签到奖励')
      })
      console.log('------')
      console.log(that.data.detail)
      var allMoney= 0;
      for (var i = 0; i < that.data.detail.length;i++){
        allMoney += that.data.detail[i].money;
      }
      that.setData({
        allMoney:allMoney
      })
    })
   getSingIn(that)
    if (app.globalData.userInfo.avatarUrl){
      that.setData({
        photoImg: app.globalData.userInfo.avatarUrl
      })
    }
  },
  goSing(){
    var that = this;
    let url = constantFields.clickSignIn;
    let data = {
      "openId": app.globalData.openId,
    }
    httpUtils.postRequest(url, data).then(function (res) {
      if(res.data.head.errCode == 10000){
        getSingIn(that)
      }else{
        wx.showToast({
          title: res.data.body.errMsg,
        })
      }
    })
  },
  onShow: function () {

  },
  onPullDownRefresh: function () {
    var that = this;
    var url = constantFields.DETAIL;
    console.log(app.globalData.openId);
    var put = {
      "page": page,
      "pageSize": pages,
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      that.setData({
        detail: res.data.body.filter(i => i.moneyDescribe == '签到奖励')
      })
      console.log('------')
      console.log(that.data.detail)
      var allMoney = 0;
      for (var i = 0; i < that.data.detail.length; i++) {
        allMoney += that.data.detail[i].money;
      }
      that.setData({
        allMoney: allMoney
      })
    })
  },

  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    page = page + 1;
    console.log(page)
    var that = this;
    var url = constantFields.DETAIL;
    console.log(app.globalData.openId);
    var put = {
      "page": page,
      "pageSzie": pages,
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      var detail = that.data.detail;
      detail = detail.concat(res.data.body)
      that.setData({
        detail: detail
      })
    })
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
});
function getSingIn(that){
  wx.showLoading({
    title: '加载中',
  })
  let url = constantFields.getSignIn;
  let data = {
    "openId": app.globalData.openId,
  }
  httpUtils.postRequest(url, data).then(function (res) {
    console.log('签到-------')
    console.log(res)
    console.log(data)
    wx.hideLoading();
    if (res.data.head.errCode == 10000) {
      let ind = 8;
      let signIn = res.data.body;
      for (let i = 0; i < signIn.length; i++) {
        if (signIn[i].signInIs == 2) {
          let dates = timeFormatUtils.getDateFormat(new Date().getTime(), "yyyy-MM-dd");
          let datea = timeFormatUtils.getDateFormat(signIn[i == 0? 0 : i - 1].creatAt, "yyyy-MM-dd");
          if (datea == dates && i > 0){
            that.setData({
              off:false
            })
          };
          ind = i;
          break;
        }
      }
      that.setData({
        signIn: res.data.body,
        ind: ind
      })
    } else {
      wx.showToast({
        title: res.data.body.errMsg,
      })
    }
  })
}