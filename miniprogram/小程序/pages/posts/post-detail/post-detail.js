var postsData = require('../../../data/posts-data.js')

Page({
  data: {

  },
  onLoad: function (options) {
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
  }


})