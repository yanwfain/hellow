var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtnum:null,
    iconList:[
      {
        icon:"../../images/right.png",
        productTitle:"俄国进口鲜奶曲奇蛋糕",
        rmb:"10",
        productNum:1
      }, {
        icon: "../../images/right.png",
        productTitle: "俄国进口鲜奶曲奇蛋糕",
        rmb: "10",
        productNum: 1
      }
    ],
    packCost:"2",
    distributionCost:"2",
    actPackCost:"18",
    sh_Person:"廉先生",
    sh_Tel:"19836746203",
    sh_Address:"北京市朝阳区建外soho6号楼3503室",
    zxDistriWay:"自行配送",
    order_number:"2015 8768 9290 3800 423",
    year_time:"2018-3-26 16:32",
    payfor_way:"微信支付",
    orderDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    httpUtils.postRequest(constantFields.ORDER_DETAIL, { orderCode: options.code}).then(function(res){
      console.log(res)
      that.setData({
        orderDetail:res.data.body[0]
      })
    })
  },
  copyTBL: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.ordesn)
    this.setData({
      txtnum: e.currentTarget.dataset.ordesn
    })
    console.log(this.data.txtnum)
    wx.setClipboardData({
      data: this.data.txtnum,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
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