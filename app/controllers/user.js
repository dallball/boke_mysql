const UpComponent = require('../../prototype/upComponent.js')
const User = require('../models/user.js')
const Blog = require('../models/blog.js')
const Category = require('../models/category.js')
const crypto = require('crypto')
const sequelize = require('../models/sequelize.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class UserComponent extends UpComponent{
	constructor (){
		super();
		// this.componentName = 'User'
		this.tag = 'User'
		this.test = this.test.bind(this)
	}

	async test(req, res){
		try {
			let sayName = await this.sayName()
			let sayHello = await this.sayHello()
			let sayTag = await this.sayTag()
			res.json({
				sayName: sayName,
				sayHello: sayHello,
				tag: this.tag,
				sayTag: sayTag
			})
		} catch(e) {
			console.log(e);
		}
	}

	async sayTag (res, req){
		return this.tag
	}

	async signin(req, res){
		res.render('./user/signin')
	}

	async signinPost(req, res){
		try {
			let req_user = req.body.user
			if (req_user.user_name === '' || req_user.password === '' || req_user.verifycode === '') {
				return res.json({status: 1, msg: '请填写完整表单'})
			}

			if (req_user.verifycode.toLowerCase() !== req.session.captcha) {
				return res.json({status: 1, msg: '验证码错误'})
			}

			let _user = await User.findOne({where: {user_name: req_user.user_name}})
			if (!_user) {return res.json({status: 1, msg: '用户名不存在'})}

			let md5 = crypto.createHash('md5')
			let md5pas = md5.update(req_user.password).digest('hex')
			if (md5pas === _user.password) {
				req.session.user = _user
				return res.json({status: 0, msg: '密码正确'})
			} else {
				return res.json({status: 1, msg: '密码错误'})
			}

		} catch(e) {
			// statements
			console.log(e);
		}
	}

	async signout(req, res){
		delete req.session.user
		res.redirect('/main')
	}

	async signup(req, res){
		res.render('./user/signup')
	}

	async signupPost(req, res){
		try {
			let req_user = req.body.user

			if (req_user.user_name === '' || req_user.password === ''|| req_user.repeatpassword === '' || req_user.verifycode === '') {
				return res.json({status: 1, msg: '请填写完整表单'})
			}

			if (req_user.repeatpassword !== req_user.password) {
				return res.json({status: 1, msg: '密码不一致'})
			}

			if (req_user.verifycode.toLowerCase() !== req.session.captcha) {
				return res.json({status: 1, msg: '验证码错误'})
			}

			let _user = await User.findOne({where: {user_name: req_user.user_name}})
			if (_user) {return res.json({status: 1, msg: '用户名重复'})}

			let md5 = crypto.createHash('md5')
			req_user.password = md5.update(req_user.password).digest('hex')

			let saveUser = await User.create(req_user)

			res.json({status: 0, msg: '存入成功'})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	async user(req, res){
		try {
			let id = req.params.id

			let targetUserPromise = User.findOne({where: {id: id}})
			let blogsPromise = Blog.findAll({where: {author: id}})
			let [targetUser, blogs] = await Promise.all([targetUserPromise, blogsPromise])
			let authorArr = []
			blogs.forEach( function(item, index) {
				item.change = Number(item.updated_at) === Number(item.created_at)?'创建于':'修改于';
				authorArr.push(item.category_id)
			});

			// let rows = await sequelize.query('select * from category where category.id in (select category_id from blog where blog.author='+id+')')
			let categories = await Category.findAll({where: {id: {[Op.in]: authorArr}}})

			res.render('./user/user', {
				targetUser: targetUser,
				blogs: blogs,
				// rows: rows[0],
				categories: categories
			})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	async write(req, res){
		try {
			let bid = req.query.bid
			let _blog = new Object()
			let catNames = new Array()
			let _categorySelected = {}
			if (bid) {
				_blog = await Blog.findOne({where: {id: bid}})
				_categorySelected = await Category.findOne({where: {id: _blog.category_id}})
			}

			let categories = await Category.findAll()
			categories.forEach( function(item, index) {
				catNames.push(item.name)
			});
			res.render('./user/write', {
				blog:_blog,
				categories: categories,
				catNames: catNames,
				_categorySelected: _categorySelected
			})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	async blogPost(req, res){
		try {
			let id = req.body.blog.id
			let req_blog = req.body.blog
			let _blog = {}
			_blog.id = id
			let category = req.body.category
			let newCategory = req.body.newCategory

			if (category === '0' && newCategory === '') {
				return res.json({status: 1, msg: '请选择分类'})
			}

			if (!req_blog.title || !req_blog.content) {
				return res.json({status: 1, msg: '请填写完整表单'})
			}

			if (id) {
				if (category*1 === 0) {
					let _category = await Category.create({category_name: newCategory})
					await Blog.update({title: req_blog.title, content: req_blog.content, category_id: _category.id}, {where: {id: id}})
				} else{
					await Blog.update({title: req_blog.title, content: req_blog.content, category_id: category}, {where: {id: id}})
				}
			} else {
				if (category*1 === 0) {
					let _category = await Category.create({category_name: newCategory})
					req_blog.category_id = _category.id
					_blog = await Blog.create(req_blog)
				} else{
					req_blog.category_id = category
					_blog = await Blog.create(req_blog)
				}
			}

			res.json({status: 0, msg: '存入成功', id: _blog.id})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	async blog(req, res){
		try {
			let id = req.params.id

			let _blog = await Blog.findOne({
				where: {id: id},
				include: [{
					model: User
				}]
			})

			res.render('./user/blog', {
				blog: _blog
			})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	async category(req, res){
		try {
			let uid = req.query.uid
			let cid = req.query.cid

			let p1 = Category.findOne({where: {id: cid}})
			let p2 = Blog.findAll({where: {author: uid, category_id: cid}})
			let [category, blogs] = await Promise.all([p1, p2])

			res.render('./user/category', {
				blogs: blogs,
				category: category
			})
		} catch(e) {
			// statements
			console.log(e);
		}
	}
}

module.exports = new UserComponent()
