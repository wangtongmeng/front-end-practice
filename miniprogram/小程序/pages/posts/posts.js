// pages/posts/posts.js
var postsData = require('../../data/posts-data.js')

Page({

  data: {},

  onLoad: function(options) {
   
    this.setData({
      posts_content: postsData.postList
    })
  },

  onPostTap: function (event) {
    // wxml 中 data- 开头数据，只有-开头的字母会大写，其余都会小写
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onSwiperTap: function (event) {
    // target 和 currentTarget 
    // target 指的是当前点击的组件 currentTarget 指的是事件捕获的组件
     
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})