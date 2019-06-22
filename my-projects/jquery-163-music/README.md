
##  一款的移动端网易云音乐播放器
### 包含PC管理端（admin 页面）

## 预览
### 移动端歌曲页面
[歌曲展示页面](https://littlebirdflying.github.io/163-music-201805/src/index.html)
![index.png](https://i.loli.net/2018/07/09/5b430ecbdb177.png)
### 歌曲管理页面
[歌曲管理页面](https://littlebirdflying.github.io/163-music-201805/src/admin.html)
![未命名图片.png](https://i.loli.net/2018/07/09/5b430ecbc3ec2.png)
## 实现功能
* 移动端最新音乐展示歌曲列表、展示热歌榜歌曲、搜索歌曲，以及歌曲播放、暂停、歌词展示功能。<br>
* 后台管理系统的搭建，可以实现歌曲的新建、添加、编辑、删除等功能。<br>
## 涉及技术栈
jQuery/HTML 5/CSS 3/JavaScript/LeanCloud/QiNiu/Less
## 技术要点
### css
flex布局、loading动画、细滚动条
### js
模块化、 MVC组织代码、eventHub实现模块间通信、模块通信对象的深拷贝
## 项目流程
### 1. 整体思路
#### 用户使用页
首页：推荐歌曲、热歌榜、搜索歌曲，<br>
播放歌曲页：听歌、暂停、看歌词<br>
#### 管理页面
已有歌曲列表<br>
上传歌曲：点击、拖拽上传歌曲<br>
新建歌曲<br>
编辑歌曲
#### 系统架构
前端  jQuery(ajax)发售请求<br>
后端  LeanCloud API<br>
数据库 LeanCloud存用户、歌曲、歌单信息，MP3放在七牛<br>
### 2. 引入 leanCloud 和 七牛
使用leanCloud创建数据库，文件mp3放在七牛<br>
数据库包括以下内容：<br>
User:管理员用户<br>
Song 所有歌曲<br>
PlayList所有歌单（功能重复、有时间再做）<br>
注意：七牛上传需要一个token。使用server.js搭建服务器获取token,但token不要上传到github，通过读取文件的方式，上传github选择忽略
### 3. admin管理页面静态布局
flex进行布局。左侧边栏：新建歌曲、歌曲列表、上传区。右主区域：歌曲表单的编辑、保存、删除。
### 4. 根据功能模块化
使用MVC的组织代码思想将新建歌曲、歌曲列表、上传歌曲、歌曲表单这4个区域功能进行模块化，形成4个模块<br>
各个模块之间通过发布订阅模式进行通信。注意：不同模块不要使用相同内存，可通过深拷贝解决。<br>
具体实现：结合七牛api做拖拽上传功能，上传歌曲，并在歌曲表单显示信息，点击保存，保存到歌曲列表并上传数据。
### 5. 添加功能
上传歌曲：upload-song模块，emit('new'),song-list清除active,song-form清空input<br>
展示歌曲列表：在song-list模块，初始化阶段利用leanCloud获取歌曲信息，并渲染到歌曲列表。<br>
编辑歌曲：song-list模块，点击激活active；emit('select')，song-form模块拿到song-list模块传过来的数据，并渲染到页面。<br>
编辑后保存歌曲：编辑歌曲，点击保存，利用leanCloud更新数据库，保存歌曲后清空input,emit('update'),song-list渲染数据。<br>
新建歌曲：点击新建，添加active, emit新建；song-form模块清空选项，显示新建；song-list模块清除active。
### 6. 添加loading模块
loading的css用伪类绝对居中做，beforeUpload展示，afterUpload隐藏
### 7. 首页样式布局及模块化
样式使用flex布局，模块分为：<br>
tab模块，点击不同tab展示不同page<br>
page-1,包含playlists和songlist，其中songlist点击跳转到song.html页面，并播放音乐<br>
page-2,热歌榜，显示一个歌曲列表<br>
page-3模块，搜索歌曲，在已有数据库中进行搜索<br>
page-1中包含page-1-1、page-1-2模块，子模块通过初始化阶段添加script标签进行获取，各模块使用MVC组织代码，eventHub通信。
### 8. 歌曲播放页模块的数据获取
根据查询参数获取id，用id从leanCloud拿到数据
### 9. 歌曲播放效果
歌碟转动：通过keyframes设置旋转动画，通过 animation-play-state: running/pause控制动画的暂停与播放<br>
歌曲播放与暂停：通过控制audio的api即可<br>
歌词展示：通过audio.currentTime拿到播放时间，找到对应p标签，高亮，歌词表的偏移量为当前p的位置和父容器lines的差值，使用transformY进行偏移。<br>
注意：监听事件要用事件委托监听，因为里面的元素会刷新，不是一直都在<br>
audio支持的ended、ontimeupdate事件不能冒泡，不能用事件委托，所以在创建元素后进行监听
### 10. 关于手机调试
利用开启server，利用http访问相同网址，手机上没有log，可以用alert代替log<br>
alert+window.onerror进行错误调试或者用腾讯的vconsole

