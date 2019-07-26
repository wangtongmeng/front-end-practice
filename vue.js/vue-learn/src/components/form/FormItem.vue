<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errorMessage: ''
    }
  },
  mounted() {
    // this.$on('validate', this.validate) 不对的写法 validate返回promise，由于没有catch捕获错误，会报错
    this.$on('validate', () => { // 用函数包裹一下，返回值就不是promise，就不存在报错的情况了
      this.validate()
    })
  },
  methods: {
    validate() {
      // 做校验
      const value = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      // npm i async-validator -S
      const desc = {[this.prop]: rules}
      const schema = new Schema(desc)
      // return 的是校验结果的 Promise 
      return schema.validate({[this.prop]: value}, errors => {
        if (errors) {
          this.errorMessage = errors[0].message
        } else {
          this.errorMessage = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>