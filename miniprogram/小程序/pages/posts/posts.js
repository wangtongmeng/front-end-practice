// pages/posts/posts.js
var postsData = require('../../data/posts-data.js')

Page({

  data: {
    date: 'Sep 18 2019',
    title: '正是虾肥蟹壮时'
  },

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
  }
})