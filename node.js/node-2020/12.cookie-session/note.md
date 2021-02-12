## cookie session localStorage SessionStorage 的区别 不能跨域
- localStorage sessionStorage 只能本地访问 不能超过5M (不会在请求中携带)
- cookie http是无状态协议(cookie是用来识别请求的) 客户端和服务端都可以请求，每次请求会自动携带cookie，跨域默认不能携带cookie(cookie是存放在客户端 安全问题 csrf) (合理设置cookie 否则每次请求都会携带cookie 4k)
- session是基于cookie的 session只是一个对象存放在服务器中，通过一个唯一标识可以找到对应的信息，标识是通过cookie来发送的(理论上没有限制)