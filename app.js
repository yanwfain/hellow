//app.js
//后台挂起5分钟，小程序被微信宿主销毁，五分钟内重新打开小程序不会再走onLaunch()方法
// var extraData = 1;
App({
  globalData: {
    extraData: null,
    userInfo: null,
    selectProducts: [],
    shopInfo: {},
    openId: null,
    latitude: null,
    longitude: null,
    addressRes: null,
    city: null,
    token: null
  },
  onLaunch: function (options) {
    console.log(options, "传参")
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
   onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
    }
    return {
      title: '精准匹配营销,生意及所能及',
    }
  },
  onShow: function (options){
    console.log(options,"传参")
    if (options.referrerInfo) {
      if (options.referrerInfo.extraData.transmitData){
        this.globalData.extraData = options.referrerInfo.extraData.transmitData
      }
    }
  },
  

})


// {
//   "pagePath": "pages/find/find",
//   "text": "资讯",
//   "iconPath": "images/system1.png",
//   "selectedIconPath": "images/system.png"
// },