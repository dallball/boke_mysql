const express = require('express');
const router = express.Router();
const Apidoc = require('../app/controllers/apidoc.js')

router.get('/captchas', Apidoc.captchas)
router.get('/user/:id', Apidoc.user)
router.get('/users', Apidoc.users)
router.get('/blog/:id', Apidoc.blog)
router.get('/blogs', Apidoc.blogs)
router.get('/category/:id', Apidoc.category)
router.get('/categorys', Apidoc.categorys)

module.exports = router;
