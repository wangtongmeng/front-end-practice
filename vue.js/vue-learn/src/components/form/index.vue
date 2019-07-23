<template>
  <div>
    <h3>Element表单</h3>
    <hr>
    <my-form :model="rules" :rules="rules">
      <my-form-item label="用户名" prop="username">
        <my-input v-model="model.username" autocomplete="off" placeholder="输入用户名"></my-input>
      </my-form-item>
      <my-form-item label="确认密码" prop="password">
        <my-input v-model="model.password"></my-input>
      </my-form-item>
    </my-form>
    {{model}}
  </div>
</template>

<script>
  import MyForm from './Form'
  import MyFormItem from './FormItem'
  import MyInput from './Input'
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
  }
</script>

<style lang="scss" scoped>

</style>