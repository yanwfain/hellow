var app = getApp();
var constantFields = require('./constantFields.js');
var httpUtils = require('./httpUtils.js');
// ``````````````````````````请求类````````````````````````````````````
// 小分类请求
const tabListSingle = function(shopType) {
  let url = constantFields.SUBCLASS;
  let data = {
    'shopType': shopType
  }
  return httpUtils.postRequest(url, data);
};
// 默认距离
const getshortDistance = function(that, page, pageSize) {
  wx.showLoading({
    title: '玩命加载中',
  })
  let url = constantFields.JULIZUIJIN;
  wx.getLocation({
    success: function(res) {
      let city, lat,lng;
      if (that.data.classList[1].city == "附近") {
        city = ""
      } else {
        city = app.globalData.city
      }
      if (that.data.obj ) {
        lat = that.data.obj.lat;
        lng = that.data.obj.lng
      } else {
        lat = app.globalData.latitude;
        lng = app.globalData.longitude;
      }
      let data = {
        "shopType": that.data.classList[0].shopType,
        "searchKey": that.data.classList[0].diminutive,
        "city": city,
        "lat": lat,
        "lng": lng,
        "pageNo": page,
        "pageSize": pageSize
      }
      console.log(pageSize)
      httpUtils.postRequest(url, data).then(function(res) {
        console.log(res.data.body)
        let resD = res.data.body;
        if (res.data.head.errCode != 10000) {
          wx.hideLoading();
          wx.showToast({
            image: '../../images/defeated.png',
            title: '出错了',
          })
          return;
        } else {
          wx.hideLoading();
          if (resD.length != 0) {
            return that.setData({
              shopItemInfo: resD,
              listStatus: false,
            })

          }
          // 展示生活智慧数据
          article(that);
          return that.setData({
            listStatus: true
          })
        }
      })
    },
  })
}
// 综合排序
const getSynthetical = function(that, page, pageSize) {
  wx.showLoading({
    title: '玩命加载中',
  })
  let url = constantFields.ZONGHEPATXU;
  let city,lat,lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if(that.data.obj ){
    lat = that.data.obj.lat;
    lng = that.data.obj.lng
  }else{
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  let data = {
    "shopType": that.data.classList[0].shopType,
    "searchKey": that.data.classList[0].diminutive,
    "city": city,
    "lat": lat,
    "lng": lng,
    "pageNo": page,
    "pageSize": pageSize
  }
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res.data.body);
    let resD = res.data.body;
    if (res.data.head.errCode != 10000) {
      wx.hideLoading();
      wx.showToast({
        image: '../../images/defeated.png',
        title: '出错了',
      })
      return;
    } else {
      wx.hideLoading();
      if (resD.length != 0) {
        console.log('ok')
        return that.setData({
          shopItemInfo: resD,
          listStatus: false,
        })

      }
      // 展示生活智慧数据
      article(that);
      return that.setData({
        listStatus: true
      })
    }
  })
}
// 人气排序
const getPopularity = function(that, page, pageSize) {
  wx.showLoading({
    title: '玩命加载中',
  })
  let url = constantFields.RENQIPATXU;
  let city, lat, lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if (that.data.obj ) {
    lat = that.data.obj.lat;
    lng = that.data.obj.lng
  } else {
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  let data = {
    "shopType": that.data.classList[0].shopType,
    "searchKey": that.data.classList[0].diminutive,
    "city": city,
    "lat": lat,
    "lng": lng,
    "pageNo": page,
    "pageSize": pageSize
  }
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res.data.body);
    let resD = res.data.body;
    if (res.data.head.errCode != 10000) {
      wx.hideLoading();
      wx.showToast({
        image: '../../images/defeated.png',
        title: '出错了',
      })
      return;
    } else {
      wx.hideLoading();
      if (resD.length != 0) {
        wx.showToast({
          image: '../../images/defeated.png',
          title: '加载完成',
        })
        return that.setData({
          shopItemInfo: resD,
          listStatus: false,
        })
      }
      wx.showToast({
        image: '../../images/defeated.png',
        title: '没有更多',
      })
    }
  })
}
//加载生活智慧文章
const article = function(that) {
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: 1,
    pageSize: 10
  };
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res.data.body);
    var wisdomList = res.data.body;
    wx.hideLoading();
    if (wisdomList.length != 0) {
      wx.showToast({
        title: '加载完成',
      })
      console.log(wisdomList)
      return that.setData({
        getLifeWisdomList: wisdomList,
      })
    }
    wx.showToast({
      title: '没有更多',
    })
  })
}
// 上拉加载文章
const articles = function(that, page, pageSize) {
  console.log(page, "---当前page");
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.LIFEWISDOM;
  var data = {
    pageNo: page,
    pageSize: pageSize
  };
  httpUtils.postRequest(url, data).then(function(res) {
    console.log(res.data.body);
    if (res.data.body) {
      if (res.data.body == "" || res.data.body == undefined || res.data.body == null) {
        wx.showToast({
          title: '到底了',
          icon: 'success',
          duration: 2000
        })
        return;
      }
      // 回调函数  
      var moment_list = that.data.getLifeWisdomList;
      for (var i = 0; i < res.data.body.length; i++) {
        moment_list.push(res.data.body[i]);
      }
      // 设置数据  
      return that.setData({
        getLifeWisdomList: that.data.getLifeWisdomList,
      })
      wx.showToast({
        title: '加载完成',
      })
    }
  })
}
// 上拉加载促销
const pron = function(that, url, page, pageSize) {
  console.log("当前page:" + page);
  wx.showLoading({
    title: '玩命加载中',
  })
  let city, lat, lng;
  if (that.data.classList[1].city == "附近") {
    city = ""
  } else {
    city = app.globalData.city
  }
  if (that.data.obj ) {
    lat = that.data.obj.lat;
    lng = that.data.obj.lng
  } else {
    lat = app.globalData.latitude;
    lng = app.globalData.longitude;
  }
  let data = {
    "shopType": that.data.classList[0].shopType,
    "searchKey": that.data.classList[0].diminutive,
    "city": city,
    "lat": lat,
    "lng": lng,
    "pageNo": page,
    "pageSize": pageSize
  }
  httpUtils.postRequest(url, data).then(function(res) {
    let resD = res.data.body;
    if (res.data.head.errCode != 10000) {
      wx.hideLoading();
      wx.showToast({
        title: '出错了',
      })
      return;
    } else {
      wx.hideLoading();
      console.log(res.data.body, "返回的数据", "数据类型：" + typeof(res.data.body));
      if (resD.length != 0) {
        // 回调函数  
        var moment_list = that.data.shopItemInfo.concat(resD);
        return that.setData({
          shopItemInfo: moment_list,
          listStatus: false,
        })
      }
      wx.showToast({
        title: '没有更多',
      })
    }
  })
}
//附近的店数据
const getShop = function (that, dataObj){
  // 显示加载图标  
  wx.showLoading({
    title: '玩命加载中',
  })
  var url = constantFields.NEARBYS;
  var data = {
    "lat": dataObj.lat,
    "lng": dataObj.lng,
    "pageNo": 1,
    "pageSize": 10,
    "city": '',
    "searchKey": dataObj.key,
    "typeCode": dataObj.shopType
  };
  console.log(data)
  // 发送请求
  httpUtils.postRequest(url, data).then(function (res) {
    console.log(res)
    wx.hideLoading();
    if (res.data.head.errCode == 10000) {
      var shopItemInfo = res.data.body;
      return that.setData({
        shopItemInfo: shopItemInfo,
      })
    }
    // 调用展示生活智慧模块
    article(that)
    // 隐藏加载框  
    wx.hideLoading();
  })
}
// 举报
const report = function (that){
  let options = that.data.options
  let data = {
    "objName":options.objName,
    "objCode": options.objCode,
    "repotyType": options.repotyType,
    "content": that.data.checks,
    "openId":app.globalData.openId
  }
  httpUtils.postRequest(constantFields.report,data).then(function(res){
    if(res.data.head.errCode == 10000){
      wx.showToast({
        title: '提交成功',
      })
    }
  })
}
// ```````````````````````````功能类`````````````````````````````
// 小分类做点击标识
const addField = function(len) {
  for (let i = 0; i < len.length; i++) {
    len[i].scrollTab = true;
    if (i == 0) {
      len[i].scrollTab = false;
    };
    return len;
  }
};
// 大分类切换
const bigClass = function(that,e){
  let id = e.currentTarget.dataset.id;
  var list = that.data.tabList;
  var classList = that.data.classList;
  let len;
  for (let i = 0; i < list.length; i++) {
    list[i].scrollTab = true;
    if (i == id) {
      list[i].scrollTab = false;
      wx.showLoading({
        title: '玩命加载中',
      });
      tabListSingle(list[i].typeCode).then(function (res) {
        console.log(res)
        wx.hideLoading();
        len = res.data.body.sysShopTypeInfos;
        addField(len)
        return that.setData({
          tabListSingle: len
        })
      })
    }
  };
  classList[0].big = list[id].typeName;
  classList[0].shopType = list[id].typeCode;
  classList[0].diminutive = list[id].sysShopTypeInfos[0].typeName;
  that.setData({
    tabList: list,
    classList: classList
  })
}
// 小类切换
const subclass = function(that,e,page,pageSize){
  let id = e.currentTarget.dataset.id;
  let tabListSingle = that.data.tabListSingle;
  var classList = that.data.classList;
  for (let i = 0; i < tabListSingle.length; i++) {
    tabListSingle[i].scrollTab = true;
    if (i == id) {
      tabListSingle[i].scrollTab = false;
    }
  };
  classList[0].diminutive = tabListSingle[id].typeName;
  that.setData({
    tabListSingle: tabListSingle,
    classList: classList
  })
  switch (that.data.classList[2].sort) {
    case "距离排序":
      getshortDistance(that, page, pageSize);
      that.setData({
        pull: false
      });
      break;
    case "人气排序":
      getPopularity(that, page, pageSize);
      that.setData({
        pull: false
      });
      break;
    case "综合排序":
      getSynthetical(that, page, pageSize);
      that.setData({
        pull: false
      });
      break;
  }
}
// 全城
const city = function(that,e,page,pageSize){
  let classList = that.data.classList;
  let Citys = that.data.Citys
  classList[1].city = e.currentTarget.dataset.typename;
  that.setData({
    classList: classList
  })
  for (let i = 0; i < Citys.length; i++) {
    Citys[i].scrollTab = true;
    if (Citys[i].city == e.currentTarget.dataset.typename) Citys[i].scrollTab = false;
  };
  that.setData({
    classList: classList,
    Citys: Citys
  })
  that.setData({
    pull: false
  });
  getshortDistance(that, page, pageSize);
}
// 排序
const sort = function(that,e,page,pageSize){
  let classList = that.data.classList;
  let Sort = that.data.Sort
  classList[2].sort = e.currentTarget.dataset.typename;
  for (let i = 0; i < Sort.length; i++) {
    Sort[i].scrollTab = true;
    if (Sort[i].sort == e.currentTarget.dataset.typename) Sort[i].scrollTab = false;
  };
  that.setData({
    classList: classList,
    Sort: Sort
  })
  switch (that.data.classList[2].sort) {
    case "距离排序":
      getshortDistance(that, page, pageSize);
      that.setData({
        pull: false
      });
      break;
    case "人气排序":
      getPopularity(that, page, pageSize);
      that.setData({
        pull: false
      });
      break;
    case "综合排序":
      getSynthetical(that, page, pageSize);;
      that.setData({
        pull: false
      });
      break;
  }
}
const samll = function(arr){
  console.log(111111)
  let imgArr,img;
  for(let i = 0;i<arr.length;i++){
    imgArr = arr[i].cover.split('small/');
    img = imgArr[0] + imgArr[1];
    arr[i].cover = img;
  }
  return arr;
}
module.exports = {
  tabListSingle: tabListSingle,
  addField: addField,
  getshortDistance: getshortDistance,
  getSynthetical: getSynthetical,
  getPopularity: getPopularity,
  article: article,
  articles: articles,
  pron: pron,
  bigClass: bigClass,
  subclass: subclass,
  city: city,
  sort: sort,
  getShop: getShop,
  samll: samll,
  report: report
};