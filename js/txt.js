const paiXuList = [{
    "name": "综合排序",
    "status": false,
    "code": 0
  },
  {
    "name": "人气排序",
    "status": false,
    "code": 1
  },
  {
    "name": "距离最近",
    "status": true,
    "code": 2
  }
]
const classList = [{
    big: '全部',
    shopType: '',
    diminutive: '全部',
  },
  {
    city: '附近',
  },
  {
    sort: '距离排序',
  },
]
const Citys = [{
    city: '附近',
    scrollTab: false
  },
  {
    city: '全城',
    scrollTab: true
  }
]
const Sort = [{
    sort: '距离排序',
    scrollTab: false
  },
  {
    sort: '综合排序',
    scrollTab: true
  },
  {
    sort: '人气排序',
    scrollTab: true
  }
]
const label = [
  {
    title: "生活服务",
    img: "",
    arr: [
      { lab: "洗衣" },
      { lab: "送水站" },
      { lab: "搬家" },
      { lab: "家电维修" },
      { lab: "摄影" },
      { lab: "家政" },
      { lab: "打印社" },
      { lab: "宠物店" },
      { lab: "宠物医院" },
      { lab: "物流" },
    ]
  },
  {
    title: "美食",
    img: "",
    arr: [
      { lab: "东北菜" },
      { lab: "麻辣烫" },
      { lab: "水饺" },
      { lab: "炸鸡汉堡" },
      { lab: "奶茶" },
      { lab: "黄焖鸡" },
      { lab: "米线" },
      { lab: "拉面" },
      { lab: "麻辣香锅" },
      { lab: "烧烤" },
      { lab: "烤鱼" },
      { lab: "火锅" },
      { lab: "粥店" },
      { lab: "馄饨" },
      { lab: "海鲜" },
      { lab: "西餐" },
      { lab: "咖啡馆" },
      { lab: "日本料理" },
      { lab: "鸭脖" },
      { lab: "烤鸭" },
      { lab: "农家乐" },
      { lab: "清真" },
    ]
  },
  {
    title: "商超/零售",
    img: "",
    arr: [
      { lab: "超市" },
      { lab: "果蔬" },
      { lab: "蛋糕" },
      { lab: "花店" },
      { lab: "鲜肉" },
      { lab: "手机店" },
      { lab: "服装店" },
      { lab: "珠宝" },
      { lab: "电动车" },
      { lab: "眼镜店" },
      { lab: "化妆品" },
    ]
  },
  {
    title: "民宿酒店",
    img: "",
    arr: [
      { lab: "酒店" },
    ]
  },
  {
    title: "丽人",
    img: "",
    arr: [
      { lab: "美发" },
      { lab: "美甲" },
      { lab: "美容" },
      { lab: "化妆品" },
      { lab: "减肥" },
      { lab: "纹身" },
    ]
  },
  {
    title: "房产",
    img: "",
    arr: [
      { lab: "房产中介" },
    ]
  },
  {
    title: "休闲娱乐",
    img: "",
    arr: [
      { lab: "KTV" },
      { lab: "按摩" },
      { lab: "咖啡" },
      { lab: "茶馆" },
      { lab: "酒吧" },
      { lab: "台球" },
      { lab: "网吧" },
      { lab: "游乐园" },
      { lab: "足疗" },
    ]
  },
  {
    title: "运动健身",
    img: "",
    arr: [
      { lab: "健身房" },
      { lab: "瑜伽" },
      { lab: "游泳馆" },
    ]
  },
  {
    title: "汽车服务",
    img: "",
    arr: [
      { lab: "加油站" },
      { lab: "充电桩" },
      { lab: "汽车销售" },
      { lab: "汽车美容" },
      { lab: "洗车" },
      { lab: "修车" },
    ]
  },
  {
    title: "家装建材",
    img: "",
    arr: [
      { lab: "灯饰照明" },
      { lab: "建材" },
      { lab: "橱柜" },
      { lab: "装修" },
      { lab: "家居家纺" },
      { lab: "门窗" },
      { lab: "家具" },
    ]
  },
  {
    title: "大健康",
    img: "",
    arr: [
      { lab: "药店" },
      { lab: "健康服务" },
      { lab: "口腔医院" },
      { lab: "社区医院" },
      { lab: "养老" },
      { lab: "按摩" },
      { lab: "足疗" },
    ]
  },
  {
    title: "母婴/亲子",
    img: "",
    arr: [
      { lab: "早教" },
      { lab: "幼儿园" },
      { lab: "游乐园" },
      { lab: "亲子" },
    ]
  },
  {
    title: "培训/教育",
    img: "",
    arr: [
      { lab: "美术培训" },
      { lab: "音乐培训" },
      { lab: "舞蹈" },
      { lab: "早教" },
      { lab: "培训" },
      { lab: "驾校" },
    ]
  },
  {
    title: "旅游",
    img: "",
    arr: [
      { lab: "旅行社" },
      { lab: "酒店/民宿" },
    ]
  },
]








module.exports = {
  paiXuList: paiXuList,
  classList: classList,
  Citys: Citys,
  Sort: Sort,
}