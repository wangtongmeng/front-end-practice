// components/like/like-cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number
  },

  data: {
    yes_url: 'images/like.png',
    no_url: 'images/like@dis.png'
  },

  methods: {
    onLike: function(event) {
      // 自定义事件
      let like = this.properties.like
      let count = this.properties.count

      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })
      // 激活
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})