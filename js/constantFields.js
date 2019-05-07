// 线上环境
const BASE_URL = "https://www.shanxingniao.com/publicPlatform/";
// const BASE_URL = "https://www.shanniao.vip/publicPlatform/";
// // 测试环境 
// const BASE_URL = "http://www.kindnessbird.com/publicPlatform/";
// 本地环境\
// const BASE_URL = "http://192.168.3.11/publicPlatform/";     
const APP_ID = "wx1d10004701ac74a1"//appId
const GET_OPENID = BASE_URL + "/customer/user/openId/get.khtml";//获取openid
const PEIXUN = BASE_URL + "/sys/activity/selectActivityList.khtml";//培训查询
const PEIDEiL = BASE_URL + "/sys/activity/selectActivity.khtml";//培训查询
const BAOFU = BASE_URL + "/sys/activity/order/add.khtml";//培训查询
const ZHIFUHOU = BASE_URL + "/sys/activity/verify.khtml";//培训支付后  
const XIAOMA = BASE_URL + "/sys/activity/viewQRActivityuUnlimit.khtml";//培训支付后  二维码
const BAOMINGNUM = BASE_URL + "/sys/activity/selectActivityOrderList.khtml";//添加报名人数

const CANYU = BASE_URL + "/sys/activity/selectActivityOrder.khtml";//参与详情
const REGIST_LOGIN = BASE_URL + "/customer/user/register/login.khtml";//注册登录界面
const SHOP_INFO_BY_OPENID = BASE_URL + "/sys/shop/shopBussiness/selectByShopCode.khtml";//通过openID获取店铺信息
const BIND_SHOP_OPENID = BASE_URL + "/customer/user/shopCodeAndOpenId/bind.khtml";//绑定店铺
const PRODUCT_TYPE = BASE_URL + "/retail/productInfo/typeName/get.khtml";//查询商品类型
const GET_PRODUCT_BY_TYPE = BASE_URL + "/retail/productInfo/productName/get.khtml";//根据商品类型获取商品列表
const ADD_ADDRESS = BASE_URL + "/customer/delive/userAddress/add_1.khtml";//添加配送地址
const GET_DELIVE_ADDRESS = BASE_URL + "/customer/delive/deliveList/get_1.khtml";//获取配送地址
const UPDATE_ADDRESS = BASE_URL +"/customer/delive/userAddress/update.khtml";//编辑地址
const QUERRY_ORDER_LIST = BASE_URL + "/retail/orderInfo/orderList/get.khtml";//订单总表查询
const PAY_FOR_PRODUCT = BASE_URL + "/retail/productInfo/retailOrder/add.khtml";//订单生成
const PRODUCT_DETAIL = BASE_URL +"/retail/productInfo/productDetails/get.khtml";//产品详情
const ORDER_DETAIL = BASE_URL +"/retail/orderInfo/items/get.khtml";//订单详情
const SHOP_STATUS = BASE_URL + "/sys/shop/shopInfo/select.khtml";//查询是否存在店铺
const SHOP_LIST_BY_OPENID = BASE_URL + "/customer/user/shopListByOpenId/get.khtml";//查询顾客进入过的店铺列表
const ZHIFUGOD = BASE_URL + "/retail/productInfo/activityProductactivityProductCodeSpecificationsQD/getId.khtml";//支付完成的接口
const OFFLINE_PAY = BASE_URL +"/retail/orderInfo/offlineOrder/add.khtml";//线下支付
// 18/5/25 1.2
const PLATFORMINFO = BASE_URL + "/platform/shopTypeInfo/get.khtml"//获取平台配置信息
const SNINDEXGG = BASE_URL + "/advert/message/get.khtml";//获取首页广告
const BUYSHOP = BASE_URL + "/sys/shop/shopInfoForPayed/get.khtml";//买过的店
const NEARBY = BASE_URL + "/sys/shop/shopInfoNearby/getSearchKeyOne.khtml";//搜索附近的店
const NEARBYS = BASE_URL + "/sys/shop/shopInfoNearby/get_1.khtml";//附近的店
const NEARBYST = BASE_URL + "/sys/shop/shopInfoNearby/getCityAll.khtml";//全国农场
const GETLOCATION = BASE_URL + "/platform/addressByLatLng/get.khtml"//获取地理位置
const DUIHUAN = BASE_URL + "/sys/coupon/selectAll.khtml"//积分商城
const DUIDEILT = BASE_URL + "/sys/coupon/selectById.khtml"//积分商城详情
const DUIHUANY = BASE_URL + "/sys/coupon/exchange.khtml"//兑换 接口
const DUIHUANJI = BASE_URL + "/sys/coupon/exchangeRecords.khtml"//兑换记录
const DUIHUANJIXQ = BASE_URL + "/sys/coupon/exchangeRecordsById.khtml"//兑换记录详情
const NONGCHAN = BASE_URL + "/retail/productInfo/activityProductactivityProductList/get.khtml"//农产商品
const NONGCHANDE = BASE_URL + "/retail/productInfo/activityProductactivityProduct/getId.khtml"//农产商品详情
const IMGTEXT = BASE_URL + "/retail/productInfo/activityProductactivityProductImg/getId.khtml"//农产商品详情图文
const GuiGE = BASE_URL + "/retail/productInfo/activityProductactivityProductCode/getId.khtml"//农产商品详情规格
const SHAIXUAN = BASE_URL + "/retail/productInfo/activityProductactivityProductListdianm/get.khtml"//农产商品筛选
const JIAGOU = BASE_URL + "/retail/productInfo/activityProductactivityProductCodeSpecifications/getId.khtml"//加购
const ZhiFu = BASE_URL + "/retail/productInfo/generate/add.khtml"//加购

// 18/6/16 1.3
const ONPENSHOP = BASE_URL + "/sys/shop/shopRegister/add.khtml"//我要开店
const GET_SMSCODE = BASE_URL + "/customer/user/verificationCode/send.khtml";//获取短信验证码
const GETACTIVITYLISTT = BASE_URL + "/customer/retailActivity/applet/getAllCusActivityOld.khtml"//获取促销活动列表1
const GETAnearby = BASE_URL + "/advert/message/bannerListByNer.khtml"//获取分类促销活动列表1
const GETACTIVITYLIST = BASE_URL + "/advert/message/bannerListt.khtml";
// 18/6/25 1.4
const SHARENUMBER = BASE_URL + "/sys/share/countShareRecord.khtml";//统计分享产品的被点击次数
const SHAREACTIVENUMBER = BASE_URL + "/sys/share/getShopActivityHits.khtml";//统计分享活动的被点击的次数
const GETACTIVEINFO = BASE_URL + "/customer/retailActivity/applet/getCRADetails.khtml";//获取活动详情
// 18/7-8/ 1.5
const FINEDDDSHOPLIST = BASE_URL + "/customer/retailActivity/applet/getAllList.khtml";//查询当前店铺活动列表
const GOODSTORE = BASE_URL + "/sys/shop/qualityShop.khtml";//优质的店
const LIFEWISDOM = BASE_URL + "/sys/article/AriticleList.khtml";//生活智慧
const GETTABLIST = BASE_URL + "/sys/platfrom/cate/applet/list.khtml"//获取tab列表
const ADDSHOUCANG = BASE_URL + "/sys/enshrine/add.khtml"//添加收藏
const QUTESHOUCANG = BASE_URL + "/sys/enshrine/update.khtml"//取消收藏
const FINDSHOUCANGLIST = BASE_URL + "/sys/enshrine/list.khtml"//查询收藏
const QUXIAOPAY = BASE_URL + "/retail/orderInfo/cancel.khtml"//取消支付
const GOPAY = BASE_URL + "/retail/orderInfo/prepayment.khtml"//付款
const ZONGHEPATXU = BASE_URL + "/customer/retailActivity/applet/getActivitySynthesis.khtml"//综合排序
const RENQIPATXU = BASE_URL + "/customer/retailActivity/applet/getActivityHits.khtml"//人气排序
const JULIZUIJIN = BASE_URL + "/customer/retailActivity/applet/getAllCusActivity.khtml"//距离最近排序
const MYPUT = BASE_URL + "/sys/shop/getMyInvCodeAndAdvCold.khtml"//获取我的邀请码以及我的广告投放金
const TOTAL = BASE_URL + "/sys/advertisingGold/getMyadvGold.khtml"//获取累计额度
const DETAIL = BASE_URL + "/sys/advertisingGold/getMymete.khtml"//明细
const INVITESHOP = BASE_URL + '/sys/advertisingGold/getMyInvShop.khtml' //使用我的邀请码开店
const JiFENSHOP = BASE_URL +'/sys/advertisingGold/getDetails.khtml' //积分列表详情

const ACCOUNRS = BASE_URL + "/sys/advertisingGold/userMyAdvGold.khtml"//转账广告金
const ACCOUNRSDETAIL = BASE_URL + "/sys/advertisingGold/to_user.khtml"//转账广告金明细
const LABEL = BASE_URL + "/platform/getSysShopType.khtml"//搜索页标签
const SUBCLASS = BASE_URL + "/platform/getSysShopTypeByTobyCode.khtml"//搜索页标签
const getSignIn = BASE_URL + "/customer/sign/customer/sign/list.khtml"//获取签到
const clickSignIn = BASE_URL + "/customer/sign/customer/sign/add.khtml"//签到
const SearchBanner = BASE_URL + "/advert/message/SearchBanner.khtml"// 关键字搜索banner
const getAA = BASE_URL + '/sys/advertisingGold/getMyToUserMaxId.khtml'	//最后一次转账记录
const getInvestment = BASE_URL + '/shop/ShopInvestmentCooperation/getList.khtml'//招商&介绍详情
const report = BASE_URL + '/sys/ReportInformation/add.khtml'//举报
const getProvince = BASE_URL + '/api/area/list/pro.khtml'//省数据
const getCity = BASE_URL + '/api/area/list/city.khtml'//市数据
const getCounty = BASE_URL + '/api/area/list/county.khtml'//县数据
const getPlace = BASE_URL + '/api/localIndustry/list.khtml'//地方数据
const getCitys = BASE_URL + '/api/area/list/countyAll.khtml'//全部城市数据

const getShopMarketBanner = BASE_URL + '/advert/message/marketBannerHome.khtml'	//商场banner
const getShopList = BASE_URL + '/sys/shop/getMarketList.khtml'	//商场列表
const getMakerAdvList = BASE_URL + '/customer/retailActivity/getMakerAdvList.khtml'	//商场促销列表
const getMakerDetail = BASE_URL + '/sys/shop/getMarketByCode.khtml'	//商场数据
const getMakerClass = BASE_URL + '/api/subStore/list/subStoreTypeList.khtml'	//
const getMakerIndexBanner = BASE_URL + '/advert/message/marketInfoBannerHome.khtml'	//商场轮播数据
const getMakerIndexAdvList = BASE_URL + '/customer/retailActivity/getMakerAdvListByShopCodeP.khtml'	//商场促销列表
const getActivityIndexGold = BASE_URL + '/customer/retailActivity/getMakerAdvListByAdvByGold.khtml'	//商场促销列表按照广告投放金排序
const getActivityIndexDate = BASE_URL + '/customer/retailActivity/selectByShopCodePSAdvOrderId.khtml '	//商场促销列表按照时间排序
const getActivityIndexTel = BASE_URL + '/customer/retailActivity/selectRecommend.khtml'	//商场促销列表按照推荐排序

// 换点平台---------
// const hdSetToken = BASE_URL + '/api/changePoint/binfChangePointPlatForm.khtml'	//商场促销列表按照推荐排序

// 换点平台---------
const hdSetToken = BASE_URL + '/api/changePoint/binfChangePointPlatForm.khtml'	//商场促销列表按照推荐排序
const CHAXUN = BASE_URL + '/sys/channel/binfChangePointPlatForms.khtml'	//查询换点用户

// ``````````````````````旅游小程序接口``````````````````````
const travelAround = BASE_URL + "/platform/getSysShopTypeJiJi.khtml"//旅游周边
const travelAgency = BASE_URL + "/platform/getSysShopTypeTravelAgency.khtml"//旅行社
const channel = BASE_URL + "/advert/message/JiJiTrodeBannerList.khtml"//行业入口banner
const channelList = BASE_URL + "/tourismPlatform/api/tourismPlatfor.khtml"//行业入口banner
const scenicWeb = BASE_URL + "/scenicSpot/api/scenicSpotList.khtml"//景区官网
const scenicWebshop = BASE_URL + "/scenicSpot/api/selectShopById.khtml"//商品列表跳转官网
const getBanner = BASE_URL + "/advert/message/bannerListByNer.khtml"//行业banner
const getShop = BASE_URL + "/sys/shop/shopInfoNearby/get_1.khtml";//附近的店
const getOfficialDetail = BASE_URL + "/scenicSpot/api/scenicSpotNyCode.khtml";//景区详情
const getScenicDetail = BASE_URL + "/tourist/api/getTouristByCode.khtml";//景点详情
const getScenicDetailIndex = BASE_URL + "/tourist/api/getTouristByPlatformCode.khtml";//景点详情首页
const getScenic = BASE_URL + "/tourist/api/getTouristList.khtml";//景点
const getScenicIndex = BASE_URL + "/tourist/selectAllIdType.khtml";//景点
const getCircumShop = BASE_URL + "/tourismPlatformImg/api/tourismPlatformImgList.khtml";//景点详情店列表
const travelSearch = BASE_URL + "/touristTyp/api/gettouristTypList.khtml";//景点列表
const travelHomeNav = BASE_URL + "/touristTyp/api/gettouristTypByCode.khtml";//首页水游记导航详情
const travelHomeBanner = BASE_URL + "/advert/message/waterConservancyScenicArea.khtml";//首页banner
const travelOfficialBanner = BASE_URL + "/advert/message/jijiofficialnetwork.khtml"//官网banner
const getActivityDetailTxtBanner = BASE_URL + "/advert/message/getTitle.khtml"//文字banner
const getLocalIndustryBanne = BASE_URL + "/api/localIndustry/banner/list.khtml"//地方产业轮播图


module.exports={
  APP_ID: APP_ID,
  REGIST_LOGIN:REGIST_LOGIN,
  GET_OPENID: GET_OPENID,
  SHOP_INFO_BY_OPENID: SHOP_INFO_BY_OPENID,
  BIND_SHOP_OPENID: BIND_SHOP_OPENID,
  PRODUCT_TYPE: PRODUCT_TYPE,
  GET_PRODUCT_BY_TYPE: GET_PRODUCT_BY_TYPE,
  ADD_ADDRESS: ADD_ADDRESS,
  GET_DELIVE_ADDRESS: GET_DELIVE_ADDRESS,
  QUERRY_ORDER_LIST: QUERRY_ORDER_LIST,
  PAY_FOR_PRODUCT: PAY_FOR_PRODUCT,
  PRODUCT_DETAIL: PRODUCT_DETAIL,
  ORDER_DETAIL:ORDER_DETAIL,
  UPDATE_ADDRESS:UPDATE_ADDRESS,
  SHOP_STATUS: SHOP_STATUS,
  SHOP_LIST_BY_OPENID: SHOP_LIST_BY_OPENID,
  OFFLINE_PAY: OFFLINE_PAY,
  PLATFORMINFO: PLATFORMINFO,
  SNINDEXGG: SNINDEXGG,
  BUYSHOP: BUYSHOP,
  NEARBY: NEARBY,
  GETLOCATION,
  ONPENSHOP: ONPENSHOP,
  GET_SMSCODE: GET_SMSCODE,
  GETACTIVITYLIST: GETACTIVITYLIST,
  SHARENUMBER: SHARENUMBER,
  SHAREACTIVENUMBER: SHAREACTIVENUMBER,
  GETACTIVEINFO: GETACTIVEINFO,
  GOODSTORE: GOODSTORE,
  LIFEWISDOM: LIFEWISDOM,
  GETTABLIST: GETTABLIST,
  ADDSHOUCANG: ADDSHOUCANG,
  QUTESHOUCANG: QUTESHOUCANG,
  FINDSHOUCANGLIST:FINDSHOUCANGLIST,
  QUXIAOPAY: QUXIAOPAY,
  GOPAY: GOPAY,
  ZONGHEPATXU: ZONGHEPATXU,
  RENQIPATXU: RENQIPATXU,
  JULIZUIJIN: JULIZUIJIN,
  FINEDDDSHOPLIST: FINEDDDSHOPLIST,
  GETACTIVITYLISTT: GETACTIVITYLISTT,
  MYPUT: MYPUT,
  TOTAL:TOTAL,
  DETAIL: DETAIL,
  GETAnearby: GETAnearby,
  INVITESHOP: INVITESHOP,
  JiFENSHOP: JiFENSHOP,
  ACCOUNRS: ACCOUNRS,
  ACCOUNRSDETAIL: ACCOUNRSDETAIL,
  LABEL: LABEL,
  NEARBYS: NEARBYS,
  SUBCLASS: SUBCLASS,
  PEIXUN: PEIXUN,
  PEIDEiL: PEIDEiL,
  ZHIFUHOU: ZHIFUHOU,
  BAOFU: BAOFU,
  CANYU: CANYU,
  BAOMINGNUM: BAOMINGNUM,
  ZHIFUGOD: ZHIFUGOD,
  CHAXUN: CHAXUN,
  getSignIn: getSignIn,
  clickSignIn: clickSignIn,
  SearchBanner: SearchBanner,
  DUIHUAN: DUIHUAN,
  DUIDEILT: DUIDEILT,
  DUIHUANY:DUIHUANY,
  DUIHUANJI: DUIHUANJI,
  DUIHUANJIXQ: DUIHUANJIXQ,
  NONGCHAN: NONGCHAN,
  NONGCHANDE: NONGCHANDE,
  IMGTEXT: IMGTEXT,
  GuiGE: GuiGE,
  SHAIXUAN: SHAIXUAN,
  JIAGOU: JIAGOU,
  ZhiFu: ZhiFu,
  XIAOMA: XIAOMA,
  getScenicDetailIndex: getScenicDetailIndex,
  getScenicIndex: getScenicIndex,
  getAA: getAA,
  getInvestment:getInvestment,
  report: report,
  getProvince:getProvince,
  getCity:getCity,
  getPlace:getPlace,
  getCounty:getCounty,
  getCitys:getCitys,
  getShopMarketBanner:getShopMarketBanner,
  getShopList: getShopList,
  getMakerAdvList: getMakerAdvList,
  getMakerDetail: getMakerDetail,
  getMakerIndexBanner: getMakerIndexBanner,
  getMakerClass: getMakerClass,
  getMakerIndexAdvList: getMakerIndexAdvList ,
  getActivityIndexGold:getActivityIndexGold ,
  getActivityIndexTel: getActivityIndexTel,
  getActivityIndexDate:getActivityIndexDate,
  getActivityDetailTxtBanner: getActivityDetailTxtBanner,
  // 旅游小程序接口
  travelAround:travelAround,
  travelAgency: travelAgency,
  channel: channel,
  channelList: channelList,
  scenicWeb: scenicWeb,
  scenicWebshop: scenicWebshop,
  getBanner:getBanner,
  getShop: getShop,
  getScenic: getScenic,
  getCircumShop: getCircumShop,
  getScenicDetail: getScenicDetail,
  travelSearch: travelSearch,
  getOfficialDetail: getOfficialDetail,
  travelHomeNav: travelHomeNav,
  travelHomeBanner: travelHomeBanner,
  travelOfficialBanner: travelOfficialBanner,
  //换点平台
  hdSetToken:hdSetToken,
  getLocalIndustryBanne:getLocalIndustryBanne,
  NEARBYST: NEARBYST
}