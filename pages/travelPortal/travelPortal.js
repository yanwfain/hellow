var app = getApp();
var req = require('../../js/require.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var Map = require('../../js/qqmap-wx-jssdk');
var page = 1;
var pageSize = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  goChannel(e){

    if (e.currentTarget.dataset.status == "NORMAL"){
      wx.navigateTo({
        url: '../travel/travel?platformCode=' + e.currentTarget.dataset.platformcode + `&id=${e.currentTarget.dataset.id}`

      });
      return
    }
    wx.showToast({
      title: '敬请期待',
    })
  },
  //乐水园
  waterpack(){
    wx.navigateTo({
      url: '../travel/travel',
    })
  },
  //农场
  agroecology(){
    wx.navigateTo({
      url: "../Agroecology/Agroecology",
    })
  },
  more(){
    wx.showToast({
      title: '敬请期待',
    })
  },
  onLoad: function (options) {
    var that = this;
    // 行业banner
    channel(that);
    // 频道入口
    channelList(that);
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
    }
    return {
      title: '精准匹配营销,生意及所能及',
    }
  },
})
// banner
function channel(that){
  let url = constantFields.channel;
  httpUtils.postRequest(url).then(function(res){
    that.setData({
      banner:res.data.body
    })
  })
}

// 频道入口
function channelList (that){
  let url = constantFields.channelList;
  let data = {
    'pageNo':1,
    "pageSize":10,
  }
  httpUtils.postRequest(url,data).then(function(res){
    console.log(res)
    if(res.data.head.errCode == 10000){
      that.setData({
        channel: res.data.body
      })
    }else{
      wx.showToast({
        title: res.data.head.errCode,
      })
    }
    
  })
}