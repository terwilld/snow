
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
    try {
        const data = await axios.get(
            'https://dev204219.service-now.com/api/now/table/sys_user',
            { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer(`admin:${SNOWpw}`).toString('base64')) } }
        )
        const users = data.data.result
        users.sort(compare)
        res.render('users/indexusers.ejs', { users })

    } catch (e) {
        res.render('users/nouser.ejs')
    }

}


module.exports.showuser = async (req, res) => {
    const uid = req.params.id
    try {
        const data = await axios.get(
            `https://dev204219.service-now.com/api/now/table/sys_user/${uid}`,
            { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer(`admin:${SNOWpw}`).toString('base64')) } }
        )
        // console.log(data)
        user = data.data.result
        if (process.env.environment == 'dev') {
            console.log(user)
            console.log('I am in the show controller')
            console.log(uid)
        }
        res.render('users/show.ejs', { user })
    }
    catch (e) {
        //console.log(e)
        console.log(e.response.data.error.message)
        if (e.response.data.error.message == 'No Record found') {
            res.render('users/nouser.ejs')
        }

    }
}



module.exports.deleteuser = async (req, res) => {
    const uid = req.params.id
    if (uid == '6816f79cc0a8016401c5a33be04be441') {
        console.log("Cannot delete admin")
        res.render('users/nodeleteadmin.ejs')
    } else {
        console.log("Trying to delete")
        try {
            const data = await axios.delete(
                `https://dev204219.service-now.com/api/now/table/sys_user/${uid}`,
                { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer(`admin:${SNOWpw}`).toString('base64')) } }
            )
            console.log("I might have deleted the user")
            res.redirect("/users")
        }
        catch (e) {
            res.redirect("/users")
        }
    }
}






