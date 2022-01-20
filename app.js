// IMPORT //
const express = require('express')
const app = express()
const Log = require('./models/logs')

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


// Index
app.get('/logs', (req,res)=>{
    Log.find({}, (err, foundLogs)=>{
        res.render('index.ejs', {
            logs: foundLogs
        })
    })
})
// New
app.get('/logs/new', (req,res)=>{
    res.render('new.ejs')
})

// Create
app.post('/logs', (req,res)=>{
    if(req.body.shipIsBroken === "on"){
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }
    Log.create(req.body, (err, createdLog)=>{
        res.redirect('/logs')
    })
    // res.redirect('/logs')
    console.log(req.body)
})

// STARTS SERVER
app.listen(PORT, ()=>{
    console.log("I'm listening to post #: ", PORT)
})