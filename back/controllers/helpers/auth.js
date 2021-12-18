require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.registerSession = async (req, currentUser, token) => {
    currentUser.activeSessions.push({
        token,
        dateTime: new Date(),
        userAgent: req.headers['user-agent'],
        Os: req.headers['sec-ch-ua-platform'],
        device: req.headers['sec-ch-ua-mobile']
    });
    await currentUser.save();
}

module.exports.generateToken = async (data) => {
    const tmptoken = await jwt.sign({...data}, process.env.ADMIN_SIGN_STRING, { expiresIn: process.env.TOKEN_MAX_AGE });
    return tmptoken;
}