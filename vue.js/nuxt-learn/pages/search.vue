<template>
  <div class="page">
    Page is search
    <ul>
      <li v-for="(item, idx) in $store.state.navbar.app" :key="idx">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  layout: 'search',
  data() {
    return {
      list: []
    }
  },
  // mounted在服务器端不会被执行，只有在浏览器端才会被执行，所以页面查看源码数据不是直接返回
  // async mounted() {
  //   let { status, data: { list } } = await axios.get('/city/list')
  //   if (status === 200) {
  //     this.list = list
  //   }
  // }

  // 服务端 不仅下发了数据和模板编译后的内容 同时还下发了异步获取的数据。数据是通过下发一个script标签，在window上挂载一个对象，对象里会包含data选项
  async asyncData() {
    let { status, data: { list } } = await axios.get('http://localhost:3000/city/list')
    if (status === 200) {
      return {
        list
      }
    }
  }
}
</script>
