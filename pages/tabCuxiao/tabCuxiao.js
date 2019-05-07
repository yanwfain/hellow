// pages/snIndex/snIndex.js
var app = getApp();
var req = require('../../js/require.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
// 引入SDK核心类
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
var page = 1;
var pageSize = 10;
var pageY;
Page({
  data: {
    flex: '',
    page: 1,
    locationName: '正在定位...',
    selectStatus: true,
    info: [],
    status: true,
    shopItemInfo: null,
    imgStatus1: true,
    imgStatus2: true,
    shopStatus: false,
    corporateList: [],
    downStatus: false,
    getLifeWisdomList: [],
    luboActive: true,
    lbList: ''
  },
  // 回到顶部
  isTop: function() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  // 频道选择页面
  goChannel(){
    wx.navigateTo({
      url: '../travelPortal/travelPortal',
    })
  },
  onLoad: function(options) {
    page = 1;
    var that = this;
    // 获取位置信息
    getLocation(that);
    // 获取openid
    getOpenid(that);
    console.log(app.globalData)
    console.log(app.globalData.city)
    var url = constantFields.GETACTIVITYLISTT;
    var data = {
      "stater": "1",
      "searchKey": "",
      "city": app.globalData.city,
      "lat": app.globalData.latitude,
      "lng": app.globalData.longitude,
      "pageNo": 1,
      "pageSize": 5
    };
    // 发送请求
    httpUtils.postRequest(url, data).then(function(res) {
      console.log(res.data.body, "进来了，获取公司广告轮播数据");
      if (res.data.body) {
        var corporateList = res.data.body;
        that.setData({
          corporateList: corporateList
        })
      }
    })
  },
  onReady: function() {},
  onShow: function() {
    page = 0;
    app.globalData.selectProducts = [];
    var that = this;
    // 获取导航分类数据
    navList(that);
    // 每当页面显示时就刷新选择状态的展示
    that.setData({
      selectStatus: true
    })
  },
  onReachBottom: function() {
    console.log(this.data.status);
    var that = this;

    // 判断当前选项上拉加载
    if (that.data.status) {
      // 加载更多生活智慧数据
      
      getMoreNearBy(that);
      console.log(that.data.getLifeWisdomList);
    } else {
      // 加载更多附近的店的数据
      getMoreWisdom(that);
      console.log(that.data.shopItemInfo);
    }
  },
  onShareAppMessage: function(res) {
    var that = this;
    var pro = that.data.product;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("shopCode", shopCode);
    }
    return {
      title: '快来善小美，悠享健康生活',
      path: '/pages/snIndex/snIndex',
      imageUrl: '',
      success: function(res) {
        console.log('转发成功');
        wx.showToast({
          title: '转发成功',
        })
        // 发送转发次数
        let url = constantFields.SHARENUMBER;
        let data = {
          "shopCode": shopCode
        }
        httpUtils.postRequest(url, data).then(function(res) {
          console.log(res.data.body, "转发次数");
        })
      },
      fail: function(res) {
        // 转发失败
        console.log('转发失败');
      }
    }
  },
  // 去活动详情
  goJionList: function() {
    wx.navigateTo({
      url: '../activeList/activeList',
    })
  },
  // 点击重新授权定位
  selectShop: function(e) {
    var that = this;
    console.log(e.currentTarget.dataset.locationname);
    wx.openSetting({
      success: (res) => {
        // console.log(res);
        getLocation(that);
      }
    })
  },
  // 点击搜索店铺
  search: function() {
    wx.navigateTo({
      url: '../index/searchShopName/searchShopName',
    })
  },
  // 点击导航菜单大类获取数据
  getItemCode: function(e) {
    let code = e.target.dataset.code;
    console.log(code)
    let typename = e.target.dataset.typename;
    console.log(typename)
    let typecode = e.target.dataset.typecode;
    console.log(typecode)
    let city = this.data.city;
    if (typename === "全部") {
      wx.navigateTo({
        url: '../index/searchShopName/searchShopName',
      });
      return;
    }
    wx.navigateTo({
      url: '../nearBycuxiao/nearBycuxiao?typename=' + typename + '&typecode=' + typecode
      //  + '&tabList=' + JSON.stringify(tabList),
    })
  },
  // 获取当前点击店code
  getShopCode(e) {
    console.log(e.currentTarget.dataset.code, "code");
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + shopCode + "&km=" + e.currentTarget.dataset.km,
    })
  },
  //根据模块名称跳转到相应的页面
  switchModule: function(e) {
    var targetName = e.target.dataset.name;
    console.log(targetName, "----当前点击模块名");
    selectModule(targetName);
  },
  // 去活动详情页
  goActiveInfo: function(e) {
    console.log(e.target.dataset.activecode);
    console.log(e.target.dataset.activename);
    var activecode = e.target.dataset.activecode;
    var activename = e.target.dataset.activename;
    if (activecode != undefined && activecode != "") {
      wx.navigateTo({
        url: '../activeDetail/activeDetail?activeCode=' + activecode + '&activeName=' + activename,
      })
      return;
    }
  },
  //去智慧详情页
  goLifeInfo: function(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.articlecode);
    var articleCode = e.currentTarget.dataset.articlecode;
    wx.navigateTo({
      url: '../lifeWisdom/wisdom/wisdom?articleCode=' + articleCode
    })
  }
})
// 获取openid
function getOpenid(that) {
  var url = constantFields.GET_OPENID;
  var params = {};
  params.appId = constantFields.APP_ID;
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function(res) {
    params.code = res.code;
    httpUtils.postRequest(url, params).then(function(res) {
      app.globalData.openId = res.data.body.openId;
      console.log(app.globalData, "app.globalData");
      that.setData({
        selectStatus: true
      })
    })
  })
}
// 获取地理位置定位信息
function getLocation(that) {
  console.log("进来了，获取位置", "11111111");
  // 获取当前的地理位置
  wx.getLocation({
    type: 'wgs84',
    success: function(res) {
      var lati = res.latitude;
      var longi = res.longitude;
      console.log(lati, longi, "这里是位置坐标", "2222222");
      // 添加位置信息到app.globalData
      console.log(app.globalData, "这里是app.globalData", "33333333333");
      // 发送请求
      let url = constantFields.GETLOCATION;
      let data = {
        'lat': app.globalData.latitude,
        'lng': app.globalData.longitude
      };
      httpUtils.postRequest(url, data).then(function(res) {
        console.log("这里是位置数据", res.data.body);
        if (res.data.body.status == 0) {
          app.globalData.addressRes = res.data.body.result.formatted_addresses.recommend;
          app.globalData.city = res.data.body.result.address_component.city;
          // 加载附近店的数据
          let dataObj = {
            "lat": app.globalData.latitude,
            "lng": app.globalData.longitude,
            "city": that.data.city,
            "key":" 全部",
            "shopType":""
          }
          console.log(dataObj)
          req.getShop(that, dataObj)
          that.setData({
            locationName: res.data.body.result.formatted_addresses.recommend,
            city: res.data.body.result.address_component.city
          })
        }
      })
    },
    fail: function() {
      wx.showToast({
        title: '获取位置失败',
        icon: 'success',
        duration: 2000
      })
      that.setData({
        locationName: "重新定位"
      })
    }
  })
}
//接收导航菜单分类数据
function navList(that) {
  console.log("进来了，获取导航匪类数据")
  var url = constantFields.LABEL;
  var data = '';
  // 发送请求
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res.data.body, "导航菜单分类数据");
    let Arrs = [];
    let navList = res.data.body;
    if (res.data.body) {
      that.setData({
        navList: navList
      })
    }
  })
}
// 接收买过的店的数据
function payShop(that) {
  console.log("这里是加载买过的店的数据");
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.BUYSHOP;
  var data = {
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "openId": app.globalData.openId,
    "pageNo": 1,
    "pageSize": pageSize
  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function(res) {
    if (res.data.body != "" && res.data.body != [] && res.data.body != null) {
      console.log(res.data.body);
      var shopItemInfo = res.data.body;
      that.setData({
        shopItemInfo: shopItemInfo,
        status: true,
      })
      wx.hideLoading();
    } else {
      that.setData({
        imgStatus1: false,
        imgStatus2: true,
        shopStatus: true
      })
      wx.hideLoading();
    }
  })
}
// 上拉加载买过的店的数据
function getMoreBy(that) {
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  // 页数+1  
  page = page + 1;
  var url = constantFields.BUYSHOP;
  var data = {
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "openId": app.globalData.openId,
    "pageNo": page,
    "pageSize": 10
  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res)
    if (res.data.body) {
      console.log(res.data.body);
      if (res.data.body == "" || res.data.body == undefined || res.data.body == null) {
        wx.showToast({
          title: '到底了',
          icon: 'success',
          duration: 2000
        })
        // 隐藏加载框  
        wx.hideLoading();
        return;
      }
      // 回调函数  
      var moment_list = that.data.shopItemInfo;
      for (var i = 0; i < res.data.body.length; i++) {
        moment_list.push(res.data.body[i]);
      }
      // 设置数据  
      that.setData({
        shopItemInfo: that.data.shopItemInfo
      })
      // 隐藏加载框  
      wx.hideLoading();
    }
  })
}
// 上拉加载附近的店的数据
function getMoreNearBy(that) {
  wx.showLoading({
    title: '玩命加载中',
  })
  if (page == 0) page = 1
  page = page + 1;
  var url = constantFields.NEARBYS;
  var data = {
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": page,
    "pageSize": pageSize,
  };
  console.log(data)
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res)
    if (res.data.body) {
      console.log(res.data.body);
      if (res.data.body == "" || res.data.body == undefined || res.data.body == null) {
        wx.showToast({
          title: '到底了',
          icon: 'success',
          duration: 2000
        })
        // 隐藏加载框  
        wx.hideLoading();
        return;
      }
      // 回调函数  
      var moment_list = that.data.shopItemInfo;
      for (var i = 0; i < res.data.body.length; i++) {
        moment_list.push(res.data.body[i]);
      }
      // 设置数据  
      that.setData({
        shopItemInfo: that.data.shopItemInfo
      })
      //隐藏加载框  
      wx.hideLoading();
    }
  })
}
// 根据点击的模块名跳转到相应的页面
function selectModule(targetName) {
  switch (targetName) {
    case "生活智慧":
      wx.navigateTo({
        url: '../lifeWisdom/lifeWisdom',
      })
      break;
    case "附近促销":
      wx.switchTab({
        url: '../tabCuxiao/tabCuxiao',
      })
      break;
    case "全名开店，发!":
      wx.navigateTo({
        url: '../openShop/openShop',
      })
      break;
    case "管理我的店":
      wx.navigateToMiniProgram({
        appId: 'wx6c653b3b961fb92a',
        envVersion: "release",
        success: function() {
        }
      })
      break;
    case "优质的店":
      wx.navigateTo({
        url: '../goodStore/goodStore',
      })
      break;
    default:
      console.log("没有绑定的事件");
  }
}
// 上拉加载更多文章
function getMoreWisdom(that) {
  page++;
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: page,
    pageSize: pageSize
  };
  httpUtils.postRequest(url, data).then(function(res) {
    if (res.data.body) {
      if (res.data.body == "" || res.data.body == undefined || res.data.body == null) {
        wx.showToast({
          title: '到底了',
          icon: 'success',
          duration: 3000
        })
        return;
      }
      // 回调函数  
      var moment_list = that.data.getLifeWisdomList;
      for (var i = 0; i < res.data.body.length; i++) {
        moment_list.push(res.data.body[i]);
      }
      // 设置数据  
      that.setData({
        getLifeWisdomList: that.data.getLifeWisdomList
      })
      wx.showToast({
        title: '加载完成',
      })
    }
  })
}