const { authenticate, logout } = require("../helpers/auth");
const { sendServerError, sendRespose } = require("../helpers/utils")

module.exports.login = async(req, res) => {
    try {
        return await authenticate(req, res, 4); //3 for traffic office
    } catch (error) {
        sendServerError(res, error, "Traffic Office back");
    }
}

module.exports.user = async(req, res) => {
    try {
        return sendRespose(res, { user: req.user });
    } catch (error) {
        sendServerError(res, error, "Traffic Office back");
    }
}

module.exports.logout = async(req, res) => {
    try {
        return await logout(req, res, 2); // 2 referes to system admin
    } catch (error) {
        console.log(error);
        sendServerError(res, error, 'System Admin');
    }
}