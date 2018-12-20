var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../../images/banner.png',
      '../../../images/banner.png',
      '../../../images/banner.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    place:"北京市朝阳区建外SOHO6号楼3503室",
    distribution:"9:00～20:00",
    business:"7:00～22:00",
    serve:"到店自取，送货上门，平台预定",
    phone:"13587902345",
    shop:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var params={};
    var wxlogin = httpUtils.httpPromise(wx.login);
    wxlogin().then(function(res){
      params.code = res.code;
      params.appId = constantFields.APP_ID;
      return httpUtils.postRequest(constantFields.GET_OPENID, params);
      }).then(function(res){
        var shopUrl = constantFields.SHOP_INFO_BY_OPENID;
        var shopInfoParams = {
          'openId': res.data.body.openId
        }
        return httpUtils.postRequest(shopUrl, shopInfoParams);
      }).then(function(res){
          if (res.data.body != undefined && res.data.body.sysShopInfoList.length !=0) {//说明之前绑定过店。
            that.setData({
              shop: res.data.body.sysShopInfoList[0]
            })
          }
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
  onShareAppMessage: function () {
    
  }
})