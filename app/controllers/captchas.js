'use strict';

const captchapng = require('captchapng')
const svgCaptcha = require('svg-captcha')

class Captchas {
	constructor(){

	}

	// async getCaptchas(req, res){
	// 	const cap = parseInt(Math.random()*9000+1000);
	// 	const p = new captchapng(80,30, cap);
	//     p.color(0, 0, 0, 0); 
	//     p.color(80, 80, 80, 255);
	//     const base64 = p.getBase64();
	//     res.cookie('cap', cap, { maxAge: 300000, httpOnly: true });
	//     res.send({
	//         status: 0,
	//     	code: 'data:image/png;base64,' + base64
	//     });
	// }

	async getCaptchas(req, res){
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
		res.send(codeData);
	}

}

module.exports = new Captchas()