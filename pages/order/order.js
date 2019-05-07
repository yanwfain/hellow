// pages/order/order.js
var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var customerCode = null;
var page = 1;
var itemIndex = "0";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    selectStatuss1: true,
    selectStatuss2: false,
    selectStatuss3: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // var params = {};
    //   params.customerCode = app.globalData.shopInfo.customerCode;
    //   customerCode = app.globalData.shopInfo.customerCode;
    //   if (params.customerCode == undefined){

    //   }else{
    //     httpUtils.postRequest(url, params)
    //       .then(function (res) {
    //         wx, wx.hideLoading();
    //         that.setData({
    //           orderList: res.data.body
    //         })
    //       })
    //   }
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
    console.log(app.globalData, "拉法法", app.globalData.openId);
    var that = this;
    getAll(that);
    that.setData({
      selectStatuss1: true,
      selectStatuss2: false,
      selectStatuss3: false
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
    if (customerCode == undefined){

    }else{
      page = 1;
      var that = this;
      var params = {};
      params.customerCode = customerCode;
      params.pageNo = page;
      params.pageSize = 10;
      httpUtils.postRequest(url, params).then(function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          orderList: res.data.body
        })
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // if (customerCode == undefined) {

    // } else {
    //   var that = this;
    //   var params = {};
    //   params.customerCode = customerCode;
    //   params.pageNo = ++page;
    //   params.pageSize = 10;
    //   httpUtils.postRequest(url, params).then(function (res) {
    //     that.data.orderList = that.data.orderList.concat(res.data.body);
    //     that.setData({
    //       orderList: that.data.orderList
    //     })
    //   })
    //   }
    var that = this;
    page = page + 1;
    wx.showLoading({
      title: '玩命加载中',
    })
    if (itemIndex == "0"){
      var url = constantFields.QUERRY_ORDER_LIST;
      var params = {
        "openId": app.globalData.openId,
        "pageNo": page,
        "pageSize": 10
      };
      httpUtils.postRequest(url, params).then(function (res) {
        if(res.data.body.length != 0){
          that.data.orderList = that.data.orderList.concat(res.data.body);
          that.setData({
            orderList: that.data.orderList
          })
          wx.showToast({
            title: '加载完成',
          })
          return;
        }

        wx.showToast({
          title: '没有更多',
        })

      })
    } else if (itemIndex == "2"){
      var url = constantFields.QUERRY_ORDER_LIST;
      var data = {
        "openId": app.globalData.openId,
        "status": "2",
        "pageNo": page,
        "pageSize": 10
      }
      httpUtils.postRequest(url, data).then(function (res) {
        if (res.data.body.length != 0) {
          that.data.orderList = that.data.orderList.concat(res.data.body);
          that.setData({
            orderList: that.data.orderList
          })
          wx.showToast({
            title: '加载完成',
          })
          return;
        }

        wx.showToast({
          title: '没有更多',
        })
      })
    }else{
      var url = constantFields.QUERRY_ORDER_LIST;
      var data = {
        "openId": app.globalData.openId,
        "status": "0",
        "pageNo": page,
        "pageSize": 10
      }
      httpUtils.postRequest(url, data).then(function (res) {
        if (res.data.body.length != 0) {
          that.data.orderList = that.data.orderList.concat(res.data.body);
          that.setData({
            orderList: that.data.orderList
          })
          wx.showToast({
            title: '加载完成',
          })
          return;
        }

        wx.showToast({
          title: '没有更多',
        })
      })
    }


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
  /**
   * 再来一单，把该订单的商品列表传入fillIn页面
   */
  againBuy:function(e){
    // console.log(e)
    // var productArr = this.data.orderList[e.currentTarget.dataset.index].retailOrderItemsList;
    // console.log(productArr)
    // var productArrStr = JSON.stringify(productArr);
    // wx.navigateTo({
    //   url: 'fillIn/fillIn?productStr=' + productArrStr + '&isagain=true&delta=1&downprice=' + this.data.orderList[e.currentTarget.dataset.index].preferentialFee,
    // })
    var that = this;
    console.log(e.currentTarget.dataset.index);
    var kindex = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'fillInzhifuo/fillInzhifuo?index=' + e.currentTarget.dataset.index + '&code=' + e.currentTarget.dataset.code + "&shopCode=" + e.currentTarget.dataset.shopcode + '&salePrice=' + e.currentTarget.dataset.saleprice + '&number=' + e.currentTarget.dataset.number + '&shopName=' + e.currentTarget.dataset.shopname
    })
  },
  orderDetail:function(e){
    if (e.currentTarget.dataset.payway =="NEW_RETAIL_OFFLINE"){

    }else{
      wx.navigateTo({
        url: '../orderDetails/orderDetails?code=' + e.currentTarget.dataset.code,
      })
    }
  
  
  },

  // 付款

  gobuy: function(e){
    var that = this;
    console.log(e.currentTarget.dataset.index);
    var kindex = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'fillInzhifuo/fillInzhifuo?index=' + e.currentTarget.dataset.index + '&code=' + e.currentTarget.dataset.code + "&shopCode=" + e.currentTarget.dataset.shopcode + '&salePrice=' + e.currentTarget.dataset.saleprice + '&number=' + e.currentTarget.dataset.number + '&shopName=' + e.currentTarget.dataset.shopname
    })
    // var productArr = this.data.orderList[e.currentTarget.dataset.index];
    // console.log(productArr)
    // console.log(productArr.code)
    // var prokk = this.data.orderList[e.currentTarget.dataset.index].retailOrderItemsList;
    // var prokkStr = JSON.stringify(prokk);
    
    // var orderSn = productArr.orderSn;
    // var orderCode = productArr.code;
    // console.log()

    // buy(that, orderCode, orderSn, prokkStr, kindex);
   
  },

  // 选择tab
  selectTabb: function(e){
    var that = this;
    console.log(e.target.dataset.index);
    itemIndex = e.target.dataset.index;

    if (itemIndex == "0"){
      getAll(that);

      that.setData({
        selectStatuss1: true,
        selectStatuss2: false,
        selectStatuss3: false
      })
    } else if (itemIndex == "1"){
      getY(that);

      that.setData({
        selectStatuss1: false,
        selectStatuss2: true,
        selectStatuss3: false
      })
    }else{
      getW(that);

      that.setData({
        selectStatuss1: false,
        selectStatuss2: false,
        selectStatuss3: true
      })
    }
  }

})

// 全部
function getAll(that){
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.QUERRY_ORDER_LIST;
  var params = {
    "openId" : app.globalData.openId,
    "pageNo": 1,
    "pageSize": 10
  };
  // params.customerCode = app.globalData.shopInfo.customerCode;
  // params.openId = app.globalData.openId;
  customerCode = app.globalData.shopInfo.customerCode;
  // if (params.customerCode == undefined) {
  //   console.log("params.customerCode == undefined");
  // } else {
  httpUtils.postRequest(url, params)
    .then(function (res) {
      console.log(res.data.body);
      wx.showToast({
        title: '加载完成',
      })
      that.setData({
        orderList: res.data.body
      })
    })
    // }
}


// 已完成
function getY(that){
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.QUERRY_ORDER_LIST;
  var data = {
    "openId": app.globalData.openId,
    "status" : "2",
    "pageNo": 1,
    "pageSize": 10
  }

  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
      if(res.data.body.length != 0){
        wx.showToast({
          title: '加载完成',
        })
        that.setData({
          orderList: res.data.body
        })
        return;
      }

      wx.showToast({
        title: '没有更多',
      })
      that.setData({
        orderList: res.data.body
      })

  })
}

// 未支付
function getW(that){
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.QUERRY_ORDER_LIST;
  var data = {
    "openId": app.globalData.openId,
    "status": "0",
    "pageNo": 1,
    "pageSize": 10
  }

  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    if (res.data.body.length != 0) {
      wx.showToast({
        title: '加载完成',
      })
      that.setData({
        orderList: res.data.body
      })
      return;
    }

    wx.showToast({
      title: '没有更多',
    })
    that.setData({
      orderList: res.data.body
    })

  })
}
// 付款
function buy(that, orderCode, orderSn, prokkStr, kindex){
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.GOPAY;
  var data = {
    "orderCode": orderCode,
    "orderSn": orderSn,
    'appid': constantFields.APP_ID,
    'openid': app.globalData.openId
  }
  console.log(data)
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);

    if(res.data.body[0].length != 0){
      wx.hideLoading();
      app.globalData.shopInfo = res.data.body[0];
      console.log(res.data.body[0]);
      
      wx.navigateTo({
        url: 'fillInzhifu/fillInzhifu?productStr=' + prokkStr + '&isagain=true&delta=1&downprice=' + that.data.orderList[kindex].preferentialFee,
      })
      return;
    }
    
    wx.showToast({
      title: '付款失败',
    })

  })
}


