var postsData = require('../../../data/posts-data.js')
var app = getApp()

Page({

  data: {
    isPlayingMusic: false
  },

  onLoad: function (options) {
    var globalData = app.globalData
    var postId = options.id
    this.data.currentPostId = postId
    var postData = postsData.postList[postId]
    this.setData({...postData})

    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
    
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor()
  },

  setMusicMonitor:function () {
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = this.data.currentPostId
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]
    // 收藏变未收藏，未收藏变收藏
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    // 更新文章是否缓存
    wx.setStorageSync('posts_collected', postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? '收藏成功':'取消成功',
      duration: 1000,
      icon:'success'
    })
  },

  onShareTap: function (event) {
    var itemList = [
      "分享到微博好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从 0 开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消？' + res.cancel + "现无分享功能，望以后会有"
        })
      }
    })
  },

  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId
    var postData = postsData.postList[currentPostId]
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})