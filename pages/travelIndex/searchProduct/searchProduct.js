var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expertList:[],
    selectedProducts:[]
  },
  search:function(e){
    var that = this;
    var productName = e.detail.value;
    if (productName == undefined){
      return;
    }
    var url = constantFields.GET_PRODUCT_BY_TYPE;
    var getStorage = httpUtils.httpPromise(wx.getStorage);
    var params = {
      'pageNo': 1,
      'pageSize': 10
    };
    // getStorage({key:'bindShop'}).then(function(res){
    params.shopCode = app.globalData.shopInfo.code;
      params.productName = productName;
    httpUtils.postRequest(url, params).
    then(function(res){
      wx.hideLoading();
      for (var i = 0; i < res.data.body.length; i++) {
        for (var j = 0; j < app.globalData.selectProducts.length; j++) {
          if (res.data.body[i].code == app.globalData.selectProducts[j].code) {//如果选择列表中已经选择了，把已选数量赋值给数据源回显数量
            res.data.body[i] = app.globalData.selectProducts[j];
            continue;
          }
        }
      }
        that.setData({
          expertList:res.data.body
        })
    })
  },
  /**
   * 添加选中商品
   */
  plusPro: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var selectedProduct = this.data.expertList[index];//选中的商品
    //因为让后台添加了一个辅助字段：count,所以代码简化：
    selectedProduct.count++;
    var code = selectedProduct.code;
    var carArray = this.data.selectedProducts.filter(item => item.code != code);//返回不包含点击添加的code的数组
    carArray.push(selectedProduct);
    var fixnum = 0;
    for (var i = 0; i < carArray.length; i++) {
      fixnum = carArray[i].count + fixnum;
      carArray[i].checked = true;
    }
    app.globalData.selectProducts = carArray;
    var pages = getCurrentPages();
    var prepage = pages[pages.length-2];
    prepage.setData({
      isNeedLoad:true
    })
    this.setData({
      selectedProducts: carArray,
      expertList: this.data.expertList,
      fixNum: fixnum
    })
    // console.log(this.data.selectedProducts);
    // console.log(this.data.expertList);
  },
  /**
   * 点击删除商品
   */
  minus: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var selectedProduct = this.data.expertList[index];//选中的商品
    //因为让后台添加了一个辅助字段：count,所以代码简化：
    selectedProduct.count--;
    var code = selectedProduct.code;
    var carArray = this.data.selectedProducts.filter(item => item.code != code);//返回不包含点击添加的code的数组
    if (selectedProduct.count == 0) {

    } else {
      carArray.push(selectedProduct);
    }
    var fixnum = 0;
    for (var i = 0; i < carArray.length; i++) {
      fixnum = carArray[i].count + fixnum;
      carArray[i].checked = true;
    }
    app.globalData.selectProducts = carArray;
    var pages = getCurrentPages();
    var prepage = pages[pages.length - 2];
    prepage.setData({
      isNeedLoad: true
    })
    this.setData({
      selectedProducts: carArray,
      expertList: this.data.expertList,
      fixNum: fixnum
    })
  },
  details: function (e) {
    wx.navigateTo({
      url: '../../details/details?productCode=' + e.currentTarget.dataset.code
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectedProducts: app.globalData.selectProducts
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