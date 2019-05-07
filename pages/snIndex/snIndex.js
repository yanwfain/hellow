
var app = getApp();
var txt = require('../../js/txt.js');
var req = require('../../js/require.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var Map = require('../../js/qqmap-wx-jssdk');
const result = require('../../datas/jijihangye.js')
var DATAS = require('../../data.js');
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
    openIds:null,
    page:1,
    navimg: [
      {
        id: "1",
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/qita/jiankangnongchan.jpg"
      },
      {
        id:"2",
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/qita/yingyangshitu1.jpg"
      },
      {
        id: "3",
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/qita/womencun.jpg"
      },
      {
        id: "4",
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/qita/shouyenongchangtu1.jpg"
      }
    ],
    hasUserInfo: true,
    huan:true,
    tabList: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selectStatus: true,
    shopItemInfo: [],
    moduleStatus: true,
    listStatus: false,
    offcialList:false,
    getLifeWisdomList: [],
    paiXuList: txt.paiXuList,
    classList: txt.classList,
    Citys: txt.Citys,
    Sort: txt.Sort,
    pull: false,
    claId: 0,
    wid: 690,
    idd:'',
    imges: '../../images/xiala.png'
  },
  // 旅游详情页
  goTravelOfficial(e) {
    // app.globalData.channelId = e.currentTarget.dataset.channelId
    console.log(e.currentTarget.dataset.channelId)
    // console.log(app.globalData.channelId)
    // var that = this;
    // var url = constantFields.getScenicDetailIndex;
    // console.log(url)
    // var put = {
    //  'channelId':app.globalData.channelId
    // };
    // httpUtils.postRequest(url, put).then(function (res) {
    //   console.log(url)
    //   console.log(res)
    //   console.log(put)
    //   that.setData({
    //     dateil: res.data.body,
    //   })
    // })

    this.setData({ entrance: 2 })
    wx.navigateTo({
      url: '../travelDetailindex/travelDetailindex?scenicCode=' + e.currentTarget.dataset.sceniccode + "&touristCode=" + e.currentTarget.dataset.touristcode + '&entrance=' + this.data.entrance + '&name=' + e.currentTarget.dataset.name + '&mapurl=' + e.currentTarget.dataset.mapurl + "&channelId=" + e.currentTarget.dataset.channelid 
    });
  },
  getItemCodeimg(e) {
    console.log(e)
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.id == "1") {
      wx.navigateTo({
        url: '../travel/travel?platformCode=TOURISMPLATFORM20181217190116012863&id=6'
      });
      return;
    }
    if (e.currentTarget.dataset.id == "2") {
      wx.navigateTo({
        url: '../travel/travel?platformCode=TOURISMPLATFORM20181227180233064264&id=7'
      });
      return;
    }
    if (e.currentTarget.dataset.id == "3") {
      wx.navigateTo({
        // url: '../travel/travel?platformCode=TOURISMPLATFORM2019012817373200071628&id=8'
        url:'../mesign/mesign'
      });
      return;
    }
    if (e.currentTarget.dataset.id == "4") {
      wx.navigateTo({
        url: '../Healthyfarming/Healthyfarming'
      });
      return;
    }
    // wx.showToast({
    //   title: '敬请期待',
    // })
  },
  // getItemCodeimg(e) {
  //   console.log(e)
  //   if (e.currentTarget.dataset.id == "1") {
  //     wx.navigateTo({
  //       url: '../travel/travel?platformCode=TOURISMPLATFORM20181217190116012863&id=6'
  //     });
  //     return;
  //   }
  //   if (e.currentTarget.dataset.id == "2") {
  //     wx.navigateTo({
  //       url: '../travel/travel?platformCode=TOURISMPLATFORM20181227180233064264&id=7'
  //     });
  //     return;
  //   }
  //   wx.showToast({
  //     title: '敬请期待',
  //   })
  // },
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
  // goClass(e) {
  //   var that = this;
  //   req.bigClass(that, e)
  // },
  // // 小类选择
  // goXclass(e) {
  //   page = 1;
  //   var that = this;
  //   req.subclass(that, e, page, pageSize)
  // },
  // // 附近or全城
  // goCitys(e) {
  //   page = 1;
  //   var that = this;
  //   req.city(that, e, page, pageSize);
  // },
  // // 排序
  // goSort(e) {
  //   page = 1;
  //   var that = this;
  //   req.sort(that, e, page, pageSize);
  // },
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

    console.log(app.globalData)
    console.log(that)
    console.log(options)
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    console.log(that.data)
    console.log(that.data.idd)
    console.log(that.data.op)
    console.log(options.user_id)
    // options.user_id =6667;

    // setTimeout(function () {
      if (options.user_id == undefined) {
        that.setData({
            huan:false
        })
      }
      else{
        // CHAXUN
        console.log(options.user_id)
        var urlo = constantFields.CHAXUN;
        console.log(urlo)
        var puto = {
          "userId": options.user_id
        };
        httpUtils.postRequest(urlo, puto).then(function (res) {
          console.log(urlo)
          console.log(res)
          if(res.data.body == '1'){
            that.setData({
              huan: false
            })
          }else{
            that.setData({
              huan: true
            })
          }
        })



        // that.setData({
        //   huan: true
        // })
      }
      // that.setData({
      //   huan:true,
      // })
    // }, 6000)
   
    var url = constantFields.getScenicIndex;
    console.log(url)
    var put = {
      "page": 1,
      "pageSize": 5,
    };
    httpUtils.postRequest(url, put).then(function (res) {
      console.log(url)
      console.log(res)
      that.setData({
        dateil: res.data.body,
        
      })
      // app.globalData.channelId = res.data.body[0].channelId
      console.log(app.globalData.channelId)
    })

    var url1 = constantFields.channelList;
    console.log(url)
    var put1 = {
      'pageNo': 1,
      "pageSize": 10,
    };
    httpUtils.postRequest(url1, put1).then(function (res) {
      console.log(url)
      console.log(res)
      that.setData({
        detail: res.data.body,
      })
    })
    console.log(JSON.stringify(app)+"这是app数据")
  
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
    console.log(that)
    console.log(that.data.openIds)
    console.log(this.data.openIds)
    console.log(app.globalData.openId)
    // 获取opneid
    getOpenid(that)
    console.log(this.data.openIds)

    console.log(app.globalData.openId)
    console.log(that)
    getLocation(that);
    // that.nodeTop('#fix', function (res) {that.setData({top1: res[0].top})});
    tabList(that);
    // 换点
    // hdSetToken(that);
    console.log(that.data.openIds)
    console.log(app.globalData.openId)
    
  },
  onShow: function () {
    console.log(app.globalData.openId)
    page = 0;
    app.globalData.selectProducts = [];
    var that = this;
    // 获取导航分类数据
    navList(that);
    // 每当页面显示时就刷新选择状态的展示
    that.setData({
      selectStatus: true,
      locationName: app.globalData.city
    })
    // hdSetToken(that);
  },
  // 点击重新授权定位
  selectShop: function(e) {
    var that = this;
    // wx.openSetting({
    //   success: (res) => {
    //     getLocation(that);
    //   }
    // })
    wx.navigateTo({
      url: '../switchcity/switchcity'

    });
  },
  goHuan(){
    var that = this
    console.log(that)
    console.log(app.globalData)
    console.log(app.globalData.extraData + "这个是换点传过来的数据--------------")
    // console.log(options)
    console.log(JSON.stringify(app) + "app")
    var url = constantFields.hdSetToken
    console.log(app.globalData.extraData)
    console.log(app.globalData.openId)
    console.log(that.data.openIds)
    let data = {
      "openId": app.globalData.openId,
      "userId": that.options.user_id,
      "secret": that.options.secret,
      "point_code": that.options.point_code,
      //  "token": app.globalData.extraData.secret,
      //  "signature": "",
    };
    console.log(data + "这是data 换点=================")
    httpUtils.postRequest(url, data).then((res) => {
      console.log(data)
      console.log(res, "换点数据")
      wx.hideLoading();
      console.log(res)
      if (res.data.head.errCode == '10001') {
        wx.showToast({
          title: res.data.body.errMsg,
          duration: 2500,
        })
        }
        else{
          wx.showToast({
            title: res.data.body
          })
        }
        that.setData({
          huan: false,
        })
    })
    // }
  // }
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
      title: '快来善小美，悠享健康生活',
    }
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {
    var that = this;
    // 判断列表模块展示
    if (that.data.listStatus) {
      // // 获取更多文章
      // req.articles(that);
    } else {
      getMoreWisdom(that);
      console.log(that.data.getLifeWisdomList);
      // if (that.data.paiXuList[0].status == true) {
      //   let url1 = constantFields.getScenicIndex;
      //   // 获取更多的活动数据
      //   req.pron(that, url1, page, pageSize);
      //   return;
      // } else if (that.data.paiXuList[1].status == true) {
      //   let url2 = constantFields.getScenicIndex;
      //   // 获取更多的活动数据
      //   req.pron(that, url2, page, pageSize);
      //   return;
      // } else if (that.data.paiXuList[2].status == true) {
      //   let url3 = constantFields.getScenicIndex;
      //   // 获取更多的活动数据
      //   req.pron(that, url3, page, pageSize);
      //   return;
      // }
    }


    //   page += 1;
    // var that = this;
    // // 判断列表模块展示
    // if (that.data.getScenicIndex) {
    //   // 获取更多文章
    //   req.articles(that);
    // } else {
    //   if (that.data.getScenicIndex[0].status == true) {
    //     let url1 = constantFields.getScenicIndex;
    //     // 获取更多的活动数据
    //     req.pron(that, url1, page, pageSize);
    //     return;
    //   } else if (that.data.getScenicIndex[1].status == true) {
    //     let url2 = constantFields.getScenicIndex;
    //     // 获取更多的活动数据
    //     req.pron(that, url2, page, pageSize);
    //     return;
    //   } else if (that.data.getScenicIndex[2].status == true) {
    //     let url3 = constantFields.getScenicIndex;
    //     // 获取更多的活动数据
    //     req.pron(that, url3, page, pageSize);
    //     return;
    //   }
    // }
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
  getItemCode: function (e) {
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
  // 轮播图
  goChannel(e) {
    console.log(e.currentTarget.dataset)
    console.log(e.currentTarget.dataset.platformCode)
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id == "6") {
      wx.navigateTo({
        url: '../travel/travel?platformCode=' + e.currentTarget.dataset.platformcode + `&id=${e.currentTarget.dataset.id}`
      });
    }
    if (e.currentTarget.dataset.id == "4") {
      wx.navigateTo({
        url: '../travel/travel?platformCode=' + e.currentTarget.dataset.platformcode + `&id=${e.currentTarget.dataset.id}`
      });
    }
    if (e.currentTarget.dataset.id == "7") {
      // wx.showToast({
      //   title: '敬请期待',
      // })
      wx.navigateTo({
        url: '../travel/travel?platformCode=' + e.currentTarget.dataset.platformcode + `&id=${e.currentTarget.dataset.id}`
      });
    }
    if (e.currentTarget.dataset.id == "8") {
      // wx.navigateTo({
      //   url: '../travel/travel?platformCode=' + e.currentTarget.dataset.platformcode + `&id=${e.currentTarget.dataset.id}`
      // });
      wx.showToast({
        title: '敬请期待',
      })
    }

    if (e.currentTarget.dataset.id == "5") {
      wx.showToast({
        title: '敬请期待',
      })
    }
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
    "page": page,
    "pageSize": pageSize
  };
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res)
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
  console.log(app.globalData.openId)
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
//接收导航菜单分类数据
function navList(that) {
  console.log("进来了，获取导航匪类数据")
  var url = constantFields.LABEL;
  var data = '';
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
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
// 获取所有文章
function getLifeWisdom(that) {

}
// 上拉加载更多文章
function getMoreWisdom(that) {
  page++;
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.getScenicIndex;
  var data = {
    pageNo: page,
    pageSize: pageSize
  };
  httpUtils.postRequest(url, data).then(function (res) {
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
// 接收轮播图数据(促销活动)
function lunboList(that) {
  var url = constantFields.GETACTIVITYLIST;
  var data = {
    "searchKey": "",
    "city": app.globalData.city,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "page": 1,
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
        "page": 1,
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
          app.globalData.city = res.result.address_component.province;
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
  // var url = 
  console.log(that)
  var params = {};
  params.appId = constantFields.APP_ID;
  console.log(params.appId);
  
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function(res) {
    console.log(res)
    params.code = res.code;
    httpUtils.postRequest(url, params).then(function(res) {
      console.log(res)
      that.setData({
        selectStatus: true,
        openIds: res.data.body.openId
      })
      app.globalData.openId = res.data.body.openId;
      console.log(app.globalData.openId + "------openid")
      app.globalData.huandian = that.options;
      console.log(app.globalData.huandian)
      app.globalData.openId = that.data.openIds
      console.log(this.data.openIds)
      console.log(app.globalData.openId)
    })
  })
}
//  openId userId  secret point_code
function hdSetToken(that) {
  console.log(that)
  console.log(app.globalData)
  console.log(app.globalData.extraData + "这个是换点传过来的数据--------------")
  console.log(JSON.stringify(app)+"app")
  var url = constantFields.hdSetToken
  console.log(app.globalData.extraData)
  console.log(app.globalData.openId)
  console.log(that.data.openIds)
  // if (app.globalData.extraData != null) {
    // getUserInfo(e);
    // console.log(app.globalData.extraData.user_id)
    // if (app.globalData.extraData.user_id) {
      let data = {
        "openId": app.globalData.openId,
        "userId": that.user_id,
        "secret": that.secret,
        "point_code": that.point_code,
      //  "token": app.globalData.extraData.secret,
      //  "signature": "",
      };
      console.log(data + "这是data 换点=================")
      httpUtils.postRequest(url, data).then((res) => {
        console.log(data)
        console.log(res, "换点数据")
      })
    // }
  // }
};