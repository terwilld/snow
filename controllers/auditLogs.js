
const auditLog = require('../models/auditLogs.js')



module.exports.index = async (req, res) => {

    auditLogs = await auditLog.find({})

    res.render('auditLogs/index.ejs', { auditLogs })
}




module.exports.new = async (req, res) => {

    res.render('auditLogs/new.ejs')

}



module.exports.showLog = async (req, res) => {

    const id = req.params.id
    foundauditLog = await auditLog.findOne({ _id: id })

    res.render('auditLogs/show.ejs', { foundauditLog })
}


module.exports.delete = async (req, res) => {

    let id = req.params.id
    foundauditLog = await auditLog.deleteOne({ _id: id })

    res.redirect('/audit_logs')
}



module.exports.newLog = async (req, res) => {

    let newLog = new auditLog(req.body.auditLog)
    await newLog.save()

    res.redirect(`/audit_logs/get/${newLog.id}`)
}
