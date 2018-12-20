var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var shopCode = '';
var openId = null;
var page = 0;
var pageNum = 1;
var pageSize = 5;
var pages = 0;
// var interval = null;
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

    page = 0;
    var that = this;
    if (hd == "促销活动") {
      that.setData({
        cx: 1
      });
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
      that.setData({
        cx: 0
      });
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
      url: '../details/details?productCode=' + e.currentTarget.dataset.code + '&shopCode=' + scene
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
    console.log(app.globalData)
    var that = this;
    var a = options.shopCode
    wx.setStorageSync('shopCode', a)
    var url = constantFields.GET_OPENID;
    var params = {};
    params.appId = constantFields.APP_ID;
    if (app.globalData.extraData != null) {
      scene = app.globalData.extraData
    } else {
      scene = decodeURIComponent(options.shopCode); //扫码进入首页。获取shopCode
    }
    //获取店铺对应的code，请求数据展示商品
    var wxlogin = httpUtils.httpPromise(wx.login);
    wxlogin().then(function(res) {
      params.code = res.code;
      return httpUtils.postRequest(url, params);
    }).then(function(res) { //获取到openID之后，去获取是否有店铺信息
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
      if (res.data.body == undefined || res.data.body == undefined || res.data.body.length == 0) {

        var bindShopUrl = constantFields.BIND_SHOP_OPENID;
        var bindparams = {
          'shopCode': scene,
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
          console.log(res.data.body, "111111111111");
          app.globalData.shopInfo = res.data.body
          shopCode = app.globalData.shopInfo.code;
          that.setData({
            shop: res.data.body,
          })
          var params = {
            'shopCode': shopCode,
            'pageNo': 1,
            'pageSize': 20
          }
          return httpUtils.postRequest(constantFields.PRODUCT_TYPE, params)
        }).then(function(res) {
          that.setData({
            typeName: res.data.body[0].name,
            productTypeList: res.data.body
          })
          return getProductByType(that.data.productTypeList[0].code)
        }, function(err) {}).then(function(res) {
          wx.stopPullDownRefresh();
          that.setData({
            expertList: res.data.body
          })
        })
      } else {
        if (scene == "undefined" || scene == null || scene == "") {
          console.log(res.data.body, "222222222");
          app.globalData.shopInfo = res.data.body;
          var title = app.globalData.shopInfo.name;
          wx.setNavigationBarTitle({
            title: title,
          })
          that.setData({
            shop: res.data.body,
          })
          shopCode = app.globalData.shopInfo.code;
          var params = {
            'shopCode': shopCode,
            'pageNo': 1,
            'pageSize': 10
          }
          httpUtils.postRequest(constantFields.PRODUCT_TYPE, params)
            .then(function(res) {
              that.setData({
                typeName: res.data.body[0].name,
                productTypeList: res.data.body
              })
              return getProductByType(that.data.productTypeList[0].code)
            }, function(err) {}).then(function(res) {
              wx.stopPullDownRefresh();
              that.setData({
                expertList: res.data.body
              })
            })
        } else {

          var shopUrl = constantFields.SHOP_INFO_BY_OPENID;
          openId = that.data.openId;
          var shopInfoParams = {
            'shopCode': scene,
            'openId': openId
          }
          httpUtils.postRequest(shopUrl, shopInfoParams).then(function(res) {
            console.log(res.data.body, "333333333333");
            
            that.setData({
              shop: res.data.body.sysShopInfo,
              code: res.data.body.sysEnshrineInfoCode
            });
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
            console.log(that.data.off)
            // 操作状态栏表提
            app.globalData.shopInfo = res.data.body.sysShopInfo;
            var title = app.globalData.shopInfo.name;
            console.log(title)
            console.log(res.data.body)
            wx.setNavigationBarTitle({
              title: title,
            });
            console.log(scene)
            var params = {
              'shopCode': scene,
              'pageNo': 1,
              'pageSize': 10
            };
            // 商品类别获取
            return httpUtils.postRequest(constantFields.PRODUCT_TYPE, params);
          }).then(function(res) {
            console.log(res) //商品类型数据
            that.setData({
              typeName: res.data.body[0].name,
              productTypeList: res.data.body
            });
            // 商品信息
            res.data.body[0].name == "促销活动" ? that.setData({
              cx: 1
            }) : that.setData({
              cx: 0
            })
            return getProductByType(that.data.productTypeList[0].code);
          }).then(function(res) {
            console.log(res) //商品数据
            wx.stopPullDownRefresh();//ASD
            let experList = res.data.body;
            bigImg(that,experList)
            that.setData({
              expertList: res.data.body
            })
          })
        }
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onHide: function() {},
  onUnload: function() {
  },
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
    if (nomore) {
    } else {
    }
  },
  loadMore: function(e) {
    var that = this;
    if (nomore) {
    } else {
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
    var sIn = app.globalData.shopInfo;
    console.log(sIn);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("shopCode", shopCode);
    }
    console.log(wx.getStorageSync('shopCode'));
    return {

      // title: sIn.name,
      title:'精准匹配营销,让生意及所能及',
      path: '/pages/index/index?shopCode=' + wx.getStorageSync('shopCode'),
      imageUrl: sIn.sysShopImgInfoList[0].imgUrl,
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
  }
})
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

  // wx.removeStorageSync('shopCode')
  console.log(value);
  var params = {
    'shopCode': value,
    'code': code,
    'pageNo': ++page,
    'pageSize': 10
  };
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
// 接收附近的店的数据
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
    "searchKey": that.data.shop.shopTypeZ,
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
// 大图修改路径
function bigImg(that,arr){
  for(let i = 0;i<arr.length;i++){
    if(arr[i].cover.indexOf('small/') !== -1){
      let imgArr = arr[i].cover.split('small/');
      arr[i].cover = imgArr[0] + imgArr[1];
    }
  }
  return arr
}

