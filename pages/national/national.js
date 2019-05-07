// pages/nearBycuxiao/nearBycuxiao.js
var app = getApp();
var req = require('../../js/require.js');
var txt = require('../../js/txt.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var page = 1;
var pageSize = 10;
var searchKey = "";
var shopType = "";
Page({
  data: {
    tabList: [],
    obj: false,
    selectStatus: false,
    shopItemInfo: [],
    moduleStatus: true,
    listStatus: false,
    listOff: true,
    getLifeWisdomList: [],
    paiXuList: [{
      "name": "综合排序",
      "status": false,
      "code": 0
    },
    {
      "name": "人气排序",
      "status": false,
      "code": 1
    },
    {
      "name": "距离最近",
      "status": true,
      "code": 2
    }
    ],
    classList: txt.classList,
    Citys: txt.Citys,
    Sort: txt.Sort,
    pull: false,
    claId: 0,
    wid: 750,
    lefts: -30,
    imges: '../../images/xiala.png'
  },
  // 导航切换
  switchover(e) {
    var that = this;
    console.log(e);
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
  // 小类选择
  goXclass(e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    let tabListSingle = that.data.tabListSingle;
    var classList = that.data.classList;
    for (let i = 0; i < tabListSingle.length; i++) {
      tabListSingle[i].scrollTab = true;
      if (i == id) {
        tabListSingle[i].scrollTab = false;
      }
    };
    classList[0].diminutive = tabListSingle[id].typeName;
    that.setData({
      tabListSingle: tabListSingle,
      classList: classList
    })
    if (!that.data.selectStatus) {
      switch (that.data.classList[2].sort) {
        case "距离排序":
          locationShop(that);
          that.setData({
            pull: false
          });
          break;
        case "人气排序":
          locationShop(that);
          that.setData({
            pull: false
          });
          break;
        case "综合排序":
          locationShop(that);
          that.setData({
            pull: false
          });
          break;
      }
    } else {
      switch (that.data.classList[2].sort) {
        case "距离排序":
          req.getshortDistance(that, page, pageSize);
          that.setData({
            pull: false
          });
          break;
        case "人气排序":
          getRenqi(that);
          that.setData({
            pull: false
          });
          break;
        case "综合排序":
          clickZonghe(that);
          that.setData({
            pull: false
          });
          break;
      }
    }

  },
  // 附近or全城
  goCitys(e) {
    console.log(e)
    var that = this;
    let classList = that.data.classList;
    let Citys = that.data.Citys
    classList[1].city = e.currentTarget.dataset.typename;
    that.setData({
      classList: classList
    })
    for (let i = 0; i < Citys.length; i++) {
      Citys[i].scrollTab = true;
      if (Citys[i].city == e.currentTarget.dataset.typename) Citys[i].scrollTab = false;
    };
    that.setData({
      classList: classList,
      Citys: Citys
    })
    that.setData({
      pull: false
    });
    if (!that.data.selectStatus) {
      locationShop(that)
    } else {
      req.getshortDistance(that, page, pageSize);
    }

  },
  // 排序
  goSort(e) {
    console.log(e)
    var that = this;
    let classList = that.data.classList;
    let Sort = that.data.Sort
    classList[2].sort = e.currentTarget.dataset.typename;
    for (let i = 0; i < Sort.length; i++) {
      Sort[i].scrollTab = true;
      if (Sort[i].sort == e.currentTarget.dataset.typename) Sort[i].scrollTab = false;
    };
    that.setData({
      classList: classList,
      Sort: Sort
    })
    if (!that.data.selectStatus) {
      switch (that.data.classList[2].sort) {
        case "距离排序":
          locationShop(that);
          that.setData({
            pull: false
          });
          break;
        case "人气排序":
          locationShop(that);
          that.setData({
            pull: false
          });
          break;
        case "综合排序":
          locationShop(that);
          that.setData({
            pull: false
          });
          break;
      }
    } else {
      switch (that.data.classList[2].sort) {
        case "距离排序":
          req.getshortDistance(that, page, pageSize);
          that.setData({
            pull: false
          });
          break;
        case "人气排序":
          getRenqi(that);
          that.setData({
            pull: false
          });
          break;
        case "综合排序":
          clickZonghe(that);
          that.setData({
            pull: false
          });
          break;
      }
    }
  },
  // banner跳转
  goActiveInfo: function (e) {
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
    console.log("没有获取到相应的code");
  },
  // 类别排序
  // 排序
  selectPaixuItem: function (e) {
    page = 1;
    var that = this;
    var tabIndex = e.target.dataset.tabindex;
    var taItembList = that.data.paiXuList;
    console.log(taItembList)
    taItembList.forEach(function (item, index) {
      item.status = false;
      return taItembList;
    })
    taItembList[tabIndex].status = true;
    taItembList = taItembList;

    that.setData({
      paiXuList: taItembList
    })

    if (that.data.paiXuList[tabIndex].code == 0) {
      req.getshortDistance(that, page, pageSize);
    } else if (that.data.paiXuList[tabIndex].code == 1) {
      getRenqi(that);
    } else if (that.data.paiXuList[tabIndex].code == 2) {
      req.getshortDistance(that, page, pageSize);
    } else {
      console.log("获取数据错误");
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let shopType = options.typecode;
    console.log(shopType)
    wx.setNavigationBarTitle({
      title: options.typename,
    })
    var that = this;
    if (options.obj) {
      that.setData({
        obj: JSON.parse(options.obj)
      })
    }
    // 小分类
    req.tabListSingle(options.typecode).then(function (res) {
      let len = res.data.body.sysShopTypeInfos;
      req.addField(len)
      that.setData({
        tabListSingle: len
      })
    })
    var tabList = [{ typeName: options.typename }];
    var classList = that.data.classList;
    classList[0].big = options.typename;
    classList[0].shopType = options.typecode;
    that.setData({
      shopType: shopType,
      tabList: tabList,
      classList: classList,
    })
    console.log(tabList)
    page = 1;
    // 默认加载附近活动列表
    // getActivityList(that);
    // 附近的店
    locationShop(that)
    // 获取tab列表
    getTabList(that);
    getBanner(that);
  },
  // 回到顶部
  isTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    console.log()

    // 判断列表模块展示
    if (that.data.listStatus) {
      // 获取更多文章
      getMoreWisdom(that);
    } else {
      if (that.data.selectStatus) {
        // 获取更多的活动数据
        // for(let i = 0;i<101;i++){
        getMoreActive(that);
        // }
      } else {
        // 获取更多的附近的店的数据
        getMoreNearBy(that);
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("activeInfo", activeInfo);
    }
    return {
      title: '精准匹配营销,生意及所能及',
    }
  },

  // 点击选择模块
  selectBigClass: function (e) {
    page = 1;
    console.log(e.target.dataset.text);
    var that = this;
    var targetText = e.target.dataset.text;
    if (targetText == "附近促销") {
      console.log(1)
      this.setData({
        selectStatus: true
      })
      // 加载促销列表
      req.getshortDistance(that, page, pageSize);
    } else if (targetText == "附近的店") {
      console.log(2)
      this.setData({
        selectStatus: false
      })
      // 加载附近的店列表
      locationShop(that);
    }

  },

  //根据模块名称跳转到相应的页面
  switchModule: function (e) {
    var targetName = e.target.dataset.name;
    console.log(targetName, "----当前点击模块名");
    selectModule(targetName);
  },

  // 去活动详情页
  goActive: function (e) {
    console.log(this.data.shopItemInfo)
    console.log(e.currentTarget.dataset.code);
    let code = e.currentTarget.dataset.code;
    let shopName = e.currentTarget.dataset.shopName;
    wx.navigateTo({
      url: '../activeDetail/activeDetail?activeCode=' + code + '&shopName=' + shopName,
    })
  },
  // 去商店页
  getShopCode: function (e) {
    console.log(e.currentTarget.dataset.code);
    let code = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + code,
    })
  },
  //去智慧详情页
  goLifeInfo: function (e) {
    console.log(e);
    console.log(e.currentTarget.dataset.articlecode);
    var articleCode = e.currentTarget.dataset.articlecode;
    wx.navigateTo({
      url: '../lifeWisdom/wisdom/wisdom?articleCode=' + articleCode
    })
  },
  // 点击tab扫码进入其它小程序
  itemCode: function (e) {
    console.log(e.currentTarget.dataset.code);
    console.log(e.currentTarget.dataset.codeimg);
    var codeImg = e.currentTarget.dataset.codeimg;
    // 扫描或保存图片
    wx.previewImage({
      urls: [codeImg],
    })
  }
})
// 获取tab大类数据
function getTabList(that) {
  var url = constantFields.GETTABLIST;
  var data = {
    shopType: shopType,
    page: 1,
    pageSize: 10
  }
  console.log(data)
  httpUtils.postRequest(url, data).then(function (res) {
    wx.hideLoading();
    console.log(res, "999999999999999999999999999999999");
    if (res.data.body.length != 0) {
      console.log(res.data.body, "这是tab列表");
      that.setData({
        tabList: res.data.body
      })
      return;
    } else {
      wx.showToast({
        title: '暂无数据',
      })
    }
  })
}
// 获取活动列表
function getActivityList(that) {
  // req.getshortDistance(that, page, pageSize);
}

// 上拉加载更多的活动数据
function getMoreActive(that) {
  page = page + 1;
  console.log("当前page:" + page);
  wx.showLoading({
    title: '玩命加载中',
  })

  let url;
  switch (that.data.classList[2].sort) {
    case "距离排序":
      url = constantFields.JULIZUIJIN;
      break;
    case "综合排序":
      url = constantFields.ZONGHEPATXU;
      break;
    case "人气排序":
      url = constantFields.RENQIPATXU;
      break;
  }
  let city, lat, lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if (that.data.obj) {
    lat = that.data.lat;
    lng = that.data.obj.lng
  } else {
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  let data = {
    "shopType": that.data.classList[0].shopType,
    "searchKey": that.data.classList[0].diminutive,
    "city": city,
    "lat": lat,
    "lng": lng,
    "pageNo": page,
    "pageSize": pageSize
  }
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res)
    if (res.data.head.errCode != 10000) {
      wx.hideLoading();
      wx.showToast({
        title: '出错了',
      })
      return;
    } else {
      wx.hideLoading();
      console.log(res.data.body, "返回的数据", "数据类型：" + typeof (res.data.body));
      if (res.data.body.length != 0) {
        // 回调函数  
        var moment_list = that.data.shopItemInfo;
        for (var i = 0; i < res.data.body.length; i++) {
          moment_list.push(res.data.body[i]);
        }
        that.setData({
          shopItemInfo: that.data.shopItemInfo
        })
        return;
      }
      wx.showToast({
        title: '没有更多',
      })
    }
  })
}
// 接收附近的店的数据
function locationShop(that) {
  console.log("这里是加载附近的店的数据");
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  console.log(app.globalData.latitude, app.globalData.longitude, "这里是坐标数据");

  var url = constantFields.NEARBYS;
  let city, lat, lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if (that.data.obj) {
    lat = that.data.lat;
    lng = that.data.obj.lng
  } else {
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  var data = {
    "lat": lat,
    "lng": lng,
    "pageNo": page,
    "pageSize": pageSize,
    "city": city,
    "searchKey": that.data.classList[0].diminutive,
    "typeCode": that.data.classList[0].shopType
  };
  console.log(data)
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    if (res.data.body != "" && res.data.body != [] && res.data.body != null) {
      console.log(res.data.body);
      var shopItemInfo = res.data.body;
      that.setData({
        shopItemInfo: shopItemInfo,
        status: false,
        // selectStatus: false,
        moduleStatus: false,
        downStatus: true,
      })
      console.log(shopItemInfo)
      // 隐藏加载框  
      wx.hideLoading();
      return;
    }
  })
}
// 上拉加载附近的店的数据
function getMoreNearBy(that) {
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  // 页数+1  
  page = page + 1;

  var url = constantFields.NEARBYS;
  let city;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  var data = {
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": page,
    "pageSize": pageSize,
    "city": city,
    "searchKey": that.data.classList[0].diminutive,
    "typeCode": that.data.classList[0].shopType
  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
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
        shopItemInfo: moment_list,
      })
      // 隐藏加载框  
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
        success: function () {
          console.log("打开成功");
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
// 获取所有文章
function getLifeWisdom(that) {
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: page,
    pageSize: pageSize
  };
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    var wisdomList = res.data.body.list;
    if (wisdomList.length != 0) {
      wx.showToast({
        title: '加载完成',
      })
      that.setData({
        getLifeWisdomList: wisdomList
      })
      return;
    }
    wx.showToast({
      title: '暂无数据',
    })
  })
}
// 上拉加载更多文章
function getMoreWisdom(that) {
  page = page + 1;
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: page,
    pageSize: pageSize
  };
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    if (res.data.body) {
      if (res.data.body == "" || res.data.body == undefined || res.data.body == null) {
        wx.showToast({
          title: '到底了',
          icon: 'success',
          duration: 2000
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
// 点击获取综合排序
function clickZonghe(that) {
  wx.showLoading({
    title: '玩命加载中',
  })
  let url = constantFields.ZONGHEPATXU;
  let city, lat, lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if (that.data.obj) {
    lat = that.data.lat;
    lng = that.data.obj.lng
  } else {
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  let data = {
    "shopType": that.data.classList[0].shopType,
    "searchKey": that.data.classList[0].diminutive,
    "city": city,
    "lat": lat,
    "lng": lng,
    "pageNo": page,
    "pageSize": pageSize
  }
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    let resD = res.data.body;
    if (res.data.head.errCode != 10000) {
      wx.hideLoading();
      wx.showToast({
        title: '出错了',
      })
      return;
    } else {
      wx.hideLoading();
      if (resD.length != 0) {
        console.log(beginTime, endTime, "综合时间");
        that.setData({
          shopItemInfo: resD,
          // selectStatus: true,
          // moduleStatus: true,
          listStatus: false,
        })
        return;
      }
      // 展示生活智慧数据
      getLifeWisdom(that);
      that.setData({
        listStatus: true
      })
    }
  })
}
// 获取活动列表--人气排序
function getRenqi(that) {
  wx.showLoading({
    title: '玩命加载中',
  })
  let url = constantFields.RENQIPATXU;
  let city, lat, lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if (that.data.obj) {
    lat = that.data.obj.lat;
    lng = that.data.obj.lng
  } else {
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  let data = {
    "shopType": that.data.classList[0].shopType,
    "searchKey": that.data.classList[0].diminutive,
    "city": city,
    "lat": lat,
    "lng": lng,
    "pageNo": page,
    "pageSize": pageSize
  }
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    if (res.data.head.errCode != 10000) {
      wx.hideLoading();
      wx.showToast({
        title: '出错了',
      })
      return;
    } else {
      wx.showToast({
        title: '加载完成',
      })
      wx.hideLoading();
      that.setData({
        shopItemInfo: res.data.body,
      })
      return;
    }
    wx.showToast({
      title: '没有更多',
    })
  })
}
// 获取活动列表--距离最近
function getActivityLists(that) {
  wx.showLoading({
    title: '玩命加载中',
  })
  let url = constantFields.JULIZUIJIN;
  let city, lat, lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if (that.data.obj) {
    lat = that.data.obj.lat;
    lng = that.data.obj.lng
  } else {
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  let data = {
    "shopType": that.data.classList[0].shopType,
    "searchKey": that.data.classList[0].diminutive,
    "city": city,
    "lat": lat,
    "lng": lng,
    "pageNo": page,
    "pageSize": pageSize
  }
  httpUtils.postRequest(url, data).then(function (res) {
    if (res.data.head.errCode != 10000) {
      wx.hideLoading();
      wx.showToast({
        title: '出错了',
      })
      return;
    } else {
      wx.hideLoading();
      if (res.data.body.length != 0) {
        console.log(res.data.body, "0000000000000");
        wx.showToast({
          title: '加载完成',
        })
        that.setData({
          shopItemInfo: res.data.body,
        })
        console.log(that.data.lbList)
        return;
      }
      wx.showToast({
        title: '没有更多',
      })
    }
  })
}
// 获取banner
function getBanner(that) {
  var url = constantFields.GETAnearby;
  console.log(that.data.shopType)
  let city, lat, lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if (that.data.obj) {
    lat = that.data.obj.lat;
    lng = that.data.obj.lng
  } else {
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  var data = {
    "searchKey": that.data.classList[0].diminutive,
    "city": city,
    "lat": lat,
    "lng": lng,
    "shopType": that.data.classList[0].shopType,
  };
  console.log(data)
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res);
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