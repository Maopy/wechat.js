# wechat.js
微信 js SDK 封装

###使用指南
```html
<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="/path/to/wechat.js"></script>
```
**新版微信JS SDK需要先获得签名**

传入`init`进行初始化，定义从后台获得签名的函数，并将返回值传入`callback`参数
```js
wechat('init', {
  update: function (callback) {
    $.post('/your/backend/path', {
      url: window.location.href
    }, function (ret) {
      callback(ret)
    })
  }
})
```
**二、调用微信SDK**

```js
wechat('onMenuShareAppMessage', {
  title: '互联网之子',
  desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
  link: 'http://movie.douban.com/subject/25785114/',
  imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
  trigger: function (res) {
    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
    alert('用户点击发送给朋友')
  },
  success: function (res) {
    alert('已分享')
  },
  cancel: function (res) {
    alert('已取消')
  },
  fail: function (res) {
    alert(JSON.stringify(res))
  }
})
```
### 授权

[MIT License](license.txt)
