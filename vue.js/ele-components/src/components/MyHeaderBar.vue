<template>
  <div class="wrapper">
    <slot name="searchForm"></slot>
    <div class="buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
}
.buttons {
  float: right;
  margin-top: 1px;
}
</style>