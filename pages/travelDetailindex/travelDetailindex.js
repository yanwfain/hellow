var DATAS = require('../../data.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var req = require('../../js/require.js');
var app = getApp();
var activeInfo;
var codeId;
var pageSize = 50;
var page = 1;
Page({
  data: {
    travelDetail: '',
  },
  // 去地图
  goMap() {
    wx.openLocation({
      latitude: Number(this.data.travelDetail.lat),
      longitude: Number(this.data.travelDetail.lng),
    })
  },
  // 去商店页
  getShopCode: function (e) {
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + shopCode + "&km=" + e.currentTarget.dataset.km,
    })
  },

  onLoad(options) {
    console.log(options)
    
    var that1 = this;
    var url1 = constantFields.getScenicDetailIndex;
    console.log(url1)
    var put1 = {
      'channelId': options.channelId
    };
    httpUtils.postRequest(url1, put1).then(function (res) {
      console.log(url1)
      console.log(res)
      console.log(put1)
      that.setData({
        dateil: res.data.body,
      })
    })
    // app.globalData.channelId = dateil
    // console.log(app.globalData.channelId)
    console.log(options)
    app.globalData.indexName= options;
    console.log(app.globalData.indexName)
    page = 1;
    options.distance = 30000;
    var that = this;
    that.setData({
      options:options,
    })
    // 根据需求隐藏模块
    if (options.type == "water_culture" || options.type == "water_platform" || options.type == "water_operation") that.setData({ off: true });
    // 水平台接口
    if (options.water == "water_platform"){
      DATAS.getTravelSearch(that, options, page);
      return;
    }
    switch (options.entrance) {
      case "1":
        // 首页导航
        travelHomeNav(that, options);
        break;
      case "2":
        // 景点详情
        getScenicDetail(that, options);
        break;
      case "3":
        // 景区详情
        getOfficialDetail(that, options);
        break;
    };
  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '快来善小美，悠享健康生活',
    }
  },
  //进入首页
  goOpenShop(e) {
    wx.navigateTo({
      url: '../travel/travel?platformCode=' + e.currentTarget.dataset.platformcode + `&id=${e.currentTarget.dataset.id}`
    });
    // wx.navigateTo({
    //   url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    // })
  },
  // 进入店铺
  goShop: function() {
    console.log(app.globalData.indexName.channelId)
    wx.navigateTo({
      url: '../travelOfficialshop/travelOfficialshop?scenicCode=' + app.globalData.indexName.scenicCode + "&subordinate=" + app.globalData.indexName.name + '&lat=' + app.globalData.indexName.lat + '&lng=' + app.globalData.indexName.lng + '&id=' + app.globalData.indexName.channelId,
    })
  },
})
// 景点详情 
function getScenicDetail(that, options) {
  wx.showLoading({
    title: '加载中',
  })
  let url = constantFields.getScenicDetail;
  let data = {
    "touristCode": options.touristCode,
    "lat": DATAS.apps.lat,
    "lng": DATAS.apps.lng,
  };
  httpUtils.postRequest(url, data).then(function(res) {
    options.lat = Number(res.data.body.lat);
    options.lng = Number(res.data.body.lng);
    // 行业店铺
    DATAS.getShop(that, options, page, pageSize);
    wx.hideLoading();
    if (res.data.head.errCode == 10000) {
      that.setData({
        travelDetail: res.data.body,
        img: res.data.body.mapUrl ? res.data.body.mapUrl : false
      });
      wx.setNavigationBarTitle({
        title: res.data.body.title,
      })
    } else {
      wx.showToast({
        title: res.data.body.errMsg,
      })
    }
  })
};
// 景区详情 
function getOfficialDetail(that, options) {
  wx.showLoading({
    title: '加载中',
  })
  let url = constantFields.getOfficialDetail;
  let data = {
    "scenicCode": options.scenicCode,
    "lat": DATAS.apps.lat,
    "lng": DATAS.apps.lng,
  };
  httpUtils.postRequest(url, data).then(function(res) {
    options.lat = Number(res.data.body[0].lat);
    options.lng = Number(res.data.body[0].lng);
    // 行业店铺
    DATAS.getShop(that, options, page, pageSize);
    wx.hideLoading();
    if (res.data.head.errCode == 10000) {
      that.setData({
        travelDetail: res.data.body[0],
        img: res.data.body[0].mapUrl ? res.data.body[0].mapUrl:false
      });
      wx.setNavigationBarTitle({
        title: res.data.body[0].title,
      })
    } else {
      wx.showToast({
        title: res.data.body.errMsg,
      })
    }
  })
}
// 首页氺游记导航详情
function travelHomeNav(that, options) {
  wx.showLoading({
    title: '加载中',
  })
  let url = constantFields.travelHomeNav;
  let data = {
    "lat": DATAS.apps.lat,
    "lng": DATAS.apps.lng,
    "code": options.code,
    "type": options.type
  };
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res)
    options.lat = Number(res.data.body[0].lat);
    options.lng = Number(res.data.body[0].lng);
    // 行业店铺
    DATAS.getShop(that, options, page, pageSize);
    wx.hideLoading();
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
  })
}