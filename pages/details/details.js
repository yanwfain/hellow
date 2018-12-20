var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
var productCode = null;
var shopCode = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    interval: 5000,
    duration: 1000,
    commodity: 5.3,
    sold: 56,
    plain: true,
    product: {},
    selectProducts: [],
    count: 0,
    canIBuy: true
  },
  goToIndex:function(e){
    wx.reLaunch({
      url: '../index/index?shopCode=' + shopCode,
    })
  },
  goToShopCar(e){
    if (this.data.count == 0) {
      wx.showToast({
        title: '请加入购物车',
      })
      return;
    }
    wx.navigateTo({
      url: '../index/shopCar/shopCar',
    })
  },
  selectBuy: function (e) {
    if(this.data.canIBuy){
      this.data.product.count = 1;
      var productStr = JSON.stringify(this.data.product);
      wx.navigateTo({
        url: '../order/fillIn/fillIn?productStr=' + productStr,
      })
    }
    
  },
  addToShopCar: function (e) {
    var that = this;
    var temPro1 = this.data.selectProducts.filter(item => item.code == productCode);//包含当前商品的数组，有的话只有一个元素
    var temPro2 = this.data.selectProducts.filter(item => item.code != productCode);//不包含当前商品的数组
    console.log("加入购物车")
    if (temPro1.length != 0) {//说明之前选过该商品
      temPro1[0].count = temPro1[0].count + 1;
      that.data.selectProducts = temPro2.concat(temPro1);
      app.globalData.selectProducts = that.data.selectProducts;
      that.setData({
        selectProducts: that.data.selectProducts
      }
      )
    } else {
      that.data.product.count = 1;
      that.data.selectProducts.push(that.data.product)
      app.globalData.selectProducts = that.data.selectProducts;
      that.setData({
        selectProducts: that.data.selectProducts
      }
      )
    }
    var count = 0
    for (var i = 0; i < app.globalData.selectProducts.length; i++) {
      count = app.globalData.selectProducts[i].count + count;
    }
    that.setData({
      count: count
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一级页面
    let exp = 'expertList[' + Number(that.data.shopId) + "].count";
    prevPage.setData({
      'fixNum': count,
      [exp]: count
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '玩命加载中',
    })
    console.log(options,"111111111111");
    shopCode = options.shopCode;

    var selectProducts = app.globalData.selectProducts;
    this.setData({
      selectProducts: selectProducts,
      shopId:options.id
    })
    var count = 0;
    for (var i = 0; i < app.globalData.selectProducts.length; i++) {
      count = app.globalData.selectProducts[i].count + count;
    }
    this.setData({
      count: count
    })
    var that = this;
    productCode = options.productCode;
    httpUtils.postRequest(constantFields.PRODUCT_DETAIL, { code: productCode }).
      then(function (res) {
        console.log(res,"22222222222");
        if (res.data.body[0].sysEnshrineInfo === false){
          that.setData({
            off:0
          })
        }else{
          that.setData({
            off: 1
          })
        }
        wx.hideLoading();
        var canIBuy = (app.globalData.shopInfo.sysShopBussinessInfo.isOpen == 1)&&(parseInt(res.data.body[0].salePrice) >= app.globalData.shopInfo.sysShopBussinessInfo.amountMoney)&&time_range(app.globalData.shopInfo.sysShopBussinessInfo.openingHours, app.globalData.shopInfo.sysShopBussinessInfo.closingHours,new Date());
        that.setData({
          product: res.data.body[0],
          canIBuy: canIBuy
        })
      })
  },
 onShow:function(){

 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    console.log(productCode)
    httpUtils.postRequest(constantFields.PRODUCT_DETAIL, { code: productCode }).then(function(res){
      console.log(res.data.body[0],"555555555");
      that.setData({
        product: res.data.body[0]
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var selectProducts = app.globalData.selectProducts;
    this.setData({
      selectProducts: selectProducts
    })

    var count = 0;
    for (var i = 0; i < app.globalData.selectProducts.length; i++) {
      count = app.globalData.selectProducts[i].count + count;
    }
    this.setData({
      count: count
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
   *   
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    var pro = that.data.product;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("shopCode", shopCode);
    }
    return {
      title: pro.name,
      path: '/pages/details/details?productCode=' + pro.code + '&shopCode=' + shopCode,
      imageUrl: '',
      success: function (res) {
        console.log('转发成功');
        wx.showToast({
          title: '转发成功',
        })
        // 发送转发次数
        let url = constantFields.SHARENUMBER;
        let data = {
          "shopCode": shopCode
        }
        httpUtils.postRequest(url, data).then(function (res) {
          console.log(res.data.body,"转发次数");
        })
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败');
      }
    }
  },

  //收藏
  goOpenShop: function(){
    
    var that = this;
    console.log(that.data.off)
    if (that.data.off == 1) {
      var url = constantFields.QUTESHOUCANG;
      var data = {
        "code": that.data.product.sysEnshrineInfo,
        "enshrineType": "2",
        "objCode": that.data.product.code
      }
      httpUtils.postRequest(url, data).then(function (res) {
        wx.showToast({
          title: '取消收藏',
        })
        that.setData({
          off: 0
        })
      })

    } else {

      var url = constantFields.ADDSHOUCANG;
      var data = {
        "openId": app.globalData.openId,
        "enshrineType": "2",
        "alias": "",
        "objCode": that.data.product.code,
        "user": ""
      }
      httpUtils.postRequest(url, data).then(function (res) {
        console.log(res);
        wx.showToast({
          title: '收藏成功',
        })
        that.setData({
          off: 1
        })
      })
    }
  },
})

var time_range = function (beginTime, endTime, nowTime) {
  var strb = beginTime.split(":");
  if (strb.length != 2) {
    return false;
  }

  var stre = endTime.split(":");
  if (stre.length != 2) {
    return false;
  }
  var b = new Date();
  var e = new Date();
  var n = nowTime;

  b.setHours(strb[0]);
  b.setMinutes(strb[1]);
  e.setHours(stre[0]);
  e.setMinutes(stre[1]);

  if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
    console.log("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，在该时间范围内！");
    return true;
  } else {
    console.log("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，不在该时间范围内！");
    return false;
  }
}