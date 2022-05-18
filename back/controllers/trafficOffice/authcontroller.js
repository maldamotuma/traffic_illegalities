const { authenticate } = require("../helpers/auth");
const { sendServerError } = require("../helpers/utils")

module.exports.login = async(req, res) => {
    try {
        return await authenticate(req, res, 3); //3 for traffic office
    } catch (error) {
        sendServerError(res, error, "Traffic Office back");
    }
}