const express = require('express')
const router = express.Router();
const apiController = require('../controllers/api.js')



router.get('/getNewAuditLogs', apiController.newAuditLogs)


module.exports = router;

