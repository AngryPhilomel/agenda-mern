const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const Calendar = require('../models/Calendar')
const User = require('../models/User')
const { findById } = require('../models/Calendar')

const router = Router()

router.post('/new', auth, async(req, res) => {
    try {
        const {title} = req.body
        const admins = []
        const users = []
        admins.push(req.user.userId)
        users.push(req.user.userId)
        const calendar = new Calendar({title, admins, users})
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
            .populate({
                path: 'calendars',
                select: '_id title'
            })
            
        
        res.status(200).json({calendars: user.calendars})
    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так: ${e.message}`})
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.id)
        res.status(200).json({calendar})
    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так: ${e.message}`})
    }
})

router.post('/:id/adduser', auth, async(req, res) => {
    const {userId} = req.body
    try {
        const calendar = await Calendar.findById(req.params.id, function(err, cal) {
            if (err) throw err
            cal.users.push(userId)
            cal.save()
        })

        const user = await User.findById(userId, function(err, user) {
            if (err) throw err
            user.calendars.push(req.params.id)
            user.save()
        })
        res.status(200).json({message: 'Пользователь добавлен'})

    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так: ${e.message}`})
    }
})

router.post('/:id/removeuser', auth, async(req, res) => {
    const {userId} = req.body
    try {
        const calendar = await Calendar.findById(req.params.id, function(err, cal) {
            if (err) throw err
            const filtered = cal.users.filter((u) => u.toString() !== userId.toString())
            // console.log(filtered)
            cal.users = filtered
            cal.save()
        })

        const user = await User.findById(userId, function(err, user) {
            if (err) throw err
            const filtered = user.calendars.filter(cal => cal.toString() !== req.params.id.toString())
            // console.log(filtered)
            user.calendars = filtered
            user.save()
        })

        res.status(200).json({message: 'Пользователь удален'})

    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так: ${e.message}`})
    }
})

module.exports = router