var constantFields = require('./js/constantFields.js');
var httpUtils = require('./js/httpUtils.js');
// ```````````````````````````````````````````景区介绍```````````````````

//````````````````````````````````````````````请求类````````````````````
//附近的店数据
const getShop = function (that,options,page,pageSzie) {
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.getShop;
  var data = {
    // "searchKey": options.typename,
    "city": "",
    "pageNo":page,
    "pageSize": pageSzie,
    "lat": options.lat ? options.lat:apps.lat,
    "lng": options.lng ? options.lng:apps.lng,
    "typeCode": options.code,
    "distance": options.distance
  };
  console.log(data)
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res)
    wx.hideLoading();
    if (res.data.body != "" && res.data.body != [] && res.data.body != null) {
      var shopItemInfo = res.data.body;
      if(page > 1){
        shopItemInfo = that.data.shopItemInfo.concat(res.data.body)
      }
      wx.hideLoading();
      return that.setData({
        shopItemInfo: shopItemInfo,
      })
    }
    // 隐藏加载框  
    wx.hideLoading();
  })
}
// 获取banner
const getBanner = function getBanner(that, options) {
  console.log(options)
  var url = constantFields.getBanner;
  var data = {
    // "searchKey": options.typename,
    "city": "",
    "lat": apps.lat,
    "lng": apps.lng,
    "shopType": options.typeCode,
  };
  console.log(data)
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res)
    if (res.data.body) {
      var lbList = res.data.body.list;
      for (let i = 0; i < lbList.length; i++) {
        let imgArr = lbList[i].sysAdvertData.imgUrl.split('small/');
        lbList[i].sysAdvertData.imgUrl = imgArr[0] + imgArr[1];
      }
      if (lbList.length != 0) {
        that.setData({
          lbList: lbList,
        })
        return;
      }
    }
  })
}
// 景区官网list
const scenicWeb = function scenicWeb(that, options){

  wx.showLoading({
    title: '加载中',
  })
  let url = constantFields.scenicWeb;
  let data = {
    'pageNo': 1,
    "pageSize": 10,
    "lat": apps.lat,
    "lng": apps.lng,
    "platfroCode": options.platformCode,//platformCode
  }
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res)
    wx.hideLoading();
    if (res.data.head.errCode == 10000) {
      that.setData({
        offcialList: res.data.body
      })
    } else {
      wx.showToast({
        title: res.data.body.errMsg,
      })
    }
  })
};
// 水平台导航列表
const getTravelSearch = function (that, options, page) {
  wx.showLoading({
    title: '加载中',
  })
  let url = constantFields.travelSearch;
  let data = {
    "pageNo": page,
    "pageSize": 10,
    "type": options.water,
    "lat": apps.lat,
    "lng": apps.lng,
  }
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res);
    wx.hideLoading();
    if (options.water == "water_platform") {
      if (res.data.head.errCode == 10000) {
        that.setData({
          travelDetail: res.data.body[0],
          img: res.data.body[0].mapUrl ? res.data.body[0].mapUrl : false
        })
        wx.setNavigationBarTitle({
          title: res.data.body[0].title,
        })
      } else {
        wx.showToast({
          title: res.data.body.errMsg,
        })
      }
    } else {
      wx.setNavigationBarTitle({
        title: options.typeName,
      })
      if (res.data.head.errCode == 10000) {
        that.setData({
          offcialList: res.data.body
        })
      } else {
        wx.showToast({
          title: res.data.body.errMsg,
        })
      }
    }
  })
};
// `````````````````````````````````````````````````仿app变量
const apps = {};
// `````````````输出
module.exports = {
  // travelDetail1: travelDetail1,
  apps: apps,
  getShop: getShop,
  getBanner: getBanner,
  getShop: getShop,
  scenicWeb: scenicWeb,
  getTravelSearch: getTravelSearch
}