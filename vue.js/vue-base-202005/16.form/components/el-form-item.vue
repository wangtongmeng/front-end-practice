<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    {{errMessage}}
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  // 可以默认和当前组件标签一致
  name: 'el-form-item',
  inject: ['elForm'],
  props: {
    label: { // 标签
      type: String,
      default: ''
    },
    prop: String // 当前校验哪一个属性
  },
  mounted(){
    this.$on('validate', function(){
      // console.log(this.prop)
      this.validate() // 校验是否符合规范
    })
  },
  data(){
    return {
      errMessage: ''
    }
  },
  methods: {
    validate(){
      if(this.prop){
        // 获取校验规则
        let rule = this.elForm.rules[this.prop]
        let newValue = this.elForm.model[this.prop]
        // el-form 使用了校验库 async-validator
        let descriptor = { // 当前属性的描述
          [this.prop]:rule
        }
        let schema = new Schema(descriptor) // 通过描述信息创建一个骨架

        return schema.validate({[this.prop]:newValue}, (err, res) => {
          console.log(res)
          if(err){
            this.errMessage = err[0].message
          }else{
            this.errMessage = ''
          }
        })
      }
    }
  }
}
</script>

<style>

</style>