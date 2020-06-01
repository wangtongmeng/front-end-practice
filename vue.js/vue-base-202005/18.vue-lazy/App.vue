<template>
  <div class="box">
    <li v-for="img in imgs" :key="img">
      <!-- <img :src="img" alt="" class="img"> -->
      <!-- <img class="img" v-lazy="img"> -->
    </li>
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
        // let url = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2412750469,587528816&fm=26&gp=0.jpg'
        // let data = []
        // for (let i = 0; i < 20; i++) {
        //   data.push(url)
        // }
      this.imgs = [
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2412750469,587528816&fm=26&gp=0.jpg',
        'http://img2.imgtn.bdimg.com/it/u=1814697857,926740563&fm=26&gp=0.jpg',
        'http://img4.imgtn.bdimg.com/it/u=2921913014,1870504218&fm=26&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=1125803023,2203046543&fm=26&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3406350167,1356789683&fm=26&gp=0.jpg',
        'http://img5.imgtn.bdimg.com/it/u=143536099,2306082382&fm=26&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3570023296,615021296&fm=26&gp=0.jpg'
      ]
    }, 200)
  }
}
</script>

<style scoped>
.box {
  height: 300px;
  overflow: scroll;
  width: 400px;
}
.img {
  width: 400px; 
  height: 400px;
}
</style>