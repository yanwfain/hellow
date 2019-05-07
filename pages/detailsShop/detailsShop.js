
var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
const result = require('../../datas/jijihangye.js')
var pageNo = 1;
var pages = 30;
var scene = "";
var activeInfo;
Page({
  /**
   * 页面的初始数据
   */

  data: {
    selected: null,
    // selected1: false,
    // selected2: false,
    indicatorDots: true,
    interval: 5000,
    duration: 1000,
    product: {},
    activeInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNo = 1;
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    var that = this;
    // 这个是页面进来的初始数据
    var url = constantFields.NONGCHANDE;
    console.log(app.globalData.openId);
    var put = {
      "id":options.id
    };
    console.log(options.id)
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
      wx.hideLoading();
      console.log(res)
      that.setData({
        detail: res.data.body,
        detaid: res.data.body.id,
      })
    })
    // 图文
    var url1 = constantFields.IMGTEXT;
    console.log(app.globalData.openId);
    var put1 = {
      // "id": options.id,
      'code': options.code
    };
    console.log(options.id)
    console.log(put)
    httpUtils.postRequest(url1, put1).then(function (res) {
      wx.hideLoading();
      console.log(res)
      that.setData({
        detail1: res.data.body,
       
      })
    })
     // 这个是规格 和对应的价格   页面进来的初始数据的价格 也是这个接口
    var url2 = constantFields.GuiGE;
    console.log(app.globalData.openId);
    var put2 = {
      // "id": options.id,
      'code': options.code
    };
    console.log(options.id)
    console.log(put2)
    httpUtils.postRequest(url2, put2).then(function (res) {
      wx.hideLoading();
      console.log('detail2========')
      console.log(res)
      that.setData({
        detail2: res.data.body,
        selected:res.data.body[0].id,
        selectedArry:[res.data.body[0]]
      })
    })
    getActiveInfo(that);

    // console.log(app.globalData.shopInfo)
  },
  selectSpe(e) {
    let id = e.currentTarget.dataset.id;
    let outprice = e.currentTarget.dataset.outprice;
    console.log(id, this.data.detail2)
    console.log(outprice)
    let selectedArry = this.data.detail2.filter((i) => { return i.id == id });
    console.log(selectedArry)
    this.setData({
      selected: selectedArry[0].id,
      selectedArry: selectedArry
    })
  },
  selectBuy: function (e) {
    var that = this;
    console.log(that.data.selectedArry)
    console.log(that.data.detaid)
    console.log(that.data.selectedArry[0].specifications)
    console.log(that.data)
    app.globalData.expertList = that.data.detail
      wx.navigateTo({
        url: '../shopCarlist/shopCarlist?id=' + that.data.detaid + '&specifications=' + that.data.selectedArry[0].specifications
      })

  },
  goToIndex(e) {
    
    console.log(e.currentTarget.dataset.shopcode)
    console.log(e.currentTarget.dataset.code)
    wx.navigateTo({
      url: "../travelOfficialshop/travelOfficialshop?scenicCode=" + e.currentTarget.dataset.shopcode + '&subordinate=' + e.currentTarget.dataset.subordinate + `&id=6`,
    })
  },
  modelFn(){

  },
  selected: function (e) {
    console.log("1")
    this.setData({
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '快来善小美，悠享健康生活',
    }
  },
  click(event) {
    Show: true;
  }

})
function getActiveInfo(that) {
  var url = constantFields.GETACTIVEINFO;
  var data = {
    code: activeInfo,
    newretailC: "C",
    id: codeId,
    openId: app.globalData.openId
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
      that.setData({
        activeInfo: activeInfo
      })
      console.log(activeInfo)
    } else {
      wx.showToast({
        image: '../../images/defeated.png',
        title: '活动已过期',
      })
    }
  })
}