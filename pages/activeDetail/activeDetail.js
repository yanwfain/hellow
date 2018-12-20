// pages/goJionDetail/goJionDetail.js
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var req = require('../../js/require.js');
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
    wx.navigateTo({
      url: '../report/report?objName=' + this.data.activeInfo[0].shopName + '&repotyType=2&objCode=' + this.data.activeInfo[0].code,
    })
  },
  // 收藏促销
  saveShop: function () {
    var that = this;
    if (that.data.off === 1) {
      var url = constantFields.QUTESHOUCANG;
      var data = {
        "code": that.data.activeInfo[0].sysEnshrineInfo,
        "enshrineType": "1",
        "objCode": that.data.activeInfo[0].code
      }
      httpUtils.postRequest(url, data).then(function (res) {
        wx.showToast({
          title: '取消收藏',
        })
        that.setData({
          off:0
        })
      })

    } else {
      
      var url = constantFields.ADDSHOUCANG;
      var data = {
        "openId": app.globalData.openId,
        "enshrineType": "1",
        "alias": "",
        "objCode": that.data.activeInfo[0].code,
        "user": ""
      }
      httpUtils.postRequest(url, data).then(function (res) {
        wx.showToast({
          title: '收藏成功',
        })
        that.setData({
          off: 1
        })
      })

    }


  },
  // 去附近的店
  getShopCode(e) {
    var shopCode = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '../index/index?shopCode=' + shopCode + "&km=" + e.currentTarget.dataset.km,
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      options:options
    })
    if(options.activeCode){
      activeInfo = options.activeCode;
      codeId = options.id
    }else if(options.scene){
      codeId = options.scene
    }
    getActiveInfo(that);
    if(options.shopCodeP){
      // 文字轮播
      getActivityDetailTxtBanner(that);
    }else{
      that.setData({
        hides:1
      })
    }
  },
  // 地图导航
  goMap: function () {
    wx.openLocation({
      latitude: Number(this.data.activeInfo[0].lat) ,
      longitude: Number(this.data.activeInfo[0].lng) ,
      name: this.data.activeInfo[0].shopName,
      address: this.data.activeInfo[0].activeAddress
    })
  },
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '精准匹配营销,让生意及所能及',
      path: '/pages/activeDetail/activeDetail?shopName=' + activeInfo.shopName + '&activeCode=' + activeCode,
      imageUrl: '',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
        })
        // 发送转发次数
        let url = constantFields.SHAREACTIVENUMBER;
        let data = {
          "activityCode": activeInfo.code
        }
        httpUtils.postRequest(url, data).then(function (res) {
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  // 进入店铺
  goShop: function () {
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
function getActiveInfo (that) {
  var url = constantFields.GETACTIVEINFO;
  var data = {
    code: activeInfo,
    newretailC: "C",
    id:codeId,
    openId:app.globalData.openId
  };
  httpUtils.postRequest(url, data).then(function (res) {
    if (res.data.body[0].sysEnshrineInfo === false) {
      that.setData({
        off: 0
      })
    } else {
      that.setData({
        off: 1
      })
    }
    if(res.data.head.errCode == '10000'){
      let dataObj = {
        lat: Number(res.data.body[0].lat),
        lng: Number(res.data.body[0].lng),
        key:'全部',
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
      that.setData({
        activeInfo: activeInfo
      })
     
    }else{
      wx.showToast({
        image: '../../images/defeated.png',
        title: '活动已过期',
      })
    }
  })
}
// 文字轮播
function getActivityDetailTxtBanner(that){
  
  let data={
    "shopCodep": that.data.options.shopCodeP
  };
  httpUtils.postRequest(constantFields.getActivityDetailTxtBanner,data).then(function(res){
    if(res.data.head.errCode == 10000){
      that.setData({
        txtBanner:res.data.body
      });
      console.log(that.data.txtBanner)
    }
  })
};