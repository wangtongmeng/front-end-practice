import { HTTP } from '../utils/http.js'
import {ClassicStorage} from '../models/classic-storage.js'

class ClassicModel extends HTTP{
  prefix = 'classic'

  constructor() {
    super()
  }

  getLatest(sCallback){
    this.request({
      url:'classic/latest',
      success:(data)=>{
          // 如果不用箭头函数，this将指代不正确
          let key = this._fullKey(data.index)
          wx.setStorageSync(key, data)
          this._setLatestIndex(data.index)
          sCallback(data)
        }
    })
  }

  getPrevious(index, sCallback){
    this._getClassic(index,'previous',sCallback)
  }

  getNext(index, sCallback) {
    this._getClassic(index, 'next', sCallback)
  }

  getById(cid, type, success){
    let params = {
      url:'classic/'+type+'/' + cid,
      success:success
    }
    this.request(params)
  }

  isLatest(index){
    let key = this._fullKey('latest-' + index)
    let latestEpsoide = wx.getStorageSync(key)
    if(latestEpsoide){
      if (index == latestEpsoide){
        return true
      }
    }
    else return false
  }

  isFirst(index){
    if (index==1){
      return true
    }
    else return false
  }

  getMyFavor(success){
    let params={
      url:'classic/favor',
      success:success
    }
    this.request(params)
  }

  _getClassic(index, next_or_previous, sCallback){
    let key = next_or_previous == 'next' ? this._fullKey(index + 1):
      this._fullKey(index-1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      let params = {
        url: 'classic/' + index + '/' + next_or_previous,
        success:(data)=>{
          let key = this._fullKey(data.index)
          wx.setStorageSync(key, data)
          sCallback(data)
        }
      }
      this.request(params)
    }
    else{
      sCallback(classic)
    }
  }

  /**
   * 在缓存中存放最新一期的期数
   */
  _setLatestIndex(index){
    let key = this._fullKey('latest-' + index)
    wx.setStorageSync(key, index)
  }

  _getLatestEpsoide(index){
    let key = this._fullKey(index)
    return wx.getStorageSync(key)
  }

  _fullKey(partKey){
    let key = this.prefix + '-' + partKey
    return key
  }
}

export {ClassicModel}