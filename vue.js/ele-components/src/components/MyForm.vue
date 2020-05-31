<template>
  <el-form :inline="inline">
    <el-form-item v-for="(value, name) in form" :key="name" :label="items[name].label" :prop="name">
      <el-input v-if="items[name].type === 'input'" v-model="form[name]"></el-input>
      <el-input v-if="items[name].type === 'textarea'" type="textarea" v-model="form[name]"></el-input>
      <el-select v-if="items[name].type === 'select'" v-model="form[name]" placeholder="">
        <el-option v-for="option in items[name].options" :key="option.value" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      inline: true,
      form: {
        name1: 'x',
        name2: 'y',
        name3: 'z'
      },
      items: {
        name1: { type: 'input', label: '' },
        name2: {
          type: 'select',
          label: '',
          options: [
            { label: 'label1', value: 'yyy' },
            { label: 'label2', value: 'value2' },
            { label: 'label3', value: 'value3' }
          ]
        },
        name3: { type: 'textarea', label: '' }
      },
      rules: []
    }
  },
  mounted() {
    this.items.name2.options = [
      { label: 'label4', value: 'yyy' },
      { label: 'label5', value: 'value2' },
      { label: 'label6', value: 'value3' }
    ]
  }
}
</script>