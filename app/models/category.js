"use strict";

const sequelize = require('./sequelize.js')
const Sequelize = require('sequelize')
// const User = require('user.js')

const Category = sequelize.define('category', {
	category_name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		field: 'category_name'
	}
},{
	freezeTableName:true,
	underscored: true,
	tableName: 'category'
})

// User.hasMany(Category)

Category.sync()

module.exports = Category