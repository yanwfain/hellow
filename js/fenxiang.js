Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  onShareAppMessage: function (res) {
    var that = this;
    var pro = that.data.product;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("shopCode", shopCode);
    }
    return {
      title: '快来善小美，悠享健康生活',
      path: '/pages/snIndex/snIndex',
      imageUrl: '',
      success: function (res) {
        console.log('转发成功');
        wx.showToast({
          title: '转发成功',
        })
        // 发送转发次数
        let url = constantFields.SHARENUMBER;
        let data = {
          "shopCode": shopCode
        }
        httpUtils.postRequest(url, data).then(function (res) {
          console.log(res.data.body, "转发次数");
        })
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败');
      }
    }
  },
})