//引入axios
import axios from 'axios'
import Vue from 'vue'

//创建一个axios实例
const http = axios.create({
	//指向后台的接口地址
  baseURL: 'http://localhost:3000/admin/api'
})

//拦截器 就是给请求头添加参数token 在每次请求时传递token给后台
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

//通用的错误响应拦截
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    //登陆出错 跳到登陆页面重新登录
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  
  return Promise.reject(err)
})
//默认导出
export default http