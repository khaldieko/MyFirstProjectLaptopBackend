const jwt = require("jsonwebtoken");


const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    },
    process.env.SECRET,
    {
        expiresIn: 86000
    }
    )
}

module.exports=generateToken

