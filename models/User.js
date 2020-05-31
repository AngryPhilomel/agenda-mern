const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    ldap: {type: String, require: true, unique: true},
    displayName: {type: String, require: true},
    calendars: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)