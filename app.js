// IMPORT //
const express = require('express')
const app = express()
const logsController = require('./controllers/logs')

// Method-Override
const methodOverride = require('method-override')

// MONGO DATABASE CONFIG //
const mongoose = require('mongoose')
const URI = 'mongodb://127.0.0.1:27017/logs'

// MONGOOSE CONNECTION
mongoose.connect(URI, ()=>{console.log('Mongoose connected at: ' +URI)})

// CONFIG APP
const PORT = 3000
app.set('view engine', 'ejs')

// MIDDLEWARE //
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/views', express.static('views'))

// CONTROLLERS //
app.use('/logs', logsController)

// Home
app.get('/', (req,res)=>{
    res.send('Home Route; Day 2 is complete')
})

// STARTS SERVER
app.listen(PORT, ()=>{
    console.log("I'm listening to post #: ", PORT)
})