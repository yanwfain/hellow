var app = getApp();
var req = require('../../js/require.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var QQMapWX = require('../../js/qqmap-wx-jssdk');
var DATAS = require('../../data.js');
var page = 1;
var pageSize = 10;
const result = require('../../datas/jijihangye.js')

Page({
  data: {
    ...result,
    isShowNav: true,
    bannerl:[
      {
        imgUrl:"http://www.shanxingniao.com/imgServer/images/use_test/nongyeshengtai/pt1.jpg",//banner路径
        code:'3'//景区官网唯一标识
      },
      {
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/nongyeshengtai/pt2.jpg",//banner路径
        code: '2'//官网唯一标识
      },
      {
        imgUrl: "http://www.shanxingniao.com/imgServer/images/use_test/nongyeshengtai/pt3.jpg",//banner路径
        code: '1'//官网唯一标识
      }
    ],
    navXiao:[
      { imgUrl: "../../images/zhaoshang.jpg", typeName: "水·招商", types:"water_investment"},
      { imgUrl: "../../images/yunying.jpg", typeName: "水·运营", types: "water_operation" },
      { imgUrl: "../../images/youji.jpg", typeName: "水·游记", types: "water_travel_notes"},
      { imgUrl: "../../images/wenhua.jpg", typeName: "水·文化", types: "water_culture"},
      { imgUrl: "../../images/pingtai.jpg", typeName: "水·平台", types: "water_platform"},
    ]
  },
  // 圆形导航跳转
  getItemCode(e){
    if (e.currentTarget.dataset.water == "water_operation"){
      wx.showToast({
        title: '敬请期待',
      })
      return;
    }
    if (e.currentTarget.dataset.water != "water_platform"){
      wx.navigateTo({
        url: '../travelScenics/travelScenics?water=' + e.currentTarget.dataset.water + '&typeName=' + e.currentTarget.dataset.name,
      })
    } else{
      wx.navigateTo({
        url: '../travelDetail/travelDetail?water=' + e.currentTarget.dataset.water,
      })
    }
    
  },
  // 方形导航事件
  goNav(e){
    switch(e.currentTarget.dataset.id){
      case'0':
        wx.navigateTo({
          url: '../travelScenic/travelScenic?platformCode=' + this.data.platformcode,
        })
      break;
      case '1':
        wx.navigateTo({
          url: '../travelTourism/travelTourism?typename=' + e.currentTarget.dataset.typename + '&off=' + e.currentTarget.dataset.off,
        })
        break;
      case '2':
        wx.navigateTo({
          url: '../platformInprom/platformInprom?inprom=' + e.currentTarget.dataset.inprom,
          // url: '../platformInprom/platformInprom',
        })
        break;
      case '3':
        wx.navigateTo({
          // url: '../platformInprom/platformInprom',
        })
        break;
    }
    
  },
  onLoad: function (options) {
    var that = this;
    console.log(options)
    // 获取地理位置
    getLocation(that,options);
    travelHomeBanner(that, options, function(res){
        that.setData({
            platformcode: options.platformCode,
            isShowNav: options.id == '6' ? false : true,
            banner: that.data[`banner${options.id}`],
            navViewList: that.data[`navViewList${options.id}`],
            arr: that.data[`arr${options.id}`]
        })
    }); 
  },
  // 旅游官网跳转
  goTravelOfficial(e){
    wx.navigateTo({
      url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng ,
    })
  },
 //上拉触底
  onReachBottom: function () {

  },
  onShow:function(){
  },
//触底
  onShareAppMessage: function () {

  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
    }
    return {
      title: '精准匹配营销,生意及所能及',
    }
  },
})
// 首页banner
function travelHomeBanner(that,options,cb){
  let url = constantFields.travelHomeBanner;
  httpUtils.postRequest(url).then(function(res){
    console.log(res)
    that.setData({
      banner4:res.data.body
    })
  }).then(cb)
}
// 获取地理位置定位信息
function getLocation(that,options) {
  let QQmap = new QQMapWX({
    key: 'CO5BZ-3DPCX-PSG44-7O2NN-UYBQJ-MGFXE' // 必填
  });
  // 获取当前的地理位置
  wx.getLocation({
    // type: 'gcj02',
    // altitude: true,
    success: function (res) {
      QQmap.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res) {
          that.setData({
            city: res.result.ad_info.city
          })
          DATAS.apps.lat = res.result.location.lat;
          DATAS.apps.lng = res.result.location.lng;
          DATAS.apps.city = res.result.ad_info.city;
          DATAS.scenicWeb(that,options)
        }
      })
    }
  })
}