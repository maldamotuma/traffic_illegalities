require('dotenv').config();
const jwt = require('jsonwebtoken');
const Systemadmin = require('../../models/Systemadmin');

const message = (message, res, status = 0) => {
    return res.json({ status, message });
}

module.exports.VerifyAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (token) {
            const {username} = await jwt.verify(token, process.env.ADMIN_SIGN_STRING);
            if (username) {
                const currentUser = await Systemadmin.findOne({username, "activeSessions.token": token});
                if (currentUser) {
                    req.user = currentUser;
                    return next();
                }

            }
        }
        return message('sign in first', res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Something went wrong while verifying your cookie'});
    }
}