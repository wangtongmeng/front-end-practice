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
    onLike: function (event) {
      let count = this.properties.count
      count = this.properties.like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !this.properties.like
      })
    }
  }
})
