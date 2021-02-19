<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{myName}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    myName() {
      return this.$store.state.name;
    }
  },
  methods: {
    handleClick() {
      // 1. dispatch 方法，派发一个 action，名字叫做change
      // 2. 感知到 change 这个action，执行store 中 actions 下面的 change 方法
      // 3. commit 提交一个叫做 change 的数据改变
      // 4. mutation 感知到提交的change改变，执行 change 方法改变数据
      this.$store.commit('change', 'hello world');
    }
  }
}
</script>