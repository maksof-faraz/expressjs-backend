const jwt = require('jsonwebtoken');
const User = require('../model/user-model');

const authMiddleware = async (req , res  , next)=>{

    const token  = req.headers['authorization'];
    if(!token) {
        return res.send(401).json({messgae : 'Unauthorized request , Invalid token'})
    }

    const jwtToken = token.replace('Bearer' , '').trim();

    try{
        const isVerified = jwt.verify(jwtToken , process.env.Jwt_Secrete_key);

        const userData = await User.findOne({email : isVerified.email});
        req.user = userData;

        next();
    } catch(err){
        return res.send(401).json({messgae : 'Unauthorized request , Invalid token'})
    }

}

module.exports = authMiddleware