<template>
  <div>
    <h3>Element表单</h3>
    <hr>
    <my-form ref="loginForm" :model="model" :rules="rules">
      <my-form-item label="用户名" prop="username">
        <my-input v-model="model.username" autocomplete="off" placeholder="输入用户名"></my-input>
      </my-form-item>
      <my-form-item label="确认密码" prop="password">
        <my-input v-model="model.password"></my-input>
      </my-form-item>
      <my-form-item>
        <button @click="submitForm('loginForm')">提交</button>
      </my-form-item>
    </my-form>
  </div>
</template>

<script>
  import MyForm from './Form'
  import MyFormItem from './FormItem'
  import MyInput from './Input'
  import create from '@/utils/create.js'
  import Notice from '@/components/notice/Notice'
  export default {
    components: {
      MyForm,
      MyFormItem,
      MyInput
    },
    data() {
      return {
        model: {
          username: 'tom',
          password: ''
        },
        rules: {
          username: [{
            required: true, message: '请输入用户名'
          }],
          password: [{
            required: true, message: '请输入密码'
          }]
        }
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            const notice = create(Notice, {
              title: 'xxx',
              message: valid ? '请求登录！': '校验失败！',
              duration: 1000
            })
            notice.show()
          } else {
            alert('校验失败！')
          }
        })
        
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>