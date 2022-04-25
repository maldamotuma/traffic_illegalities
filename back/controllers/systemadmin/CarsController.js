const Car = require("../../models/Car");
const { sendRespose, sendServerError } = require("../helpers/utils");

module.exports.addCar = async (req, res) => {
    try {
        const params = req.body;
        const newCar = await Car.create({
            ...params, assignedBy: req.user,
        });
        sendRespose(res, params);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}