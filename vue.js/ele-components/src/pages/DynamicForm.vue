<template>
  <div style="margin: 10px;">
    <el-form>
      <el-form-item
        v-for="(item, index) in formData"
        :key="index"
        :label="item.label"
        :prop="item.attr"
      >
        <el-input v-if="item.type === 'input'" :value="item.value" :disabled="item.formula !== ''"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Array,
      default: () => [],
    },
    watch: {
      formData (val) {
        console.log('val',  )
      }
    }
  },
};
</script>

<style>
</style>