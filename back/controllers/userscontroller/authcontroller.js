const { sendServerError, sendRespose } = require("../helpers/utils");
const User = require("../../models/User");
const { hashPassword, authenticate } = require("../helpers/auth");

module.exports.register = async(req, res) => {
    try {
        const params = req.body;
        const user = await User.create({
            ...params,
            password: await hashPassword(params.password)
        });
        return sendRespose(res, { user });
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}

module.exports.login = async(req, res) => {
    try {
        return await authenticate(req, res, 1); //1 REFERES TO A USER
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}

module.exports.test = async(req, res) => {
    try {
        const user = req.user;
        console.log("hello!!");
        return sendRespose(res, { user });
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}