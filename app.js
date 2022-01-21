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

// Edit
app.get('/logs/:id/edit', (req,res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{
        res.render('edit.ejs', {
            log: foundLog,
            id: req.params.id
        })
    })
})

// Show
app.get('/logs/:id', (req,res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{
        console.log(foundLog),
        res.render('show.ejs', {
            logs: foundLog
        })
    })
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

// Delete
app.delete('/logs/:id', (req,res)=>{
    Log.deleteOne({}, (err,deleteLog)=>{
        const deletesLog = (err,deleteLog)=>{
            res.redirect('/logs')
        }
        Log.findByIdAndDelete(req.params.id, deletesLog)
    })
})

// Update (PUT)
app.put('/logs/:id', (req,res)=>{
    Log.findByIdAndUpdate(req.params.id, req.body, (err, updateLog)=>{
        res.redirect('/logs/'+req.params.id)
    })
})

// STARTS SERVER
app.listen(PORT, ()=>{
    console.log("I'm listening to post #: ", PORT)
})