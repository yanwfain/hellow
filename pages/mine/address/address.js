var httpUtils = require('../../../js/httpUtils.js');
var constantFields = require('../../../js/constantFields.js');
var showChoose = true;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    showChoose: showChoose
  },
  hidden:function(e){   //显示隐藏
    var that = this;
    // 未添加收货地址样式
    if (that.data.XXX == true) {
      that.setData({
        XXX: false     //展示未添加收货地址样式
      })
    } else {
      that.setData({
        XXX: true     //隐藏未添加收货地址样式
      })
    }
  },
  /**
   * 选择地址
   */
  checkboxChange:function(e){
    console.log(this.data.addressList[e.detail.value].inDelive);
    if(!this.data.addressList[e.detail.value].inDelive){
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.setData({
        place: this.data.addressList[e.detail.value],
        isInDelive: this.data.addressList[e.detail.value].inDelive
      })
      wx.navigateBack({
        delta:1
      });
    }else{
      // wx.showToast({
      //   title: '不在配送范围内',
      // })
    }
    
  },
  edit:function(e){
    var addressStr = JSON.stringify(this.data.addressList[e.currentTarget.dataset.index]);
    wx.navigateTo({
      url: '../addaddress/addaddress?addstr=' + addressStr,
    })
  },
  /**
   * 设置默认地址
   */
  defaultAddress:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.index)
    if(this.data.addressList[e.currentTarget.dataset.index].isDefault == 1){//是默认地址，不再请求
      return
    }else{
      var params={};
      params.code = this.data.addressList[e.currentTarget.dataset.index].code;
      params.isDefault = 1;
      httpUtils.postRequest(constantFields.UPDATE_ADDRESS,params).then(function(res){
        for (var i = 0; i < that.data.addressList.length;i++){
          if (i == e.currentTarget.dataset.index){
            that.data.addressList[e.currentTarget.dataset.index].isDefault = 1;
          }else{
            that.data.addressList[i].isDefault = 0;
          }
        }
        that.setData({
          addressList: that.data.addressList
        })
      })
    }
  },
  deleteAddress:function(e){
    var that = this;
    var params = {};
    params.status ="DELETED"
    params.code = this.data.addressList[e.currentTarget.dataset.index].code;
    httpUtils.postRequest(constantFields.UPDATE_ADDRESS,params).then(function(res){
      that.data.addressList.splice(e.currentTarget.dataset.index,1);
      that.setData({
        addressList: that.data.addressList
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.showChoose==undefined){
      this.setData({
        showChoose: false
      })
    }else{
      this.setData({
        showChoose: showChoose
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
    console.log(app.globalData.shopInfo)
    var that = this;
    var url = constantFields.GET_DELIVE_ADDRESS;
    var params = {
    };
    if (app.globalData.openId == undefined){

    }else{
      params.openId = app.globalData.openId;
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          params.lat = res.latitude
          params.lng = res.longitude
          httpUtils.postRequest(url, params)
            .then(function (res) {
              console.log(res)
              wx.hideLoading();
              console.log(res);
              if (res.data.body.length != 0) {
                res.data.body[0].checked = true;
                that.setData({
                  addressList: res.data.body,
                  hidden: true
                })
              } else {
                that.setData({
                  hidden: false
                })
              }

            }, function (err) {
              wx.showToast({
                title: params,
              })
            })
        }
      })
        

     
    }
    
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
  addAddress:function(e){
    if(app.globalData.shopInfo == undefined){
      wx.showModal({
        content: '请扫描店内二维码',
        showCancel:false
      })
    }else{
      wx.navigateTo({
        url: '../addaddress/addaddress',
      })
    }
    
  }
})