const User = require("../../models/User");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.carforcar = async(req, res) => {
    try {
        const driver = await User.findOne({ driving: req.query._id }, "_id").exec();
        sendRespose(res, { driver });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "Fetching info for car ");
    }
}