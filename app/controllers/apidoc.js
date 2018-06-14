'use strict';

const UpComponent = require('../../prototype/upComponent.js')
const captchapng = require('captchapng')
const svgCaptcha = require('svg-captcha')
const User = require('../models/user.js')
const Blog = require('../models/blog.js')
const Category = require('../models/category.js')

class Apidoc extends UpComponent{
	constructor (){
		super();
	}

	/**
	 * @apiGroup 1.Captchas
	 * @apiName Captchas
	 * 
	 * @api {GET} /apidoc/captchas 1.图片验证码
	 * @apiDescription Description
	 *
	 * @apiVersion 1.0.0
	 */

	async captchas(req, res){
		let codeConfig = {
		    size: 5,// 验证码长度
		    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
		    noise: 2, // 干扰线条的数量
		    height: 44 
		}
		let captcha = svgCaptcha.create(codeConfig);
		req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
		let codeData = {
			captcha: captcha,
		    img:captcha.data
		}
		res.json({status: 0, text: captcha.text.toLowerCase()})
	}

	/**
	 * @apiGroup 2.User
	 * @apiName User
	 * 
	 * @api {GET} /apidoc/user/:id 1.用户
	 * @apiDescription Description
	 *
	 * @apiParam {Integer} id 用户id
	 * @apiVersion 1.0.0
	 */

	async user(req, res){
	 	try {
	 		let id = req.params.id

	 		let _user = await User.findOne({where: {id: id}})

	 		res.json({status: 0, user: _user})
	 	} catch(e) {
	 		// statements
	 		console.log(e);
	 	}
	}

	/**
	 * @apiGroup 2.User
	 * @apiName Users
	 * 
	 * @api {GET} /apidoc/users 2.用户列表
	 * @apiDescription Description
	 *
	 * @apiVersion 1.0.0
	 */

	async users(req, res){
		try {

			let users = await User.findAndCountAll()

			res.json({status: 0, count: users.count, users: users.rows})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	/**
	 * @apiGroup 3.Blog
	 * @apiName Blog
	 * 
	 * @api {GET} /apidoc/blog/:id 1.博文
	 * @apiDescription Description
	 *
	 * @apiParam {Integer} id 博文id
	 * @apiVersion 1.0.0
	 */
	async blog(req, res){
		try {
			let id = req.params.id

			let blog = await Blog.findOne({where: {id: id}})

			res.json({status: 0, blog: blog})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	/**
	 * @apiGroup 3.Blog
	 * @apiName Blogs
	 * 
	 * @api {GET} /apidoc/blogs 2.博文列表
	 * @apiDescription Description
	 *
	 * @apiVersion 1.0.0
	 */

	async blogs(req, res){
		try {

			let blogs = await Blog.findAndCountAll()

			res.json({status: 0, count: blogs.count, blogs: blogs.rows})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	/**
	 * @apiGroup 4.Category
	 * @apiName Category
	 * 
	 * @api {GET} /apidoc/category/:id 1.博文分类
	 * @apiDescription Description
	 *
	 * @apiParam {Integer} id 博文分类id
	 * @apiVersion 1.0.0
	 */
	async category(req, res){
		try {
			let id = req.params.id

			let category = await Category.findOne({where: {id: id}})

			res.json({status: 0, category: category})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	/**
	 * @apiGroup 4.Category
	 * @apiName Categorys
	 * 
	 * @api {GET} /apidoc/categorys 2.博文分类列表
	 * @apiDescription Description
	 *
	 * @apiVersion 1.0.0
	 */
	async categorys(req, res){
		try {

			let categorys = await Category.findAndCountAll()

			res.json({status: 0, count: categorys.count, categorys: categorys.rows})
		} catch(e) {
			// statements
			console.log(e);
		}
	}
}

module.exports = new Apidoc()