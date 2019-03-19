
class ClassicStorage{
  static prefix = 'classic'
  constructor(epsoide){
    this.key = ClassicStorage.prefix + '-' + epsoide
  }
  get(epsoide){
    return wx.getStorageSync(this.key)
  }
  set(epsoide, classic){
    wx.setStorageSync(this.key, classic)
  }
}