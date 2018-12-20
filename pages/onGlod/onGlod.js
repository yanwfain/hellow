// pages/onGlod/onGlod.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {name:'投放行业分类页banner'},
      { name: '投放附近的店竞价排名广告' },
      { name: '投放首页附近促销竞价排名广告' },
      { name: '投放搜索关键字广告' },
      { name: '投放行业分类页附近的店竞价排名广告' },
      { name: '投放行业分类页附近促销竞价排名广告' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goTar(e){
    wx.navigateTo({
      url: '../onGlodConsume/onGlodConsume?name=' + e.currentTarget.dataset.name + '&id=' + e.currentTarget.dataset.id,
    })
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