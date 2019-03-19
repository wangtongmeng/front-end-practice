
class KeywordStorage{
  constructor(){
    this.key = 'q'
  }

  all(){
    var keywords = wx.getStorageSync(this.key)
    return keywords
  }

  add(word){
    var keywords = this.all()
    if (keywords){
      var index = keywords.indexOf(word)
      if(index == -1){
        keywords = keywords.push(word)
      }
      wx.setStorageSync(this.key, keywords)
    }
    else{
      keywords = [word]
      wx.setStorageSync(this.key, keywords)
    }
  }
}

export { KeywordStorage}