const snowUser = require('../models/snowUsers')


module.exports.index = async (req, res) => {
    let snowUsers = await snowUser.countDocuments({})

    console.log(snowUsers)

    res.render('index.ejs', { snowUsers })
}



module.exports.tickets = async (req, res) => {

    res.render('tickets.ejs')
}
