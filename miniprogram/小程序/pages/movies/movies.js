var util = require('../../utils/util.js')

var app = getApp()

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映")
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMovieListData(top250Url, "top250", "豆瓣Top250")

  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    wx.request({
      url: url,
      methods: 'GET',
      header: {
        // "Content-Type": "applicaiton/json" 可能会导致 400，若有错误，换成 "Content-Type": "son"
        "Content-Type": "applicaiton/json"
      },
      success: res => {
        this.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: res=> {
        console.log('failed')
      }
    })
  },


  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = []
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx]
      var title = subject.title
      // 标题长度控制
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      movies.push({
        // [1,1,1,1,1] [1,1,1,1,0]
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      })
      this.setData({
        [settedKey]:{
          categoryTitle: categoryTitle,
          movies:movies
          }
        })
    }

  }


})