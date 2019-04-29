// components/like/index.js.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: 'images/like.png',
    dislikeSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      let count = this.properties.count
      count = this.data.like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !this.properties.like
      })
    }
  }
})