const snowUser = require('../models/snowUsers')
const auditLog = require('../models/auditLogs')

module.exports.index = async (req, res) => {
    let snowUsers = await snowUser.countDocuments({})
    let auditLogs = await auditLog.countDocuments({})


    res.render('index.ejs', { snowUsers, auditLogs })
}



module.exports.tickets = async (req, res) => {

    res.render('tickets.ejs')
}
