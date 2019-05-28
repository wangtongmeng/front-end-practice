<template>
  <div class="home">
    <!-- <p>{{ food }}</p>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转指定路由parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
		<button @click="getInfo">请求数据</button><br>
		<button @click="handleLogout">退出登录</button>
		<img :src="url"> -->
		<Row>
			<i-col></i-col>
		</Row>
		<Row :gutter="10">
			<i-col span="12"></i-col>
			<i-col span="12"></i-col>
		</Row>
		<Row :gutter="10" class="blue">
			<i-col :md="6" :sm="12"></i-col>
			<i-col :md="6" :sm="12"></i-col>
			<i-col :md="6" :sm="12"></i-col>
			<i-col :md="6" :sm="12"></i-col>
		</Row>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapActions } from 'vuex'

export default {
  name: 'home',
	props: {
		food: {
			type: String,
			default: 'apple'
		}
	},
	data () {
		return {
			url: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		// this，虽然进入了组件内钩子，但此时页面还没有渲染，所以没有 this
		next(vm => {
			// 如果要使用组件实例，可以在 next 中使用
			// console.log(vm)
		})
	},
	beforeRouteLeave (to, from, next) {
		// 例如，用户一个页面编辑，突然点击跳转页面，这时需要提醒用户还未保存编辑
		// const leave = confirm('您确认要离开吗？')
		// if (leave) next()
		// else next(false)
		next()
	},
  methods: {
		...mapActions([
			'logout'
		]),
    handleClick (type) {
      if (type === 'back') this.$router.back() // 回退1
      // else if (type === 'push') this.$router.push('/parent')
      else if (type === 'push') {
				const name = 'lison1'
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

		},
		getInfo () {
			getUserInfo({ userId: 21 }).then(res => {
				console.log(res)
				this.url = res.data.img
			})
		},
		handleLogout () {
				this.logout()
				this.$router.push({
					name: 'login'
				})
		}
  }
}
</script>
<style lang="less" scoped>
.home{
	.ivu-col{
		height:50px;
		margin-top: 10px;
		background:pink;
		background-clip: content-box; /* 只在内容区显示颜色 */
	}
	.blue{
		.ivu-col {
			background:blue;
			background-clip: content-box;
		}
	}
}
</style>
