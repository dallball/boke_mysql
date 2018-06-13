


function getCaptchas (cb) {
	$.ajax({
		url: '/captchas',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function (res) {
			cb(res)
			console.log('text:', res.captcha.text.toLowerCase())
			console.log('captcha:', res.captcha)
		}
	})
}