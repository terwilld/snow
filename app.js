const express = require('express');
const mongoose = require('mongoose')
const indexRoutes = require('./routes/index.js')
const userRoutes = require('./routes/users.js')
const CJRoutes = require('./routes/cj.js')
const AuditLogs = require('./routes/auditLogs.js')
const API = require('./routes/api.js')
const path = require('path')
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');

require('dotenv').config()

if (process.env.NODE_ENV == "production") {
    mockCJurl = process.env.mockCJurl
    dbURL = process.env.dbURL;

} else {
    mockCJurl = 'http://localhost:3001'
    dbURL = 'mongodb://127.0.0.1:27017/snow';
}



mongoose.connect(dbURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected by mongoose")
    console.log(dbURL)
})

const app = express();
app.use(express.static(path.join(__dirname, 'public/')))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')

app.use('/', indexRoutes)
app.use('/users', userRoutes)
app.use('/cj', CJRoutes)
app.use('/audit_logs', AuditLogs)
app.use('/api', API)
app.listen(3000, () => {
    console.log('app is running on 3000')
})
