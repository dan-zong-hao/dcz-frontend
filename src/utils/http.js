// 封装axios
// 实例化  请求拦截器 响应拦截器

import axios from 'axios'
import { getToken } from './token'
import { history } from './history'
const http = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
  // if not login add token
  const token = getToken()
  // console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // console.log(config)
  return config
}, (error) => {
  console.log('error:'+error)
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // console.log(response.data)
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 422 || error.response.status === 401) {
    // 跳回到登录 reactRouter默认状态下 并不支持在组件之外完成路由跳转
    // 需要自己来实现
    history.push('/login')
  }
  return Promise.reject(error)
})

export { http }