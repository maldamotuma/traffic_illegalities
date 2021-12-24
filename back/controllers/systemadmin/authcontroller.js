// const mongoose = require('mongoose');
const Systemadmin = require('../../models/Systemadmin');
const {
    // registerSession,
    // generateToken,
    // setCookies,
    // attempt,
    authenticate, changePassword, sendForgotPassword, hashPassword
} = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const { sendServerError, sendRespose } = require('../helpers/utils');


module.exports.signIn = async (req, res) => {
    try {
        return await authenticate(req, res, 0); // 0 referes to system admin
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 0, message: "Server Error" });
    }
}


module.exports.signUp = async (req, res) => {
    try {
        // const newAdmin = await Systemadmin.create({
        //             "name": {
        //               "first": "test",
        //               "last": "test1"
        //             },
        //             "email": "maldamotuma@gmail.com",
        //             "phoneNumber": "927 237 9610",
        //             "profilePicture": "Yamia",
        //             "password": await hashPassword('123'),
        //             "username": "HelloMalda1st"
        //           });
        // const newAdmin = await Systemadmin.insertMany(
        //     [{
        //         "name": {
        //           "first": "Dean",
        //           "last": "Greenlees"
        //         },
        //         "email": "dgreenlees0@ezinearticles.com",
        //         "phoneNumber": "165 864 3198",
        //         "profilePicture": "Trudeo",
        //         "password": "X3AtlyIbZvr",
        //         "username": "dgreenlees0"
        //       }, {
        //         "name": {
        //           "first": "Matthieu",
        //           "last": "Hallgate"
        //         },
        //         "email": "mhallgate1@photobucket.com",
        //         "phoneNumber": "347 293 7858",
        //         "profilePicture": "Izio",
        //         "password": "JKUYbjwn7",
        //         "username": "mhallgate1"
        //       }, {
        //         "name": {
        //           "first": "Dore",
        //           "last": "Connold"
        //         },
        //         "email": "dconnold2@washingtonpost.com",
        //         "phoneNumber": "353 535 0992",
        //         "profilePicture": "Kwimbee",
        //         "password": "zxDNNH5P4",
        //         "username": "dconnold2"
        //       }, {
        //         "name": {
        //           "first": "Agnola",
        //           "last": "Ginnaly"
        //         },
        //         "email": "aginnaly3@networkadvertising.org",
        //         "phoneNumber": "586 880 6473",
        //         "profilePicture": "Quatz",
        //         "password": "DcvNIrcPEYFV",
        //         "username": "aginnaly3"
        //       }, {
        //         "name": {
        //           "first": "Tessie",
        //           "last": "Holdforth"
        //         },
        //         "email": "tholdforth4@apple.com",
        //         "phoneNumber": "311 435 9272",
        //         "profilePicture": "Fadeo",
        //         "password": "FazTFzVUARl",
        //         "username": "tholdforth4"
        //       }, {
        //         "name": {
        //           "first": "Melody",
        //           "last": "Batchellor"
        //         },
        //         "email": "mbatchellor5@behance.net",
        //         "phoneNumber": "221 183 2511",
        //         "profilePicture": "Zoomlounge",
        //         "password": "7nbdAA",
        //         "username": "mbatchellor5"
        //       }, {
        //         "name": {
        //           "first": "Erwin",
        //           "last": "Kauffman"
        //         },
        //         "email": "ekauffman6@howstuffworks.com",
        //         "phoneNumber": "371 834 9426",
        //         "profilePicture": "Leexo",
        //         "password": "hzs72yHXQ1b",
        //         "username": "ekauffman6"
        //       }, {
        //         "name": {
        //           "first": "Virginia",
        //           "last": "Lidington"
        //         },
        //         "email": "vlidington7@amazon.com",
        //         "phoneNumber": "194 541 8288",
        //         "profilePicture": "Photobug",
        //         "password": "pSoHfxvrs",
        //         "username": "vlidington7"
        //       }, {
        //         "name": {
        //           "first": "Elita",
        //           "last": "De Brett"
        //         },
        //         "email": "edebrett8@fastcompany.com",
        //         "phoneNumber": "832 126 5170",
        //         "profilePicture": "JumpXS",
        //         "password": "Tyw0gYcM5X",
        //         "username": "edebrett8"
        //       }, {
        //         "name": {
        //           "first": "Janetta",
        //           "last": "Ledingham"
        //         },
        //         "email": "jledingham9@wisc.edu",
        //         "phoneNumber": "927 237 9610",
        //         "profilePicture": "Yamia",
        //         "password": "gXWYF0",
        //         "username": "jledingham9"
        //       }]
        // );
        //
        // return  res.json({admins: newAdmin});
    } catch (error) {
        console.log(error);
    }
}

module.exports.forgotPassword = async (req, res) => {
    return sendForgotPassword(req, res, 0);
}


module.exports.resetPassword = async (req, res) => {
    try {
        const token = req.query._system_admin;
        var { secid, gs } = await jwt.verify(token, process.env.SYSTEM_ADMIN_SIGN_STRING);
        res.send({ secid, gs });
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

module.exports.createNewPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const nusrpswd = await changePassword(req.user, password);
        sendRespose(res, { password, nusrpswd });
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}
module.exports.test = async (req, res) => {
    return res.json({ message: 'hitted success fully', user: req.user });
}