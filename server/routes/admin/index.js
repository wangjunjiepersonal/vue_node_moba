module.exports = app => {
	//引入express使用它的子路由Router()	
	const express = require('express')
	const router = express.Router({
    mergeParams: true
  })	
	
	//创建分类
	router.post('/', async (req,res) => {
		const model = await req.Model.create(req.body)
		res.send(model)
	})
	
	//更改分类
	router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
	
	//删除分类
	router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
    	success:true
    })
  })
	
	//获取分类
	router.get('/', async (req,res) => {
		const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
	})
	
	//获取分类详情
	router.get('/:id', async (req,res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})
	
	app.use('/admin/api/rest/:resource', async (req, res, next) => {
		const modelName = require('inflection').classify(req.params.resource)
		//给请求对象上挂载一个属性Model
		req.Model = require(`../../models/${modelName}`)
		next()
	},router)
	
	
	//处理图片上传请求
	const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
	app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
		//获取图片上传的信息  添加一个url返回去
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}