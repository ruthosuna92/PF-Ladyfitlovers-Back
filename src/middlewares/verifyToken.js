const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { User } = require('../db')

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(500).json({ error: "Authorization header is required." })
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(404).json("JWT token not found in the Authorization header.")
        const tokenVerified = await jwt.verify(token, JWT_SECRET)
        if (req.body && Object.keys(req.body)) {
            if (tokenVerified.id !== req.body.userId) throw Error('User ID in the JWT token does not match the requested user ID.')
        }
        req.user = tokenVerified.id
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = verifyToken;

//cart verify complete