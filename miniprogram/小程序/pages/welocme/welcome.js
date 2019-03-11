// pages/welocme/welcome.js
Page({
  onTap: function () {
    // 有返回箭头
    // wx.navigateTo({
    //   url: '../posts/posts',
    // })

    // 没有箭头
    wx.redirectTo({
      url: '../posts/posts',
    })
  },
  // onUnload: function () {
  //   console.log('welcom page is unload')
  // },
  // onHide: function () {
  //   console.log('welcome page is hide')
  // }
})