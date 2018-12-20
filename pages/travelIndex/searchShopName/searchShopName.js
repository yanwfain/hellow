           // pages/index/searchShopName/searchShopName.js
var app = getApp();
var pageNo = 1;
var pageSize = 10;
var txt = require('../../../js/txt.js');
var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopItemInfo:[],
    nk:true,
    val:"", 
    nearImgStatus: true,
    off:0,
    add:0,
    scope:[ "附近","全城",],
    paiXuList: txt.paiXuList,
    classList: txt.classList,
    Citys: txt.Citys,
    Sort: txt.Sort,
    pull: false,
    claId: 0,
    wid: 690,
    imges:'../../../images/xiala.png'
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
  // 分类切换
  goClass(e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    var list = that.data.tabList;
    var classList = that.data.classList;
    for (let i = 0; i < list.length; i++) {
      list[i].scrollTab = true;
      if (i == id) {
        list[i].scrollTab = false;
      }
    };
    classList[0].big = list[id].typeName;
    classList[0].shopType = list[id].typeCode;
    classList[0].diminutive = list[id].sysShopTypeInfos[0].typeName;
    that.setData({
      tabList: list,
      tabListSingle: list[id].sysShopTypeInfos,
      classList: classList
    })
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
    switch (that.data.classList[2].sort) {
      case "距离排序":
        getActivityList(that);
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
    getActivityList(that);
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
    switch (that.data.classList[2].sort) {
      case "距离排序":
        getActivityList(that);
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
  },
  // 附近全城
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      add: e.detail.value
    })
  },
  // 选择标签
  bindclass:function(e){
    var that = this;
    that.setData({
      big: e.currentTarget.dataset.kind,
      diminutive: e.currentTarget.dataset.cla
    })
    pageNo = 1;
    findShop(that)
    // that.setData({
    //   nk:false
    // })
  },
//搜索分类
  classify:function(e){
    console.log(e);
    wx.showLoading({
      title: '玩命加载中',
    })
    var that = this;
    var pai = that.data.paiXuList;
    for (let i = 0; i < pai.length;i++){
      if (i == e.target.dataset.status) pai[i].status = true;
      else pai[i].status = false;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    let url = constantFields.LABEL;
    let data = {}
    httpUtils.postRequest(url, data).then(function (res) {
      if (res.data.body.length != 0) {
        var list = res.data.body;
        for (let i = 0; i < list.length; i++) {
          list[i].scrollTab = true;
          for (let j = 0; j < list[i].sysShopTypeInfos.length; j++) {
            list[i].sysShopTypeInfos[j].scrollTab = true;
            if (j === 0) {
              list[i].sysShopTypeInfos[j].scrollTab = false;
            }
          }
        }
        list[0].scrollTab = false;
        // list[0].sysShopTypeInfos[0].scrollTab = false;
        list = list;
        that.setData({
          tabList: list,
          tabListSingle: list[0].sysShopTypeInfos
        })
        console.log(list)
      }
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ off: 0 })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pageNo += 1;
    var that = this;
    if (that.data.shopItemInfo.length) findShop(that);
    
  },

  // 监听输入框状态
  statusText: function (e) {
    var that = this;
    console.log(e.detail.value);
    // 点击完成按钮查询数据
    that.setData({
      shopItemInfo:[]
    })
    pageNo = 1;
    findShop(that)
  },
  // 监听input数据value
  jt:function(e){
    this.setData({val:e.detail.value})
  },
  statusTextS: function (e) {
    var that = this;
    console.log(that.data.val)
    if (that.data.val) {
      that.setData({
        shopItemInfo: []
      })
      pageNo = 1;
       findShop(that); 
      }
    // 点击完成按钮查询数据

  },
  // 获取当前点击店code
  getShopCode(e) {
    console.log(e.currentTarget.dataset.code, "code");
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../../index/index?shopCode=' + shopCode,
    })
  },
  // 点击排序类别
  selectPaixuItem: function (e) {
    pageNo = 1;
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
  },
})

// 查询店铺
function findShop(that) {
  
  that.setData({
    nk: false
  })
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.NEARBY;
  let city = that.data.scope[that.data.add];
  if(city === "附近"){
    city = "";
  }else{
    city = app.globalData.city
  }
  var data = {
    "searchKey": that.data.val,
    "big":that.data.big,
    "diminutive":that.data.diminutive,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": pageNo,
    "pageSize": 10,
    "city": city
  };
  that.setData({
    big:"",
    diminutive:""
  })
  console.log(data)
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res)
    if (res.data.head.errCode == 10000) {
      if(res.data.body.length == 0){
        wx.showToast({
          title: '没有找到相关店铺',
          icon: 'success',
          duration: 2000
        })
        return;
      }
      var shopItemInfo = that.data.shopItemInfo.concat(res.data.body) ;
      that.setData({
        shopItemInfo: shopItemInfo,
        off: 1
      })
      console.log(that.data.shopItemInfo)
      // wx.showToast({
      //   title: '一共找到' + shopItemInfo.length + '店铺',
      //   icon: 'success',
      //   duration: 2000
      // })
      // 隐藏加载框  
      wx.hideLoading();
      return;
    }
    
    that, setData({
      nearImgStatus: false
    })
    // 隐藏加载框  
    wx.hideLoading();
  })
}
// // 点击获取综合排序
// function clickZonghe(that) {
//   wx.showLoading({
//     title: '玩命加载中',
//   })
//   let url = constantFields.ZONGHEPATXU;
//   let city;
//   if (that.data.classList[1].city == "附近") {
//     city = ""
//   } else {
//     city = app.globalData.city
//   }
//   let data = {
//     "shopType": that.data.classList[0].shopType,
//     "searchKey": that.data.classList[0].diminutive,
//     "city": city,
//     "lat": app.globalData.latitude,
//     "lng": app.globalData.longitude,
//     "pageNo": pageNo,
//     "pageSize": pageSize
//   }
//   httpUtils.postRequest(url, data).then(function (res) {
//     console.log(res.data.body);
//     let resD = res.data.body;
//     if (res.data.head.errCode != 10000) {
//       wx.hideLoading();
//       wx.showToast({
//         title: '出错了',
//       })
//       return;
//     } else {
//       wx.hideLoading();
//       if (resD.length != 0) {
//         that.setData({
//           shopItemInfo: resD,
//           selectStatus: true,
//           moduleStatus: true,
//           listStatus: false,
//         })
//         return;
//       }
//       // 展示生活智慧数据
//       getLifeWisdom(that);
//       that.setData({
//         listStatus: true
//       })
//     }
//   })
// }

// // 获取活动列表--人气排序
// function getRenqi(that) {
//   wx.showLoading({
//     title: '玩命加载中',
//   })
//   let url = constantFields.RENQIPATXU;
//   let city;
//   if (that.data.classList[1].city == "附近") {
//     city = ""
//   } else {
//     city = app.globalData.city
//   }
//   let data = {
//     "shopType": that.data.classList[0].shopType,
//     "searchKey": that.data.classList[0].diminutive,
//     "city": city,
//     "lat": app.globalData.latitude,
//     "lng": app.globalData.longitude,
//     "pageNo": pageNo,
//     "pageSize": pageSize
//   }
//   httpUtils.postRequest(url, data).then(function (res) {
//     console.log(res);
//     let resD = res.data.body;
//     if (res.data.head.errCode != 10000) {
//       wx.hideLoading();
//       wx.showToast({
//         title: '出错了',
//       })
//       return;
//     } else {
//       wx.hideLoading();
//       if (resD.length != 0) {
//         wx.showToast({
//           title: '加载完成',
//         })
//         that.setData({
//           shopItemInfo: resD,
//           listStatus: false,
//         })
//         console.log(that.data.shopItemInfo)
//         return;
//       }
//       wx.showToast({
//         title: '没有更多',
//       })
//     }
//   })
// }
// // 获取活动列表--距离最近
// function getActivityList(that) {
//   wx.showLoading({
//     title: '玩命加载中',
//   })
//   let url = constantFields.JULIZUIJIN;
//   let city;
//   if (that.data.classList[1].city == "附近") {
//     city = ""
//   } else {
//     city = app.globalData.city
//   }
//   let data = {
//     "shopType": that.data.classList[0].shopType,
//     "searchKey": that.data.classList[0].diminutive,
//     "city": city,
//     "lat": app.globalData.latitude,
//     "lng": app.globalData.longitude,
//     "pageNo": pageNo,
//     "pageSize": pageSize
//   }
//   console.log(data)
//   httpUtils.postRequest(url, data).then(function (res) {
//     console.log(res)
//     if (res.data.head.errCode != 10000) {
//       wx.hideLoading();
//       wx.showToast({
//         title: '出错了',
//       })
//       return;
//     } else {
//       wx.hideLoading();
//       if (res.data.body.length != 0) {
//         console.log(res.data.body, "0000000000000");
//         wx.showToast({
//           title: '加载完成',
//         })
//         that.setData({
//           shopItemInfo: res.data.body,
//           listStatus: false
//         })
//         console.log(that.data.shopItemInfo)
//         return;
//       }
//       if (res.data.body.length == 0) {
//         that.setData({
//           shopItemInfo: res.data.body,
//         })
//         wx.showToast({
//           title: '没有更多',
//         })
//         return;
//       }
//     }
//   })
// }