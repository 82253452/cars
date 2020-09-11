export default {
  pages: [
    'pages/index/index',
    'pages/center/center',
    'pages/authorize/index',
    'pages/order/index',
    'pages/detail/index',
    'pages/shipping/index',
    'pages/serviceLocation/index',
  ],
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    borderStyle: 'white',
    list: [{
      text: '首页',
      iconPath: 'img/shouye.png',
      selectedIconPath: 'img/shouye@2x.png',
      pagePath: 'pages/index/index',
    },
      {
        text: '订单',
        iconPath: 'img/qiuhuo.png',
        selectedIconPath: 'img/qiuhuoa.png',
        pagePath: 'pages/order/index'
      },
      {
        text: '我的',
        iconPath: 'img/wode.png',
        selectedIconPath: 'img/wodea.png',
        pagePath: 'pages/center/center'
      }]
  }
}
