var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    selectAll: true,
    selectedProducts: []
  },
  minus: function (e) {
    var num = this.data.num;

    if(num>1){
      num--;  
    }
    // let detail = this.data.detail
    // console.log(detail[count])
    // detail.count = num;
    this.setData({
      num: num,
      detail: detail
    });
  },
  // 点击加号时
  add: function (e) {
    var num = this.data.num;
   num++
    let detail = this.data.detail
    // console.log(detail[count])
    // detail.count = num;
    this.setData({
      num: num,
      detail:detail
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options)
    // 这个是 加购 查询
    var url = constantFields.JIAGOU;
    console.log(app.globalData.openId);
    var put = {
      'id': options.id,
      'specifications': options.specifications
    };
    // console.log(options.id)
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      that.setData({ 
        detail: res.data.body,
        
      })
    })
  },
  checkboxChange: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    this.data.expertList[index].checked = !this.data.expertList[index].checked;
    var array = this.data.expertList.filter(item => item.checked == true);
    var all = true;
    for (var i = 0; i < this.data.expertList.length; i++) {
      all = all && this.data.expertList[i].checked;
    }
    var totalPrice = 0;
    for (var i = 0; i < array.length; i++) {
      totalPrice = totalPrice + array[i].salePrice * array[i].count
    }
    app.globalData.selectProducts = array;
    this.setData({
      selectedProducts: array,
      expertList: this.data.expertList,
      selectAll: all,
      totalPrice: totalPrice
    })
    var canIBuy = (this.data.totalPrice >= this.data.shopInfo.sysShopBussinessInfo.amountMoney) && time_range(this.data.shopInfo.sysShopBussinessInfo.openingHours, this.data.shopInfo.sysShopBussinessInfo.closingHours, new Date()) && (this.data.shopInfo.sysShopBussinessInfo.isOpen == 1);
    this.setData({
      canIBuy: canIBuy
    })
  },
  navigateTo: function (e) {
    app.globalData.selectProducts = [this.data.detail]
    app.globalData.selectProducts[0].count = this.data.num
    console.log(app.globalData.selectProducts)
    // console.log(this.data.canIBuy + "-------------------")
    // if (this.data.canIBuy) {
      wx.navigateTo({
        url: '../order/fillInzhifu/fillInzhifu',
      })
    // } else {

    // }

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
  onShareAppMessage: function () {
    
  }
})
