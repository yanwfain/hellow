// pages/goodStore/goodStore.js
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
var page = 1;
var pageSize = 10;
var searchKey = "";
var bigClassCode;
var beginTime = [];
var endTime = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getGoodStoreList: [],
    shopItemInfo: null,
    status: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    page = 1;
    // 优质的店列表
    getGoodStoreList(that);
    tabList(that);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
    var that = this;
    getMoreWisdom(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 点击tabItem大类
  selectTabItem: function (e) {
    page = 1;
    var that = this;
    console.log(e.target.dataset.index);

    var tabIndex = e.target.dataset.index;
    var allList = that.data.tabList;

    if (allList[tabIndex].typeCode != bigClassCode) {
      bigClassCode = allList[tabIndex].typeCode;

      allList.forEach(function (item, index) {
        item.scrollTab = true;
        return allList;
      })
      allList[tabIndex].scrollTab = false;
      allList = allList;

      that.setData({
        tabList: allList
      })
      //综合排序
      clickZonghe2(that);
      return;
    }

    console.log(allList[tabIndex].typeCode, "点击的大类的code");
    bigClassCode = allList[tabIndex].typeCode;

    allList.forEach(function (item, index) {
      item.scrollTab = true;
      return allList;
    })
    allList[tabIndex].scrollTab = false;
    allList = allList;

    that.setData({
      tabList: allList
    })

  },
  
  // 监听输入框状态
  ss: function(e){
    var that = this;
    console.log(e.detail.value);
    if (e.detail.value == ""){
      page = 1;
      getGoodStoreList(that);
    }
  },

  //点击搜索或者回撤
  statusText: function (e) {
    var that = this;
    console.log(e.detail.value);
    // 点击完成按钮查询数据
    findShop(that, e.detail.value);
  },

  // 获取当前点击店code
  getShopCode(e) {
    console.log(e.currentTarget.dataset.code, "code");
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + shopCode,
    })
  },
})


// 获取优质的店列表
function getGoodStoreList(that){
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.GOODSTORE;
  var data = {
    quality: 1,
    lat: app.globalData.latitude,
    lng: app.globalData.longitude,
    city:app.globalData.city,
    pageNo: 1,
    pageSize: pageSize,
  }

  httpUtils.postRequest(url, data).then(function(res){
    console.log(res.data.body); 
    var getGoodStoreList = res.data.body; 
    if (getGoodStoreList.length != 0){
      wx.showToast({
        title: '加载完成',
      })

      that.setData({
        getGoodStoreList: getGoodStoreList
      })
      return;
    }

    wx.showToast({
      title: '加载失败',
    })

  })  
}

// 上拉加载更多优质的店
function getMoreWisdom(that) {
  page = page + 1;
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })

  var url = constantFields.GOODSTORE;
  var data = {
    quality: "1",
    lat: app.globalData.latitude,
    lng: app.globalData.longitude,
    city: app.globalData.city,
    pageNo: page,
    pageSize: pageSize,
  }

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
      var moment_list = that.data.getGoodStoreList;
      for (var i = 0; i < res.data.body.length; i++) {
        moment_list.push(res.data.body[i]);
      }
      // 设置数据  
      that.setData({
        getGoodStoreList: that.data.getGoodStoreList
      })
      wx.showToast({
        title: '加载完成',
      })

    }

  })
}


// 查询店铺
function findShop(that, value) {
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.NEARBY;
  var data = {
    "searchKey": value,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": 1,
    "pageSize": 100,
    "city": app.globalData.city
  };
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    if (res.data.body.length != 0) {
      console.log(res.data.body);
      var shopItemInfo = res.data.body;

      that.setData({
        getGoodStoreList: shopItemInfo,
      })

      // 隐藏加载框  
      wx.hideLoading();
    } else {
      wx.showToast({
        title: '没有查询到店铺',
        icon: 'success',
        duration: 2000
      })
    }
  })
}
// 获取分类列表
function tabList(that) {
  wx.showLoading({
    title: '玩命加载中',
  })

  let url = constantFields.PLATFORMINFO;
  let data = {
    "city": app.globalData.city,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": page,
    "pageSize": pageSize
  };

  httpUtils.postRequest(url, data).then(function (res) {
    wx.hideLoading();
    console.log(res.data.body);
    if (res.data.body.length != 0) {
      var list = res.data.body;

      list.forEach(function (item, index) {
        item.scrollTab = true;
        return list;
      });
      list[0].scrollTab = false;
      list = list;

      that.setData({
        tabList: list
      })

      //默认加载综合排序
      getZonghe(list, that);

      wx.showToast({
        title: '加载完成',
      })
      return;
    }

    wx.showToast({
      title: '没有更多',
    })
  })

}
// 点击获取综合排序2
function clickZonghe2(that) {
  console.log("2222222222222");
  wx.showLoading({
    title: '玩命加载中',
  })

  let url = constantFields.ZONGHEPATXU;
  let data = {
    "shopType": bigClassCode,
    "city": app.globalData.city,
    "lat": app.globalData.latitude,
    "lng": app.globalData.longitude,
    "pageNo": page,
    "pageSize": pageSize
  };

  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);

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

        var taItembList = that.data.paiXuList;
        taItembList.forEach(function (item, index) {
          item.status = false;
          return taItembList;
        })
        taItembList[0].status = true;
        taItembList = taItembList;

        console.log(taItembList, "11111111");

        that.setData({
          paiXuList: taItembList
        })

        beginTime = [];
        endTime = [];

        for (var i = 0; i < res.data.body.length; i++) {
          beginTime.push(res.data.body[i].beginTime.replace(/-/g, '.'));
          endTime.push(res.data.body[i].endTime.replace(/-/g, '.'));
        }

        console.log(beginTime, endTime, "综合2时间");

        that.setData({
          shopItemInfo: res.data.body,
          selectStatus: true,
          moduleStatus: true,
          listStatus: false,
          beginTime: beginTime,
          endTime: endTime
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