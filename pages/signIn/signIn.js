var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var timeFormatUtils = require("../../js/timeFormatUtils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off:true
  },
  onLoad: function (options) {
    var that = this;
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

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
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
    console.log(res)
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