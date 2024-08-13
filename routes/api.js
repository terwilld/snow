const express = require('express')
const router = express.Router();
const apiController = require('../controllers/api.js')



router.get('/getNewAuditLogs', apiController.newAuditLogs)

// router.post('/updaterecord/:id/:sysid', apiController.updaterecordsnowidwithid)

// router.post('/updaterecord/:id', apiController.updaterecordsnowid)

router.get('/updateauditlog/:id/:sysid', apiController.updatesysid)


module.exports = router;

