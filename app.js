const express = require('express');

const indexRoutes = require('./routes/index.js')
const userRoutes = require('./routes/users.js')
const path = require('path')
const ejsMate = require('ejs-mate');






const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')

app.use('/', indexRoutes)
app.use('/users', userRoutes)


app.listen(3000, () => {
    console.log('app is running on 3000')
})
