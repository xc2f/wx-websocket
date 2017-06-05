App({
  onLaunch: function (options) {
    console.log('onLaunch')
  },
  onShow: function (options) {
    console.log('onShow')
  },
  onHide: function () {
    console.log('onHide')
  },
  onError: function (msg) {
    console.log('onError')
  },
  globalData: 'I am global data'
})