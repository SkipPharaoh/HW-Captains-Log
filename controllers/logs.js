const express = require('express')
const router = express.Router()
const Log = require('../models/logs')

// Index
router.get('/', (req,res)=>{
    Log.find({}, (err, foundLogs)=>{
        res.render('index.ejs', {
            logs: foundLogs
        })
    })
})
// New
router.get('/new', (req,res)=>{
    res.render('new.ejs')
})

// Edit
router.get('/:id/edit', (req,res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{
        res.render('edit.ejs', {
            log: foundLog,
            id: req.params.id
        })
    })
})

// Show
router.get('/:id', (req,res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{
        console.log(foundLog),
        res.render('show.ejs', {
            logs: foundLog
        })
    })
})

// Create
router.post('/', (req,res)=>{
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
router.delete('/:id', (req,res)=>{
    Log.deleteOne({}, (err,deleteLog)=>{
        const deletesLog = (err,deleteLog)=>{
            res.redirect('/logs')
        }
        Log.findByIdAndDelete(req.params.id, deletesLog)
    })
})

// Update (PUT)
router.put('/:id', (req,res)=>{
    if(req.body.shipIsBroken === "on"){
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }
    Log.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateLog)=>{
        console.log(updateLog)
        res.redirect('/logs')
    })
})

module.exports = router