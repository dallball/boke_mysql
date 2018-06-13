'use strict';

exports.requireSignin = async (req, res, next)=>{
	let user = req.session.user

	if (!user) {
		return res.redirect('/user/signin')
	}

	next()
}