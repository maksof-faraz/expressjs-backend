const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) next();

    try {
        user.password = await bcrypt.hash(user.password, 10)
    } catch (err) {
        next(err);
    }
})

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            userName : this.username,
            email: this.email
        },
        process.env.Jwt_Secrete_key,
        {
            expiresIn: "1d"
        }
        );
    } catch (err) {
        console.log(err);
    }
}

const User = new mongoose.model('User', userSchema);

module.exports = User;
