Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    imgArr: [
      'http://www.shanxingniao.com/imgServer/images/use_test/qita/wxskm.jpg'
    ],
    imgArr1: [
      'http://www.shanxingniao.com/imgServer/images/use_test/qita/zfbskm.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  previewImg1: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr1 = this.data.imgArr1;
    wx.previewImage({
      current: imgArr1[index],     //当前图片地址
      urls: imgArr1,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   selected: function (e) {
        this.setData({
            selected1: false,
            selected: true
        })
    },
    selected1: function (e) {
        this.setData({
            selected: false,
            selected1: true
        })
    },
  //点击开始时的时间
  // timestart: function (e) {
  //   　　var _this = this;
  //   　　_this.setData({ timestart: e.timeStamp });
  // },
  // timeend: function (e) {
  //   　　var _this = this;
  //   　　_this.setData({ timeend: e.timeStamp });
  // },
  // saveImg: function (e) {
  //   　　var _this = this;
  //   　　var times = _this.data.timeend - _this.data.timestart;
  //   　　if (times > 300) {
  //     　　　　console.log("长按");
  //     　　　　wx.getSetting({
  //       　　　　　　success: function (res) {
  //         　　　　　　　　wx.authorize({
  //           　　　　　　　　　　scope: 'scope.writePhotosAlbum',
  //           　　　　　　　　　　success: function (res) {
  //             　　　　　　　　　　　　console.log("授权成功");
  //                       var imgUrl = "http://www.shanxingniao.com/imgServer/images/use_test/qita/wxskm.jpg";//图片地址
  //               　　　　　　　　　　　　wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
  //                 　　　　　　　　　　　　　　url: imgUrl,
  //                 　　　　　　　　　　　　　　success: function (res) {
  //                   　　　　　　　　　　　　　　　　console.log(res);
  //                   　　　　　　　　　　　　　　　　// 下载成功后再保存到本地
  //                   　　　　　　　　　　　　　　　　wx.saveImageToPhotosAlbum({
  //                     　　　　　　　　　　　　　　　　　　filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
  //                     　　　　　　　　　　　　　　　　　　success: function (res) {
  //                     　　　　　　　　　　　　　　　　　　　}
  //                   　　　　　　　　　　　　　　　　})
  //                 　　　　　　　　　　　　　　}
  //               　　　　　　　　　　　　})
  //           　　　　　　　　　　}
  //         　　　　　　　　})
  //       　　　　　　}
  //     　　　　})
  //   　　}
  // },
  // //点击开始时的时间
  // timestart1: function (e) {
  //   var _this = this;
  //   _this.setData({ timestart: e.timeStamp });
  // },
  // timeend1: function (e) {
  //   var _this = this;
  //   _this.setData({ timeend: e.timeStamp });
  // },
  // saveImg1: function (e) {
  //   var _this = this;
  //   var times = _this.data.timeend - _this.data.timestart;
  //   if (times > 300) {
  //     console.log("长按");
  //     wx.getSetting({
  //       success: function (res) {
  //         wx.authorize({
  //           scope: 'scope.writePhotosAlbum',
  //           success: function (res) {
  //             console.log("授权成功");
  //             var imgUrl = "http://www.shanxingniao.com/imgServer/images/use_test/qita/zfbskm.jpg";//图片地址
  //             wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
  //               url: imgUrl,
  //               success: function (res) {
  //                 console.log(res);
  //                 // 下载成功后再保存到本地
  //                 wx.saveImageToPhotosAlbum({
  //                   filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
  //                   success: function (res) {
  //                   }
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
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
  // onShareAppMessage: function (res) {
  //   var that = this;
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //   }
  //   return {
  //     title: '快来善小美，悠享健康生活',
  //   }
  // },
})