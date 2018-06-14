const User = require('../models/user.js')
const Blog = require('../models/blog.js')
const Sequelize = require('sequelize')
const BaseComponent = require('../../prototype/baseComponent.js')
const Op = Sequelize.Op

class Index extends BaseComponent {
	constructor(){
		super()
		this.index = this.index.bind(this)
	}

	async index(req, res){
		res.render('index')
	}

	async contact(req, res){
		res.render('contact')
	}

	async main(req, res){
		try {
			let pageIndex = parseInt(req.query.pageIndex, 10) || 1
			let pageSize = 10

			let p1 = User.findAll()
			let p2 = Blog.findAndCountAll({include: [{model: User}], offset: (pageIndex-1)*pageSize, limit: pageSize, order: [['updated_at', 'DESC']]}) 
			let [_users, _blogs] = await Promise.all([p1, p2])
			_blogs.rows.forEach( function(item, index) {
				item.change = Number(item.updated_at) === Number(item.created_at)?'创建于':'修改于';
			});

			res.render('main', {
				blogs: [],
				users: _users,
				blogs: _blogs.rows,
				currentPage: pageIndex,
				totalPage: Math.ceil(_blogs.count/pageSize),
				totalLength: _blogs.count,
			})
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	async search(req, res){
		try {
			let searchTxt = req.query.searchTxt
			let searchType = req.query.searchType

			switch (searchType) {
				case 'artical':
					let blogs = await Blog.findAll({where: {title: {[Op.like]: '%'+searchTxt+'%'}}, include: {model: User}})
					blogs.forEach( function(item, index) {
						item.change = Number(item.created_at)===Number(item.updated_at)?'创建于':'修改于';
						item.title = item.title.replace(searchTxt, '<span class="color-orange">' + searchTxt + '</span>')
					});
					res.render('search', {
						blogs: blogs,
						searchKey: searchTxt,
						showType: 'blog'
					})
					break;
				case 'author':
					let users = await User.findAll()
					users.forEach( function(item, index) {
						item.user_name = item.user_name.replace(searchTxt, '<span class="color-orange">' + searchTxt + '</span>')
					});
					res.render('search', {
						users: users,
						searchKey: searchTxt,
						showType: 'user'
					})
					break;
				default:
					res.render('search')
					break;
			}
		} catch(e) {
			// statements
			console.log(e);
		}
	}
}


// module.exports = async function (req, res) {
	// let updateUser = await User.update({user_name: 'cansing02'},{where: {id: 2}})
	// let _users = await User.findAndCountAll({
	// 	attributes: ['id', 'user_name', 'role'],
	// 	where: {
	// 		user_name: {[Op.like]: '%1%'}
	// 	},
	// 	offset: 0,
	// 	limit: 10
	// })
	// res.render('index', {
	// 	title: 'Express',
	// 	users: _users,
	// 	updateUser: updateUser
	// });
// }

module.exports = new Index()