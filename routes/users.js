
const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/users.js')





router.get('/', userControllers.users)



router.get('/get/:id', userControllers.showuser)



module.exports = router;
