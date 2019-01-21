<template>
    <div>
        <h2>iview demo</h2>
        <Page :current="currentPage" :total="100" @on-change="pageChange"/>
        <button class="btn" @click="handleClick(2)">reset page to 2</button> <br>
        <button class="btn" @click="handleClick(3)">reset page to 3</button>
    </div>
</template>
<script>
export default {
  name: "IviewDemo",
  data(){
      return {
          currentPage: 1
      }
  },
  methods: {
      pageChange(currentPage){
          console.log(currentPage);
      },
      handleClick(index){
          this.currentPage = index
      }
  },
  watch: {
      currentPage(t){
          console.log('currentPage', t);
      }
  }
};
</script>
<style lang="less" scoped>
.btn {
    cursor: pointer;
}
</style>
