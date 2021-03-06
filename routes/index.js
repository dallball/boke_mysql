const express = require('express');
const router = express.Router();
const UserRouter = require('./user');
const ApidocRouter = require('./apidoc');
const PageRouter = require('./page');
const Captchas = require('../app/controllers/captchas.js');

module.exports = function (app) {
	app.use('/', PageRouter);
	app.get('/captchas', Captchas.getCaptchas);

	app.use('/user', UserRouter);
	app.use('/apidoc', ApidocRouter);
};
