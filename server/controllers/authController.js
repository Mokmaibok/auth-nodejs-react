const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const User = require('../models/userModel')

dotenv.config()

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body

        if (username.length < 5) return res.status(400).send({ message: 'ชื่อผู้ใช้ต้องไม่น้อยกว่า 5 ตัวอักษร' })

        if (password.length < 8) return res.status(400).send({ message: 'รหัสผ่านต้องไม่น้อยกว่า 8 ตัวอักษร' })

        const usernameRegex = /^[a-zA-Z0-9]+$/
        if (!usernameRegex.test(username)) {
            return res.status(400).send({ message: 'ชื่อผู้ใช้ต้องเป็นตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น' })
        }

        const existUser = await User.findOne({ username })

        if (existUser) return res.status(400).send({ message: 'ชื่อผู้ใช้นี้ถูกใช้งานไปแล้ว' })

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = await User.create({ 
            username,
            email,
            password: hashedPassword
        })

        res.send({ user: newUser })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
} 

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).send({ message: 'ไม่มีชื่อผู้ใช้นี้' });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).send({ message: 'รหัสผ่านไม่ถูกต้อง' })

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '10m' })

        res.send({ token: token });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
} 