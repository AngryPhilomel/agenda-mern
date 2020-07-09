const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const Calendar = require('../models/Calendar')

const router = Router()

router.post('/', auth, async(req, res) => {
    const {query} = req.body
    const regexp = new RegExp(`${query}`, "i")
    if (query.match(/[0-9]{1,8}/)) {
        const users = await User.find({ ldap : regexp }, function (err, docs) { })
        return res.json({message: users})
    } else {
        const users = await User.find({ displayName : regexp }, function (err, docs) { })
        return res.json({message: users})
    }
})



const https = require('https')
const axios = require('axios')

const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });


async function getLeaves(ldap) {
    try {
        const response = await instance.get(`https://locdev/ld_pre/db/index_bk_leave.php?ldap=${ldap}`)
        return response.data.leave
    } catch (e) {
        console.log(e)
    }
}

async function getIlls(ldap) {
    try {
        const response = await instance.get(`https://locdev/ld_pre/db/index_bk_ill.php?ldap=${ldap}`)
        return response.data.ill
    } catch (e) {
        console.log(e)
    }
}

router.post('/leave/:id', async(req, res) => {
    const calendar = await Calendar.findById(req.params.id)
    .populate({
        path: 'users',
        select: 'ldap'
    })
    const users = calendar.users
    const leaves = await Promise.all(users.map(async user => ({
        ldap: user.ldap, 
        leave: await getLeaves(user.ldap),
        ill: await getIlls(user.ldap)
    }))
    )
    
    return res.json(leaves)
})


module.exports = router