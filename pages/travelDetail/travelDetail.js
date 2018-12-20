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
  getShopCode: function(e) {
    let code = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../travelIndex/index?shopCode=' + code,
    })
  },
  onLoad(options) {
    console.log(options)
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
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '精准匹配营销,生意及所能及',
    }
  },
  //进入首页
  goOpenShop() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack({
        delta: 2,
      });
    } else {
      wx.redirectTo({
        url: '../travel/travel?platformCode=TOURISMPLATFORM20181101231811068422'
      });
    }
  },
  // 进入店铺
  goShop: function() {
    switch (this.data.travelDetail.type){
      case "water_travel_notes":
      wx.navigateTo({
        url: '../travelOfficial/travelOfficial?scenicCode=' + this.data.travelDetail.touristCode + "&name=" + this.data.travelDetail.name ,
      })
      return;
      case "water_investment":
        wx.navigateTo({
          url: '../travelOfficial/travelOfficial?scenicCode=' + this.data.travelDetail.touristCode + "&name=" + this.data.travelDetail.name,
        })
      return;
    };
    if (getCurrentPages().length > 1) {
      wx.navigateBack({
        delta: 1,
      });
    } else {
      wx.navigateTo({
        url: '../travel/travel?platformCode=TOURISMPLATFORM20181101231811068422'
      });
    }

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