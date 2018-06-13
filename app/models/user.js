"use strict";

const sequelize = require('./sequelize.js')
const Sequelize = require('sequelize')

const User = sequelize.define('user', {
	user_name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		field: 'user_name'
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		field: 'password'
	},
	role: {
		type: Sequelize.INTEGER,
		defaultValue: 20,
		field: 'role'
	}
},{
	freezeTableName:true,
	underscored: true,
	tableName: 'user'
})

User.sync()

module.exports = User