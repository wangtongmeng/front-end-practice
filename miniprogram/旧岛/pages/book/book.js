import {
  BookModel
} from '../../models/book.js'
import {
  random
} from '../../utils/common.js'

const bookModel = new BookModel()

// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res
        })
      })
  },

  onSearching: function(event) {
    this.setData({
      searching: true
    })
  },
  
  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  onReachBottom() {
    this.setData({
      more: random(16)
    })
  }
})