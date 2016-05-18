;(function (global, doc) {
  'use strict'

  var Wechat = function () {
    wx.error(function (res) {
      console.log(res)
      this._update()
    })
  }

  // 更新签名
  Wechat.prototype._update = function () {}

  var config = function (ret) {
    wx.config({
      debug: false,
      appId: ret.data.appId,
      timestamp: ret.data.timestamp,
      nonceStr: ret.data.noncestr,
      signature: ret.data.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'getLocation',
        'closeWindow'
      ]
    })
  }

  // 添加监听
  Wechat.prototype.on = function (name, data) {
    if (!name) return

    if (name === 'init') {
      Wechat.prototype._update = data.update
      Wechat.prototype._update(function (ret) {
        config(ret)
      })
    } else {
      var keys = name.split(',')

      keys.map(function (key) {
        wx.ready(function () {
          // 处理数据接入
          wx[key](data)
        })
      })
    }

    return this
  }

  // 对外只分享一个接口，不过会返回本身，可以有备用
  var Wx = new Wechat()

  // 创建唯一实例
  var entry = function () {
    return Wx.on.apply(Wx, arguments)
  }

  // TODO: UMD
  global.wechat = global.wechat || entry

})(window, document)
