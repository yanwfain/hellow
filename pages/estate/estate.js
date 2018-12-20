var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
let page = 1;
let pageSize = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province:"选择省",
    city:'选择市',
    district:'选择县',
    sh:'1',
    orgList:{
      areas:[],
      areay:[]
    },
    },
  // 选择省
  province(e){
    getCity(this, e.currentTarget.dataset);
  },
  // 选择市
  city(e){
    getCounty(this, e.currentTarget.dataset);
  },
  // 选择县
  district(e){
    wx.navigateTo({
      url: '../estates/estates?fullname=' + e.currentTarget.dataset.fullname + "&location=" + e.currentTarget.dataset.location,
    });
    this.setData({
      sh:"1",
      province: "选择省",
      city: '选择市',
      district: '选择县',
    })
  },
  // 去地方产业页
  goProvince(e) {
    wx.navigateTo({
      url: '../estates/estates?fullname=' + e.currentTarget.dataset.fullname + "&location=" + e.currentTarget.dataset.location,
    })
  },
  // 弹出层控制w
  sandh(e){
    this.setData({
      sh: e.currentTarget.dataset.sh
    })
  },
  onLoad: function (options) {
    var that = this;
    // 省数据
    getregion(that);
    // 全部列表数据
    getCitys(that);
    lunboList(that)
  

  },
  onShow: function () {

  },
  onReachBottom: function () {
    page++;
    var that = this;
    getCitys(that);
  },
  onShareAppMessage: function () {}
})
//获取轮播图
 function lunboList(that) {
   var url = constantFields.getLocalIndustryBanne;
  //  console.log(url+"这是地方产业的banner")
    var data = {
   
    };
   // 发送请求
   httpUtils.postRequest(url, data).then(function (res) {
    // console.log(JSON.stringify(res.data.body) +"这是地方产业的banner回调")
     if (res.data.body) {
       var lbList = res.data.body;
       if (lbList.length != 0) {
         // req.samll(lbList);
         that.setData({
           lbList: lbList
         })
         return;
       }
        that.setData({
         luboActive: true
       })
     }
   })
 }
//获得省地区
function getregion (that){
  httpUtils.postRequest(constantFields.getProvince).then(function(res){
    console.log(JSON.stringify(res)+"\t 获取省数据")
    that.setData({
      provinceList:res.data.body
    })
  })
}

//获得市地区
function getCity(that,id) {
  let data = {
    "id":id.id
  }
  httpUtils.postRequest(constantFields.getCity,data).then(function (res) {
    that.setData({
      province: id.province,
      cityList:res.data.body,
      city: res.data.body[0].fullname
    })
  })
}
// 获得县
function getCounty(that,id){
  let data = {
    "id": id.id
  }
  httpUtils.postRequest(constantFields.getCounty, data).then(function (res) {
    let districtList = res.data.body;
    that.setData({
      city:id.city,
      districtList: districtList,
      district: districtList[0].fullname
    })
  })
}

// 全部城市数据
function getCitys(that){
  let data = {
    "pageNo":page,
    "pageSize":pageSize
  }
  httpUtils.postRequest(constantFields.getCitys, data).then(function(res){
    console.log(res)
    let orgList = that.data.orgList;
    orgList.areas = orgList.areas.concat(res.data.body.areas);
    orgList.areay = orgList.areay.concat(res.data.body.areay);
    if(res.data.head.errCode == 10000){
      if (res.data.body.areas.length == 0 && res.data.body.areay.length == 0){
        wx.showToast({
          title: '没有更多数据',
        });
        return;
      }
      that.setData({
        orgList: orgList
      })
      console.log(that.data.orgList)
    }else{
      wx.showToast({
        title: res.data.body.errMsg,
      })
    }
  })
}
