const auditLogs = require('../models/auditLogs.js')


module.exports.newAuditLogs = async (req, res) => {
    noSnowID = await auditLogs.find({ snowID: null })
    res.send(noSnowID)
}


module.exports.updaterecordsnowid = async (req, res) => {
    console.log("Hit this end point")
    const oid = req.params.id
    console.log(oid)
    try {
        auditlog = await auditLogs.findOne({ _id: oid })
        auditlog.snowID = req.body.sysid
        await auditlog.save()
        res.send("record was updated")
    } catch (e) {
        console.log(e)
        res.send("Record was not updated")
    }

}

module.exports.updaterecordsnowidwithid = async (req, res) => {
    console.log("Hit second endpoint")
    const oid = req.params.id
    const sysid = req.params.sysid
    try {
        auditlog = await auditLogs.findOne({ _id: oid })
        auditlog.snowID = sysid
        await auditlog.save()
        console.log(auditlog)

    } catch (e) {

    }

    res.send("Hit second end point")
}


module.exports.updatesysid = async (req, res) => {
    console.log(req.params)
    try {
        auditLog = await auditLogs.findOne({ _id: req.params.id })
        console.log(auditLog)
        console.log("My audit log")
        if (auditLog == null) {
            res.send("No record to update")
        } else {
            auditLog.snowID = req.params.sysid
            console.log(auditLog)
            await auditLog.save()
            res.send(auditLog)
        }
    }
    catch (e) {
        res.send("Bad id")
    }
}