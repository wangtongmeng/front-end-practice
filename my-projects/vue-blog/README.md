# multi-user-blog
## 一款多人共享博客的单页应用
## 预览
[预览链接](https://littlebirdflying.github.io/my-vue-resume-20180613/src/index.html?user_id=5b227baefe88c200349b8af3)<br>
未登录主页面、登录主页面、登录页面、注册页面
![1.png](https://i.loli.net/2018/07/03/5b3acdf1411a3.png)
博客详情页、用户页面、创建页面、编辑页面
![2.png](https://i.loli.net/2018/07/03/5b3acdf14182a.png)
## 实现功能:
* 用户的登录、注册、注销
* 首页多人博客展示
* 用户博文展示
* 我的页面博文展示及管理
* 博文的创建、编辑、删除、发布
## 设计技术栈
vue-cli/vue2/axios/vue-router/vuex/es6/npm
## 技术要点
项目架构、利用axios进行底层请求接口封装、vue-router进行路由化、vuex进行公共状态管理
## 项目流程
### 1. 测试后端接口
项目接口如下：
后端接口线上地址根路径： http://blog-server.hunger-valley.com （https也可以）
认证相关接口
```
POST /auth/register             用户注册
POST /auth/login                用户登录
GET /auth                       判断用户是否登录
GET /auth/logout                注销登录
博客相关接口
GET /blog                       获取博客列表
GET /blog/:blogId               获取id 为 blogId 的博客详情， 如 /blog/1
POST /blog                      创建博客
PATCH /blog/:blogId             修改博客 id 为:blogId 的博客
DELETE /blog/:blogId            删除博客 id 为:blogId 的博客
```
使用curl 或postman进行测试，测试详细文档参考测试后端接口
### 2. 项目初始化
使用 vue-cli 创建项目模板（参见[我的博客](https://zhuanlan.zhihu.com/p/38256952)）
### 3. 创建路由
src目录下创建新目录pages/放页面，conponents/放通用型组件，如header和footer，并在router/index.js里引入组件
### 4. 引入less 使用scoped
在组件里引入less <style lang="less" scoped src="./template.less"></style>,通过scoped 或嵌套写法保证样式的局部性，通用样式放在assets/目录下，需要时@import进对应less文件
### 5. ElementUI 的使用
引入ElementUI（参见[我的博客](https://littlebirdflying.github.io/2018/06/20/%E5%9C%A8vue%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8elementUI/)）
### 6. 底层请求接口封装（使用axios）
在src目录下新增helpers/request.js
数据请求接口封装,引入  axios以及element-ui的Message对象
设axios的请求数据格式，baseURL, 跨域请求带上cookie
```
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com'
axios.defaults.withCredentials = true
```
封装一个request函数  ，默认type是get请求，data为空对象，返回一个Promise对象
```
function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
      let option = {
        url,
        method: type
      }
      if(type.toLowerCase() === 'get') {
        option.params = data
      }else {
        option.data = data
      }
      axios(option).then(res => {
        console.log(res.data)
        if(res.data.status === 'ok') {
          resolve(res.data)
        }else{
          Message.error(res.data.msg)
          reject(res.data)
        }
      }).catch(err => {
        Message.error('网络异常')
        reject({ msg: '网络异常' })
      })
  
  ｝）
  ```
封装完成后，在所需页面引入，通过window获得全局变量，进行测试（技巧：请求测试代码可存在souce-Snippets里，测试完删掉全局变量即可）
### 7. 页面操作api封装
在src/api/目录下新增 auth.js 和  blog.js 
auth（认证相关api封装）
引入request.js
创建认证相关接口
```
register({username, password}) {},
login({username, password}) {},
logout() {},
getInfo() {}
```
blog（博客相关api封装）
引入 request.js 和 auth.js
创建博客操作相关接口
```
getBlogs({ page=1, userId, atIndex } = { page: 1 }) {}, 
getIndexBlogs({ page=1 } = { page: 1}) {},
getBlogsByUserId(userId, { page=1, atIndex } = { page: 1}) {},
   getDetail({ blogId }) {},
updateBlog({ blogId }, { title, content, description, atIndex }) {},
deleteBlog({ blogId }) {},
createBlog({ title = '', content = '', description = '', atIndex = false} = { title: '', content: '', description: '', atIndex: false}) {}
```
### 8. 确定页面结构
使用grid三行三列布局，上中下分别是header 内容区 footer，设置内容区高度100%使其撑开，footer在底部的效果。<br>
整体页面结构的less样式放在App.vue的style区，其他主页面的样式算作公共样式放在assets的common.less里，变量放在base.less中,通过@import引入即可<br>
Header和Footer作为公用组件放在components里，在App.vue里引入，并注册。<br>
对应的Header和Footer组件的样式写在各自style中。
### 9. 页面静态布局和样式确定
使用grid布局进行各个页面的布局和样式确定。
### 10. 引入vuex及vuex在组件中的使用
创建src/store/目录，放状态管理相关的数据，index.js为主入口，src/store/modules下放auth.js和blog.js<br>
在main.js里引入store对象，并注入 new Vue中，这样就能在组件中使用了。<br>
在组件中 import { mapGetters, mapActions } from 'vuex' ，通过...mapGetters(['isLogin','user'])就可以直接进行使用了<br>
### 11. 路由的完善、异步加载、权限验证
**路由完善**<br>
使用vue router路由元信息 ，在需要认证的路由下添加meta: { requiresAuth: true }通过router.beforeEach判断是否需要认证。<br>
**异步加载**<br>
项目发布 编译打包  npm  run build  打包成一个文件，文件会特别大。启动它， 进入 dist目录  http-server，切换页面，network显示不会再加载了，js过大，里面什么都有。<br>
实现懒加载 重新编译打包 npm run build   第一次切换页面就会加载，体积很小。<br>
**权限验证**<br>
切换页面，在router.beforeEach里如果需要认证，利用store.dipatch('checkLogin')
```
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin=>{
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})
 ```
### 12. 页面的完善
**create创建页面**<br>
点击logo跳转首页（router-link），点击创建跳转到/create页面(router-link),是否展示到首页按钮（ele-UI）数据层，创建页面数据和其他页面数据没有交互，放在自己的data中即可。<br>
**Index首页**<br>
created生命周期调用blog.getIndexBlogs({page:this.page})，拿到数据进行渲染。<br>
添加分页（ele-UI）,并监听，如果页数变化根据页数调用onPageChange(newPage)，其中调用blog.getIndexBlogs({page:newPage})，拿到数据进行渲染并把页数存在query中this.$router.push({path:'/',query:{page:newPage}})，这样created阶段就可以获取page参数，拿到对应数据。<br>
**Detail详情页**<br>
如首页点击博客会跳转到/detail/22这个路由，根据路由在created阶段加载数据，渲染到页面，通过params拿到路由参数this.blogId = this.$route.params.blogId(对应router里的:blogId)根据id获取数据blog.getDetail({blogId:this.blogId})，then赋值给data，就渲染好了。渲染博客内容是引入了npm包 marked，把markdown语法转成html。<br>
**User用户页面**<br>
用户页面与详情页面很了类似，created阶段根据路由params获取userId,this.$route.query.page拿到页数，调用blog的api获取数据blog.getBlogsByUserId(this.userId, {page: this.page}).then()把数据赋值给data，在页面中进行渲染，用户页面不需要反复那user,当data>0时，this.user = res.data[0].user，拿到一个即可。定义一个splitDate从日期中提取年月日。<br>
**My我的页面**<br>
  与用户页面相似，多了编辑和删除按钮，created阶段通过params和query获取userId和page,调用blog的apiblog.getBlogsByUserId(this.user.id, {page: this.page})获取数据并给data赋值，在页面进行渲染。点击编辑跳转到对应编辑页面 <router-link :to="`/edit/${blog.id}`">编辑</router-link>。点击删除按钮，根据blog.id删除，在这个利用ele-UI确定删除组件，确定再删除blog.deleteBlog({ blogId })，过滤掉删除的数据，重新复制给data,this.blogs = this.blogs.filter(blog => blog.id !== blogId)<br>
**Edit编辑页面**<br>
编辑页面和创建页面基本一致，不同的是编辑页面需要拿到文章的信息进行展示，方便我们进行修改。<br>
created页面通过params获得blogId对用blog api blog. getDetail({ blogId:this.blogId })，将数据赋值给data,在页面中进行渲染。编辑完成后，点击确定，调用函数 使用 blog.updateBlog({ blogId:this.blogId },{…})更新数据，并跳转到详情页面。
### 13. 时间插件的使用
在src/helpers/目录下新建一个util.js文件，声明一个时间转换函数，导出接口
```
export default {
  install(Vue, options) {    //  这是个插件
    Vue.prototype.friendlyDate = friendlyDate
  }
}
```
在main.js中引入 import Util from '@/helpers/util'，并注入Vue,Vue.use(Util)，这样就可以在各个组件中进行使用了{{friendlyDate(createdAt)}}

	
	
	
	
			
			
		
		
		
		

