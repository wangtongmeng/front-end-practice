<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :width="width">
    <slot></slot>
    <div class="footer">
      <slot name="footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="$emit('update:visible', true)">确 定</el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '70%'
    }
  }
};
</script>

<style scoped>
.footer {
  text-align: right;
}
</style>