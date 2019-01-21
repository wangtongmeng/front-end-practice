<template>
    <div class="page-item">
        <div class="item-title">
            <slot name="page-item-title">item标题</slot>
            
        </div>
        <div class="item-content">
            <slot name="page-item-content"></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: "PageItem"
};
</script>
<style lang="less" scoped>
.page-item {
  width: 40%;
  min-width: 300px;
  height: 0;
  padding-bottom: 30%;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 4px 4px 9px -2px rgba(0, 0, 0, 0.75);
  overflow: hidden;
  margin: 20px 0;
  .item-title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #333;
    opacity: 0.8;
    color: #fff;
    font-size: 16px;
  }
  .item-content {
    padding: 20px 0 0 20px;
  }
}
</style>
