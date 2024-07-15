
const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/users.js')





router.get('/', userControllers.users)



router.get('/get/:id', userControllers.showuser)

router.get('/delete/:id', userControllers.deleteuser)

router.get('/new', userControllers.newuser)

router.post('/', userControllers.postnewuser)


module.exports = router;
