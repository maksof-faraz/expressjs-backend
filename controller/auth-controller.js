const User = require('../model/user-model')
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExit = await User.findOne({ email: email })
        if (userExit) return res.status(400).json({ msg: 'email already exist' })
        const userCreated = await User.create({ username, email, password })
        res.status(201).json({ msg: 'registration successful', token: await userCreated.generateToken(), userId: userCreated._id.toString() });
    } catch (err) {
        res.status(500).json({ msg: 'internal server error , please try again!' })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExit = await User.findOne({ email: email })
        if (!userExit) return res.status(400).json({ msg: 'invalid credentials' })
        const user = await bcrypt.compare(password, userExit.password)

        if (user) {
            res.status(201).json({
                msg: 'login successful',
                token: await userExit.generateToken(),
                userId: userExit._id.toString()
            });

        } else res.status(401).json({ msg: 'invalid email or password' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'internal server error , please try again!' })
    }
}


module.exports = { register, login }