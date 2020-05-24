<template>
  <div>

  </div>
</template>

<script>
// import axios from 'axios' // 基于promise async+await
export default {
  data() {
    return {
      imgs: []
    }
  },
  // async created() {
  //   let { data } = await axios.get(
  //     'http://www.fullstackjavascript.cn:9999/api/img'
  //   )
  //   this.imgs = data
  // }
  created(){
    setTimeout(() => {
        let url = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2412750469,587528816&fm=26&gp=0.jpg'
        let data = []
        for (let i = 0; i < 20; i++) {
          data.push(url)
        }
      this.imgs = data
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
</style>