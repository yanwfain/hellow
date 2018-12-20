// pages/goJionDetail/goJionDetail.js
var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
var req = require('../../../js/require.js');
var app = getApp();
var activeInfo;
var codeId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeInfo: {}
  },
  goMaps: function () {
    console.log(this.data.lat)
    wx.navigateTo({
      url: '../report/report',
    })
  },
  // 去附近的店
  getShopCode(e) {
    console.log(e.currentTarget.dataset.code, "code");
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + shopCode + "&km=" + e.currentTarget.dataset.km,
    })
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    if (options.activeCode) {
      activeInfo = options.activeCode;
      codeId = options.id
    } else if (options.scene) {
      codeId = options.scene
    }
    getActiveInfo(that);
  },
  // 地图导航
  goMap: function () {
    console.log(this.data.activeInfo)
    wx.openLocation({
      latitude: Number(this.data.activeInfo[0].lat),
      longitude: Number(this.data.activeInfo[0].lng),
      name: this.data.activeInfo[0].shopName,
      address: this.data.activeInfo[0].activeAddress
    })
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
    console.log("activeInfo", activeInfo);
    return {
      title: '精准匹配营销,让生意及所能及',
      path: '/pages/activeDetail/activeDetail?shopName=' + activeInfo.shopName + '&activeCode=' + activeCode,
      imageUrl: '',
      success: function (res) {
        console.log('转发成功');
        wx.showToast({
          title: '转发成功',
        })
        // 发送转发次数
        let url = constantFields.SHAREACTIVENUMBER;
        let data = {
          "activityCode": activeInfo.code
        }
        httpUtils.postRequest(url, data).then(function (res) {
          console.log(res.data.body, "转发次数");
        })
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败');
      }
    }
  },

  // 进入店铺
  goShop: function () {
    // console.log(this.data.activeInfo[0].shopCode);
    wx.navigateTo({
      url: '../index/index?shopCode=' + this.data.activeInfo[0].shopCode,
    })
  },
  // 去开店
  goOpenShop: function () {
    wx.navigateTo({
      url: '../openShop/openShop',
    })
  },
})



// 获取活动详情
function getActiveInfo(that) {
  var url = constantFields.GETACTIVEINFO;
  console.log(activeInfo)
  var data = {
    code: activeInfo,
    newretailC: "C",
    id: codeId,
    // shopName: activeInfo.shopName
  };
  console.log(data)
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res);
    if (res.data.head.errCode == '10000') {
      let dataObj = {
        lat: Number(res.data.body[0].lat),
        lng: Number(res.data.body[0].lng),
        key: '全部',
        shopType: res.data.body[0].shopType
      }
      req.getShop(that, dataObj)
      let select = res.data.body[0];
      if (select.customerActivtyImgInfos) {
        let selects = select.customerActivtyImgInfos;
        for (let i = 0; i < selects.length; i++) {
          if (selects[i].index == 1) {
            that.setData({
              videoUrl: selects[i].imgUrl
            });
            selects.splice(i, 1);
            break
          }
        }
        that.setData({
          selects: selects,
          fok: 1
        })
      }
      let activeInfo = res.data.body;
      if (activeInfo[0].cover) {
        let cover = activeInfo[0].cover.split('small/');
        activeInfo[0].cover = cover[0] + cover[1];
      }
      if (activeInfo[0].coverFirst) {
        let coverFirst = activeInfo[0].coverFirst.split('small/');
        activeInfo[0].coverFirst = coverFirst[0] + coverFirst[1];
      }
      if (activeInfo[0].coverSecond) {
        let coverSecond = activeInfo[0].coverSecond.split('small/');
        activeInfo[0].coverSecond = coverSecond[0] + coverSecond[1];
      }
      if (activeInfo[0].coverThird) {
        let coverThird = activeInfo[0].coverThird.split('small/');
        activeInfo[0].coverThird = coverThird[0] + coverThird[1];
      }
      console.log(activeInfo)
      that.setData({
        activeInfo: activeInfo
      })
    } else {
      wx.showToast({
        image: '../../images/defeated.png',
        title: '活动已过期',
      })
    }
  })
}