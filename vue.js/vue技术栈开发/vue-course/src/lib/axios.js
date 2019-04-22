import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
	constructor (baseUrl = baseURL) {
		this.baseUrl = baseURL
		this.queue = {}
	}
	getInsideConfig () {
		const config = {
			baseUrl: this.baseUrl,
			headers: {
				//
			}
		}
		return config
	}
	interceptors (instance) {
		// 请求拦截器
		instance.interceptors.request.use(config => {
			// 添加全局的 loading...
			// Spin.show()
			return config
		}, error => {
			return Promise.reject(error)
		})
		// 响应拦截器
		instance.interceptors.response.use(res => {
			console.log(res)
			return res
		}, error => {
			return Promise.reject(error)
		})
	}
	request (options) {
		const instance = axios.create()
		options = Object.assign(this.getInsideConfig(), options)
		this.interceptors(instance)
		return instance(options)
	}
}
export default HttpRequest