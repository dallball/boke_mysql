"use strict";

const Sequelize = require('sequelize')

const sequelize = new Sequelize('bokhak', 'root', 'dall9191763', {
	host: 'localhost',
	dialect: 'mysql',
	protocol: 'mysql',
	port: 3306,
	underscored: true,
	timezone: '+08:00'
})

module.exports = sequelize