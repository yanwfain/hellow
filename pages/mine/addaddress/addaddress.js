// pages/mine/addaddress/addaddress.js
var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
var app = getApp();
var isEdit = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selection: ["北京市","北京市","朝阳区"],
    city:'请选择省/市/县(区)',
    isCity:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var addressStr = options.addstr;
    if(addressStr != undefined){
      isEdit = true;
      var address = JSON.parse(addressStr);
      var arr = [];
      arr[0] = address.addrProvince;
      arr[1] = address.addrCity;
      arr[2] = address.addrArea;
      this.setData({
        address:address,
        selection: arr, 
        isCity: true,
        city: address.addrProvince+"/"+address.addrCity+"/"+address.addrArea
      })
    }
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
  
  },
  location:function(e){
    wx.navigateTo({
      url: '../locationmap/locationmap',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  selectCity:function(e){
    console.log(e);
    this.setData({
      city: e.detail.value[0] + '/' + e.detail.value[1] + '/' + e.detail.value[2],
      isCity:true
    })
  },
  /**
   * 提交
   */
  commit:function(e){
    var that = this
    console.log(e)
    if (!/^1[3,5,7,8]\d{9}/g.test(e.detail.value.phonenumber)) {
      wx.showToast({
        title: '手机号格式有误',
        icon:'loading'
      })
      return;
    }
    if(!this.data.isCity){
        wx.showToast({
          title: '请选择城市',
        })
        return;
    }
    if (e.detail.value.receiver=="") {
      wx.showToast({
        title: '请填写收件人姓名',
      })
      return;
    }
    var url = constantFields.ADD_ADDRESS;
    if (isEdit) {
      url = constantFields.UPDATE_ADDRESS;
    }
    var params = {};
      params.customerName = e.detail.value.receiver;
      params.customerMobile = e.detail.value.phonenumber;
      params.addrProvince = e.detail.value.city[0];
      params.addrCity = e.detail.value.city[1];
      params.addrArea = e.detail.value.city[2];
      params.customerAddress = e.detail.value.detail_address;
    //   return getStorage({key:'bindShop'});
    // }).then(function(res){
      if(isEdit){
        params.code = that.data.address.code;
      }else{
        params.openId = app.globalData.openId;
        params.lat = app.globalData.shopInfo.lat;
        params.lng = app.globalData.shopInfo.lng;
      }
    console.log(app.globalData)
   httpUtils.postRequest(url, params)
  .then(function(res){
    console.log(res)
        wx.showModal({
          title: '',
          content: '成功',
          showCancel:false,
          success:function(res){
            if(res.confirm){
              wx.navigateBack({

              })
            }
          }
        })
    },function(err){
      console.log(err)
    })
   
   
  }
})