


module.exports.newAuditLogs = async (req, res) => {
    //res.send("Derp")
    const auditLogs = require('../models/auditLogs.js')
    noSnowID = await auditLogs.find({ snowID: null })

    res.send(noSnowID)
}


module.exports.updaterecordsnowid = async (req, res) => {
    console.log("Hit this end point")
    const auditLogs = require('../models/auditLogs.js')

    console.log(req.body)
    console.log(req.params)
    const oid = req.params.id
    console.log(oid)


    try {
        auditlog = await auditLogs.findOne({ _id: oid })
        console.log(auditlog)
        auditlog.snowID = req.body.sysid
        await auditlog.save()
        console.log(auditlog)
        res.send("record was updated")
    } catch (e) {
        console.log(e)
        res.send("Record was not updated")
    }

}

