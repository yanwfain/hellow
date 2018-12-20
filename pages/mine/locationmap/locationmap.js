// pages/mine/locationmap/locationmap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale:16,
    latitude:null,
    longitude:null,
    controls: [{
      id: 1,
      iconPath: '../../../images/location.png',
      position: {
        left: 310/2-25,
        top: 400/2-25,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  confirmCommit(e){
  var that = this;
   var pages =  getCurrentPages();
   var perpage = pages[pages.length-2];
   perpage.setData({
     latitude: that.data.latitude,
     longitude: that.data.longitude,
   })
   wx.navigateBack({
     
   })
  },
  
  /**
   * 获取当前地图中心坐标，也就是地图上中心图标标记的位置
   */
  chooseLocation:function(e){
    var that = this;
    this.mapcon.getCenterLocation({
      success:function(res){
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          circles:[{
            latitude: res.latitude,
            longitude: res.longitude,
            color:"#7cb5ec88",
            fillColor: "#7cb5ec88",
            radius:200,
            strokeWidth:1
          }]
        })
      }
    })
    
  },
  // fangda(e){
  //   var that =this;
  //   if(that.data.scale<18){
  //     var scale = that.data.scale + 1
  //     this.setData({
  //       scale: scale
  //     })
  //   }
  // },
  // suoxiao(e) {
  //   var that = this; 
  //   if(that.data.scale >5){
  //     var scale = that.data.scale - 1
  //     this.setData({
  //       scale: scale
  //     })
  //   }
    
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //有默认的地址就设置默认的地址，没有就定位位置信息；
    var longitude = options.longitude;
    var latitude = options.latitude;
    var radius = parseInt(options.radius);
    if(radius != null){
      this.setData({
        radius:radius
      })
    }
    if(longitude == null || latitude == null){
      wx.getLocation({
        type: "gcj02",
        success: function (res) {
          console.log(res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            circles: [{
              latitude: res.latitude,
              longitude: res.longitude,
              color: "#7cb5ec88",
              fillColor: "#7cb5ec88",
              radius: 200,
              strokeWidth: 1
            }]
          })
        },
      })
    }else{
      that.setData({
        latitude: latitude,
        longitude: longitude,
        circles: [{
          latitude: latitude,
          longitude:  longitude,
          color: "#7cb5ec88",
          fillColor: "#7cb5ec88",
          radius: radius,
          strokeWidth: 1
        }]
      })
    }
    
    this.mapcon = wx.createMapContext("myMap", this)
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        that.setData({
          'controls[0].position.left': res.screenWidth/2-25
        })
      },
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