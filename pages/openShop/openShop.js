// pages/openShop/openShop.js
var app = getApp();
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var maxTime = 60;
var currentTime = maxTime //倒计时的事件（单位：s）
var phoneNum;
var interval = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopNames: [
      '生活服务',
      '美食',
      '商超/零售',
      '酒店民宿',
      '丽人',
      '房产/中介',
      '休闲娱乐',
      '运动健身',
      '汽车服务',
      '家装建材',
      '大健康',
      '母婴亲子',
      '培训/教育',
      '旅游',
    ],
    time: currentTime,
    yanzhengma: '获取验证码(60s)',
    clickable: false,
    hidden: true
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
  // onShareAppMessage: function (res) {
  //   var that = this;
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //   }
  //   return {
  //     title: '快来善小美，悠享健康生活',
  //   }
  // },

  // 获取手机号
  bindPhoneInput: function (e) {
    console.log(e.detail.value);
    phoneNum = e.detail.value;
  },

  // 点击选择店类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value, "对应的选项:", this.data.shopNames[e.detail.value])
    this.setData({
      index: e.detail.value
    })
  },

  // 点击获取验证码
  getSmsCode: function(){
    if (this.data.clickable) {
      return;
    }
    var that = this;
    sendSmsCode(that);
  },

  // 查看协议内容
  goXY: function(){
    wx.navigateTo({
      url: '../serverText/serverText',
    })
  },

  // 提交信息
  formSubmit: function (e) {
    var that = this; 

    let formObj = e.detail.value;

    if (formObj.mobile == ""){

        wx.showToast({
          title: '请填写手机号码',
          image: '../../images/icon_error.png'
        })
        return;

    } else if (formObj.shopTypeName == ""){
        
        wx.showToast({
          title: '请选择店类型',
          image: '../../images/icon_error.png'
        })
        return;

    } else if (formObj.yzMa == ""){

        wx.showToast({
          title: '请输入验证码',
          image: '../../images/icon_error.png'
        })
        return;

    } else if (formObj.checkboxStatus.length == 0){

        wx.showToast({
          title: '请阅读善鸟服务协议',
          image: '../../images/icon_error.png'
        })
        return;

    } else{
      console.log('form发生了submit事件，携带数据为：', e.detail.value);

      let itemCode = parseInt(formObj.shopType) + 1;
      let url = constantFields.ONPENSHOP;
      let data = {
        "mobile": formObj.mobile,
        "shopType": itemCode,
        "shopTypeName": formObj.shopTypeName,
        "authCode": formObj.authCode,
        "vCode": formObj.vCode,
        "openId": app.globalData.openId
      }

      httpUtils.postRequest(url,data).then(function(res){
        console.log(res,"开店信息")
        if (res.data.head.errCode != 10001){

          // that.setData({
          //   hidden: false
          // })
          let data = {
            token: res.data.body.token,
            openId:app.globalData.openId
          }
          wx.navigateToMiniProgram({
            appId: 'wx6c653b3b961fb92a',
            path: 'pages/index/index',
            envVersion: 'release',
            extraData: data,
            success: function () {
            }
          })


          return
          
        } 

        wx.showToast({
          title: res.data.body.errMsg,
          image: '../../images/icon_error.png'
        })

      }, function (err) {
        wx.showToast({
          title: err,
        })
      })

    }

  },

  // 打开商户端
  Bshop: function (){
    wx.navigateToMiniProgram({
      appId: 'wx6c653b3b961fb92a',
      envVersion: "release",
      success: function(){
        console.log("打开成功");
      }
    })
  }

})




/**
 * 获取断短信验证码
 */
function sendSmsCode(that) {
  if (!/^1[3,5,6,7,8]\d{9}/g.test(phoneNum)) {
    wx.showToast({
      title: '请输入合法手机号',
      image: '../../images/icon_error.png',
      duration: 2000
    })
    return;
  }
  var url = constantFields.GET_SMSCODE;
  var params = {
    'mobile': phoneNum
  }
  httpUtils.postRequest(url, params).then(function (res) {
    console.log(res)
    wx.hideLoading();
    if (res.data.head.errCode != 10001){
      daojishi(that);
      wx.showToast({
        title: '发送成功',
      })
      return;
    }

    wx.showToast({
      title: "发送频繁",
      image: '../../images/icon_error.png'
    })

  }, function (err) {
    wx.showToast({
      title: err,
    })
  })
}

/**
 * 倒计时
 */
function daojishi(that) {
  wx.showLoading({
    title: '发送中',
  })
  currentTime = maxTime;
  interval = setInterval(function () {
    if (currentTime > 0) {
      currentTime--
      that.setData({
        yanzhengma: "获取验证码(" + currentTime + "s)",
        time: currentTime,
        clickable: true
      })
    }
    if (currentTime <= 0) {
      currentTime = 0
      that.setData({
        yanzhengma: "获取验证码(60s)",
        clickable: false
      })
      clearInterval(interval)
    }
  }, 1000)
}








// wx.navigateToMiniProgram({
//   appId: 'wx6c653b3b961fb92a',
//   envVersion: "trial",
// })