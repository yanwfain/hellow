var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');


let obj;
let page = 1;
let pageSize = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopItemInfo:[],
    
    loc:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    obj = {
      "lat": JSON.parse(options.location).lat,
      "lng": JSON.parse(options.location).lng,
    };

    wx.setNavigationBarTitle({
      title: options.fullname,
    })
    // 导航
    navList(that);
    // 附近的店
    getShop(that, obj);
    // 产业
    getPlace(that, options.id);

    lunboList(that)
  },
  // 获取当前点击店code
  getShopCode(e) {
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + shopCode + "&km=" + e.currentTarget.dataset.km,
    })
  },
  // 点击导航菜单大类获取数据
  getItemCode: function (e) {
    let code = e.target.dataset.code;
    let typename = e.target.dataset.typename;
    let typecode = e.target.dataset.typecode;
    let city = this.data.city;
    if (typename === "全部") {
      wx.navigateTo({
        url: '../index/searchShopName/searchShopName',
      });
      return;
    }
    wx.navigateTo({
      url: '../nearBycuxiao/nearBycuxiao?typename=' + typename + '&typecode=' + typecode + "&obj=" + JSON.stringify(obj) 
      //  + '&tabList=' + JSON.stringify(tabList),
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page++;
    getShop(this, obj)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
//获取轮播图
function lunboList(that) {
  var url = constantFields.getLocalIndustryBanne;
  console.log(url + "这是地方产业的banner")
  var data = {

  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(JSON.stringify(res.data.body) + "这是地方产业的banner回调")
    if (res.data.body) {
      var lbList = res.data.body;
      if (lbList.length != 0) {
        // req.samll(lbList);
        that.setData({
          lbList: lbList
        })
        return;
      }
      that.setData({
        luboActive: true
      })
    }
  })
}
//获得省地区
function getregion(that) {
  httpUtils.postRequest(constantFields.getProvince).then(function (res) {
    console.log(JSON.stringify(res) + "\t 获取省数据")
    that.setData({
      provinceList: res.data.body
    })
  })
}
//接收导航菜单分类数据
function navList(that) {
  var url = constantFields.LABEL;
  var data = '';
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    let Arrs = [];
    let navList = res.data.body;
    if (res.data.body) {
      that.setData({
        navList: navList
      })
    }
  })
}
// 附近的店
function getShop(that, dataObj){
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.NEARBYS;
  var data = {
    "lat": dataObj.lat,
    "lng": dataObj.lng,
    "pageNo": page,
    "pageSize": pageSize,
  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    wx.hideLoading();
    if (res.data.head.errCode == 10000) {
      if (res.data.body.length === 0){
        wx.showToast({
          title: '附近没有店铺',
        });
        return;
      }
      var shopItemInfo = that.data.shopItemInfo;
      that.setData({
        shopItemInfo: shopItemInfo.concat(res.data.body),
      })
    }
    // 隐藏加载框  
    wx.hideLoading();
  })
}
// 获得地方产业数据
function getPlace(that,id){
  let data = {
    "pageNo":page,
    "pageSize":pageSize,
    "areaId":id,
  }
  httpUtils.postRequest(constantFields.getPlace,data).then(function(res){
    if(res.data.head.errCode == 10000){
      that.setData({
        industry:res.data.body
      })
    }else{
      wx.showToast({
        image:'../../images/defeated.png',
        title: res.data.body.errMsg,
      })
    }
  })
}
