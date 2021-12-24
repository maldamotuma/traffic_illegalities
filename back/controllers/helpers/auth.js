require('dotenv').config();
const jwt = require('jsonwebtoken');
const { schemaRefs, secretVariables } = require('./datas');
const { PasswordResetMail } = require('./mails');
const { transporter } = require('./sendmessage');
const { sendRespose } = require('./utils');
var bcrypt = require('bcryptjs');


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
    const tmptoken = await jwt.sign({ ...data, gs: whichModel }, secretVariables[whichModel], { expiresIn: process.env.TOKEN_MAX_AGE });
    return tmptoken;
}

const setCookies = (res, token, actor) => {
    res.cookie('secauth', { token, gs: actor }, { maxAge: process.env.TOKEN_MAX_AGE });
    res.status(200);
}

const attempt = async (currentUser, password) => {
    try {
        const pswd = await bcrypt.compare(password, currentUser.password);
        // const loginStatus = (currentUser && currentUser.password === password) ? 1 : 0;
        // console.log("malda : "+pswd);
        return pswd;
    } catch (error) {
        console.log(error);
    }
}

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
}

module.exports.authenticate = async (req, res, SchemaInstance) => {
    try {
        var resMessage = "Invalid Credentials";
        const { username, password } = req.body;
        const currentUser = await schemaRefs[SchemaInstance].findOne({ username });
        if (await attempt(currentUser, password)) {
            const token = await generateToken({ username }, SchemaInstance); // SchemaInstance identifies actor
            registerSession(req, currentUser, token);
            setCookies(res, token, SchemaInstance);
            resMessage = { user: currentUser };
        };
        sendRespose(res, resMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: 0, message: "Server Error" });
    }
}

module.exports.changePassword = async (currentUser, password) => {
    try {
        const hash = await hashPassword(password);
        currentUser.password = hash;
        const upuser = await currentUser.save();
        return upuser;
    } catch (error) {
        console.log(error);
    }
}

module.exports.sendForgotPassword = async (req, res, gsn) => {
    try {
        const { email } = req.body;
        const uid = await schemaRefs[gsn].findOne({ email }, '_id, name');
        const token = await jwt.sign({ secid: uid._id, gs: gsn }, secretVariables[gsn], { expiresIn: '10m' });


        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            html: PasswordResetMail(uid.name.first + " " + uid.name.last, token)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.send(token);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 0, message: "Server Error" });
    }
}

module.exports.hashPassword = hashPassword;