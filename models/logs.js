const mongoose = require('mongoose')
const logsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        default: 'Blank title'
    },
    entry: {
        type: String,
        require: true,
        default: '...'
    },
    shipIsBroken: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const Log = mongoose.model('Log', logsSchema)

module.exports = Log