//引入axios
import axios from 'axios'

//创建一个axios实例
const http = axios.create({
	//指向后台的接口地址
  baseURL: 'http://localhost:3000/admin/api'
})

//默认导出
export default http