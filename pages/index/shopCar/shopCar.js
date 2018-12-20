// pages/index/shopCar.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    minusStatus: "disabled",
    expertList: [],
    selectedProducts:[],
    totalPrice:0,
    selectAll:true,
    shopInfo:{},
    canIBuy:true
  },
//  点击减号时
  minus: function (e) {    
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });

    var index = e.currentTarget.dataset.index;
    var selectedProduct = this.data.expertList[index];//选中的商品
    //因为让后台添加了一个辅助字段：count,所以代码简化：
    if (selectedProduct.count>1){
      selectedProduct.count--;
      var code = selectedProduct.code;
      var carArray = this.data.expertList.filter(item => item.code != code);//返回不包含点击添加的code的数组
      if (selectedProduct.count == 0) {

      } else {
        carArray.push(selectedProduct);
      }
      app.globalData.selectProducts = carArray;
      var totalPrice = 0;
      for (var i = 0; i < carArray.length;i++){
        totalPrice = totalPrice + carArray[i].salePrice * carArray[i].count
      }
      this.setData({
        selectedProducts: carArray,
        expertList: this.data.expertList,
        totalPrice: totalPrice
      })
    }
    var canIBuy = (this.data.totalPrice >= this.data.shopInfo.sysShopBussinessInfo.amountMoney) && time_range(this.data.shopInfo.sysShopBussinessInfo.openingHours, this.data.shopInfo.sysShopBussinessInfo.closingHours, new Date()) && (this.data.shopInfo.sysShopBussinessInfo.isOpen == 1);
    this.setData({
      canIBuy: canIBuy
    })
  }, 
  // 点击加号时
  add:function(e){
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });  

    console.log(e);
    var index = e.currentTarget.dataset.index;
    var selectedProduct = this.data.expertList[index];//选中的商品
    //因为让后台添加了一个辅助字段：count,所以代码简化：
    selectedProduct.count++;
    console.log(selectedProduct.count);

    var code = selectedProduct.code;
    var carArray = this.data.expertList.filter(item => item.code != code);//返回不包含点击添加的code的数组
    carArray.push(selectedProduct);
    app.globalData.selectProducts = carArray;
    var totalPrice = 0;
    for (var i = 0; i < carArray.length; i++) {
      console.log(totalPrice + carArray[i].salePrice + carArray[i].count);
      totalPrice = totalPrice + carArray[i].salePrice * carArray[i].count
    }
    this.setData({
      selectedProducts: carArray,
      expertList: this.data.expertList,
      totalPrice: totalPrice
    })
    var canIBuy = (this.data.totalPrice >= this.data.shopInfo.sysShopBussinessInfo.amountMoney) && time_range(this.data.shopInfo.sysShopBussinessInfo.openingHours, this.data.shopInfo.sysShopBussinessInfo.closingHours, new Date()) && (this.data.shopInfo.sysShopBussinessInfo.isOpen == 1);
    this.setData({
      canIBuy: canIBuy
    })
  },
  checkboxChange:function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index;
    this.data.expertList[index].checked = !this.data.expertList[index].checked;
    var array = this.data.expertList.filter(item => item.checked == true);
    var all = true;
    for (var i = 0; i < this.data.expertList.length;i++){
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
  /**
   * 全选
   */
  selectAll:function(e){
    //如果之前是全选，那么将所有selectProducts数组清空，expertList元素checked字段全部改为false
    if(this.data.selectAll){
      this.data.selectedProducts = [];
      for (var i = 0; i < this.data.expertList.length;i++){
        this.data.expertList[i].checked = false;
      }
      this.data.selectAll = false;
      app.globalData.selectProducts = this.data.selectedProducts;
      this.setData({
        selectedProducts: this.data.selectedProducts,
        expertList: this.data.expertList,
        selectAll: this.data.selectAll,
        totalPrice: 0.00
      })
    }else{
      for (var i = 0; i < this.data.expertList.length; i++) {
        this.data.expertList[i].checked = true;
      }
      var totalPrice = 0;
      for (var i = 0; i < this.data.expertList.length; i++) {
        totalPrice = totalPrice + this.data.expertList[i].salePrice * this.data.expertList[i].count
      }
      this.data.selectAll = true;
      this.setData({
        selectedProducts: this.data.expertList,
        expertList: this.data.expertList,
        selectAll: this.data.selectAll,
        totalPrice: totalPrice
      })
      app.globalData.selectProducts = this.data.selectedProducts;
    }
    var canIBuy = (this.data.totalPrice >= this.data.shopInfo.sysShopBussinessInfo.amountMoney) && time_range(this.data.shopInfo.sysShopBussinessInfo.openingHours, this.data.shopInfo.sysShopBussinessInfo.closingHours, new Date()) && (this.data.shopInfo.sysShopBussinessInfo.isOpen == 1);
    this.setData({
      canIBuy: canIBuy
    })
  },
  navigateTo:function(e){
    if(this.data.canIBuy){
      wx.navigateTo({
        url: '../../order/fillIn/fillIn',
      })
    }else{
      
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.selectProducts);
    console.log(app.globalData.shopInfo)
    var that  = this;
    for (var i = 0; i < app.globalData.selectProducts.length; i++) {
      this.data.totalPrice = this.data.totalPrice + app.globalData.selectProducts[i].salePrice * app.globalData.selectProducts[i].count
    }
    this.setData({
      expertList: app.globalData.selectProducts,
      totalPrice: that.data.totalPrice,
      shopInfo: app.globalData.shopInfo
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
    console.log(this.data.expertList,"啦啦啦啦啦啦啦啦");
    app.globalData.expertList = this.data.expertList;
    var start = this.data.shopInfo.sysShopBussinessInfo.openingHours;
    var end = this.data.shopInfo.sysShopBussinessInfo.closingHours;
    var now = new Date();
    var isMoney = this.data.totalPrice >= parseInt(this.data.shopInfo.sysShopBussinessInfo.amountMoney);
    var istime = time_range(start, end, new Date());
    var isopen = this.data.shopInfo.sysShopBussinessInfo.isOpen == 1;
    var canIBuy = (this.data.totalPrice >= parseInt(this.data.shopInfo.sysShopBussinessInfo.amountMoney) && time_range(start, end, new Date()) && (this.data.shopInfo.sysShopBussinessInfo.isOpen == 1));
    var canIBuy = isMoney && istime && isopen;
    this.setData({
      canIBuy: canIBuy
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
  onShareAppMessage: function () {
  
  }
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

  // var strn = nowTime.split(":");
  // if (stre.length != 2) {
  //   return false;
  // }
  var b = new Date();
  var e = new Date();
  var n = nowTime;

  b.setHours(strb[0]);
  b.setMinutes(strb[1]);
  e.setHours(stre[0]);
  e.setMinutes(stre[1]);
  // n.setHours(strn[0]);
  // n.setMinutes(strn[1]);

  if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
    console.log("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，在该时间范围内！");
    return true;
  } else {
    console.log("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，不在该时间范围内！");
    return false;
  }
}