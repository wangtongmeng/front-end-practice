# 课程导学

## 最简单的例子

输入URL打开网页

AJAX获取数据

img标签加载图片

## Cache-Control

public、private

must-revalidate

no-cache、no-store

## 缓存验证

last-modified配合if-modified-since

etag配合if-none-match

更多有意义的头

Content-Type、content-Encoding等用来约束数据类型

Cookie保持会话信息

CORS实现跨域并保持安全性限制

## 深入到TCP

什么是三次握手

HTTPS链接的创建过程，以及为什么HTTPS就是安全的

什么是场链接，为什么需要长链接

HTTP2的信道复又为什么能提高性能

## 深入到TCP

![1537270692254](C:\Users\wangtongmeng\Desktop\myBlog\source\_posts\web前端\8-HTTP\从浏览器地址栏输入url到显示页面的步骤\input-url-http-brower.png)

## 讲课过程

实例演示

图片配合

Nginx使用

# HTTP协议基础及发展历史

## 5层网络模型介绍

![1537271311612](C:\Users\WANGTO~1\AppData\Local\Temp\1537271311612.png)

### 低三层

**物理层**主要作用是定义物理设备如何传输数据

**数据链路层**在通信的实体间建立数据链路连接

**网络层**为数据在结点之间传输创建逻辑链路

### 传输层

向用户提供可靠的端到端（End一to一End）服务

传输层向高层屏蔽了下层数据通信的细节

### 应用层

为应用软件提供了很多服务

构建于TCP协议之上

屏蔽网络传输相关细节

## HTTP协议的发展历史

### HTTP/0.9

只有一个命令GET

没有HEADER等描述数据的信息

服务器发送完毕，就关闭TCP连接

### HTTP/1.0

增加了很多命令

增加statuscode和header

多字符集支持、多部分发送、权限、缓存等

### HTTP/1.1

持久连接

pipeline

增加host和其他一些命令

### HTTP2

所有数据以二进制传输

同一个连接里面发送多个请求不再需要按照顺序来

头信息压缩以及推送等提高效率的功能 

## HTTP的三次握手

![1537272503172](C:\Users\WANGTO~1\AppData\Local\Temp\1537272503172.png)

http 1.0 请求一次 tcp连接一次（有三次握手）

http 1.1 请求多次 tcp 保持连接（第二次请求，没有三次握手的开销）

http2.0 请求并发，同一个用户，访问网页只需要一次 tcp 链接

![1537272771422](C:\Users\WANGTO~1\AppData\Local\Temp\1537272771422.png)

为了防止服务端开启无用的连接，如，如果只有一次握手，客户端发送请求，服务端开启连接，由于网络问题，客户端没接收信息，关闭了，服务端会一直开着，形成无用连接。

## URI-URL和URN

### URI

Uniform Resource Identifier/统一资源标志符

用来唯一标识互联网上的信息资源

包括URL和URN

### URL

Uniform Resource Locator / 统一资源定位器

http://user:pass@host.com:80/path?query=string#hash

此类格式的都叫做URL，比如ftp协议 

### URN

永久统一资源定位符

在资源移动之后还能被找到

目前还没有非常成熟的使用方案

## HTTP报文格式

![1537274496705](C:\Users\WANGTO~1\AppData\Local\Temp\1537274496705.png)

### HTTP方法

用来定义对于资源的操作

常用有GET、POST等

从定义上讲有各自的语义

### HTTP CODE

定义服务器对请求的处理结果

各个区间的CODE有各自的语义

好的HTTP服务可以通过CODE判断结果

## 创建一个最简单的web服务  

进入文件目录，命令行 node server.js，打开网页 localhost:8888即可。

```js
// server.js
const http = require('http')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    response.end('123')
}).listen(8888)

console.log('server listening on 8888')
```

# HTTP各种特性总览

## 认识HTTP客户端

只有能实现HTTP报文，就是HTTP客户端

浏览器是最常用的HTTP客户端

curl 也是

## CORS跨域请求的限制与解决

创建两个服务器，进入对应目录，命令行 node server.js，node server2.js，启动服务器。

server.js 会读取 test.html，在8888端口显示，test.html发送跨域请求8887服务器，server2.js通过设置`'Access-Control-Allow-Origin': 'http://127.0.0.1:8888'`允许跨域。

浏览器认为localhost和127.0.0.1不同，所以本地用127.0.0.1

```js
// server.js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html', 'utf8') // 注意设置 utf8，这样读取的是字符串，否则是二进制的数据
  response.writeHead(200, {
    'Content-Type': 'text/html' // 不设置的话，浏览器会直接显示，不解析；默认浏览器会加上
  })
  response.end(html)
}).listen(8888)

console.log('server listening on 8888')
```

```js
// server2.js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, { // 不设置这个头，浏览器还是会发送请求，并接收内容，浏览器检查head头，如果没有'Access-Control-Allow-Origin'，并且设置为允许，浏览器会把本次请求返回的内容会略掉，并且报错。
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8888', // 允许 8888 的域名访问，*也可以（不够安全）
  })
  response.end('123')
}).listen(8887)

console.log('server listening on 8887')
```

**添加多个头**

通过判断 request.url 来判断是否添加不同的 head 头。

**JSONP**

浏览器允许 link img script中的src或href进行跨域请求，JSONP的原理就是在script标签中，加载链接，链接访问了服务器某个请求，并返回了内容，服务器返回的内容是可控的，可以在服务器返回内容中的script标签中写一段可执行的JS代码，然后调用JSONP发起请求的一些内容。

```js
// test.html
<script src="http://127.0.0.1:8887/"></script>
```

这样不设置8887的head头，也可以进行跨域，得到请求内容。

## CORS跨域限制以及预请求验证

### **CORS跨域限制**

主要包括 methods content-type 和 请求头的限制。

**允许方法**

默认允许方法 GET HEAD POST，其他的方法 PUT DELETE 默认是不允许的。

允许Content-Type

text/plain

multipart/form-data

application/x-www-form-urlencoded

除了这三种，其他的 Content-Type 也需要使用预请求验证后，才能发送。

**其他限制**

**请求头限制**

请求头限制,自定义的请求头默认是不允许的，也需要验证；官方文档，关于请求头的详细信息https://fetch.spec.whatwg.org/#cors-safelisted-request-header

XMLHttpRequestUpload 对象均没有注册任何事件监听器（很少用）

请求中没有使用 ReadableStream 对象（很少用）

### **CORS预请求**

#### demo

8888下的 test.html 发送的请求携带了自定义请求头，从浏览器看请求发送成功，返回状态码200，但是浏览器会报错，不允许跨域，数据虽然返回，但被浏览器忽略了。

```js
// server.js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html', 'utf8') 
  response.writeHead(200, {
    'Content-Type': 'text/html' 
  })
  response.end(html)
}).listen(8888)

console.log('server listening on 8888')
```

```js
// server2.js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, { 
    'Access-Control-Allow-Origin': '*'
  })
  response.end('123')
}).listen(8887)

console.log('server listening on 8887')
```

```html
<script>
  fetch('http://localhost:8887', { // 发送请求
    method: 'POST',
    headers: { // 一个自定义的头
      'X-Test-Cors': '123'
    }
  })
</script>
```

#### 实现预请求

```js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, { 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors' // 服务端添加允许自定义请求头
  })
  response.end('123')
}).listen(8887)

console.log('server listening on 8887')
```

查看network，会发现多了一个请求文件localhost，它的 Request Method 请求方法是 OPTIONS，其他的很正常请求一样，通过 OPTIONS 请求获得服务端允许发送请求的认可。之后再实际发送 POST 请求。

#### 允许其他请求方法

```js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE' // 允许使用被限制的请求方法
  })
  response.end('123')
}).listen(8887)

console.log('server listening on 8887')
```

#### 跨域请求时间

比如第一次请求，network观察文件，会有 Method 是 OPTIONS 的预请求文件，再次刷新网页发送请求，这个文件就不会再发送了，不会出现在 network 列表中。

```js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
    'Access-Control-Max-Age': '1000' // 1000s之内，不需要再发送预请求进行验证了，时间内直接发正式请求
  })
  response.end('123')
}).listen(8887)

console.log('server listening on 8887')
```

浏览器希望通过限制保证服务端的安全

## 缓存头Cache-Control的含义和使用

### Cache-Control 的含义

#### 可缓存性

**public**，http 请求返回的过程当中，在 cache-control 中设置这个值，代表 http 请求返回的内容所经过的任何路径当中（包括中间一些http代理服务器以及发出请求的客户端浏览器），都可以对返回内容进行缓存操作。

**private**，代表只有发起请求的浏览器才可以进行缓存

**no-cache**，可以在本地进行缓存，但每次发请求时，都要向服务器进行验证，如果服务器允许，才能使用本地缓存。

#### 到期

**max-age=<seconds>**，缓存多少秒后过期，过期之后浏览器才会再次发送请求。

**s-maxage=<seconds>**,浏览器基本用不到，会代替 max-age，但只有在代理服务器中才会生效。在代理服务器中，如果都设置了 max-age，s-maxage，还是会读取 s-maxage。

**max-stale=<seconds>**，浏览器基本用不到，当 max-age 过期后，如果返回资源中有 max-stale 的设置。max-stale 是发起请求方主动携带的头，即使 max-age 过期，只要 max-stale 没过期，可以继续使用缓存资源，不需要重新请求。浏览器主动设置这个头，只有在发起端才有用。

#### 重新验证

**must-revalidate**，浏览器可能会用到，如果 max-age 过期，需要重新发送请求，获取这部分数据，再来验证数据是否真的过期，而不能直接使用本地缓存。

**proxy-revalidate**，用在缓存服务器中，指定缓存服务器过期后，必须向源服务器重新请求，不能直接使用本地缓存。

#### 其他

**no-store**，本地和代理服务器都不可以存储缓存，每次都要重新请求，拿到内容。

**no-transform**，主要是用在 proxy 服务器，不允许进行格式转换。

### Cache-Control 的使用

浏览器缓存

通过 Cache-Control 以及 max-age 设置，达到长缓存的效果。

启动服务器 node server.js，在 localhost:8888 打开，查看network，当设置 max-age 后，刷新页面，浏览器直接从缓存中进行读取，不去要再向服务器请求，达到缓存静态资源的目的。

**存在的问题**，服务端修改返回内容，客户端没有加载新的内容，因为请求 url 没变，浏览器会直接从缓存读取，不需要经过服务端验证，导致静态资源更新后，没有及时更新到客户端。

**解决方案**，打包静态资源时，根据内容进行 hash 计算，生成文件名的 hash 码。内容变，hash 码变，请求资源 url 变，浏览器重新请求加载资源，达到更新缓存的目的。

```js
// server.js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if (request.url === '/script.js') {
    response.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=200' // 浏览器缓存时间
    })
    response.end('console.log("script loaded twice")')
  }
}).listen(8888)

console.log('server listening on 8888')
```

```js
// test.html
<script src="/script.js"></script>
```

max-age可以接收很多值，如 'Cache-Control': 'max-age=200, public'

## 缓存验证Last-Modified和Etag的使用

### 资源验证

![1537341815222](C:\Users\WANGTO~1\AppData\Local\Temp\1537341815222.png)

### 验证头

Last-Modified

Etag

#### Last-Modified

上次修改时间。

配合If-Modified-Since或If-Unmodified-Since使用，通常浏览器使用前者。

服务器对比上次修改时间以验证资源是否需要更新。

#### Etag

数据签名，资源内容会对应有一个唯一的签名，如果资源数据更改，签名也会变。

配合If-Match或者If-None-Match使用，其值就是服务端返回的 Etag 值

对比资源的签名判断是否使用缓存

### 验证头的使用

服务器设置 Last-Modifed 和 Etag 的值，浏览器请求会携带这两个头，在请求头中，会有 If-Modified-since: Last-Modifed值 和 If-None-Match: Etag值。

这时 response 中是有内容的，这里希望服务器不返回实际的内容，只需要告诉浏览器直接读取缓存即可。通过在服务器端进行判断。

这时查看 respones 发现还是有内容，这个内容是 Chrome 浏览器 从缓存中读取显示出来的，服务器没有返回内容。

如何判断服务端通过验证，但是从缓存读取的呢，通过服务器设置 HTTP Code 304，Not Modified 表示资源没有修改，直接读缓存，这时就会忽略服务端返回的内容。

Chrome 浏览器 控制台 勾上 Disable cache，刷新页面，发送的请求中就不包括和缓存相关的头了

```js
// server.js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if (request.url === '/script.js') {
    console.log(request.headers)
    const etag = request.headers['if-none-match']
    if(etag === '777') {
      response.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-cache',
        'Last-Modified': '123',
        'Etag': '777'
      })
      response.end('') // 这里不传任何内容，即使有内容，浏览器也不会读取
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-cache', // 通过 no-cache，即使没过期浏览器也要向服务器验证，不会从缓存读取。
        'Last-Modified': '123', // 随便设的值
        'Etag': '777'
      })
      response.end('console.log("script loaded twice")')
    } 
  }
}).listen(8888)

console.log('server listening on 8888')
```

```html
// test.html
<script src="/script.js"></script>
```

### no-cache

不从缓存读取

```js
'Cache-Control': 'max-age=2000000, no-cache', // 通过 no-cache，即使没过期浏览器也要向服务器验证，不会从缓存读取。
```

### no-store

设置 no-store，即使服务器下发了缓存相关头，浏览器也会忽略任何和缓存相关的信息，发送请求不会携带相关头，直接去请求最新的数据。

Chrome浏览器->右上角->更多工具->清理浏览器缓存

```js
'Cache-Control': 'max-age=2000000, no-store'
```

## cookie和session

### Cookie

#### 什么是 Cookie

在服务端返回数据时，通过**设置 Set-Cookie 头**到浏览器中，并保存到浏览器的内容，这个内容就是 Cookie。

浏览器保存 Cookie 之后，在**下次同域的请求当中，就会带上这个 Cookie**，实现用户访问网站的会话当中的数据是一致的。可以**设置多个 Cookie**，以键值对的方式保存在浏览器。

**通过 Set-Cookie设置**

**下次请求会自动带上**

**键值对，可以设置多个**

#### Cookie 属性

**max-age** 和 **expires** 设置过期时间

**Secure** 只在 https 的时候发送

**HttpOnly** 无法通过 document.cookie 访问，基于安全性考虑，如 csrf 攻击，通过在用户网页注入脚本或 url，引导用户给攻击者的服务器发送用户使用网站的 Cookie，攻击者拿到用户登录状态，并利用 Cookie 访问网站保存的用户数据。所以**禁止重要数据通过 JS 进行访问，是保证用户数据安全非常重要的一步**。

#### Cookie 的使用

##### 通过 JS 访问 Cookie 的内容。

命令行 node server.js 启动服务器，8888端口打开网页。

服务器通过 Set-Cookie 设置 Cookie 的值。

控制台->application->Cookies，可以看到 Cookie 的信息。

network查看，localhost 文件请求头中有 Cookie，响应头中也有 Cookie，因为每次服务器都会下发。

通过 JS，**document.cookie** 可以拿到 Cookie 的值 123。

```js
// server.js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': '123' // 通过 Set-Cookie 设置 cookie 值
    })
    response.end(html)
  }

}).listen(8888)

console.log('server listening on 8888')
```

```html
// test.html
<script>
  console.log(document.cookie)
</script>
```

##### 返回多个 Cookie

在 network 中，localhost 文件的响应头中有两个 Set-Cookie头，说明服务器下发了多个 Cookie，并且在 Response Headers 中是可以重复的。

在 application 的 Cookies 中 可以看到两条 cookie 数据。

```js
'Set-Cookie': ['123','abc=456'] // nodejs中通过数组的形式设置多个 Cookie
```

##### Cookie 时效

Cookie 有时效性。

如果没有设置过期时间，当浏览器关闭之后，Cookie 消失。第一次访问时，查看 network发现并没有 Cookie，刷新后会带上 Cookie。application 中是有数据的，这个是浏览器下发的。

##### 设置 Cookie 过期时间

通过 **max-age** 设置过期时间

```js
'Set-Cookie': ['id=123;max-age=2','abc=456'] // 设置 id=123 的过期时间是 2s
```

刷新页面，network 中 localhost 

```js
Request Headers 

    Set-Cookie: id=123;max-age=2

    Set-Cookie: abc=456

Request Headers

    Cookie: id=123; abc=456

```

超过2s，再次刷新页面

```js
Request Headers 

    Set-Cookie: id=123;max-age=2

    Set-Cookie: abc=456

Request Headers

    Cookie: abc=456 // 123 过期了，所以请求不会带上
```

超过过期时间的 Cookie，浏览器发送请求时就不会带上了。

max-age 和 expires 是两种不同的写法，效果一样。**expires 是到什么时间点过期**。max-age 计算简单。

##### 禁止 JS 访问 Cookie

通过 **HttpOnly** 禁止 JS 访问 Cookie。

开发过程中，如果涉及到安全性问题，可以考虑禁用。

```js
'Set-Cookie': ['id=123;max-age=2','abc=456; HttpOnly'] // 给 abc=456 的 cookie 设置禁止 JS 访问
```

```html
// test.html
<script>
  console.log(document.cookie) // 通过 JS 只能拿到 id=123 了
</script>
```

##### 二级域名访问一级域名的 Cookie

**通过 Cookie 的 domain 设置**

Cookie 有访问域的权限设定，一般情况下，当前要访问的 Cookie 其他域是不能访问的，如 a.com 下的 Cookie，只有在 a.com 的域名下才能访问到，b.com 就不能访问。

对于同一个域名，Cookie 有更多的限制方案。a.com 有二级域名 test.a.com，可以让 test.a.com 访问到 a.com 下的 Cookie，**通过 domain 的方式**实现。

a.test.com 和 b.test.com 在系统的 host 中映射成 locahost，通过 HostAdmin App 完成映射。把两个域名映射到 127.0.0.1

![1537411618130](C:\Users\WANGTO~1\AppData\Local\Temp\1537411618130.png)

hosts文件无法更改解决方案，[win8.1/win10无法修改编辑保存hosts文件怎么办](https://jingyan.baidu.com/article/cbcede073380fb02f40b4d84.html)。

这样通过 a.test.com:8888 和 b.test.com:8888可以进行访问了。

a.test.com:8888 在 application 的 Cookies 下 可以看到 Cookie。

b.test.com:8888 在 application 的 Cookies 下 看不到 Cookie，因为服务端没有设置。

如何让二级域名都能访问到一级域名下的 Cookie 呢

通过 domain 来设置

```js
// server.js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const host = request.headers.host

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    if (host === 'test.com:8888') { // 注意这里是一级域名
      response.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': ['id=123','abc=456;domain=test.com'] // 给 abc=456 设置 domain
      })
    }
    response.end(html)
  }
}).listen(8888)

console.log('server listening on 8888')
```

访问一级域名 test.com:8888 可以看到两个 Cookie。

访问二级域名 a.test.com:8888 可以看到 abc=456 的 Cookie ，并且每次请求都会带上。

### Session

session 有很多种实现方法，在网站当中最经常用的是使用 Cookie 来保存 session。

把用户登录后的 Id 或者 session 的 key 设置到 Cookie 中，每个用户对应的值都不一样，当用户再次请求，服务端读取 Cookie 中的值，通过这个值拿到用户对应的唯一的 key，通过 key 来定位用户的信息，并做一系列的操作。

把用户 id 相关信息转化成对应的唯一 key，用户信息和 session key 的对应关系存在服务端的数据库或者缓存中。

请求时，服务端读取 session key ，再对应找到对应用户信息。

## HTTP长连接

### 长连接的概念

HTTP 的请求是在 TCP 连接的基础上发送的，而 TCP链接分为**长连接**和**短连接** 。

**长连接**：HTTP 发送请求时，要先创建一个 TCP 连接，并在 TCP 连接上把 HTTP 请求的内容发送并且接收完返回，这是一次请求完成，浏览器与服务器进行协商是否关闭 TCP 链接，若不关闭 TCP 连接会有一定的消耗，好处是如果还有请求可以直接在这个 TCP 连接上发送，不需要经过创建时三次握手的消耗。

**短连接**：若关闭 TCP 连接，下次请求需要重新创建，这时会有网络延迟的开销，好处是每次请求完关闭 TCP 连接，减少客户端和服务端连接的并发数。

实际情况中，网站的并发量比较大，如果每次都重新创建连接，导致创建过程发生太多，导致创建 TCP 连接的开销，比保持长连接还要高一些。而且长连接可以设置关闭时间，在一定时间内没有请求自动关闭。**一般情况都会保持长连接**。

### 百度示例

示例，打开百度首页，打开控制台-network，name那一行，右键选中 connection ID，代表 tcp 连接 的 id，根据他区分是否是同一个 tcp 连接。

### 长连接的使用

命令行 node server.js 启动服务，locahost:8888访问，查看 network的 connection ID 和 waterfall。

设置网速 fast 3G



```js
// server.js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html', 'utf8')
  const img = fs.readFileSync('test.jpg')
  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'image/jpg'
    })
    response.end(img)
  }

}).listen(8888)

console.log('server listening on 8888')
```

```html
// test.html
  <img src="/test1.jpg" alt="">
  <img src="/test2.jpg" alt="">
  <img src="/test3.jpg" alt="">
  <img src="/test4.jpg" alt="">
  <img src="/test5.jpg" alt="">
  <img src="/test6.jpg" alt="">
  <img src="/test7.jpg" alt="">
  <img src="/test11.jpg" alt="">
  <img src="/test12.jpg" alt="">
  <img src="/test13.jpg" alt="">
  <img src="/test14.jpg" alt="">
  <img src="/test15.jpg" alt="">
  <img src="/test16.jpg" alt="">
  <img src="/test17.jpg" alt="">
  <img src="/test111.jpg" alt="">
  <img src="/test112.jpg" alt="">
  <img src="/test113.jpg" alt="">
  <img src="/test114.jpg" alt="">
  <img src="/test115.jpg" alt="">
  <img src="/test116.jpg" alt="">
  <img src="/test117.jpg" alt="">
```

Chrome浏览器的 TCP 连接的并发限制，6个 TCP 连接后，第7个 TCP连接有新的 TCP 连接空出来

![1537491917704](C:\Users\WANGTO~1\AppData\Local\Temp\1537491917704.png)

默认是长连接

![1537492235560](C:\Users\WANGTO~1\AppData\Local\Temp\1537492235560.png)

##### 关闭长连接

通过设置 'Connection': 'close' 来关闭默认的长连接。

```js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html', 'utf8')
  const img = fs.readFileSync('test.jpg')
  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Connection': 'close' // 默认是 keep-alive
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Connection': 'close' // 默认是 keep-alive
    })
    response.end(img)
  }

}).listen(8888)

console.log('server listening on 8888')
```

没有重复利用 TCP 连接，并且每个 connection id 都不同

![1537492623588](C:\Users\WANGTO~1\AppData\Local\Temp\1537492623588.png)

正常情况下都是合理利用 Connection:'keep-alive'，并设置一个自动关闭时间，在服务端进行控制

### HTTP 2 信道复用

HTTP2 信道复用，在 TCP 连接上可以并发的发送 HTTP 请求，意味着链接网站是只需要一个 TCP 连接。google.com的页面都是用的 HTTP2。

它的 connection id 都是一个，注意，同域 id 才相同，不同域需要创建 tcp 连接，这样降低了开销，速度有质的提升。

![1537492941546](C:\Users\WANGTO~1\AppData\Local\Temp\1537492941546.png)

### 总结

http 请求是在 tcp 连接上发送的，一个 tcp 连接可以发送多个 http 请求

在 http 1.1 中 http 请求在 tcp 上进行发送有先后顺序，为了提高性能，需要使用并发 tcp 连接的方式。

在 http 2 中，可以在一个 tcp 连接上并发的发送 http 请求，所以只需要开一个 tcp 连接。

长连接的概念

## 数据协商

### 数据协商的概念

客户端发送请求给服务端，客户端会声明请求希望拿到的数据的格式和限制，服务端会根据请求头信息，来决定返回的数据。

### 分类

请求 Accept

返回 Content

### Accept

Accept 声明想要数据的类型

Accept-Encoding 数据以哪种编码方式传输，限制服务端如何进行数据压缩。

Accept-Language 展示语言

User-Agent 浏览器相关信息，移动端、客户端、pc端的浏览器 User-Agent 不同。

### Content

服务端返回

Content-Type 对应 Accept，从 Accept 中选择数据类型返回

Content-Encoding 对应 Accept-Encoding，声明服务端数据压缩的方式

Content-Language 对应 Accept-Language，是否根据请求返回语言

### 浏览器请求 html 时的头信息

启动服务器 node server.js，localhost:8888 端口访问，test.html先设为空。

```js
// server.js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html')
  response.writeHead(200, {
    'Content-Type': 'text/html',
    // 'X-Content-Options': 'nosniff'
    // 'Content-Encoding': 'gzip'
  })
  // response.end(zlib.gzipSync(html))
  response.end(html)
}).listen(8888)

console.log('server listening on 8888')
```

查看 network 的 localhost 文件的请求信息，浏览器会自动加上这些头信息。

```js
Response Headers

Connection: keep-alive
Content-Type: text/html
Date: Fri, 21 Sep 2018 02:29:16 GMT
Transfer-Encoding: chunked

Request Headers

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Connection: keep-alive
Cookie: 
Host: localhost:8888
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36
```

**请求头**

`Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8`

浏览器可以接收这些格式的数据，可以进行设置。

`Accept-Encoding: gzip, deflate, br`

数据编码方式，gzip 使用最多；br 使用比较少，但压缩比高。

`Accept-Language: zh-CN,zh;q=0.9`

浏览器会判断本系统的语言，自动加上。q 代表权重，数值越大权重越大，优先级越高。

`User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36`

 **Mozilla/5.0** 浏览器最早是网景公司出的，当时默认头是 Mozilla/5.0，很多老的 http 服务器只支持这个头，所以加上兼容老的 web 服务器。

**AppleWebKit/537.36** 浏览器内核 ，chrome 和 safari 等现代浏览器大部分使用 webkit 内核，webkit 内核是苹果公司开发的

**KHTML** 渲染引擎版本，类似于 Gecko，火狐浏览器渲染引擎

**Chrome/68.0.3440.106** chrome 版本号

**Safari/537.36** 因为使用了 webkit 内核，所以会加上



服务端根据数据协商的信息进行判断，返回客户端想要的信息。

在发送 ajax 请求时可以自定义设置 accept 相关信息



content type 相关

[mime type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

### Accept-Encoding

数据压缩

请求文件大小 933B，使用 gzip 压缩后是 609B

```js
// server.js
const http = require('http')
const fs = require('fs')
const zlib = require('zlib') // 引入包

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html') // 这里不加 utf8，加了返回的就是字符串格式了
  response.writeHead(200, {
    'Content-Type': 'text/html',
    // 'X-Content-Options': 'nosniff'
    'Content-Encoding': 'gzip'
  })
  response.end(zlib.gzipSync(html)) // 压缩
}).listen(8888)

console.log('server listening on 8888')
```

请求文件响应头

```js
Response Headers

Connection: keep-alive
Content-Encoding: gzip // 返回的压缩算法方式
Content-Type: text/html
Date: Fri, 21 Sep 2018 02:58:54 GMT
Transfer-Encoding: chunked
```

### Content-type

用来协商客户端和服务端的数据格式和声明

发送请求时，会有不同的请求内容，根据内容不同设置不同的 content-type

chorme浏览器设置，勾选 Preserve log，当页面跳转后，也会把之前的请求打印出来

发送表单数据

```html
<body>
  <form action="/form" method="POST" id="form" enctype="application/x-www-form-urlencoded">
    <input type="text" name="name">
    <input type="password" name="password">
    <input type="submit">
  </form>
</body>
</html>
```

```js
Request Headers
Content-Type: application/x-www-form-urlencoded // content-type 就是 form表单中设置的

Form Data
name=sf&password=sfs
```


服务端根据 content-type 是 x-www-form-urlencoded来对body 中的数据进行转化即可。 



如果表单数据中有文件

```js
<body>
  <form action="/form" method="POST" id="form" enctype="multipart/form-data">
    <input type="text" name="name">
    <input type="password" name="password">
    <input type="file" name="file">
    <input type="submit">
  </form>
  <script>
    var form = document.getElementById('form')
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      var formData = new FormData(form)
      fetch('/form', {
        method: 'POST',
        body: formData
      })
    })
  </script>
</body>
```

代表请求是有多个部分的，有时通过表单上传文件时，必须要把文件部分单独拆分出来，文件不能作为字符串进行传输的，要作为二进制的数据进行传输；使用 x-www-form-urlencoded 这种拼接字符串的方式 是不对的

```js
Request Headers
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary39Ug3FSPIBvDYZd6

Request Payload
------WebKitFormBoundary39Ug3FSPIBvDYZd6
Content-Disposition: form-data; name="name"

sdfs
------WebKitFormBoundary39Ug3FSPIBvDYZd6
Content-Disposition: form-data; name="password"

sdfs
------WebKitFormBoundary39Ug3FSPIBvDYZd6
Content-Disposition: form-data; name="file"; filename="1536973449110.png"
Content-Type: image/png


------WebKitFormBoundary39Ug3FSPIBvDYZd6--
```

`boundary=----WebKitFormBoundarybwAbNlPF2bBcTLuA`用来分割表单提交数据的各个部分

服务端拿到表单数据后，根据这个分割字符串，进行数据分割。

## Redirect

### Redirect 的概念

通过 url 访问某个路径请求资源时，发现资源不在 url 所指定的位置，这时服务器要告诉浏览器，新的资源地址，浏览器**再重新请求**新的 url，从而拿到资源。

若服务器指定了某个资源的地址，现在需要更换地址，不应该立刻废弃掉 url，如果废弃掉可能直接返回 404，这时应该告诉客户端新的资源地址。

### Redirect 的使用

启动服务器 node server.js，localhost:8888 访问

访问时，发现 url 变成了 localhost:8888/new 了，并显示了 /new 路由下的内容

```js
// server.js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    response.writeHead(302, {  // or 301
      'Location': '/new' // 这里是同域跳转，只需要写路由
    })
    response.end()
  }
  if (request.url === '/new') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    })
    response.end('<div>this is content</div>')
  }
}).listen(8888)

console.log('server listening on 8888')
```

查看network localhost

请求发现是302后，浏览器自动根据响应头中的 Location 路径进行跳转。

```js
General
Status Code: 302 Found (from disk cache)

Request Headers
Location: /new
```

### Redirect 301 和 302 的区别

302 临时跳转，每次请求仍然需要经过服务端指定跳转地址

301 永久跳转

301的情况

每次访问 locahost:8888，都要经过服务端跳转，服务端通过 console.log 可以看到 / /new 两次请求。

```js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    response.writeHead(302, {  
      'Location': '/new' 
    })
    response.end()
  }
  if (request.url === '/new') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    })
    response.end('<div>this is content</div>')
  }
}).listen(8888)

console.log('server listening on 8888')
```

301 的情况

访问 locahost:8888，第一次经过服务端跳转，服务端通过 console.log 可以看到 / /new 两次请求；第二次 服务端 console.log 只显示 /new ，**没有再次经过服务器指定新的 Location**。

```js
response.writeHead(301, {
      'Location': '/new'
    })
```

注意：**使用 301 要慎重**，一旦使用，服务端更改路由设置，用户如果不清理浏览器缓存，就会一直重定向。

设置了 301，locahost 会从缓存中读取，并且这个缓存会保留到浏览器，当我们访问 8888 都会进行跳转。此时，就算服务端改变设置也是没有用的，浏览器还是会从缓存中读取。

![1537506973805](C:\Users\WANGTO~1\AppData\Local\Temp\1537506973805.png)

## CSP

### CSP 的概念

Content-Security-Policy 内容安全策略

让网站变得更加安全

### 详细资料

mdn csp

### 作用

限制资源获取

报告资源获取越权

### 限制方式

default-src限制全局

制定资源类型

### 资源类型

connect-src

img-src

font-src

media-src

frame-src

script-src

manifest-src

style-src

### 一些案例

#### 限制内联脚本

在 web 领域，xss 可以通过注入脚本的方式进行攻击

```js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Security-Policy': 'default-src http: https:' // 只能通过http或https的方式加载
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'application/javascript'
    })
    response.end('console.log("loaded script")')
  }
}).listen(8888)

console.log('server listening on 8888')
```

```js

<body>
  <div>This is content</div>
  <!-- 内联脚本 -->
  <script>
    console.log('inline js')
  </script>
</body>
</html>
```

控制台报错

`Refused to execute inline script because it violates the following Content Security Policy directive: "default-src http: https:". Either the 'unsafe-inline' keyword, a hash ('sha256-KU4m2rqHAFwi569te1RE5P3qW1O/qJ+m+gVo66Frm4k='), or a nonce ('nonce-...') is required to enable inline execution. Note also that 'script-src' was not explicitly set, so 'default-src' is used as a fallback.`

#### 限制外链加载 script

限制外链接在 的 script 通过哪些域名进行加载

如，限制只能通过本域名进行加载 外链 script

```js
// server.js
'Content-Security-Policy': 'script-src \'self\'' // 限制外链 script 只能是本域名下的
```

```html
// test.html
<script src="test.js"></script>  本域名下的可以使用
<script src="https://cdn.bootcss.com/jquery/3.3.1/core.js"></script>
```

8888端口访问，可以看到报错信息

`Refused to load the script 'https://cdn.bootcss.com/jquery/3.3.1/core.js' because it violates the following Content Security Policy directive: "script-src 'self'".`

查看 network，发现在浏览器端就被 block掉了，没有发送请求。

![1537511020024](C:\Users\WANGTO~1\AppData\Local\Temp\1537511020024.png)

#### 限制指定某个网站

```js
'Content-Security-Policy': 'script-src \'self\' https://cdn.bootcss.com' // 限制外链 script 只能是本域名下的，允许指定域名script加载
```

这样就没有报错信息了，network 看到 core.js加载成功

#### 限制 form 表单提交范围

form 不接受 default-src 的限制，可以通过 form-action来限制。

下例中 form 会调转到 baidu.com，通过 form-action限制浏览器会报错。

```js
// server.js
'Content-Security-Policy': 'script-src \'self\'; form-action \'self\'' // 限制表单提交只能在本域下
```

```html
// test.html
<form action="http://baidu.com">
    <button type="submit">click me</button>
  </form>
```

报错信息

`Refused to send form data to 'http://baidu.com/' because it violates the following Content Security Policy directive: "form-action 'self'".`

#### 限制图片链接

通过全局限制 default-src 就可以实现

```js
'Content-Security-Policy': 'default-src \'self\'; form-action \'self\'' 
```

#### 限制 ajax 请求

通过 connect-src

```js
'Content-Security-Policy': 'connect-src \'self\'; form-action \'self\'; report-uri / report' 
    })
```

```html
<script> 
    fetch('http://baidu.com')
  </script>

```

报错信息

` Refused to connect to 'http://baidu.com/' because it violates the following Content Security Policy directive: "connect-src 'self'".`

### 汇报

```js
// server.js
'Content-Security-Policy': 'default-src \'self\'; form-action \'self\'; report-uri / report' 
```

network查看，发送的内容，是 标准的 csp report 的内容。

![1537512188078](C:\Users\WANGTO~1\AppData\Local\Temp\1537512188078.png)

#### 允许加载但汇报

使用 'Content-Security-Policy-Report-Only' 

```js
// server.js
'Content-Security-Policy-Report-Only': 'default-src \'self\'; form-action \'self\'; report-uri / report' 
```

资源会正常加载，但是汇报 Report-Only相关的错误提醒

### 在 html 中使用 csp

和在服务端使用效果相同，最好在服务端做。

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; form-action 'self';">
```

report-uri 不允许在 html 的 meta 中使用，只能在服务端通过 head 进行设置。

# Nginx代理以及面向未来的HTTP

## Nginx安装和基础代理配置

Nginx 是一个单纯的 web 服务器，也就是 HTTP 的服务器，主要实现的功能就是 HTTP 所有功能的对应，在工作中，一般用作 HTTP 代理。

### Nginx安装

[nginx下载](https://nginx.org/en/download.html)

进入对应目录启动

```js
cd e:
cd Program\ Files/nginx-1.15.3/
./nginx.exe
```

访问 localhost 即可。

### 基础代理配置

include 是 Nginx 指令，用来导入配置。有新的站点创建时，可以单独创建配置文件，达到隔离的效果。

```js
// nginx.conf
include      servers/*.conf
```

在 nginx-1.15.3/ 下新建 servers/test.conf

```js
server {
  listen       80;
  server_name  test.com; // 在浏览器中访问的 host name

  location / {
    proxy_pass http://127.0.0.1:8888; // 代理地址
  }
}
```

使用 http 是明文传输，代理服务器容易解析。 在手机上浏览器网页时，弹出广告，这些广告就是 http 的代理，服务端返回内容时，被代理解析，并插入广告代码。

使用 https 则不会，因为它的传输过程是加密的。

## Nginx代理配置和代理缓存的用处

配置

```js
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;

server {
  listen       80;
  # listen       [::]:80 default_server;
  server_name  test.com;

  # return 302 https://$server_name$request_uri;

  location / {
    proxy_cache my_cache;
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header Host $host;
  }
}
```

好处

代理缓存是在代理的那一层设置，每一个请求都会经过代理，如果代理缓存缓存过一次，第二次访问可以直接使用缓存

代理相关的 HTTP头

Cache-Control

s-maxage 代理缓存的过期时间

private 只允许浏览器缓存

no-store 所以节点都不缓存



'Vary': ‘X-Test-Cache’ 只有这个头都相等时才会使用 cache

## HTTPS解析

http 是明文传输，信息可以被截取与解析。

**私钥**，服务器通过私钥对公钥解密过的数据进行解密，私钥只放在服务器上。

**公钥**，在互联网上所有人都可以拿到的加密字符串，用来加密传输信息。

公钥与私钥主要用在握手是进行传输，握手时数据传输是加密过，客户端与服务端通过加密字符串进行解密。

握手过程

![1537577081231](C:\Users\WANGTO~1\AppData\Local\Temp\1537577081231.png)

## 使用Nginx部署HTTPS服务

## HTTP2的优势和Nginx配置HTTP2的简单使用

信道复用

分帧传输

Server Push

# 课程总结

**HTTP 原理**：如何发送 **HTTP**请求，数据如何返回，是在 TCP 连接上发送数据的，创建 TCP 连接要经过三次握手，或者是 https 要经过 https 的握手，**https** 的握手过程是一个加密数据的传输过程。http是否是长连接，性能方面的好处。**http2** 在长连接的基础上又增加了信道复用和分帧传输，极大地提高了性能。

**HTTP技术点**：HTTP头相关作用，**缓存**，使用 Cache-Control 去控制浏览器或代理服务器的缓存；使用 Last-Modified 或 Etag 来**验证缓存**是否可用；使用 CSP 控制**网页**内容加载的**安全性**；CORS，创建一个可用性很高，并且安全性得到保证的一个可**跨域**的 HTTP 服务。

**Nginx实践、面向未来的HTTP**：如何使用 Nginx 实现一个代理服务器，开启 Nginx 的代理缓存；HTTPS 安全性是如何进行保证的；HTTP2比HTTP1.1,性能提升极大，通过 Nginx 部署一个 HTTP2。

![1537521316017](C:\Users\WANGTO~1\AppData\Local\Temp\1537521316017.png)

1. Redirect跳转，url 回车 Redirect，有可能存在 301 请求返回过，浏览器记录过，这类请求开始就要 Redirect。
2. App cahce应用缓存，浏览器缓存，浏览器会根据资源是否设置过 Cache-Control，判断是否超时，如果超时重新请求缓存
3. DNS查找，域名解析，根据域名对应 ip
4. 创建 TCP 连接，三次握手，https 如何创建，http2 如何创建
5. Request 发送请求，发送的过程中，可能会经过代理服务器或从代理服务器的缓存中读取

