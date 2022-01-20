// IMPORT //
const express = require('express')
const app = express()


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
    console.log("hitting app's index route")
    res.send("index")
})
// New
app.get('/logs/new', (req,res)=>{
    res.render('new.ejs')
})

// Create
app.post('/logs', (req,res)=>{
    let body = req.body
    // res.redirect('/logs')
    if(req.body.shipIsBroken === "on"){
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }
    res.redirect('/logs/:id')
    console.log(body)
})

// STARTS SERVER
app.listen(PORT, ()=>{
    console.log("I'm listening to post #: ", PORT)
})