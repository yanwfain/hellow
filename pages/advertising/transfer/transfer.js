   var app = getApp();
var page = 1;
var pageSize = 10;
var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off:2
  },
  // goTop(){
  //   srick("#goTop",function(res){
  //       wx.pageScrollTo({
  //         scrollTop: res[0].height,
  //       })      
  //   })
  // },
  // 拿手机号数据
  iphone:function(e){
    this.setData({ iphone: e.detail.value })
  },
  goMany:function(e){
    if(e.target.dataset.id == 1){
      this.setData({ off: 1 })
    }else{
      this.setData({ off: 2 })
    }
    
  },
  inp(e){
    switch (e.currentTarget.dataset.id) {
      case "0":
        this.setData({
          phone: e.detail.value
        })
        break;
      case "1":
        this.setData({
          golds: e.detail.value
        })
        break;
      case "2":
        this.setData({
          name: e.detail.value
        })
        break;
      case "3":
        this.setData({
          phones: e.detail.value
        })
        break;
    }
  },
  // 判断整数
  isInteger:function (obj) {
    return obj % 1 === 0
  },
  // 转让投放金
  accounts:function(e){
    console.log(e);
    var that = this;
    let url = constantFields.ACCOUNRS;
    let datas = {
      "originate":'c',
      "mobile":""
    };
    if (!/^1[3,5,6,7,8]\d{9}/g.test(that.data.phone)) {
      wx.showToast({
        image: '../../../images/defeated.png',
        title: '转出手机号有误',
      })
      return;
    };
    if (!/^1[3,5,6,7,8]\d{9}/g.test(that.data.phones)) {
      wx.showToast({
        image: '../../images/defeated.png',
        title: '转出人手机有误',
      })
      return;
    };
    if (that.data.golds == "" || !that.isInteger(that.data.golds) || that.data.golds <= 0){
      wx.showToast({
        image: '../../images/defeated.png',
        title: '请输入有效金额',
      })
      return;
    }
    datas.phone = that.data.phone;
    datas.phones = that.data.phones;
    datas.name = that.data.name;
    datas.openId = app.globalData.openId;
    datas.goldMonery = that.data.golds;
    // datas.source = that.data.source;
    httpUtils.postRequest(url,datas).then(function(res){
      console.log(res)
      console.log(datas)
      if(res.data.head.errCode == 10000){
        wx.showToast({
          title: '转出成功',
        })
        setTimeout(function(){
          wx.navigateBack({
          })
        },500);
      }else if(res.data.head.errCode == 10001){
        wx.showToast({
          image:'../../images/defeated.png',
          title: res.data.body.errMsg,
        })
      }
    })
  },
  // 弹出层转出
 
  onLoad: function (options) {
    console.log(app);
    var that = this;
    this.setData({
      gold:options.gold
    })
    let url = constantFields.getAA;
    let data = {
      openId: app.globalData.openId,
      originate: "c",
      phone: ""
    };
    httpUtils.postRequest(url,data).then(function(res){
      that.setData({
        contactPhone: res.data.body
      })
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
    var that = this;
    let url = constantFields.ACCOUNRSDETAIL;
    let datas = {
      "page":page,
      "pageSize": pageSize,
      "originate":'c',
      "type":'to_user_sub',
      "mobile":"",
      "openId":app.globalData.openId
    };
    httpUtils.postRequest(url, datas).then(function (res) {
      console.log(res)
      console.log(datas)
      var details = res.data.body;
      let int = 0;
      for(let i = 0;i<details.length;i++){
        int = int + Number(details[i].money) ;
      }
      that.setData({
        int:int,
        details:details
      })
    })
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
// 模块监听
function srick(id, fn){
    var srick = wx.createSelectorQuery();
    srick.select(id).boundingClientRect();
    srick.selectViewport().scrollOffset();
    srick.exec(function(res) {
      fn(res)
    })
}