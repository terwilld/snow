const express = require('express')
const router = express.Router();
const TraccarControllers = require('../controllers/traccar.js')


router.get('/', TraccarControllers.index)

router.get('/createdevice', TraccarControllers.createDevice)

router.get('/newdevice', TraccarControllers.newDevice)

router.post('/createdeviceui', TraccarControllers.createdeviceui)

router.get('/:uniqueid/addgpxdata', TraccarControllers.addgpxform)

router.post('/addgpxdata', TraccarControllers.addgpxdata)


module.exports = router;
