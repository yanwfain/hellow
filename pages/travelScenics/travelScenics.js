var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
var DATAS = require('../../data.js');
var page = 1;
var pageSize = 10;
Page({
  data: {
    city:'',
    entrance:1,
  },
  // 选择城市
  goCity(e){
    wx.navigateTo({
      url: '../switchcity/switchcity',
    })
  },
  // 旅游详情跳转
  goTravelOfficial(e) {
    wx.navigateTo({
      url: '../travelDetail/travelDetail?code=' + e.currentTarget.dataset.code + '&id=' + e.currentTarget.dataset.sceniccode + "&entrance=" + e.currentTarget.dataset.entrance + "&type=" + e.currentTarget.dataset.type,
    })
  },
  onLoad: function (options) {
    var that = this;
    // 根据需求隐藏模块
    if (options.water == "water_culture" || options.water == "water_platform" || options.water == "water_operation") that.setData({ off: true });
    page = 1;
    that.setData({
      options:options
    })
    // 列表
    DATAS.getTravelSearch(that, options, page);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this;
    page = 1;
    // 列表
    DATAS.getTravelSearch(that, that.data.options, page);
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
    }
    return {
      title: '精准匹配营销,生意及所能及',
    }
  },
})

          


// 水平台导航列表
// function getTravelSearch (that,options,page){
//   wx.showLoading({
//     title: '加载中',
//   })
//   let url = constantFields.travelSearch;
//   let data = {
//     "pageNo":page,
//     "pageSize":10,
//     "type":options.water,
//     "lat":DATAS.apps.lat,
//     "lng":DATAS.apps.lng,
//   }
//   httpUtils.postRequest(url,data).then(function(res){
//     console.log(res);
//     wx.hideLoading();
//     if (options.water == "water_platform"){
//       if (res.data.head.errCode == 10000) {
//         that.setData({
//           travelDetail: res.data.body[0],
//           img: res.data.body[0].mapUrl ? res.data.body[0].mapUrl : false
//         })
//         wx.setNavigationBarTitle({
//           title: res.data.body[0].title,
//         })
//       } else {
//         wx.showToast({
//           title: res.data.body.errMsg,
//         })
//       }
//     }else{
//       if (res.data.head.errCode == 10000) {
//         that.setData({
//           offcialList: res.data.body
//         })
//       } else {
//         wx.showToast({
//           title: res.data.body.errMsg,
//         })
//       }
//     }
//   })
// }