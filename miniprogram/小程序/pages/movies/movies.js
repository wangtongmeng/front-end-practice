var app = getApp()

Page({
  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl)
    this.getMovieListData(comingSoonUrl)
    this.getMovieListData(top250Url)

  },

  getMovieListData: function (url) {
    wx.request({
      url: url,
      methods: 'GET',
      header: {
        // "Content-Type": "applicaiton/json" 可能会导致 400，若有错误，换成 "Content-Type": "son"
        "Content-Type": "applicaiton/json"
      },
      success: res => {
        this.processDoubanData(res.data)
      },
      fail: res=> {
        console.log('failed')
      }
    })
  },
  processDoubanData: function (moviesDouban) {
    console.log(moviesDouban)
  }


})