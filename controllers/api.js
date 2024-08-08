


module.exports.newAuditLogs = async (req, res) => {
    //res.send("Derp")
    const auditLogs = require('../models/auditLogs.js')
    noSnowID = await auditLogs.find({ snowID: null })

    res.send(noSnowID)
}


module.exports.updaterecordsnowid = async (req, res) => {
    console.log("Hit this end point")
    res.send("LOL")
}

