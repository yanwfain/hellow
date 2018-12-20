var app = getApp();
var DATAS = require('../../data.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var Map = require('../../js/qqmap-wx-jssdk');
var page = 1;
var pageSize = 10;
Page({
  data: {
    offcialList: "",
    entrance: 2,
    classData: {
      bannerHeight: '460',
    },
    Bind: true,
    bannerl: [
      {
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/nongyeshengtai/gw1.jpg",//banner路径
        code: '3'//景区官网唯一标识
      },
      {
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/nongyeshengtai/gw2.jpg",//banner路径
        code: '2'//官网唯一标识
      },
      {
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/nongyeshengtai/gw3.jpg",//banner路径
        code: '1'//官网唯一标识
      }
    ],
  },
  // 行业选择
  getItemCode(e) {
    wx.navigateTo({
      url: '../travelTourism/travelTourism?typename=' + e.currentTarget.dataset.typename + "&code=" + e.currentTarget.dataset.code + '&typeCode=' + e.currentTarget.dataset.code + '&lat=' + this.data.options.lat + '&lng=' + this.data.options.lng,
    })
  },
  // 旅游详情页
  goTravelOfficial(e) {
      wx.navigateTo({
        url: '../travelDetail/travelDetail?scenicCode=' + e.currentTarget.dataset.sceniccode + "&touristCode=" + e.currentTarget.dataset.touristcode + '&entrance=' + this.data.entrance
      });
  },
  // 导航旅游详情页
  goTravelOfficials(e) {
    if (e.currentTarget.dataset.code == 1) {
      e.currentTarget.dataset.true ? this.setData({ entrance: 3 }) : this.setData({ entrance: 2 });
      wx.navigateTo({
        url: '../travelDetail/travelDetail?scenicCode=' + e.currentTarget.dataset.sceniccode + "&touristCode=" + e.currentTarget.dataset.touristcode + '&entrance=' + this.data.entrance
      });
    } else if (e.currentTarget.dataset.code == 1){

    }else {
      wx.showToast({
        title: '敬请期待',
      })
    }
  },
  onLoad: function(options) {
    console.log(options)
    var that = this;
    that.setData({options:options})
    // banner
    travelOfficialBanner(that, options);
    that.setData({
      scenicCode: options.scenicCode
    })
    getScenicList(that, options)
    // 导航数据
    calssNav(that);
    
    wx.setNavigationBarTitle({
      title: options.name,
    })
  },
  //分享
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
    }
    return {
      title: '精准匹配营销,生意及所能及',
    }
  },
})
// 导航
function calssNav(that) {
  let url = constantFields.travelAround;
  httpUtils.postRequest(url).then(function(res) {
    console.log(res)
    that.setData({
      navList: res.data.body
    })
  })
}
// 景点列表
function getScenicList(that, options) {
  wx.showLoading({
    title: "加载中",
  })
  let url = constantFields.getScenic;
  let data = {
    "pageNo": 1,
    "pageSize": 10,
    "lat": DATAS.apps.lat,
    "lng": DATAS.apps.lng,
    "scenicCode": options.scenicCode,
  };
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res)
    wx.hideLoading();
    if (res.data.head.errCode == 10000) {
      that.setData({
        offcialList: res.data.body
      })
    } else {
      wx.showToast({
        title: res.data.body.errMsg,
      })
    }
  })
}
// banner
function travelOfficialBanner(that,options){
  wx.showLoading({
    title: '加载中',
  })
  let url = constantFields.travelOfficialBanner;
  let data = {
    "code": options.scenicCode
  };
 httpUtils.postRequest(url,data).then(function(res){
   wx.hideLoading();
   if(res.data.head.errCode == 10000){
     that.setData({
       banner:res.data.body
     })
   }else{
     wx.showToast({
       title: res.data.body.errMsg,
     })
   }
 })
}