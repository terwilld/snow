const express = require('express')
const router = express.Router();
const auditLogsControllers = require('../controllers/auditLogs.js')



router.get('/', auditLogsControllers.index)

router.get('/new', auditLogsControllers.new)

router.post('/', auditLogsControllers.newLog)

router.get('/get/:id', auditLogsControllers.showLog)

module.exports = router;
