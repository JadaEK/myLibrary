if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs') //render template file
app.set('views', __dirname + '/views') //directory - views where template files are located __dirname gets current direcory name
app.set('layout', 'layouts/layout') //don't have to keep replicating start and end html tags
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)