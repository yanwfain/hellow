var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var shopCode = '';
var openId = null;
var page = 1;
// var pageNum = 1;
var pageSize = 5;
// var pages = 0;
var interval = null;
var nomore = false;
var scene = "";
/**
 * 先去获取店铺信息，主要包括配送时间，起配送金额，
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inponeX: 0,
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    productTypeList: [],
    selectedProducts: [], //所选商品集合
    num: 1,
    expertList: [],
    fixNum: 0,
    loadingHidden: true,
    animationData: {},
    ishasshop: false,
    shop: null,
    isNeedLoad: true, //跳转页面之后回到此页面是否需要加载数据
    typeName: "",
    productTop: 350,
    isswiper: true,
    productTopimage: 290,
    shoucangStatus: 0,
    itName: '首页',
    investment:[],
    nav: [{
        name: "首页",
        img: 'https://www.shanxingniao.com/imgServer/images/activitys/jiji/shop_home_incon/454986230666609046_1.jpg'
      },
      {
        name: "促销活动",
        img: 'https://www.shanxingniao.com/imgServer/images/activitys/jiji/shop_home_incon/518903334661032254_2.jpg'
      },
      {
        name: "产品",
        img: 'https://www.shanxingniao.com/imgServer/images/activitys/jiji/shop_home_incon/785626992611745606_3.jpg'
      },
      {
        name: "招商合作",
        img: 'https://www.shanxingniao.com/imgServer/images/activitys/jiji/shop_home_incon/813981642935566396_4.jpg'
      },
      {
        name: "我们",
        img: 'https://www.shanxingniao.com/imgServer/images/activitys/jiji/shop_home_incon/291083987930022184_5.jpg'
      },
    ]
  },
  getShopCode(e) {
    console.log(e.currentTarget.dataset.code, "code");
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + shopCode + "&km=" + e.currentTarget.dataset.km,
    });

  },
  // 举报
  goMap: function() {
    console.log(this.data.lat)
    wx.navigateTo({
      url: '../report/report',
    })
  },
  // 导航
  goMaps: function() {
    var that = this;
    wx.openLocation({
      latitude: that.data.shop.latFloat,
      longitude: that.data.shop.lngFloat,
      name: that.data.shop.name,
      address: that.data.shop.address
    })
  },
  // 促销活动跳转促销详情页
  proTap: function(e) {
    console.log(this.data.expertList)
    console.log(e)
    wx.navigateTo({
      url: '../activeDetail/activeDetail?activeCode=' + e.currentTarget.dataset.shopcode + '&shopName=',
    })
  },
  // 去首页
  goSnIndex: function() {
    console.log('去首页');
    wx.switchTab({
      url: '../snIndex/snIndex',
    })
  },
  // 去促销
  goCuxiao: function() {
    wx.navigateTo({
      url: '../activeShopList/activeShopList?shopCode=' + scene,
    })
  },
  
  // 收藏店铺
  saveShop: function() {
    var that = this;
    var off = that.data.off;
    var enshrine = that.data.shop;
    console.log(enshrine)
    if (off == 1) {
      that.setData({
        off: 0
      })
      var url = constantFields.QUTESHOUCANG;
      var data = {
        "code": that.data.code,
        "enshrineType": "0",
        "objCode": enshrine.code
      }
      httpUtils.postRequest(url, data).then(function(res) {
        console.log(that.data.off)
        enshrine.enshrine = '0';
        wx.showToast({
          title: '取消收藏',
        })
        that.setData({
          shop: enshrine,

        })
      })

    } else {
      that.setData({
        off: 1
      })
      var url = constantFields.ADDSHOUCANG;
      var data = {
        "openId": app.globalData.openId,
        "enshrineType": "0",
        "alias": "",
        "objCode": enshrine.code,
        "user": ""
      }
      httpUtils.postRequest(url, data).then(function(res) {
        console.log(res);
        wx.showToast({
          title: '收藏成功',
        })
        enshrine.enshrine = '1';
        that.setData({
          shop: enshrine,
        })
      })

    }


  },

  // 点击商品类型加载对应的商品列表
  switchTab: function(e) {
    nomore = false;
    var hd = e.target.dataset.name;
    var that = this;
    console.log(e)
    var cur = e.currentTarget.dataset.current;
    this.setData({
      currentTab: cur
    });
    // this.checkCor();
    this.setData({
      currentTab: cur,
      // scrollLeft: e.currentTarget.offsetLeft - (375 - 100) / 2,
      typeName: this.data.productTypeList[this.data.currentTab].name
    })
    console.log(this.data.productTypeList);


    var that = this;
    if (hd == "促销活动") {
      // that.setData({
      //   cx: 1
      // });
      // 根据商品类型请求商铺数据   || 请求二次封装     ASD
      getProductByType(this.data.productTypeList[cur].code).then(function(res) {
        console.log(res, "对应的商品的列表");
        let experList = res.data.body;
        bigImg(that, experList)
        that.setData({
          expertList: res.data.body,
        })
      });
    } else {
      // that.setData({
      //   cx: 0
      // });
      // 根据商品类型请求商铺数据   || 请求二次封装
      getProductByType(this.data.productTypeList[cur].code).then(function(res) {
        console.log(res, "对应的商品的列表");
        that.setData({
          expertList: res.data.body,
        })
      });
    }
  },
  // 去对应商品的详情页
  details: function(e) {
    console.log(scene);
    wx.navigateTo({
      url: '../details/details?productCode=' + e.currentTarget.dataset.code + '&shopCode=' + scene + '&id=' + e.currentTarget.dataset.id
    })
  },
  plusPro: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var selectedProduct = this.data.expertList[index]; //选中的商品
    //因为让后台添加了一个辅助字段：count,所以代码简化：
    selectedProduct.count++;
    var code = selectedProduct.code;
    var carArray = this.data.selectedProducts.filter(item => item.code != code); //返回不包含点击添加的code的数组
    carArray.push(selectedProduct);
    var fixnum = 0;
    for (var i = 0; i < carArray.length; i++) {
      fixnum = carArray[i].count + fixnum;
      carArray[i].checked = true;
    }
    app.globalData.selectProducts = carArray;
    this.setData({
      selectedProducts: carArray,
      expertList: this.data.expertList,
      fixNum: fixnum
    })
  },
  minus: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var selectedProduct = this.data.expertList[index]; //选中的商品
    //因为让后台添加了一个辅助字段：count,所以代码简化：
    selectedProduct.count--;
    var code = selectedProduct.code;
    var carArray = this.data.selectedProducts.filter(item => item.code != code); //返回不包含点击添加的code的数组
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
    this.setData({
      selectedProducts: carArray,
      expertList: this.data.expertList,
      fixNum: fixnum
    })
  },
  goToShopCar: function(res) {
    if (this.data.fixNum == 0) {
      return;
    }
    wx.navigateTo({
      url: 'shopCar/shopCar',
    })
  },
  // 拨打电话
  callPhone: function() {
    console.log(app);
    var phoneNumber = app.globalData.shopInfo.servicePhone;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },
  onLoad: function(options) {
    var that = this;
    var a = options.shopCode
    wx.setStorageSync('shopCode', a)
    var url = constantFields.GET_OPENID;
    var params = {};
    params.appId = constantFields.APP_ID;
    // scene = 'SYSSHOPINFO201804142020580890929'
    if (app.globalData.extraData != null && options.shopCode == undefined) {
      scene = app.globalData.extraData
    } else {
      scene = options.shopCode; //扫码进入首页。获取shopCode
    }
    //获取店铺对应的code，请求数据展示商品
    var wxlogin = httpUtils.httpPromise(wx.login);
    wxlogin().then(function(res) {
      params.code = res.code;
      return httpUtils.postRequest(url, params);
    }).then(function(res) { //获取到openID之后，去获取是否有店铺信息
      console.log(res)
      that.setData({
        openId: res.data.body.openId
      })
      var shopUrl = constantFields.SHOP_INFO_BY_OPENID;
      openId = res.data.body.openId;
      var bindShopUrl = constantFields.BIND_SHOP_OPENID;
      var bindparams = {
        'shopCode': scene,
        'openId': openId,
      }
      httpUtils.postRequest(bindShopUrl, bindparams)
      app.globalData.openId = res.data.body.openId;
      var shopInfoParams = {
        'shopCode': scene,
        'version': 9,
        'openId': res.data.body.openId,
        'lat': app.globalData.latitude,
        'lng': app.globalData.longitude
      }
      return httpUtils.postRequest(shopUrl, shopInfoParams);
    }).then(function(res) {
      console.log(res, '啦啦啦啦');
      that.setData({
        km: res.data.body.sysShopInfo.distance,
        lat: res.data.body.sysShopInfo.latFloat,
        lng: res.data.body.sysShopInfo.lngFloat
      })
      // 获取促销列表
      if (res.data.head.errCode == 10000) {
        var shopUrl = constantFields.SHOP_INFO_BY_OPENID;
        openId = that.data.openId;
        var shopInfoParams = {
          'shopCode': scene,
          'openId': openId
        }
        console.log(shopInfoParams)
        httpUtils.postRequest(shopUrl, shopInfoParams).then(function(res) {
          console.log(res.data.body, "促销列表");
          that.setData({
            shop: res.data.body.sysShopInfo,
            code: res.data.body.sysEnshrineInfoCode
          });
          // 附近的店
          locationShop(that)
          if (res.data.body.sysEnshrineInfoCode === false) {
            that.setData({
              off: 0
            })
          } else {
            that.setData({
              off: 1
            })
          }
          // 操作状态栏表提
          app.globalData.shopInfo = res.data.body.sysShopInfo;
          var title = app.globalData.shopInfo.name;
          wx.setNavigationBarTitle({
            title: title,
          });
          return getProductByType('activityType');
        }).then(function(res) {
          console.log(res) //商品数据
          wx.stopPullDownRefresh(); //ASD
          let experList = res.data.body;
          bigImg(that, experList)
          that.setData({
            promotion: res.data.body
          })
        })
      }
    })
    // 高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        console.log(clientHeight)
        var calc = clientHeight * rpxR - 180;
        console.log(clientHeight)
        that.setData({
          iphoneX: clientHeight,
          winHeight: calc
        });
      }
    });
  },
  onShow(){
    console.log(app)
  },
  onReady: function() {

  },
  onHide: function() {},
  onPullDownRefresh: function() {
    if (this.data.ishasshop) {
      console.log("开始刷新");
      page = 0;
      var that = this;
      getProductByType(this.data.productTypeList[this.data.currentTab].code).then(function(res) {
        console.log(res)
        wx.stopPullDownRefresh();
        for (var i = 0; i < res.data.body.length; i++) {
          for (var j = 0; j < that.data.selectedProducts.length; j++) {
            if (res.data.body[i].code == that.data.selectedProducts[j].code) {
              res.data.body[i] = that.data.selectedProducts[j];
              continue;
            }
          }
        }
        that.setData({
          expertList: res.data.body,
        })
      });
    }
  },
  onReachBottom: function() {
    var that = this;
    if (nomore) {} else {}
  },
  loadMore: function(e) {
    var that = this;
    if (nomore) {} else {
      page++;
      getProductByType(this.data.productTypeList[this.data.currentTab].code).then(function(res) {
        if (res.data.body.length == 0) {
          nomore = true;
        } else {
          that.data.expertList = that.data.expertList.concat(res.data.body);
          that.setData({
            expertList: that.data.expertList,
            loadingHidden: true,
          });
        }
      });
    }
  },
  onShareAppMessage: function(res) {
    var that = this;
    console.log(that.data.expertList[0].cover)
    var sIn = app.globalData.shopInfo;
    console.log(sIn);
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    console.log(wx.getStorageSync('shopCode'));
    return {

      // title: sIn.name,
      title: '精准匹配营销,让生意及所能及',
      imageUrl: that.data.expertList[0].cover,
      path: '/pages/index/index?shopCode=' + wx.getStorageSync('shopCode'),
      success: function(res) {
        console.log(app.globalData.shopInfo);
        wx.showToast({
          title: '转发成功',
        })
        // 发送转发次数
        let url = constantFields.SHARENUMBER;
        let data = {
          "shopCode": app.globalData.shopInfo.code
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
  // nav选择
  selectNav(e) {
    var that = this;
    that.setData({
      itName: e.currentTarget.dataset.name
    })
    switch (e.currentTarget.dataset.name) {
      case "首页":
        getProductByType('activityType').then(function(res) {
          wx.stopPullDownRefresh(); //ASD
          let experList = res.data.body;
          bigImg(that, experList)
          that.setData({
            promotion: res.data.body
          })
        })
        break;
      case "促销活动":
        getProductByType('activityType').then(function(res) {
          console.log(res) //商品数据
          wx.stopPullDownRefresh(); //ASD
          let experList = res.data.body;
          bigImg(that, experList)
          that.setData({
            promotion: res.data.body
          })
        })
        break;
      case "产品":
        var params = {
          'shopCode': app.globalData.shopInfo.code,
          'pageNo': 1,
          'pageSize': 20
        }
        httpUtils.postRequest(constantFields.PRODUCT_TYPE, params).then(function(res) {
          console.log(res)
          that.setData({
            productTypeList: res.data.body,
            typeName: res.data.body[0].name
          })
          page=1;
          getProductByType(res.data.body[0].code).then(function (res) {
            console.log(res, "对应的商品的列表");
            that.setData({
              expertList: res.data.body,
            })
          });
        })
        break;
      case "招商合作":
        page = 1
        getInvestment(that, page, pageSize, 'investment_cooperation');
        break;
      case "我们":
        page = 1
        getInvestment(that, page, pageSize, 'about_us')
        break;
    }
  },
  // 招商详情
  goInvestment(e){
    wx.navigateTo({
      url: './aboutUs/aboutUs?code=' + e.currentTarget.dataset.code,
    })
  }
})
// 附近的店
function locationShop(that) {
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  console.log(app.globalData)
  var url = constantFields.NEARBYS;
  console.log(that.data.shop)
  var data = {
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": 1,
    "pageSize": 10,
    "city": '',
    // "searchKey": that.data.shop.shopTypeZ,
    "typeCode": that.data.shop.shopType
  };
  // 发送请求
  console.log(data)
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res);
    wx.hideLoading();
    if (res.data.body != "" && res.data.body != [] && res.data.body != null) {
      var shopItemInfo = res.data.body;
      console.log(shopItemInfo);
      that.setData({
        shopItemInfo: shopItemInfo,
      })
      // 隐藏加载框  

      return;
    }
    // 调用展示生活智慧模块
    getLifeWisdom(that);
    // 隐藏加载框  
    wx.hideLoading();
  })
}
// 招商
function getInvestment(that, pageNo, pageSize,e) {
  wx.showLoading({
    title: '加载中',
  })
  var params = {
    "type": e,
    "lat": that.data.shop.latFloat,
    "lng": that.data.shop.lngFloat,
    "shopCode": that.data.shop.code,
    'pageNo': page,
    'pageSize': pageSize
  }
  console.log(params)
  httpUtils.postRequest(constantFields.getInvestment, params).then(function(res) {
    wx.hideLoading();
    console.log(res);
    if(res.data.head.errCode == 10000){
      switch(e){
        case "investment_cooperation":
          let investment = that.data.investment.concat(res.data.body)
          that.setData({
            investment: investment
          });
          break;
        case "about_us":
          that.setData({
            investment: res.data.body
          });

      }
      
    }else{
      wx.showToast({
        image:'../../../images/defeated.png',
        title: res.data.body.errMsg,
      })
    }
    
  })
}
/**
 * 根据产品type获取产品
 */
function getProductByType(code) {
  var url = constantFields.GET_PRODUCT_BY_TYPE;
  if (app.globalData.extraData != null) {
    var value = app.globalData.extraData
  } else {
    var value = wx.getStorageSync('shopCode'); //扫码进入首页。获取shopCode
  }
  
  var params = {
    'shopCode': value,//'SYSSHOPINFO201804142020580890929',//
    'code': code,
    'pageNo': page,
    'pageSize': 10
  };
  console.log(params);
  return httpUtils.postRequest(url, params);
  wx.removeStorage({
    key: 'shopCode',
    success: function(res) {}
  })
}

function scanCode(that) {
  wx.scanCode({
    success: (res) => {
      console.log(res)
      var bindShopUrl = constantFields.BIND_SHOP_OPENID;
      if (res.path != undefined && res.path.length > 27) {
        var shopCodeScan = res.path.substring(27, res.path.length);
        //后台查询是否有这个店铺
        httpUtils.postRequest(constantFields.SHOP_STATUS, {
            'code': shopCodeScan,
            'status': 'NORMAL'
          })
          .then(function(res) {
            if (res.data.body) {
              that.setData({
                ishasshop: true
              })
              var bindparams = {
                'shopCode': shopCodeScan,
                'openId': openId
              }
              httpUtils.postRequest(bindShopUrl, bindparams).then(function(res) {
                var shopUrl = constantFields.SHOP_INFO_BY_OPENID;
                openId = res.data.body.openId;
                var shopInfoParams = {
                  'openId': res.data.body.openId
                }
                return httpUtils.postRequest(shopUrl, shopInfoParams);
              }).then(function(res) {
                console.log(res)
                app.globalData.shopInfo = res.data.body
                shopCode = app.globalData.shopInfo.code;
                that.setData({
                  ishasshop: true,
                  shop: res.data.body,
                })
                var params = {
                  'shopCode': shopCode,
                  'pageNo': 1,
                  'pageSize': 10
                }
                return httpUtils.postRequest(constantFields.PRODUCT_TYPE, params)
              }).then(function(res) {
                console.log(res)
                that.setData({
                  typeName: res.data.body.name,
                  productTypeList: res.data.body
                })
                page = 0;
                return getProductByType(that.data.productTypeList[0].code)
              }, function(err) {
                console.log(err)
              }).then(function(res) {
                wx.stopPullDownRefresh();
                that.setData({
                  expertList: res.data.body
                })
              })
            } else {
              wx.showModal({
                content: '不存在该店铺',
              })
            }
          });

      } else {
        wx.showModal({
          content: '不存在该店铺',
        })
      }
    }
  })
}
// 大图修改路径
function bigImg(that, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].cover.indexOf('small/') !== -1) {
      let imgArr = arr[i].cover.split('small/');
      arr[i].cover = imgArr[0] + imgArr[1];
    }
  }
  return arr
}