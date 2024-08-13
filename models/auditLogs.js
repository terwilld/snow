const mongoose = require('mongoose')
const Schema = mongoose.Schema


const auditLog = new Schema({
    dbusername: {
        type: String,
        required: true
    },
    sql: {
        type: String,
        required: true
    },
    object: {
        type: String
    },
    verb: {
        type: String
    },
    serverIP: {
        type: String
    },
    clientIP: {
        type: String
    },
    snowID: {
        type: String
    },
    timeLogged: {
        type: Date,
        default: Date.now
    },
    timestamp: {
        type: Date,
        default: Date.now() - 4 * 24 * 60 * 30 * 1000
    }
})

module.exports = mongoose.model('AuditLog', auditLog)