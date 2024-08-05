
const auditLogs = require('../models/auditLogs.js')



module.exports.index = async (req, res) => {
    //res.send("Derp")
    res.render('auditLogs/index.ejs', { auditLogs: [] })
}

module.exports.new = async (req, res) => {
    res.render('auditLogs/new.ejs')
}



module.exports.showLog = async (req, res) => {
    const id = req.params.id
    newLog = await auditLogs.findOne({ _id: id })
    console.log(newLog)
    res.render('auditLogs/show.ejs', { newLog })
    // res.send("New log")
}

module.exports.newLog = async (req, res) => {
    console.log(req.body)
    let newLog = new auditLogs(req.body.auditLog)
    console.log(newLog)
    await newLog.save()
    //res.send("test")
    //console.log(data.data.result.sys_id)
    console.log(newLog.id)
    res.redirect(`/audit_logs/get/${newLog.id}`)
}
