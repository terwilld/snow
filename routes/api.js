const express = require('express')
const router = express.Router();
const apiController = require('../controllers/api.js')



router.get('/getNewAuditLogs', apiController.newAuditLogs)

router.get('/updaterecord/:id', apiController.updaterecordsnowid)

module.exports = router;

