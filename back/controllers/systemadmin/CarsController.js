const Car = require("../../models/Car");
const { sendRespose, sendServerError } = require("../helpers/utils");

module.exports.addCar = async (req, res) => {
    try {
        const params = req.body;
        params.level = JSON.parse(params.level);
        params.photos = [];
        req.files.forEach(elmnt => {
            params.photos.push(elmnt.filename)
        });
        const newCar = await Car.create({
            ...params, assignedBy: req.user,
        });
        sendRespose(res, newCar);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}

module.exports.cars = async (req, res) => {
    try {
        const cars = await Car.find({}).exec();
        sendRespose(res, {cars});
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}