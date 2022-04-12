const jwt = require('jsonwebtoken');


const generateAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN,
        {expiresIn : '1h'}
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        user,
        process.env.REFRESH_TOKEN,
        {expiresIn : '1h'}
    )
}

module.exports = {
    generateAccessToken, 
    generateRefreshToken
}