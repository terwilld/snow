
const express = require('express')
const router = express.Router();
const CJControllers = require('../controllers/cj.js')





router.get('/', CJControllers.index)

router.get('/linksearch', CJControllers.linkSearch)

module.exports = router;
