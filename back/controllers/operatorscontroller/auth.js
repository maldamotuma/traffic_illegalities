const { authenticate, logout } = require("../helpers/auth");
const { sendRespose } = require("../helpers/utils");

module.exports.login = async(req, res) => {
    try {
        return await authenticate(req, res, 2); // 2 referes to operator
    } catch (error) {
        console.log(error);
        sendRespose(res, 'forbidden');
    }
}


module.exports.user = async(req, res) => {
    try {
        return sendRespose(res, { user: req.user });
    } catch (error) {
        console.log(error);
        sendRespose(res, 'forbidden');
    }
}

module.exports.logout = async(req, res) => {
    try {
        return await logout(req, res, 2); // 2 referes to system admin
    } catch (error) {
        console.log(error);
        sendRespose(res, 'forbidden');
    }
}