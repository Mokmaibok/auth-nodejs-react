const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRouter = require('./routes/authRouter')
const authMiddleware = require('./middleware/authMiddleware')
const app = express()

dotenv.config()

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('เชื่อมต่อ Database MongoDB สำเร็จ'))
    .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ Database MongoDB:', error)
        process.exit(1)
    })

app.get('/', authMiddleware, (req, res) => {
    res.send('Hello World')
})
app.use('/api', authRouter)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})