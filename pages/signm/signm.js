var app = getApp();
var req = require('../../js/require.js');
var httpUtils = require('../../js/httpUtils.js');
var constantFields = require('../../js/constantFields.js');
var QQMapWX = require('../../js/qqmap-wx-jssdk');
var DATAS = require('../../data.js');
var page = 1;
var pageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    ystatus:null,
    canPay: true,
    money:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    app.globalData.activityCodebao = options.activityCode
    app.globalData.moneybao = options.money
    app.globalData.shopCodebao = options.shopCode
    that.setData({
      money: options.money
    })
    console.log(that.data.money)
    
  },
  ycf: function
    (e) {

    this.setData({

      ystatus: e.detail.value

    })
    console.log(this.data.ystatus)
  },
  uploadProduct: function (e) {
    var product = this.data.product;
    var that = this;
    if (!this.data.canPay) {
      wx.showToast({
        title: '请勿重复提交',
      })
      return;
    }
    this.setData({
      canPay: false
    })
    setTimeout(function () {
      that.setData({
        canPay: true
      })
    }, 1000)

    if (e.detail.value.name == "" || e.detail.value.phone == "") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请完善信息',
      });
      return;
    } else {


      var that = this;
      var url = constantFields.BAOFU;


      var params = {

      }
      var getStorage = httpUtils.httpPromise(wx.getStorage);
      var wxlogin = httpUtils.httpPromise(wx.login);
      wxlogin().then(function (res) {
        return httpUtils.postRequest(constantFields.GET_OPENID, {
          appId: constantFields.APP_ID,
          code: res.code
        });
      }).then(function (res) {
        console.log(res + "==============这是点击支付生成订单参数=====================")
        console.log(res.data.body.openId)
        console.log(constantFields.APP_ID + 'appid')
        console.log(e.detail.value.name + "这是name")
        console.log(e.detail.value.phone + "这是phone")
        console.log(e.detail.value.weix + "这是wechatNumber")
        console.log(e.detail.value.address + "address")
        console.log(e.detail.value.beizhu + "remarks")
        console.log(e.detail.value.weix + "这是wechatNumber")
        console.log(e.detail.value.age + "这是age")
        console.log(that.data.ystatus + "这是sex")
        console.log(app.globalData.activityCodebao + "这是activityCode")
        console.log(e.detail.value.mailbox + "这是mail")
        console.log(app.globalData.moneybao + "这是money")
        console.log(app.globalData.shopCodebao + "这是shopCodebao")
        console.log(app.globalData + "这是shopCodebao")
        console.log('app全局变量------------------')
        params.wechatImg = app.globalData.userInfo.avatarUrl
        params.openId = res.data.body.openId;
        params.appId = constantFields.APP_ID;
        // params.shopCode = app.globalData.shopCodebao;
        params.name = e.detail.value.name;
        params.phone = e.detail.value.phone
        params.wechatNumber = e.detail.value.weix
        params.address = e.detail.value.address
        params.remarks = e.detail.value.beizhu
        params.age = e.detail.value.age
        params.sex = that.data.ystatus
        params.activityCode = app.globalData.activityCodebao
        params.mail = e.detail.value.mailbox
        params.money = app.globalData.moneybao*100 
        return httpUtils.postRequest(url, params);
        console.log(params.channelCode)
        // console.log(params)
      }, function (err) {
        console.log(err)
        console.log(params)
        console.log(that)
      }).then(function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.head.errCode == '10001') {
          wx.showToast({
            // image: '../../images/defeated.png',
            title: res.data.body.errMsg
          })
        }
        var paymentParams = {
          'timeStamp': res.data.body.timeStamp,
          'nonceStr': res.data.body.nonceStr,
          'package': 'prepay_id=' + res.data.body.prepay_id,
          'signType': 'MD5',
          'paySign': res.data.body.paySign,
          'success': function (res) {

          },
          'fail': function (res) {

          }
        }
        console.log(res);
        app.globalData.zhifuid = res.data.body.sysShopActivityOrder2.id
        return httpUtils.httpPromise(wx.requestPayment)(paymentParams);
      }).then(function (res) {
        console.log(res)
        app.globalData.selectProducts = [];
        wx.showModal({
          title: '提示',
          content: '支付成功',
          showCancel: false,
          success: function (res) {
            console.log(res)
            // if (res.confirm) {
            //   wx.navigateBack({
            //     delta: delta
            //   })
            // }
            var url = constantFields.ZHIFUHOU;
            console.log(url)
            console.log(app);
            console.log(app.globalData)
            var put = {
              "id": app.globalData.zhifuid,
              "state":1
              // "mobile": "",
              // "originate": 'c'
            };
            httpUtils.postRequest(url, put).then(function (res) {
              console.log(url)
              console.log(res)
              console.log(res.data.body)
              that.setData({
              
              })
            })
            wx.navigateTo({
              url: '../mesign/mesign'
            })
          }
        })
      }, function (err) {
        console.log(err)
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '支付失败',
          success: function (res) {
            console.log(res)
            // if (res.confirm) {
            //   wx.navigateBack({
            //     delta: delta
            //   })
            // }
            var url = constantFields.ZHIFUHOU;
            console.log(url)
            console.log(app);
            console.log(app.globalData)
            var put = {
              "id": app.globalData.zhifuid,
              "state": 0
              // "mobile": "",
              // "originate": 'c'
            };
            console.log(put)
            httpUtils.postRequest(url, put).then(function (res) {
              console.log(url)
              console.log(res)
              console.log(res.data.body)
              that.setData({

              })
            })
            // wx.navigateTo({
            //   url: '../signdeail/signdeail'
            // })
          }
        })

      })


    // })
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

  }
})