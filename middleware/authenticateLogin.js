const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

module.exports.authenticateLogin = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({ message: "You are unauthorized" })
    }
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401)

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ message: "Forbidden route" })
        req.user = user.id
        next()
    })
}

