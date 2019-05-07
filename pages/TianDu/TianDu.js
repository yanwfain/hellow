Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: '',
    lng: '',
    imgArr: [
      'http://www.shanxingniao.com/imgServer/images/use_test/nongyeshengtai/gfwxzhewm.png'
    ]
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      lat: options.lat,
      lng: options.lng
    })
  },
  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '18301638089',
    })
  },
  goMap() {
    console.log('前往地图')
    wx.openLocation({
      latitude: Number(this.data.lat),
      longitude: Number(this.data.lng),
    })
  },
  // onShareAppMessage: function (res) {
  //   var that = this;
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //   }
  //   return {
  //     title: '快来善小美，悠享健康生活',
  //   }
  // }
})
