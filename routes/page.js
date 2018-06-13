const express = require('express');
const router = express.Router();
const Index = require('../app/controllers/index.js')

/* GET users listing. */
router.get('/', Index.index);
router.get('/contact', Index.contact);
router.get('/main', Index.main);
router.get('/search', Index.search);

module.exports = router;
