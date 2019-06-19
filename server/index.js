
//引入express
const express = require("express")

//创建express实例
const app = express()

//开放静态资源目录
app.use('/uploads', express.static(__dirname + '/uploads'))

//开启跨域请求
app.use(require('cors')())
//使用获取post提交请求数据
app.use(express.json())

//引入后端路由和数据库
require('./routes/admin')(app)
require('./plugins/db')(app)

//开启端口
app.listen(3000, () => {
  console.log('http://localhost:3000');
});
