const mongoose = require('mongoose')
const Schema = mongoose.Schema
const patient = new Schema({
    emrID: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    birthday: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('Patient', patient)