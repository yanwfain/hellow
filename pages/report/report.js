var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var req = require('../../js/require.js');
var app = getApp();
Page({
  data: {
    check:[
      { name: '违法信息' },
      { name: '人身攻击' },
      { name: '虚假信息' },
      { name: '恶意重复' },
      { name: '垃圾广告' }
    ],
    off:'false',
    checks:[]
  },
  // 获取被选项
  click:function(e){
    this.setData({
      checks:e.detail.value
    })
  },
  submitForm(e){
    if (this.data.checks.length > 0) {
     req.report(this);
    } else {
      wx.showToast({
        title: '请填选举报信息',
      })
    }
  },
  onLoad: function (options) {
    this.setData({
      options:options
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
})