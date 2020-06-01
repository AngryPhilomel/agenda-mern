const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const Calendar = require('../models/Calendar')
const User = require('../models/User')

const router = Router()

router.post('/new', auth, async(req, res) => {
    try {
        const {title} = req.body
        const admins = []
        admins.push(req.user.userId)
        const calendar = new Calendar({title, admins})
        calendar.save()
        const owner = User.findById(req.user.userId, function(err, user) {
            if (err) throw err
            user.calendars.push(calendar._id)
            user.save()
        })
        res.status(201).json(calendar)
    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так: ${e.message}`})
    }
})

router.get('/', auth, async(req, res) => {
    try {
        
        const user = await User.findById(req.user.userId)
            .populate('calendars')
        
        res.status(200).json({message: user.calendars})
    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так: ${e.message}`})
    }
})

// const getCalendar = async id => {
//     const cal = await Calendar.findById(id)
//     return await cal
// }

module.exports = router