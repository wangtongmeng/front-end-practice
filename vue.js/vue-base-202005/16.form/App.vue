<template>
  <div>
    {{ruleForm}}
    <!-- el-form => form表单 model rules validate方法-->
    <!-- el-form-item => 渲染label prop用来校验是否符合规则的，不通过需要渲染错误信息(用来校验的) -->
    <!-- el-input 实现了双向绑定的输入框(双向绑定) -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
    </el-form> 
    <el-form-item>
      <button @click="submitForm">提交表单</button>
    </el-form-item>
  </div>
</template>

<script>
import elForm from './components/el-form'
import elInput from './components/el-input'
import elFormItem from './components/el-form-item'
export default {
  components: {
    'el-form': elForm,
    'el-input': elInput,
    'el-form-item': elFormItem
  },
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          alert('submit!')
        } else { 
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>