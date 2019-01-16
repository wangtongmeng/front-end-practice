<template>
    <div class="header">
        <div class="title">vue笔记</div>
    </div>
</template>
<script>
export default {
  name: "Header"
};
</script>
<style lang="less" scoped>
@import "~styles/variables.less";
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 10px 60px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease-in-out;
  .title {
    font-size: 24px;
  }
}
</style>
