// pages/index/shopList/shopList.js
var httpUitls = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
var app = getApp();
var pageNo = 1;
var pageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[]
  },
  bindshop(e){
    // console.log(e)
    // var bindShopUrl = constantFields.BIND_SHOP_OPENID;
    // var bindparams = {
    //   'shopCode': e.currentTarget.dataset.shopcode,
    //   'openId': app.globalData.openId
    // }
    // httpUitls.postRequest(bindShopUrl, bindparams).then(function (res) {
    //   var shopUrl = constantFields.SHOP_INFO_BY_OPENID;
    //   var shopInfoParams = {
    //     'openId': res.data.body.openId
    //   }
    //   return httpUitls.postRequest(shopUrl, shopInfoParams);
    // }).then(function (res) {
    //   app.globalData.shopInfo = res.data.body.sysShopInfoList[0];
    //   app.globalData.selectProducts=[];
    //   // var pages = getCurrentPages();
    //   // var prepage = pages[pages.length-2];
    //   // prepage.setData({
    //   //   isNeedLoad:true
    //   // })
    //   // wx.navigateBack({
        
    //   // })
      
    // })
    wx.navigateTo({
      url: '../../index/index?shopCode=' + e.currentTarget.dataset.shopcode,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.showLoading({
      title: '玩命加载中',
    })

    var that  = this;
    that.setData({id:e.id});
    // var wxLogin = httpUitls.httpPromise(wx.login);
    // var params={};
    // wxLogin().then(function(res){
    //   params.code = res.code;
    //   params.appId = constantFields.APP_ID;
    //   return httpUitls.postRequest(constantFields.GET_OPENID,params);
    // }).then(function(res){
    //   var shopListParams = {};
    //   shopListParams.openId = res.data.body.openId;
      
    //   return httpUitls.postRequest(constantFields.SHOP_LIST_BY_OPENID, shopListParams);
    //   })
    if(e.id == 1){
      wx.setNavigationBarTitle({
        title: '我买过的店',
      })
      var url = constantFields.BUYSHOP;
      var shopListParams = {
        openId: app.globalData.openId,
        pageNo: pageNo,
        pageSize: pageSize
      };
      httpUitls.postRequest(url, shopListParams).then(function (res) {
        if(res.data.body== ''){
          wx.showToast({
            title: '暂无数据',
          })
        }
        console.log(res)
        // wx.showToast({
        //   title: '加载完成',
        // })
        that.setData({
          shopList: res.data.body
        })
      })
    }else{
      wx.setNavigationBarTitle({
        title: '进入店铺记录',
      })
      var url = constantFields.SHOP_LIST_BY_OPENID;
      var shopListParams = {
        openId: app.globalData.openId,
        pageNo: pageNo,
        pageSize: pageSize
      };
      httpUitls.postRequest(url, shopListParams).then(function (res) {
        console.log(res)
        wx.showToast({
          title: '加载完成',
        })
        that.setData({
          shopList: res.data.body
        })
      })

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
    pageNo = 1;
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
    var that = this;
    getMoreShopList(that);
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



function getMoreShopList(that){
  pageNo = pageNo + 1;

  wx.showLoading({
    title: '玩命加载中',
  })

  var url = constantFields.SHOP_LIST_BY_OPENID;
  var shopListParams = {
    // app.globalData.openId
    openId: app.globalData.openId,
    pageNo: pageNo,
    pageSize: pageSize
  };
  httpUitls.postRequest(url, shopListParams).then(function (res) {
    console.log(res)
    let shopLists = res.data.body;

    if (shopLists.length != 0){
      wx.showToast({
        title: '加载完成',
      })

      var moment_list = that.data.shopList;

      for (var i = 0; i < shopLists.length; i++) {
        moment_list.push(res.data.body[i]);
      }

      that.setData({
        shopList: moment_list
      })
      return;
    }

    wx.showToast({
      title: '没有更多',
    })
  })

}