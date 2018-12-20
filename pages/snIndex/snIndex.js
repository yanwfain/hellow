// pages/tabCuxiao/tabCuxiao.js
var app = getApp();
var txt = require('../../js/txt.js');
var req = require('../../js/require.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var Map = require('../../js/qqmap-wx-jssdk');
var searchKey = "";
var bigClassCode;
var beginTime = [];
var endTime = [];
// 核心
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
var page = 1;
var pageSize = 10;
Page({
  data: {
    navList: [{
        typeName: '商场促销',
        imgUrl: "../../images/nav1.jpg"
      },
      {
        typeName: '看展会',
        imgUrl: "../../images/nav2.jpg"
      },
      {
        typeName: '商业服务',
        imgUrl: "../../images/nav3.jpg"
      },
      {
        typeName: '平台招商',
        imgUrl: "../../images/nav4.jpg"
      },
    ],
    hasUserInfo: true,
    tabList: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selectStatus: true,
    shopItemInfo: [],
    moduleStatus: true,
    listStatus: false,
    getLifeWisdomList: [],
    paiXuList: txt.paiXuList,
    classList: txt.classList,
    Citys: txt.Citys,
    Sort: txt.Sort,
    pull: false,
    claId: 0,
    wid: 690,
    imges: '../../images/xiala.png'
  },
  // nav导航
  getItemCode(e) {
    console.log(e)
    if (e.currentTarget.dataset.typename == "平台招商") {
      wx.navigateTo({
        url: '../attract/attract',
      });
      return;
    }
    if (e.currentTarget.dataset.typename == "商场促销") {
      wx.navigateTo({
        url: '../mall/mall',
      });
      return;
    }
    wx.showToast({
      title: '敬请期待',
    })
  },
  // 导航切换
  switchover(e) {
    var that = this;
    that.setData({
      claId: e.currentTarget.dataset.id
    })
    if (that.data.pull) {
      that.setData({
        pull: false
      })
    } else {
      that.setData({
        pull: true
      })
    }
  },
  // 分类切换
  goClass(e) {
    var that = this;
    req.bigClass(that, e)
  },
  // 小类选择
  goXclass(e) {
    page = 1;
    var that = this;
    req.subclass(that, e, page, pageSize)
  },
  // 附近or全城
  goCitys(e) {
    page = 1;
    var that = this;
    req.city(that, e, page, pageSize);
  },
  // 排序
  goSort(e) {
    page = 1;
    var that = this;
    req.sort(that, e, page, pageSize);
  },
  // 回到顶部
  isTop: function() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  // banner跳转
  goActiveInfo: function(e) {
    var activecode = e.target.dataset.activecode;
    var activename = e.target.dataset.activename;
    if (activecode != undefined && activecode != "") {
      wx.navigateTo({
        url: '../activeDetail/activeDetail?activeCode=' + activecode + '&activeName=' + activename,
      })
      return;
    }
  },
  onLoad: function(options) {
    console.log(app)
    setTimeout(function() {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.MyUserInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this;
    req.tabListSingle("").then(function(res) {
      let len = res.data.body.sysShopTypeInfos;
      req.addField(len)
      that.setData({
        tabListSingle: len
      })
    })
    // 换点
    hdSetToken();
    getLocation(that);
    getOpenid(that)
    // that.nodeTop('#fix', function (res) {that.setData({top1: res[0].top})});
    page = 1;
    tabList(that);
  },
  // 点击重新授权定位
  selectShop: function(e) {
    var that = this;
    wx.openSetting({
      success: (res) => {
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
  // 分享勿删
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '精准匹配营销,生意及所能及',
    }
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {
    page += 1;
    var that = this;
    // 判断列表模块展示
    if (that.data.listStatus) {
      // 获取更多文章
      req.articles(that);
    } else {
      if (that.data.paiXuList[0].status == true) {
        let url1 = constantFields.ZONGHEPATXU;
        // 获取更多的活动数据
        req.pron(that, url1, page, pageSize);
        return;
      } else if (that.data.paiXuList[1].status == true) {
        let url2 = constantFields.RENQIPATXU;
        // 获取更多的活动数据
        req.pron(that, url2, page, pageSize);
        return;
      } else if (that.data.paiXuList[2].status == true) {
        let url3 = constantFields.JULIZUIJIN;
        // 获取更多的活动数据
        req.pron(that, url3, page, pageSize);
        return;
      }
    }
  },
  // 滑动穿透
  preventD() {},
  // 授权
  getUserInfo(e) {
    console.log("ok")
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          wxuser: res.userInfo,
          hasUserInfo: true,
          canIUse: true,
        })
      },
      fail: function() {}
    })
  },
  //根据模块名称跳转到相应的页面
  switchModule: function(e) {
    var targetName = e.target.dataset.name;
    selectModule(targetName);
  },
  // 去活动详情页
  goActive: function(e) {
    console.log(e)
    let code = e.currentTarget.dataset.code;
    let shopcode = e.currentTarget.dataset.shopcode;
    let shopName = e.currentTarget.dataset.shopName;
    wx.navigateTo({
      url: '../activeDetail/activeDetail?activeCode=' + code + '&shopName=' + shopName + '&shopCode=' + shopcode + '&id=' + e.currentTarget.dataset.id,
    })
  },
  //去智慧详情页
  goLifeInfo: function(e) {
    var articleCode = e.currentTarget.dataset.articlecode;
    wx.navigateTo({
      url: '../lifeWisdom/wisdom/wisdom?articleCode=' + articleCode
    })
  },
})
// 获取分类列表
function tabList(that) {
  wx.showLoading({
    title: '玩命加载中',
  })
  let url = constantFields.LABEL;
  let data = {
    "city": app.globalData.city,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": page,
    "pageSize": pageSize
  };
  httpUtils.postRequest(url, data).then(function(res) {
    wx.hideLoading();
    if (res.data.body.length != 0) {
      var list = res.data.body;
      list.forEach(function(item, index) {
        item.scrollTab = true;
        if (item.typeName === "全部") {
          item.sysShopTypeInfos = [{
            'typeName': '全部'
          }]
          list.splice(index, 1)
          list.unshift(item);
        }
        return list;
      });
      list[0].scrollTab = false;
      list = list;
      that.setData({
        tabList: list,
      })
      return;
    }
    wx.showToast({
      title: '没有更多',
    })
  })
}

// 点击获取综合排序
function clickZonghe(that) {}
// 获取活动列表--人气排序
function getRenqi(that) {}
// 获取活动列表--距离最近
function getActivityList(that) {}
// 上拉加载更多的活动数据
function getMoreActive(that, url) {

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
      wx.navigateTo({
        url: '../activeList/activeList',
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
        success: function() {}
      })
      break;
    case "优质的店":
      wx.navigateTo({
        url: '../goodStore/goodStore',
      })
      break;
    default:
  }
}
// 获取所有文章
function getLifeWisdom(that) {

}
// 上拉加载更多文章
function getMoreWisdom(that) {

}
// 接收轮播图数据(促销活动)
function lunboList(that) {
  var url = constantFields.GETACTIVITYLIST;
  var data = {
    "searchKey": "",
    "city": app.globalData.city,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": 1,
    "pageSize": 5
  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function(res) {
    if (res.data.body.falg == 'false') {
      var url = constantFields.GETACTIVITYLISTT;
      var data = {
        "searchKey": "",
        "city": app.globalData.city,
        "lat": app.globalData.latitude,
        "lng": app.globalData.longitude,
        "pageNo": 1,
        "pageSize": 5
      };
      // 发送请求
      httpUtils.postRequest(url, data).then(function(res) {
        if (res.data.body) {
          var lbList = res.data.body;
          if (lbList.length != 0) {
            that.setData({
              lbList: lbList,
              luboActive: false
            })
            return;
          }
          that.setData({
            luboActive: true
          })
        }
      })
      return;
    }
    if (res.data.body) {
      var lbList = res.data.body.list;
      if (lbList.length != 0) {
        // req.samll(lbList);
        that.setData({
          lbList: lbList,
          luboActive: false,
          lbk: res.data.body.falg
        })
        return;
      }
      that.setData({
        luboActive: true
      })
    }
  })
}
// 获取地理位置定位信息
function getLocation(that) {
  let QQmap = new QQMapWX({
    key: 'CO5BZ-3DPCX-PSG44-7O2NN-UYBQJ-MGFXE' // 必填
  });

  // 获取当前的地理位置
  wx.getLocation({
    type: 'gcj02',
    altitude: true,
    success: function(res) {
      QQmap.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function(res) {
          app.globalData.latitude = res.result.ad_info.location.lat;
          app.globalData.longitude = res.result.ad_info.location.lng;
          // 添加位置信息到app.globalData
          //默认加载综合排序
          req.getshortDistance(that, page, pageSize);
          // 发送请求
          let url = constantFields.GETLOCATION;
          let data = {
            'lat': app.globalData.latitude,
            'lng': app.globalData.longitude
          };
          httpUtils.postRequest(url, data).then(function(res) {
            if (res.data.body.status == 0) {
              app.globalData.addressRes = res.data.body.result.formatted_addresses.recommend;
              app.globalData.city = res.data.body.result.address_component.city;
              // 加载促销轮播图数据
              lunboList(that);
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
  })
}
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
      // var bindShopUrl = constantFields.BIND_SHOP_OPENID;
      // var bindparams = {
      //   'openId': app.globalData.openId,
      // }
      // httpUtils.postRequest(bindShopUrl, bindparams).then(function (res) {  })
      that.setData({
        selectStatus: true
      })
    })
  })
}


//  openId userId  secret point_code
function hdSetToken() {
 // console.log(app.globalData.extraData)
  if (app.globalData.extraData != null) {
    if (app.globalData.extraData.user_id) {
      let data = {
        "openId": app.globalData.openId,
        "userId": app.globalData.extraData.user_id,
        "secret": app.globalData.extraData.secret,
        "point_code": app.globalData.extraData.point_code,
      //  "token": app.globalData.extraData.secret,
      //  "signature": "",
      };
      httpUtils.postRequest(constantFields.hdSetToken, data).then((res) => {
        console.log(res, "换点数据")
      })
    }
  }
};