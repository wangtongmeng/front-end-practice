// pages/posts/posts.js
var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: 'Sep 18 2019',
    title: '正是虾肥蟹壮时'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    this.setData({
      posts_content: postsData.postList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('onready')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onshow')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('onhide')

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('onunload')

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('down')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('onbottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log('share')
  }
})