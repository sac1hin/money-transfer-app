const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer ')) {
            throw new Error('Unauthorized');
        }

        const decode = await jwt.verify(token.split(' ')[1], SECRET_KEY);

        if (decode) {
            const user = await User.findOne({ _id: decode.id }).select('-password');
            req.user = user;
        }

        next();
    } catch (e) {
        return res.status(403).json(e.message);
    }
}