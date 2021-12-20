require('dotenv').config();
const jwt = require('jsonwebtoken');
const { schemaRefs, secretVariables } = require('./datas');
const { sendRespose } = require('./utils');


registerSession = async (req, currentUser, token) => {
    currentUser.activeSessions.push({
        token,
        dateTime: new Date(),
        userAgent: req.headers['user-agent'],
        Os: req.headers['sec-ch-ua-platform'],
        device: req.headers['sec-ch-ua-mobile']
    });
    await currentUser.save();
}

generateToken = async (data, whichModel) => {
    const tmptoken = await jwt.sign({ ...data, gs: whichModel}, secretVariables[whichModel], { expiresIn: process.env.TOKEN_MAX_AGE });
    return tmptoken;
}

const setCookies = (res, token, actor) => {
    res.cookie('secauth', {token, gs: actor}, { maxAge: process.env.TOKEN_MAX_AGE });
    res.status(200);
}

const attempt = (currentUser, password) => {
    const loginStatus = (currentUser && currentUser.password === password) ? 1 : 0;
    return loginStatus;
}

module.exports.authenticate = async (req, res, SchemaInstance) => {
    try {
        var resMessage = "Invalid Credentials";
        const { username, password } = req.body;
        const currentUser = await schemaRefs[SchemaInstance].findOne({ username });
        if (attempt(currentUser, password)) {
            const token = await generateToken({ username }, SchemaInstance); // SchemaInstance identifies actor
            registerSession(req, currentUser, token);
            setCookies(res, token, SchemaInstance);
            resMessage = { user: currentUser };
        }
        sendRespose(res, resMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: 0, message: "Server Error" });;
    }
}