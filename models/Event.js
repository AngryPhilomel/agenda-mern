const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    title: {type: String, require: true},
    description: {type: String, require: true}, 
    owner: {type: String, require: true}, 
    period: {type: String, require: true}, 
    date: {type: Date, required: true},
})

module.exports = model('Event', schema)