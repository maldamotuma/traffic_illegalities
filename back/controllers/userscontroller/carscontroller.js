const Car = require("../../models/Car");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.getMyCars = async(req, res) => {
    try {
        const cars = await Car.find({ _id: { $in: req.user.ownedcars } }).exec();
        sendRespose(res, { cars });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "Get My Cars backend");
    }
}