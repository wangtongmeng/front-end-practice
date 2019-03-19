// components/like/like-cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly:Boolean
  },

  data: {
    yes_url: 'images/like.png',
    no_url: 'images/like@dis.png'
  }
})
