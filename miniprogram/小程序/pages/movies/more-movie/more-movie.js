var util = require('../../../utils/util.js')

var app = getApp()

Page({

  data: {
    movies: [],
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },

  onLoad: function(options) {
    var category = options.category
    this.data.navigateTitle = category

    var dataUrl = ""
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl
    util.http(dataUrl, this.processDoubanData)
  },

  // onScrollLower: function (event) {
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
  //   util.http(nextUrl, this.processDoubanData)
  //   wx.showNavigationBarLoading()
  // },
  onReachBottom: function(event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  onPullDownRefresh: function(event) {
    var refreshUrl = this.data.requestUrl + '?start=0&count=20'
    this.data.movies = []
    this.data.isEmpty = true
    this.data.totalCount = 0
    util.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  processDoubanData: function(moviesDouban) {
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
    }

    var totalMovies = []
    this.data.totalCount += 20
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    } else {
      totalMovies = movies
      this.data.isEmpty = false
    }

    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
})