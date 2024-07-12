
const axios = require('axios')
require('dotenv').config()
const SNOWpw = process.env.SNOWpw;
// console.log(SNOWpw)

function compare(a, b) {
    if (a.last_login > b.last_login_time) {
        return -1;
    }
    if (a.last_login < b.last_login_time) {
        return 1;
    }
    return 0;
}
module.exports.users = async (req, res) => {
    const data = await axios.get(
        'https://dev204219.service-now.com/api/now/table/sys_user',
        { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer(`admin:${SNOWpw}`).toString('base64')) } }
    )
    const users = data.data.result
    users.sort(compare)
    res.render('users/indexusers.ejs', { users })
}


module.exports.showuser = async (req, res) => {
    const uid = req.params.id

    console.log('I am in the show controller')
    console.log(uid)
    const data = await axios.get(
        `https://dev204219.service-now.com/api/now/table/sys_user/${uid}`,
        { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer(`admin:${SNOWpw}`).toString('base64')) } }
    )
    // console.log(data)
    user = data.data.result
    console.log(user)
    res.render('users/show.ejs', { user })
}




