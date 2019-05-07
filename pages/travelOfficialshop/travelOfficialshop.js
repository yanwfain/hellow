var app = getApp();
var DATAS = require('../../data.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var Map = require('../../js/qqmap-wx-jssdk');
const result = require('../../datas/jijihangye.js');
var page = 1;
var pageSize = 10;
Page({
  data: {
    ...result,
    offcialList: "",
    iconState: false,

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
  ifShow() {
    this.setData({
      iconState: this.data.iconState == true ? false : true
    })
  },
  // 行业选择
  getItemCode(e) {
    wx.navigateTo({
      url: '../travelTourism/travelTourism?typename=' + e.currentTarget.dataset.typename + "&code=" + e.currentTarget.dataset.code + '&typeCode=' + e.currentTarget.dataset.code + '&lat=' + this.data.options.lat + '&lng=' + this.data.options.lng,
    })
  },
  // 旅游详情页
  goTravelOfficial(e) {
	  this.setData({ entrance: 2 })
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
    }
     else if (e.currentTarget.dataset.url){
      wx.navigateTo({
        url: e.currentTarget.dataset.url + "?scenicCode=" + e.currentTarget.dataset.sceniccode 
      });
    }
    else {
      wx.showToast({
        title: '敬请期待',
      })
    }
  },
  onLoad: function(options) {
    console.log(options)
    var that = this;
    var that = this;
    // var url = constantFields.scenicWebshop;
    var url = constantFields.scenicWebshop;
    console.log(app.globalData.openId);
    var put = {
      "subordinate": options.subordinate,
      "scenicCode": options.scenicCode
    };
    console.log(options.id)
    console.log(put)
    httpUtils.postRequest(url, put).then(function (res) {
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
    // that.setData({options:options})
    // banner



    travelOfficialBanner(that, options, () => {
		this.setData({
      //banner: this.data[`banner2${options.id}`],
      // banner: this.data[`banner2${options.id}`],
		})
	});
    that.setData({
      // navViewList: options.conde == '6' ? this.data[`navViewList${options.id}`] : this.data[`navViewList`],
      navViewList: this.data[`navViewList2${options.id}`],
			navTitle: that.data[`navTitle${options.id}`],
      scenicCode: options.scenicCode,
      
    })
    getScenicList(that, options)
    if (options.name == "耕读世家庄园") {
      this.setData({
        ["navViewList[3].url"]: "../Contactus/Contactus?" + '&lat=' + this.data.options.lat + '&lng=' + this.data.options.lng
      });
    } else if (options.name == "天都美乐活农庄") {
      this.setData({
        ["navViewList[3].url"]: "../TianDu/TianDu?" + '&lat=' + this.data.options.lat + '&lng=' + this.data.options.lng
      });
    } else if (options.name == "梦长思农业园") {
      this.setData({
        ["navViewList[3].url"]: "../TianDu/TianDu?" + '&lat=' + this.data.options.lat + '&lng=' + this.data.options.lng
      });
    }
    else if (options.name == "公共营养师行业技能培训学校") {
      this.setData({
        ["navViewList[3].url"]: "../TianDu/TianDu?" + '&lat=' + this.data.options.lat + '&lng=' + this.data.options.lng
      });
    }
    else if (options.name == "美国心脏协会AHA培训学校") {
      this.setData({
        ["navViewList[3].url"]: "../TianDu/TianDu?" + '&lat=' + this.data.options.lat + '&lng=' + this.data.options.lng
      });
    }
    else if (options.name == "国翰教育，培养孩子天才般的学习力") {
      this.setData({
        ["navViewList[3].url"]: "../TianDu/TianDu?" + '&lat=' + this.data.options.lat + '&lng=' + this.data.options.lng
      });
    }
    // 导航数据
    calssNav(that);
    // var title = options.name;
    // console.log(options.name)
    // wx.setNavigationBarTitle({
    //   title: title,
    // })
    app.globalData.optionss = options;
    
    var title = app.globalData.optionss.subordinate;
    var test = null;
    if (test = title){
      wx.setNavigationBarTitle({
        title: title,
      });
    } 
    // console.log(title)
    // console.log(options.lat+"-----")
   
  },
  //分享
  onShareAppMessage: function (res) {
    var title = app.globalData.optionss.name;
    console.log(title)
    wx.setNavigationBarTitle({
      title: title,
    });
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '快来善小美，悠享健康生活',
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
function travelOfficialBanner(that,options,cb){
  console.log(options)
  wx.showLoading({
    title: '加载中',
  })
  let url = constantFields.travelOfficialBanner;
  let data = {
    "code": options.scenicCode
  };
  
 httpUtils.postRequest(url,data).then(function(res){
   wx.hideLoading();
   console.log(data)
   console.log(res)
   if(res.data.head.errCode == 10000){
     that.setData({
       banner:res.data.body
     })
   }else{
     wx.showToast({
       title: res.data.body.errMsg,
     })
   }
 }).then(cb)
}