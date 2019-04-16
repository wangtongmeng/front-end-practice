<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转指定路由parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    handleClick (type) {
      if (type === 'back') this.$router.back() // 回退1
      // else if (type === 'push') this.$router.push('/parent')
      else if (type === 'push') {
				const name = 'lison'
        this.$router.push({
					path: `/argu/${name}`,
					query: {
						age: 18
					}
        })
      }
      else if (type === 'replace') this.$router.replace({ name: 'parent' })

      // this.$router.go(-1) // 回退1
      // this.$router.go(1) // 向前1

    }
  }
}
</script>
