<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link>
    </div> -->
		<transition-group :name='routerTransition'>
			<router-view key='default' />
			<router-view key='email' name='email' />
			<router-view key='tel' name='tel' />
		</transition-group>
  </div>
</template>
<script>
export default {
	data () {
		return {
			routerTransition: ''
		}
	},
	watch: {
		'$route' (to) {
			to.query && to.query.transitionName && (this.routerTransition = to.query.transitionName)
		}
	}
}
</script>

<style lang="less">
// 页面进入
//   进入路由前
.router-enter {
	opacity: 0;
}
//   路由页面从无到有的过程
.router-enter-active {
	transition: opacity 1s ease;
}
//   路由页面完全显示时
.router-enter-to {
	opacity: 1;
}
// 页面注销/离开
//   离开路由前
.router-leave {
	opacity: 1;
}
//   路由页面从有到无的过程
.router-leave-active {
	transition: opacity 1s ease;
}
//   路由页面完全消失时
.router-leave-to {
	opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
