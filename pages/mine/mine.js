// pages/mine/mine.js
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wxuser:null,
    shopInfo:null,
    sh:'1',
    navList:[
      { icon: '../../images/guanli.png', name: '管理我的店', click: 'openB' },
      { icon: '../../images/manage.png', name: '我要开店', click: 'openShop' },
      { icon: '../../images/manage.png', name: '签到', click: 'goSign' },
      { icon: '../../images/phone.png', name: '我的收藏', click: 'goMyCollection' },
      { icon: '../../images/place.png', name: '我的地址', click: 'goToAddress' },
      { icon: '../../images/order.png', name: '我的订单', click: 'goOrder' },
      { icon: '../../images/rmb.png', name: '我买过的店', click: 'goShopList',types:'1' },
      { icon: '../../images/payInshop.png', name: '浏览过的店', click: 'goShopList',types:'2' },
      { icon: '../../images/about.png', name: '关于公司', click: 'aboutGs' },
    ],
  },
  // 提示弹出层
  tishi(e){
    this.setData({
      sh:e.currentTarget.dataset.id
    })
  },
  // 签到
  goSign(){
    wx.navigateTo({
      url: '../signIn/signIn',
    })
  },
  // 广告金
  goGold: function () {
    wx.navigateTo({
      url: '../advertising/advertising',
    })
  },
  shopIntro:function(){
    if(this.data.shopInfo.code == undefined){
      wx.showModal({
        content: '请扫描店内二维码',
        showCancel: false
      })
    }else{
      wx.navigateTo({
        url: 'storeIntroduce/storeIntroduce',
      })
    }
  },
  zhaoshang(e){
    wx.navigateTo({
      url: '../platformInprom/platformInprom'
    })

  },
   signFn(){
    wx.navigateTo({
      url: '../mesign/mesign',
    })
  },
  shopHone:function(){  //拨打电话
    if(this.data.phone == undefined){
      return;
    }
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  getWxUserInfo(e){
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        app.globalData.userInfo = res.userInfo;
        that.setData({
          wxuser: res.userInfo
        })
      },
      fail: function () {
      }
    })
  },
  jifen(e) {
    console.log("1")
    wx.switchTab({
      url: '../estate/estate',
    })

    }, 
  money(e){
    console.log("1")
    wx.navigateTo({
      url: '../make/make',
    })
  },
  /**
   * 线下支付，未在线上购买，而是在实体店内购买，支付给店家；
   */
  payInShop(e){
    if (this.data.shopInfo.code == undefined) {
      wx.showModal({
        content: '请扫描店内二维码',
        showCancel: false
      })
    }else
    {
      wx.navigateTo({
        url: 'payInShop/payInShop',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData)
    
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
    wx.getUserInfo({
      success: function (res) {
        app.globalData.userInfo = res.userInfo;
        that.setData({
          wxuser: res.userInfo
        })
      },
      fail: function () {
      }
    })
    if(app.globalData.shopInfo == undefined){
      this.setData({
        phone: "请扫描店家二维码"
      })
    }else{
      this.setData({
        shopInfo:app.globalData.shopInfo,
        phone:app.globalData.shopInfo.servicePhone
      })
    }
    var url = constantFields.MYPUT;
    console.log(app);
    var put = {
      "openId": app.globalData.openId,
      "mobile": "",
      "originate": 'c'
    };
    httpUtils.postRequest(url, put).then(function (res) {
      console.log(res)
      console.log(put)

      that.setData({
        balance: res.data.body.balance,
        invitatuonNum: res.data.body.invitationNum
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
  goOrder:function(){
    wx.navigateTo({
      url: '../order/order',
    })
  },
  goToAddress:function(e){
    if(this.data.shopInfo == null){
      wx.showModal({
        content: '请扫描店内二维码',
        showCancel: false
      })
    }else{
      wx.navigateTo({
        url: 'address/address?showChoose=false',
      })
    }
  },

  // 浏览过的店
  goShopList: function(e){
    console.log(e)
    wx.navigateTo({
      url: '../index/shopList/shopList?id='+e.currentTarget.dataset.types,
    })
  },

  // 我的收藏
  goMyCollection: function(){
    wx.navigateTo({
      url: 'mycollection/mycollection',
    })
  },

  // 我要开店
  openShop:function(){
    wx.navigateTo({
      url: '../openShop/openShop',
    })
  },

  // 打开b端
  openB: function(){
    console.log(111)
    wx.navigateToMiniProgram({
      appId: 'wx6c653b3b961fb92a',
      envVersion: "develop",
    })
  },

  // 关于公司
  aboutGs: function(){
    wx.navigateTo({
      url: 'aboutGs/aboutGs',
    })
  }

})