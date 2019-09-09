<template>
  <div>
    <h2>Child1</h2>
    <div class="message">孩子接收到消息：{{info}}</div>
    <div class="message">孩子接收到消息2：{{info2}}</div>
    <div class="action">
      <button @click="$emit('getmsg', '爸爸，我饿了')">$emit,子传父</button>
    </div>
    <div class="children"></div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      info2: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
