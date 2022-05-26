const { sendServerError, sendRespose } = require("../helpers/utils")

module.exports.recordPunishments = async(req, res) => {
    try {
        const params = req.body;
        sendRespose(res, { params });
    } catch (error) {
        sendServerError(res, error, "Traffic office adding new punishment record");
    }
}