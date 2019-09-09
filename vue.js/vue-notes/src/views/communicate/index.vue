<template>
  <div id="app">
    <h2>Parent</h2>
    <div class="message">
      <h3>父亲接收信息：{{msg}}</h3>
    </div>
    <div class="action">
      <button @click="info = '吃饭了'">props,父传子</button>
      <button @click="$refs.child1.info2 = '该睡觉了'">ref,父传子</button>
    </div>
    <div class="children">
      <child1
        class="child1"
        ref="child1"
        :info="info"
        @getmsg="getmsg"
      />
      <child2 class="child2" />
    </div>
  </div>
</template>

<script>
import Child1 from './Child1'
import Child2 from './Child2'
export default {
  components: { Child1, Child2 },
  data () {
    return {
      msg: '',
      info: ''
    }
  },
  methods: {
    getmsg (msg) {
      this.msg = msg
    },

  },
}
</script>

<style scoped>
#app, .child1, .child2  {
  border: 2px solid blue;
  margin: 5px;
}
h1, h2 {
  font-size: 18px;
  margin: 5px 0;
}
h3 {
  color: red;
  font-size: 14px;
}
.children {
  display: flex;
}
.child1, .child2 {
  flex: 1;
}
</style>
