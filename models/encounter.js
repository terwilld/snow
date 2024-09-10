const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Patient = require('./patient')
const encounter = new Schema({
    emrID: {
        type: String,
        required: false
    },
    startTime: {
        type: String,
        required: false
    },
    classType: {
        type: String,
        required: false
    },
    reason: {
        type: String,
        required: false
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient"
    }
})
module.exports = mongoose.model('Encounter', encounter)