// 若设置了代理，这里的开发环境域名可以设为 '', 若没设置代理要写服务端 url
export const baseURL = process.env.NODE_ENV == 'production' ? 'http://production.com' : 'http://localhost: 3000'