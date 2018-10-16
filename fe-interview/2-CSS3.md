# CSS3面试题

[TOC]

## 基础问题

### css选择器有哪些

**基本选择器**

基本选择器： id、类、元素、通配符选择器

| 序号 | 选择器      | 含义                                           |
| ---- | ----------- | ---------------------------------------------- |
| 1.   | *****       | 通用元素选择器，匹配任何元素                   |
| 2.   | **E**       | 标签选择器，匹配所有使用E标签的元素            |
| 3.   | **.info**   | class选择器，匹配所有class属性中包含info的元素 |
| 4.   | **#footer** | id选择器，匹配所有id属性等于footer的元素       |

**多元素的组合选择器** 

组合选择器 ：多组、后代、子代、兄弟选择器

| 序号 | 选择器 | 含义                                                         |
| ---- | ------ | ------------------------------------------------------------ |
| 5.   | E,F    | 多元素选择器，同时匹配所有E元素或F元素，E和F之间用逗号分隔   |
| 6.   | E F    | 后代元素选择器，匹配所有属于E元素后代的F元素，E和F之间用空格分隔 |
| 7.   | E > F  | 子元素选择器，匹配所有E元素的子元素F                         |
| 8.   | E + F  | 毗邻元素选择器，匹配所有紧随E元素之后的同级元素F             |

**CSS 2.1 属性选择器** 

| 序号 | 选择器       | 含义                                                         |
| ---- | ------------ | ------------------------------------------------------------ |
| 9.   | E[att]       | 匹配所有具有att属性的E元素，不考虑它的值。（注意：E在此处可以省略，比如"[cheacked]"。以下同。） |
| 10.  | E[att=val]   | 匹配所有att属性等于"val"的E元素                              |
| 11.  | E[att~=val]  | 匹配所有att属性具有多个空格分隔的值、其中一个值等于"val"的E元素 |
| 12.  | E[att\|=val] | 匹配所有att属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以"val"开头的E元素，主要用于lang属性，比如"en"、"en-us"、"en-gb"等等 |

**CSS 2.1中的伪类** 

| 序号 | 选择器        | 含义                                    |
| ---- | ------------- | --------------------------------------- |
| 13.  | E:first-child | 匹配父元素的第一个子元素                |
| 14.  | E:link        | 匹配所有未被点击的链接                  |
| 15.  | E:visited     | 匹配所有已被点击的链接                  |
| 16.  | E:active      | 匹配鼠标已经其上按下、还没有释放的E元素 |
| 17.  | E:hover       | 匹配鼠标悬停其上的E元素                 |
| 18.  | E:focus       | 匹配获得当前焦点的E元素                 |
| 19.  | E:lang(c)     | 匹配lang属性等于c的E元素                |

**CSS 2.1中的伪元素** 

| 序号 | 选择器         | 含义                      |
| ---- | -------------- | ------------------------- |
| 20.  | E:first-line   | 匹配E元素的第一行         |
| 21.  | E:first-letter | 匹配E元素的第一个字母     |
| 22.  | E:before       | 在E元素之前插入生成的内容 |
| 23.  | E:after        | 在E元素之后插入生成的内容 |

**CSS 3的同级元素通用选择器** 

| 序号 | 选择器 | 含义                           |
| ---- | ------ | ------------------------------ |
| 24.  | E ~ F  | 匹配任何在E元素之后的同级F元素 |

**CSS 3 属性选择器** 

| 序号 | 选择器        | 含义                             |
| ---- | ------------- | -------------------------------- |
| 25.  | E[att^="val"] | 属性att的值以"val"开头的元素     |
| 26.  | E[att$="val"] | 属性att的值以"val"结尾的元素     |
| 27.  | E[att*="val"] | 属性att的值包含"val"字符串的元素 |

**CSS 3中与用户界面有关的伪类** 

| 28.  | E:enabled    | 匹配表单中激活的元素                                      |
| ---- | ------------ | --------------------------------------------------------- |
| 29.  | E:disabled   | 匹配表单中禁用的元素                                      |
| 30.  | E:checked    | 匹配表单中被选中的radio（单选框）或checkbox（复选框）元素 |
| 31.  | E::selection | 匹配用户当前选中的元素                                    |

**CSS 3中的结构性伪类** 

| 序号 | 选择器                | 含义                                                         |
| ---- | --------------------- | ------------------------------------------------------------ |
| 32.  | E:root                | 匹配文档的根元素，对于HTML文档，就是HTML元素                 |
| 33.  | E:nth-child(n)        | 匹配其父元素的第n个子元素，第一个编号为1                     |
| 34.  | E:nth-last-child(n)   | 匹配其父元素的倒数第n个子元素，第一个编号为1                 |
| 35.  | E:nth-of-type(n)      | 与:nth-child()作用类似，但是仅匹配使用同种标签的元素         |
| 36.  | E:nth-last-of-type(n) | 与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素   |
| 37.  | E:last-child          | 匹配父元素的最后一个子元素，等同于:nth-last-child(1)         |
| 38.  | E:first-of-type       | 匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1) |
| 39.  | E:last-of-type        | 匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1) |
| 40.  | E:only-child          | 匹配父元素下仅有的一个子元素，等同于:first-child:last-child或 :nth-child(1):nth-last-child(1) |
| 41.  | E:only-of-type        | 匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type或 :nth-of-type(1):nth-last-of-type(1) |
| 42.  | E:empty               | 匹配一个不包含任何子元素的元素，注意，文本节点也被看作子元素 |

**CSS 3的反选伪类** 

| 序号 | 选择器   | 含义                           |
| ---- | -------- | ------------------------------ |
| 43.  | E:not(s) | 匹配不符合当前选择器的任何元素 |

**CSS 3中的 :target 伪类** 

| 序号 | 选择器   | 含义                           |
| ---- | -------- | ------------------------------ |
| 44.  | E:target | 匹配文档中特定"id"点击后的效果 |

### css样式（选择器）的优先级

- 计算权重确定

  - ID 选择器 #id{} + 100 

  - 类 属性 伪类 + 10 
  - 元素 伪元素 + 1 
  - 其它选择器 + 0 
  - 注意:计算不越级(1个ID > 11个class)

- !important

- 内联样式

- 后写的优先级高

### css sprite是什么,有什么优缺点

概念：将多个小图片拼接到一个图片中。通过background-position和元素尺寸调节需要显示的背景图案。

优点：

1. 减少HTTP请求数，极大地提高页面加载速度
2. 增加图片信息重复度，提高压缩比，减少图片大小
3. 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现

缺点：

1. 图片合并麻烦
2. 维护麻烦，修改一个图片可能需要从新布局整个图片，样式

### 自定义字体的使用场景

- 宣传/品牌/banner等固定文案
- 字体图标

### base64的使用

- 用于减少HTTP请求
- 适用于小图片
- base64的体积约为原图4/3

### 伪类和伪元素的区别？

- 伪类表状态 :hover :visited :active
- 伪元素是真的有元素 ::before ::after
- 前者单冒号，后者双冒号

### 如何美化checkbox

- label[for]和id
- 隐藏原生input
- :checked + label

### css reset 和normalize.css 有什么区别？

- reset 重置，之前的样式我不要，a{color: red;}，抛弃默认样式
- normalize 让所有浏览器的标签都跟标准规定的默认样式一致，各浏览器上的标签默认样式基本统一。

### `link`与`@import`的区别

1. ``link``是HTML方式， ``@import``是CSS方式
2. ``link``最大限度支持并行下载，``@import``过多嵌套导致串行下载，出现[FOUC](http://www.bluerobot.com/web/css/fouc.asp/)
3. ``link``可以通过``rel="alternate stylesheet"``指定候选样式
4. 浏览器对``link``支持早于``@import``，可以使用``@import``对老浏览器隐藏样式
5. ``@import``必须在样式规则之前，可以在css文件中引用其他文件
6. 总体来说：**[link优于@import](http://www.stevesouders.com/blog/2009/04/09/dont-use-import/)**

### CSS有哪些继承属性

- 关于文字排版的属性如：
  - [font](https://developer.mozilla.org/en-US/docs/Web/CSS/font)
  - [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)
  - [letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)
  - [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
  - [text-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering)
  - [word-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing)
  - [white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  - [text-indent](https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent)
  - [text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)
  - [text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)
- [line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
- [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
- [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
- [cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)

### 什么是FOUC?如何避免

Flash Of Unstyled Content：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。**解决方法**：把样式表放到文档的`head`

## 布局

### 实现两栏（三栏）布局的方法

table、float、flexbox、absolute、grid、inline-block

### 不同布局优缺点

- 浮动float方案：脱离文档流，需要清浮动，兼容性比较好
- 绝对定位absolute方案：好处，快捷；缺点：脱离文档流，可使用性比较差
- 弹性盒子flex方案：css3新出的，移动端常用；pc端，ie8不支持flex
- 表格table方案：兼容性非常好，缺点，一个单元格高度变了，其他也会变
- 网格grid方案：代码量少

### position:absolute/fixed有什么区别？

- 前者相对最近的absolute/relative
- 后者相对屏幕（viewport）

### display:inline-block的间隙

- 原因：空白字符
- 解决：消灭字符（注释/紧挨）或消灭间距（font-size:0）

### 如何清除浮动

- 让盒子负责自己的布局
- 创建BFC

```css
overflow:hidden;/* 或auto */
```

- 父元素添加clearfix类

```css
.clearfix::after{
    content:'';
    display:'block';
    clear:both;
}
```

### 如何适配移动端页面？

- head部分添加 viewport
- rem/viewport/media query
- 设计上：隐藏 折行 自适应

### 如何居中？

- 水平居中
  - 内联：爸爸身上写 text-align:center;
  - 块级：margin-left: auto; margin-right: auto;
- 垂直居中
  - 内联 padding-top===pading-bottom,height===line-height
  - 块级 flex布局：display:flex;flex:align-items:center;
  - absolute: position:absolute;top:50%;transform:translateY(-50%);

### `display: none;`与`visibility: hidden;`的区别

联系：它们都能让元素不可见

区别：

1. display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
2. display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility: hidden;是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式
3. 修改常规流中元素的display通常会造成文档重排。修改visibility属性只会造成本元素的重绘。
4. 读屏器不会读取display: none;元素内容；会读取visibility: hidden;元素内容

1. 总体来说：**[link优于@import](http://www.stevesouders.com/blog/2009/04/09/dont-use-import/)**

### ``display: block;``和``display: inline;``的区别

``block``元素特点：

1.处于常规流中时，如果``width``没有设置，会自动填充满父容器
2.可以应用``margin/padding``
3.在没有设置高度的情况下会扩展高度以包含常规流中的子元素
4.处于常规流中时布局时在前后元素位置之间（独占一个水平空间）
5.忽略``vertical-align``

``inline``元素特点

1.水平方向上根据``direction``依次布局
2.不会在元素前后进行换行
3.受``white-space``控制
4.``margin/padding``在竖直方向上无效，水平方向上有效
5.``width/height``属性对非替换行内元素无效，宽度由元素内容决定
6.非替换行内元素的行框高由``line-height``确定，替换行内元素的行框高由``height``,``margin``,``padding``,``border``决定
6.浮动或绝对定位时会转换为``block``
7.``vertical-align``属性生效

## 盒模型

### css如何设置这两种模型

- box-sizing:content-box;默认标准模型
- box-sizing:border-box; IE模型

### JS如何设置获取盒模型对应的宽和高

- dom.style.width/height 只能去内联样式的宽高
- dom.currentStyle.width/height 浏览器及时运行的结果，只有ie支持
- window.getComputedStyle(dom).width/height兼容性更好
- dom.getBoundingClientRect().width/heght根据视窗计算元素的绝对位置，拿到left,right,top,bottom，再拿到宽高
- 如果你需要获得相对于整个网页左上角定位的属性值，那么只要给top、left属性值加上当前的滚动位置（通过window.scrollX和window.scrollY）为了跨浏览器兼容，请使用 window.pageXOffset 和 window.pageYOffset 代替 window.scrollX 和 window.scrollY

### BFC（边距重叠解决方案）

**BFC的基本概念**：块级格式化上下文

**BFC的原理**：BFC的渲染规则，1.BFC的元素垂直方向边距会发生重叠2.BFC的区域不会与浮动元素的box重叠,可以清浮动3.BFC在页面上是一个独立的容器，内外元素不会相互影响4.计算BFC高度时，浮动元素也会参与计算

**如何创建BFC**：

- float值不为none,
- postion值不为static，relative
- display：table-caption/table-cell/table,
- overflow值不为visible（hidden,auto都可以）

**BFC的使用场景**

- 解决边距重叠 

  ```html
  <!-- BFC垂直方向边距重叠 -->
  <section id="margin">
      <style>
          #margin{
              background: pink;
              overflow: hidden;
          }
          #margin>p{
              margin: 5px auto 25px;
              background: red;
          }
      </style>
      <p>1</p>
      <div style="overflow:hidden">
          <p>2</p>
      </div>
      <p>3</p>
  </section>
  ```

- BFC不与float重叠 

  ```html
  <!-- BFC不与float重叠 -->
  <section id="layout">
      <style media="screen">
          #layout{
              background: red;
          }
          #layout .left{
              float: left;
              width: 100px;
              height: 100px;
              background: pink;
          }
          #layout .right{
              height: 110px;
              background: #ccc;
              overflow: auto;
          }
      </style>
      <div class="left"></div>
      <div class="right"></div>
  </section>
  ```

- BFC清浮动，BFC子元素即使是float也会计算高度 

  ```html
  <!-- BFC子元素即使是float也会参与计算 -->
  <section id="float">
      <style media="screen">
          #float{
              background: red;
              overflow: auto;
              /*float: left;*/
          }
          #float .float{
              float: left;
              font-size: 30px;
          }
      </style>
      <div class="float">我是浮动元素</div>
  </section>
  ```

## 图片类

### PNG,GIF,JPG的区别及如何选

参考资料： [选择正确的图片格式](http://www.yuiblog.com/blog/2008/11/04/imageopt-2/)
**GIF**:

1. 8位像素，256色
2. 无损压缩
3. 支持简单动画
4. 支持boolean透明
5. 适合简单动画

**JPEG**：

1. 颜色限于256
2. 有损压缩
3. 可控制压缩质量
4. 不支持透明
5. 适合照片

**PNG**：

1. 有PNG8和truecolor PNG
2. PNG8类似GIF颜色上限为256，文件小，支持alpha透明度，无动画
3. 适合图标、背景、按钮

## 效果类

### 如何用一个div画xxx 

- box-shadow无限投影
- ::before
- ::after

### 如何产生不占空间的边框

- box-shadow
- outline

### 如何实现圆形元素（头像）

border-radius:50%;

### 如何实现ios图标的圆角

clip-path:(svg)

### 如何实现半圆、扇形等图形

- border-radius组合：
  - 有无边框
  - 边框粗细
  - 圆角半径

### 如何实现背景图居中显示/不重复/改变大小

- background-position
- background-repeat
- background-size(cover/contain)

### 如何平移/放大一个元素

- transform:translateX(100px)
- transform:scale(2)

### 如何实现3D效果

1. perspective:500px
2. transform-style:preserve-3d;
3. transform:translate rotate…

## 动画类

### css动画的实现方式有几种

- transition
- keyframes(animation)

### 过渡动画和关键帧动画的区别

- 过渡动画需要有状态变化
- 关键帧动画不需要状态变化
- 关键帧动画能控制更精细

### 如何实现逐帧动画

- 使用关键帧动画
- 去掉补间（steps）

css动画的性能

- 性能不坏
- 部分情况优于JS
- 但 JS可以做到更好
- 部分高危属性
  - box-shadow等

## 预处理器

### 常见的css预处理器

- Less(Node.js)
- Sass(Ruby 有Node版本)

### 预处理器的作用

- 帮助更好地组织css代码
- 提高代码复用率
- 提升可维护性

### 预处理器的能力

- 嵌套 反应层级和约束
- 变量和计算 减少重复代码
- Extend和Mixin 代码片段
- 循环 适用于复杂有规律的样式
- import css文件模块化

### 预处理器的优缺点

- 优点：提高代码复用率和可维护性
- 缺点：需要引入编译过程 有学习成本

## Bootstrap

### Bootstrap的优缺点

**优点**：css代码结构合理 现成的样式可以直接用

**缺点**：定制较为繁琐 体积大

### Bootstrap如何实现响应式布局

**原理**：通过 media query设置不同分辨率的class

**使用**：为不同分辨率选择不同的网格class

### 如何基于Bootstrap定制自己的样式

- 使用css同名类覆盖
- 修改源码重新构建
- 引入scss源文件 修改变量

## css工程化

### 如何解决CSS模块化问题

- Less Sass等CSS预处理器
- PostCSS插件(postcss-import/precss等）
- webpack处理CSS(css-loader+style-loader)

### PostCSS可以做什么？

- 取决于插件可以做什么
- autoprefixer cssnext precss等 兼容性处理
- import模块合并
- css语法检查 兼容性检查
- 压缩文件

### CSS modules是做什么的，如何使用

- 解决类名冲突的问题
- 使用PostCSS或者webpack等构建工具进行编译
- 在HTML模板中使用编译过程产生的类名

### 为什么使用JS来引用、加载CSS

- JS作为入囗，管理资源有天然优势
- 将组件的结构、样式、行为封装到一起，增强内聚
- 可以做更多处理(webpack)

