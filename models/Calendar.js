const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    title: {type: String, require: true},
    admins: [{type: Types.ObjectId, ref: 'User'}],
    events: [{type: Types.ObjectId, ref: 'Event'}]
})

module.exports = model('Calendar', schema)