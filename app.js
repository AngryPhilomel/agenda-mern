const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth.routes')

const app = express()

app.use(express.json({extended:true}))

app.use('/api/auth', authRouter)

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