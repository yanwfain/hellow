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
	id: 0,
    ishidde:false,
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
  // 报名
  signFn(){
    wx.navigateTo({
      url: '../mesign/mesign',
    })
  },
  // 方形导航事件
  goNav(e){
	  console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.url)
    switch(e.currentTarget.dataset.id){
      case 0:
        wx.navigateTo({ 
          url: '../travelScenic/travelScenic?platformCode=' + this.data.platformcode,
          // '../travelScenic/travelScenic?platformCode=' + this.data.platformcode,
        })
      break;
      case 1:
        wx.navigateTo({
          url: e.currentTarget.dataset.url+'?typename=' + e.currentTarget.dataset.typename + '&off=' + e.currentTarget.dataset.off,
        })
        break;
      case 2 :
        wx.navigateTo({
          url: e.currentTarget.dataset.url+'?data=' + e.currentTarget.dataset.id
        })
        break;
      case 3:
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
        break;
      case 9:
        wx.navigateTo({
          url: e.currentTarget.dataset.url + "?shopCode=" + this.data.shopCode,
        })
        break;
      case 19:
        wx.navigateTo({
          url: e.currentTarget.dataset.url + '?typecode=28'+ '?tyoename=培训/教育'
        })
        break;
      case 11:
        wx.navigateTo({
          url: e.currentTarget.dataset.url + '?typecode=28' + '?tyoename=培训/教育'
        })
        break;
    }
  },
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if (options.id == "7") {
      that.setData({
        ishidde: true
      })
    } else {
      that.setData({
        ishidde: false
      })
    }
    app.globalData.indexQintai = options
    console.log(options.platformCode)
    // 获取地理位置
    getLocation(that,options);
    travelHomeBanner(that, options, function(res){
        that.setData({
			      id: options.id,
            platformcode: options.platformCode,
            isShowNav: options.id == '6'||'7' ? false : true,
            isShowNav: options.id == '4' ? true : false,
            // isShowNav: options.id == '7' ? false : true,
            banner: that.data[`banner${options.id}`],
            navViewList: that.data[`navViewList${options.id}`],
            arr: that.data[`arr${options.id}`],
			      navTitle: that.data[`navTitle${options.id}`]
        })
    }); 
  },
  // 旅游官网跳转
  goTravelOfficial(e){
    console.log(e.currentTarget.dataset.name)
    console.log(e.currentTarget.dataset.name)
    wx.navigateTo({
		url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    })
    // if (e.currentTarget.dataset.name =="耕读世家庄园"){
    //   wx.navigateTo({
    //     url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    //   })
    // }
    // if (e.currentTarget.dataset.name == "公共营养师技能培训学校") {
    //   wx.navigateTo({
    //     url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    //   })
    // }
    // if (e.currentTarget.dataset.name == "铁岭凡河城区水利风景区") {
    //   wx.navigateTo({
    //     url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    //   })
    // }
    // if (e.currentTarget.dataset.name == "九乡明月湖水利风景区") {
    //   wx.navigateTo({
    //     url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    //   })
    // }
    // if (e.currentTarget.dataset.name == "四川绵阳仙海水利风景区") {
    //   wx.navigateTo({
    //     url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    //   })
    // }
    // if (e.currentTarget.dataset.name == "湖北白莲河水利风景区") {
    //   wx.navigateTo({
    //     url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    //   })
    // }
    // if (e.currentTarget.dataset.name == "四川绵阳白水湖水利风景区") {
    //   wx.navigateTo({
    //     url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    //   })
    // }
    // if (e.currentTarget.dataset.name == "坎儿井乐园水利风景区") {
    //   wx.navigateTo({
    //     url: '../travelOfficial/travelOfficial?scenicCode=' + e.currentTarget.dataset.sceniccode + "&name=" + e.currentTarget.dataset.name + "&shopcode=" + e.currentTarget.dataset.shopcode + '&lat=' + e.currentTarget.dataset.lat + '&lng=' + e.currentTarget.dataset.lng + `&id=${e.currentTarget.dataset.id}`,
    //   })
    // }
    if(e.currentTarget.dataset.name == "天都美乐活农庄") {
      
    }
    // wx.showToast({
    //   title: '敬请期待',
    // })
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
      title: '快来善小美,悠享健康生活',
    }

  },
})
// 首页banner
function travelHomeBanner(that,options,cb){
  let url = constantFields.travelHomeBanner;
  let data = {
    "objCode": options.platformCode
  };
  httpUtils.postRequest(url,data).then(function(res){ 
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