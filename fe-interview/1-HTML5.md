# HTML5面试题

[TOC]



### doctype 的意义是什么

- 让浏览器以标准模式渲染
- 让浏览器知道元素的合法性


### HTML XHTML HTML5的关系

- HTML宽松，XHTML严格，HTML5宽松

- HTML 属于 SGML

- XHTML 属于 XML，是HTML进行 XML 严格化的结果

- HTML5不属于SGML或XML，比XHTML宽松


### HTML5有什么变化

- 新的语义化元素 `<section><article><header><footer><main><aside>`

- 表单增强 placeholder calender、date、time、email、url、search

- 新的 API（离线、音视频 video midia、图形 canvas、实时通信、本地存储 localStorage sessionStorage、设备能力）

- 分类和嵌套变更(以前按内容分类block、inline、inline-block，现在按content内容分，比较多)


### `<em>`和`<i>`有什么区别

- em是语言化的标签，表强调

- i是纯样式的标签，表斜体

- HTML5中i不推荐使用，一般用作图标

### 语义化的意义是什么

- 开发者容易理解

- 机器容易理解结构（搜索、读屏软件）

- 有助于SEO

### 哪些元素可以自闭合

表单元素input，图片 img，br hr，head部分的meta link

### HTML和DOM的关系

HTML是是最终结果，DOM由HTML解析而来，JS可以维护DOM

### property和attribute的区别

首先，他俩没关系，attribute是html的属性的，可通过元素.`getAttribute()`和`setAttribute()`获取和修改属性，property是由JS对象控制，进行属性的获取和修改。

### form的作用有哪些

- 直接提交表单

- 使用submit/reset按钮

- 便于浏览器保存表单

- 第三方库可以整体提取值

- 第三方库进行表单验证


### meta  viewport 是做什么用的，怎么写？

```html
 <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

### canvas元素是干什么的？

html

```html
<canvas id="tutorial" width="150" height="150"></canvas>
```

JavaScript

```javascript
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); // 渲染上下文
let width = ctx.canvas.width //画布宽
let height = ctx.canvas.height // 画布高
let r = width / 2  // 圆半径
ctx.translate(r, r)  // 移动开始点
ctx.beginPath()   // 开始画
ctx.lineWidth = 10   // 线宽
ctx.arc(0, 0, r - 5, 0, 2* Math.PI, false)
ctx.stroke()  // 画线
ctx.fill() // 填充
ctx.fillStyle = 'green';// 上下文颜色
ctx.fillRect(10, 10, 100, 100);// 上下文位置和宽高
```



### 谈谈你对canvas的理解？

canvas是HTML5中新增一个HTML5标签与操作canvas的javascript API，它可以实现在网页中完成动态的2D与3D图像技术。`<canvas>` 标记和 SVG以及 VML 之间的一个重要的不同是，`<canvas>` 有一个基于 JavaScript 的绘图 API，而 SVG 和 VML 使用一个 XML 文档来描述绘图。SVG 绘图很容易编辑与生成，但功能明显要弱一些。

canvas可以完成动画、游戏、图表、图像处理等原来需要Flash完成的一些功能。

### `<canvas>` 标记和 SVG 以及 VML 之间的差异

- `<canvas>` 标记和 SVG 以及 VML 之间的一个重要的不同是，`<canvas>` 有一个基于 JavaScript 的绘图 API，而 SVG 和 VML 使用一个 XML 文档来描述绘图。

- 这两种方式在功能上是等同的，任何一种都可以用另一种来模拟。从表面上看，它们很不相同，可是，每一种都有强项和弱点。例如，SVG 绘图很容易编辑，只要从其描述中移除元素就行。

- 要从同一图形的一个 `<canvas>` 标记中移除元素，往往需要擦掉绘图重新绘制它。


### canvas与svg的区别

- canvas是h5提供的新的绘图方法 

- svg已经有了十多年的历史

- canvas画图基于像素点，是位图，如果进行放大或缩小会失真 

- svg基于图形，用html标签描绘形状，放大缩小不会失真

- canvas需要在js中绘制 

- svg在html正绘制

- canvas支持颜色较svg多

- canvas无法对已经绘制的图像进行修改、操作 

- svg可以获取到标签进行操作