import {HTTP} from '../utils/http.js'
class BookModel extends HTTP {
  constructor() {
    super()
  }

  getHotList(success) {
    var params = {
      url: 'book/hot_list',
      success: success
    }
    this.request(params)
  }

  getDetail(bid, success){
    let params = {
      url:'book/'+ bid +'/detail',
      success:success
    }
    this.request(params)
  }

  getLikeStatus(bid,success){
    let params = {
      url: '/book/' + bid + '/favor',
      success:success
    }
    this.request(params)
  }

  getMyBookCount(success){
    let params = {
      url:'/book/favor/count',
      success:success
    }
    this.request(params)
  }
}

export { BookModel}