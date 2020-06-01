<template>
  <el-form :inline="inline" :size="size">
    <el-form-item v-for="(value, name) in form" :key="name" :label="items[name].label" :prop="name">
      <el-input v-if="items[name].type === 'input'" v-model="form[name]"></el-input>
      <el-input v-if="items[name].type === 'textarea'" type="textarea" v-model="form[name]"></el-input>
      <el-select v-if="items[name].type === 'select'" v-model="form[name]" placeholder="">
        <el-option v-for="option in items[name].options" :key="option.value" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-for="(item, index) in buttons" :key="index">
      <el-button :type="item.buttonType" :icon="item.icon" @click="item.click(form)">{{item.text}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },
    inline: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () =>({})
    },
    items: {
      type: Object,
      default: () =>({})
    },
    buttons: {
      type: Array,
      default: () => []
    }
  }
}
</script>