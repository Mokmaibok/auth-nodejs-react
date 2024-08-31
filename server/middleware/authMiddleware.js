const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization']

        if (!token) return res.status(401).send({ message: 'ไม่มี token' })
        
        const decoded = jwt.verify(token, JWT_SECRET)

        req.user = decoded.user
        next()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}