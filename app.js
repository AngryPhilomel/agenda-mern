const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const authRouter = require('./routes/auth.routes')
const calendarRouter = require('./routes/calendar.routes')

const app = express()

app.use(express.json({extended:true}))
app.use('/api/auth', authRouter)
app.use('/api/calendar', calendarRouter)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) 
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true  
        })
        app.listen(PORT, () => {
            console.log(`Server has been starten on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()