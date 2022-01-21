const mongoose = require('mongoose')
const logsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Blank title'
    },
    entry: {
        type: String,
        required: true,
        default: '...'
    },
    shipIsBroken: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const Log = mongoose.model('Log', logsSchema)

module.exports = Log