const Operator = require("../models/Oprator");
const Speed = require("../models/Speed");
const { sendRespose } = require("./helpers/utils");

module.exports.info = async(req, res) => {
    try {
        const speedLimits = await Speed.find({}, "_id regionInfo speedLimit region").exec();
        const operators = await Operator.find({}, "_id region").exec();
        return sendRespose(res, { info: { speedLimits, operators } });
    } catch (error) {
        return sendRespose(res, "forbidden");
    }
}