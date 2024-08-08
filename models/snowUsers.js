const mongoose = require('mongoose')
const Schema = mongoose.Schema


const snowUsers = new Schema({

    name: {
        type: String,
        required: true
    },
    sys_id: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('SnowUsers', snowUsers)