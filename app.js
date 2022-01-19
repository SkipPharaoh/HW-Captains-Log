// IMPORT //
const express = require('express')
const app = express()


// Method-Override
const methodOverride = require('method-override')

// MONGO DATABASE CONFIG //
const mongoose = require('mongoose')

// MONGOOSE CONNECTION

// CONFIG APP
const PORT = 3000
app.set('view engine', 'ejs')

// MIDDLEWARE //
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use('/views', express.static('views'))

// CONTROLLERS //

// Index
app.get('/logs', (req,res)=>{
    console.log("hitting app's index route")
    res.send("App's index route")
})
// New
app.get('/logs/new', (req,res)=>{
    res.render('new.ejs')
})

// STARTS SERVER
app.listen(PORT, ()=>{
    console.log("I'm listening to post #: ", PORT)
})