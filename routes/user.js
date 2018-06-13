const express = require('express');
const router = express.Router();
const User = require('../app/controllers/user.js')
const authMidWare = require('../app/midware/auth.js')

/* GET users listing. */
router.get('/signup', User.signup);
router.post('/signup', User.signupPost);
router.get('/signin', User.signin);
router.post('/signin', User.signinPost);
router.get('/signout', User.signout);
router.get('/user/:id', User.user);
router.get('/write',authMidWare.requireSignin, User.write);
router.get('/blog/:id', User.blog);
router.post('/blogpost', User.blogPost);
router.get('/category', User.category);

module.exports = router;
