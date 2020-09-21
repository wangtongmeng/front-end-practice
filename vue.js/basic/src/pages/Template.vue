<template>
  <div>
    <!-- 插值: 文本 -->
    <div>{{msg}}</div>
    <div v-once>{{msg1}}</div>
    <!-- 插值: 原始 HTML -->
    <p>Using mustaches: {{ rawHtml }}</p>
    <p>
      Using v-html directive:
      <span v-html="rawHtml"></span>
    </p>
    <!-- 插值: Attribute -->
    <div v-bind:id="dynamicId"></div>
    <!-- 插值: 使用 JavaScript 表达式 -->
    {{number + 1}}
    {{ ok ? 'YES' : 'NO' }}
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list' + id"></div>
    <!-- 指令：参数 -->
    <a v-bind:href="url">百度</a>
    <a v-on:click="doSomething">点击</a>
    <!-- 指令：动态参数 -->
    <a v-bind:[attributeName]="url"> 百度 </a>
    <input type="text" v-on:[eventName]="doSomething" />
    <!-- 指令：修饰符 -->
    <form v-on:submit.prevent="onSubmit">
      <!-- .prevent => event.preventDefault() 阻止事件默认行为，这里阻止表单提交刷新页面-->
      <button type="submit">提交</button>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // 插值: 文本
      msg: "hello",
      msg1: "hello",
      // 插值: 原始 HTML
      rawHtml: '<span style="color: red;">This should be red</span>',
      // 插值: Attribute
      dynamicId: 123,
      // 插值: 使用 JavaScript 表达式
      number: 1,
      ok: false,
      message: 'hello world',
      id: 123,
      // 指令：参数
      url: 'https://www.baidu.com/',
      // 指令：动态参数
      attributeName: 'href',
      eventName: 'focus'
      // 指令：修饰符
      
    };
  },
  mounted() {
    setTimeout(() => {
      this.msg = "hello world";
      this.msg1 = "hello world1";
    }, 1000);
  },
  methods: {
    doSomething() {
      console.log('focus')
    },
    onSubmit(){
      console.log('onSubmit')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>