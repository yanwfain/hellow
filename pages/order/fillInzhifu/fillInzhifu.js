var app = getApp();
var constantFields = require('../../../js/constantFields.js');
var httpUtils = require('../../../js/httpUtils.js');

var delta = 2;//要返回的页面数量；从购物车以及商品详情页进入到这里的是2，如果是‘再来一单’进入这里值是1；所以需要页面传进来要返回的页数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place:{},
    tip:0,
    payFor:"0.00",
    selectProducts:[],
    remark:'',
    canPay:true,
    downprice:0,
    telphone:null,
    divideChannel:null,
    divideInto:null,
    channelCode:null,
    channelMoney:null
  },
  goToAddress:function(e){
    wx.navigateTo({
      url: '../../mine/address/address',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    console.log(app.globalData.selectProducts);
    console.log(app.globalData.selectProducts[0].outPrice);
    console.log(app.globalData.userInfo.nickName);
    console.log(app.globalData.userInfo.nickName)
    console.log(options,"options88888888888888888");
    console.log(app.globalData.expertList.name);
    var that = this;
    delta = options.delta == undefined ? 2 : options.delta;
    that.setData({
      divideChannel: app.globalData.expertList.divideChannel,
      divideInto: app.globalData.expertList.divideInto
    })
    console.log(that.data.divideChannel)
    console.log(that.data.divideInto)
    //获取默认地址
    // var url = constantFields.GET_DELIVE_ADDRESS;
    // that.setData({
    //   tip: app.globalData.shopInfoFn.sysShopBussinessInfo.deliveryFee == null ? 0 : parseInt(app.globalData.shopInfoFn.sysShopBussinessInfo.deliveryFee)
    // })
    // var params = {};
    //   params.customerCode = app.globalData.shopInfoFn.customerCode;
    //   params.isDefault = 1;
    //   params.lat = app.globalData.shopInfoFn.lat;
    //   params.lng = app.globalData.shopInfoFn.lng;
    //   params.distributionRange = app.globalData.shopInfoFn.sysShopBussinessInfo.distributionRange;
    //   httpUtils.postRequest(url,params)
    // .then(function(res){
    //   that.setData({
    //     place:res.data.body[0],
    //     isInDelive: res.data.body[0].inDelive
    //   })
    // })

    //从首页购物车按钮进入
    if(options.productStr==undefined){
      var selectProducts = app.globalData.selectProducts;
      var total = 0
      for (var i = 0; i < selectProducts.length; i++) {
        total = total + selectProducts[i].salePrice * selectProducts[i].count;
      }
      this.setData({
        payFor: total,
        selectProducts: selectProducts
      })
    }
    //从商品详情页，点击立即购买进入
    else{
      var isAagin = options.isagain;
      var downprice = options.downprice;
      //如果传过来的有随机立减的值，就使用原来的，没有的话就重新随机
      if(downprice ==""|| downprice == null){
        this.setData({
          hasdown:false
        })
      }else{
        this.setData({
          hasdown: true
        })
      }
      if (isNaN(downprice)){
        this.setData({
          hasdown: false
        })
      }else{
        this.setData({
          hasdown: true,
          downprice:downprice
        })
      }

      var product = JSON.parse(options.productStr)
      var selectProducts=[];
      selectProducts = selectProducts.concat(product);
      var total = 0;
      if (isAagin == 'true'){
        for (var i = 0; i < selectProducts.length; i++) {
          selectProducts[i].count = selectProducts[i].buyCount;
          selectProducts[i].code = selectProducts[i].productCode;
          selectProducts[i].name = selectProducts[i].productName;
          total = total + selectProducts[i].salePrice * selectProducts[i].buyCount;
        }
      }else{
        for (var i = 0; i < selectProducts.length; i++) {
          total = total + selectProducts[i].salePrice * selectProducts[i].count;
        }
      }
      this.setData({
        payFor: total,
        selectProducts: selectProducts
      })
    }  

    if (!this.data.hasdown && (this.data.payFor + parseInt(this.data.tip))>=1000){
      //随机立减的百分比
      console.log(app.globalData.shopInfoFn)
      var random = parseInt(Math.random() * 10);

      var randomdown = random + parseInt(app.globalData.shopInfoFn.sysShopActivityInfo.preferentialRateLow);
      console.log(randomdown);
      //随机立减金额
      var downprice = ((this.data.payFor + parseInt(this.data.tip)) * 5 / 100) * randomdown / 100;
      downprice = parseInt(downprice);
      console.log(downprice);
      this.setData({
        downprice: downprice,
      })    
    }

  },
  remarkInput:function(e){
    console.log(e.detail.value)
    this.setData({
      remark: e.detail.value
    })
  },
  getPhone: function (e) {
    var val = e.detail.value;
    console.log(val)
    this.setData({
      telphone: val
    });
  },
  // 去支付
  pay:function(e){
    var that = this;
    if(!this.data.canPay){
        wx.showToast({
          title: '请勿重复提交',
        })
        return;
    }
    this.setData({
      canPay:false
    })
    setTimeout(function(){
      that.setData({
        canPay:true
      })
    },1000)
    if (this.data.place == undefined || this.data.place.code == undefined || this.data.place.code ==''){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请选择配送地址',
      });
      return;
    }else{
      console.log(app.globalData,"111111111111111");

      // console.log(app.globalData.selectProducts.productPrice)
      console.log(app.globalData.shopInfoFn.customerCode + '用户地址code')
      console.log(app.globalData.expertList.shopCode+'商品详情code')
      console.log(app.globalData.expertList.productPrice +'购买价格')
      // if (this.data.isInDelive) {
        // if (app.globalData.shopInfoFn.code == undefined) {
        //   wx.showToast({
        //     title: '店铺信息或者顾客信息有误',
        //   })
        //   return;
        // }
        var that = this;
        var url = constantFields.PAY_FOR_PRODUCT;
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
          console.log(res +"==============这是点击支付生成订单参数=====================") 
          console.log(res.data.body.openId) 
          console.log(app.globalData.shopInfoFn.customerCode + '用户地址code')
          console.log(app.globalData.expertList.shopCode + '商品详情code')
          console.log(app.globalData.selectProducts[0].outPrice + '购买价格')
          console.log(app.globalData.selectProducts[0].cover + '商品图片')
          console.log(app.globalData.selectProducts[0].count + '商品数量')
          console.log(app.globalData.selectProducts[0].specifications + '商品规格')
          console.log(app.globalData.expertList.name + '商品名字')
          console.log(constantFields.APP_ID + 'appid')
          console.log(that.data.telphone)
          console.log(that.data.divideChannel)
          console.log(that.data.divideInto)
          console.log(app.globalData.selectProducts[0].outPrice * app.globalData.selectProducts[0].count + '商品总价')
          // console.log(app.globalData.expertList.selectProducts)
          console.log('app全局变量------------------')
          if (that.data.telphone== ""){
            that.setData({
              telphone : null
            })
            console.log(that.data.telphone)
            params.channelCode = that.data.telphone;
          }
          if (that.data.divideChannel == "") {
            that.setData({
              divideChannel: null
            })
            params.divideChannel = that.data.divideChannel;
            console.log(that.data.divideChannel)
           
          }
          if (that.data.divideInto == "") {
            that.setData({
              divideInto: null
            })
            params.divideInto = that.data.divideInto;
            console.log(that.data.divideInto)
          }
         
          params.openId = res.data.body.openId;
          params.divideChannel = that.data.divideChannel;
          params.divideInto = that.data.divideInto;
          params.channelCode = that.data.telphone;
          params.specifications = app.globalData.selectProducts[0].specifications
          params.customerCode = app.globalData.shopInfoFn.customerCode;//  地址
          params.shopCode = app.globalData.expertList.shopCode; // 商品详情shopcode
          params.appId = constantFields.APP_ID;
          // params.deliveryFee = app.globalData.shopInfoFn.sysShopBussinessInfo.deliveryFee;
          // console.log(params)
          // if (that.data.tip != null) {
          //   params.salePrice = that.data.payFor + that.data.tip - that.data.downprice;
          // } else {
          //   params.salePrice = that.data.payFor - that.data.downprice;
          // }
          // params.originPrice = that.data.payFor + that.data.tip;
          params.salePrice = app.globalData.selectProducts[0].outPrice*app.globalData.selectProducts[0].count;
          params.cover = app.globalData.selectProducts[0].cover;
          params.count = app.globalData.selectProducts[0].count;
          params.shopName = app.globalData.expertList.name;
          // params.preferentialFee = that.data.downprice; //  获取随机立减
          // params.deliveCode = that.data.place.code; //  获取默认 地址
          params.items = app.globalData.expertList.selectProducts;//  获取上个页面的信息
          params.buyMark = that.data.remark;// 评论
          params.id = 1;
          params.status = 1;

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
          that.setData({
            channelCode: res.data.body.retailOrderInfo.channelCode,
            channelMoney: res.data.body.retailOrderInfo.channelMoney
          })
          if (res.data.head.errCode == '10001'){
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
              // var that = this;
              var url = constantFields.ZHIFUGOD;
              console.log(url)
              console.log(app);
              console.log(app.globalData)
              var put = {
                "channelCode": that.data.channelCode,
                "channelMoney": that.data.channelMoney,
              };
              console.log(put)
              httpUtils.postRequest(url, put).then(function (res) {
                wx.hideLoading();
                console.log(url)
                console.log(res)
                console.log(res.data.body)
                if (res.data.body.sysShopActivities == "") {
                  wx.showToast({
                    title: '暂无数据',
                  })
                }
                that.setData({
                  dateil: res.data.body.sysShopActivities,
                  dateils: res.data.body,
                })
                console.log(dateil)
              })





              // if (res.confirm) {
              //   wx.navigateBack({
              //     delta: delta
              //   })
              // }
            }
          })

        


        }, function (err) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '支付失败',
            success: function (res) {
              // if (res.confirm) {
              //   wx.navigateBack({
              //     delta: delta
              //   })
              // }
            }
          })

        })
      // } else {
      //   wx.showToast({
      //     title: '所选地址不在配送范围内',
      //   })
      // }
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