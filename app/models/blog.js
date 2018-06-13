"use strict";

const sequelize = require('./sequelize.js')
const Sequelize = require('sequelize')
const User = require('./user.js')
const Category = require('./category.js')

const Blog = sequelize.define('blog', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		field: 'title'
	},
	content: {
		type: Sequelize.TEXT,
		allowNull:false,
		field: 'content'
	},
	author: {
		type: Sequelize.INTEGER,
		references: {
			model: User
		}
	},
	category_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Category
		}
	}
},{
	freezeTableName:true,
	underscored: true,
	tableName: 'blog'
})

Blog.belongsTo(User, {foreignKey: 'author'})
Blog.belongsTo(Category, {foreignKey: 'category_id'})

Blog.sync()

module.exports = Blog