require('dotenv').config();
const jwt = require('jsonwebtoken');
const { schemaRefs, secretVariables } = require('./datas');
const { PasswordResetMail } = require('./mails');
const { transporter } = require('./sendmessage');
const { sendRespose } = require('./utils');
var bcrypt = require('bcryptjs');


const registerSession = async (req, currentUser, token, oneTime=false) => {
    currentUser.activeSessions.push({
        token,
        dateTime: new Date(),
        userAgent: req.headers['user-agent'],
        Os: req.headers['sec-ch-ua-platform'],
        device: req.headers['sec-ch-ua-mobile']
    });
    if (oneTime) {
        currentUser.oneTime = true;
    }
    return await currentUser.save();
}

const generateToken = async (data, whichModel) => {
    const tmptoken = await jwt.sign({ ...data, gs: whichModel }, secretVariables[whichModel], { expiresIn: parseInt(process.env.TOKEN_MAX_AGE) });
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
        let currentUser = await schemaRefs[SchemaInstance].findOne({ username });
        console.log(await hashPassword("123"));
        if (currentUser && await attempt(currentUser, password)) {
            const token = await generateToken({ username }, SchemaInstance); // SchemaInstance identifies actor
            currentUser = await registerSession(req, currentUser, token);
            setCookies(res, token, SchemaInstance);
            resMessage = { user: currentUser };
        };
        sendRespose(res, resMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: 0, message: error });
    }
}

module.exports.changePassword = async (currentUser, password, oneTime = false) => {
    try {
        const hash = await hashPassword(password);
        currentUser.password = hash;
        if (oneTime) {currentUser.oneTime = false;}
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
        const token = await jwt.sign({ secid: uid._id, gs: gsn }, secretVariables[gsn], { expiresIn: '1d' });


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

module.exports.logout = async (req, res, gsn) => {
    try{
        await schemaRefs[gsn].updateOne({ _id: req.user._id }, {$pull: {activeSessions: {token: req.user.secToken}}});
        res.clearCookie('secauth');
        sendRespose(res, {user: null}, -1);
    }catch(err){
        console.log(err);
        sendRespose(res, 'something went wrong');
    }
}

module.exports.login = async(req, res, _id, actorIndex) => {
    try{
       let currentUser = await schemaRefs[actorIndex].findOne({ _id });
       const token = await generateToken({ username:  currentUser.username}, actorIndex);
       currentUser = await registerSession(req, currentUser, token, true);
       setCookies(res, token, actorIndex);
       return sendRespose(res, {user: currentUser}); 
    }catch(error){
        console.log(error);
        sendRespose(res, 'something went wrong');
    }
    
}
module.exports.hashPassword = hashPassword;
module.exports.attempt = attempt;