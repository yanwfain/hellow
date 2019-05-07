Page({
  data: {
    navList: [{
        name: '城市合伙人',
        abstracts: '（5年收入提成，7倍收益兜底）',
        tishi: '重点如下',
        textArr: [{
            title: '1、一次投入，提成5年',
            text: '城市合伙人投入一次代理费，获得以下提成收入：\n(1)本城市所有商户线上交易流水提成，提成比例为0.6 %，提成持续6年。\n(2)城市合伙人获得其所招募广告收入65 % 的提成。'
          },
          {
            title: '2、7倍收益兜底',
            text: '城市合伙人在5年合同期内，上述2项提成总收入将达到其投资额的7倍以上，上不封顶。      （注：在合同期内，总收入如果达不到投资额的7倍，则合同自动顺延，城市合伙人每月继续获得提成收入，当总收入达到投资额的7倍时，合同自动结束。）'
          },
          {
            title: '3、城市合伙人获赠投资额30倍的美豆。',
            text: ''
          },
          {
            title: '4、城市合伙人的收益权可以随时转让。',
            text: ''
          },
          {
            title: '5、城市合伙人的投资是收益权，不是及及在身边的债务。',
            text: '每个城市仅有1-3名投资人，越早参与，赠送越多提成期，具体事宜请与平台联系。'
          },
        ],
        contacts: "联络人：business@shannian.vip"
      },
      {
        name: '城市运营经理',
        abstracts: '（提成奖励政策持续20年）',
        tishi: '',
        textArr: [{
          title: '城市运营经理的收入：',
          text: '1、所有使用运营经理的开店邀请码开店的商户，运营经理获得其线上交易流水 0.5% 的提成；\n2、城市运营经理获得其所招募广告收入50% 的提成；\n3、商家每得到一笔美豆，运营经理获得10% 的平台奖励。\n每个城市的运营经理人数配额为1-30名。'
        }, ],
        contacts: "联络人：business@shannian.vip"
      },
      {
        name: '渠道合作代理商',
        abstracts: '',
        tishi: '',
        textArr: [{
          title: '合作要点：',
          text: '1、与全国3万多家商场洽谈“商场促销”中心合作；\n2、与全国1万多家展会主办方洽谈“看展会”合作；\n3、与全国1万多个地方政府产业管理、服务部门，洽谈免费入驻“地方产业平台”合作；\n4、与全国1000多个行业协会、组织、联盟洽谈“及及行业”合作；\n5、上述合作产生的收入，渠道合作代理商提成50%。\n渠道合作代理商名额有限，欢迎机构及个人合作方。'
        }, ],
        contacts: "business@shannian.vip"
      },
      {
        name: '广告代理商',
        abstracts: '',
        tishi: '',
        textArr: [{
          title: '合作要点：',
          text: '1、销售及及在身边的1000万个BANNER轮播广告位；\n2、广告代理商可跨区域招募广告；\n3、广告代理商提成60%；\n4、广告代理商的合同期限可达3年。\n广告代理商可以是公司，也可以是个人兼职、专职。'
        }, ],
        contacts: "business@shannian.vip"
      },
    ],
    id:'0'
  },
// 选择
  goTxt(e){
    let that = this;
    that.setData({
      id: e.currentTarget.dataset.index,
      content: that.data.navList[Number(e.currentTarget.dataset.index)]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      content:this.data.navList[0]
    })
    console.log(this.data.content)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})