const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')

const router = Router()

router.post('/', auth, async(req, res) => {
    const {query} = req.body
    const regexp = new RegExp(`${query}`, "i")
    if (query.match(/600/)) {
        const users = await User.find({ ldap : regexp }, function (err, docs) { })
        return res.json({message: users})
    } else {
        const users = await User.find({ displayName : regexp }, function (err, docs) { })
        return res.json({message: users})
    }
})

module.exports = router