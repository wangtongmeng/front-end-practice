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
    }),
    // 如果要跳转到带有 tab 栏的页面，必须使用 switchTab，否则优先使用其他
    wx.switchTab({
      url: '../posts/posts',
    })
  }
})