var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var app = getApp();
var page = 0;
var pageSize = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classFaly:[
      { name: '全部' },
      { name: '精选' },
      { name: '爱吃货' },
      { name: '爱美丽' },
      { name: '爱生活' },
      { name: '爱玩耍' },
    ],
    lisa: { name: "您上架的'精美铅笔盒'以上架成功",lis:'系统提示'},
    off:0
  },
  classFaly:function(e){
    console.log(e);
    var that = this;
    that.setData({off:e.currentTarget.dataset.ide})
  },

  onLoad: function (options) {
    var that = this;
    page = 0;
    // 获取文章列表
    getLifeWisdom(that);
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onReachBottom: function () {
    var that = this;
    // 上拉加载更多
    getMoreWisdom(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //去智慧详情页
  goLifeInfo: function (e) {
    console.log(e);
    console.log(e.currentTarget.dataset.articlecode);
    var articleCode = e.currentTarget.dataset.articlecode;
    wx.navigateTo({
      url: '../lifeWisdom/wisdom/wisdom?articleCode=' + articleCode
    })
  }
})

// 获取所有文章
function getLifeWisdom(that) {
  page++;
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })

  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: page,
    pageSize: pageSize
  };

  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res.data.body);
    var wisdomList = res.data.body.list;

    if (wisdomList.length != 0) {
      wx.showToast({
        title: '加载完成',
      })
      that.setData({
        getLifeWisdomList: wisdomList,
        loing: res.data.body.falg
      })
      console.log(that.data.loing)
      return;
    }

    wx.showToast({
      title: '暂无数据',
    })

  })

}

// 上拉加载更多文章
function getMoreWisdom(that) {
  page++;
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })

  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: page,
    pageSize: pageSize
  };

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
      var moment_list = that.data.getLifeWisdomList;
      for (var i = 0; i < res.data.body.list.length; i++) {
        moment_list.push(res.data.body.list[i]);
      }
      // 设置数据  
      that.setData({
        getLifeWisdomList: that.data.getLifeWisdomList
      })
      wx.showToast({
        title: '加载完成',
      })

    }

  })
}

