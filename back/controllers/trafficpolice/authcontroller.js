const { authenticate, logout } = require("../helpers/auth");
const { sendRespose } = require("../helpers/utils");

module.exports.login = async(req, res) => {
    try {
        return await authenticate(req, res, 3); //3 REFERES TO A TRAFFIC POLICE
    } catch (error) {
        return sendRespose(res, "forbidden");
    }
}

module.exports.logout = async(req, res) => {
    try {
        return await logout(req, res, 3); // 3 referes to operator
    } catch (error) {
        return sendRespose(res, "forbidden");
    }
}