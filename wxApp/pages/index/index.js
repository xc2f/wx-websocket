//index.js
Page({
  data: {
    currentInput: '',
    list: []
  },
  inputSource: function(e) {
    this.setData({
      currentInput: e.detail.value
    })
  },
  submit: function() {
    let sendMsg = {
      from: 'wechat',
      content: this.data.currentInput
    }
    wx.sendSocketMessage({
      data: JSON.stringify(sendMsg)
    })
    this.setData({
      currentInput: ''
    })
  },
  onLoad: function () {
    wx.connectSocket({
      url: 'wss://127.0.0.1:65500'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket服务已开启！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务端消息：'+res.data)
      let tempList = this.data.list
      tempList.push(res.data)
      this.setData({
        list: tempList,
      })
    }.bind(this))
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/pages/logs'
    }
  }
})
