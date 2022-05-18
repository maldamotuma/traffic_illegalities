const Operator = require("../models/Oprator");
const Speed = require("../models/Speed");
const User = require("../models/User");
const { sendRespose, XMLResponse } = require("./helpers/utils");

module.exports.info = async(req, res) => {
    try {
        const speedLimits = await Speed.find({}, "_id regionInfo speedLimit region").exec();
        const operators = await Operator.find({}, "_id region").exec();
        return sendRespose(res, { info: { speedLimits, operators } });
        // XMLResponse(res, { speedLimits, operators });
    } catch (error) {
        return sendRespose(res, "forbidden");
    }
}

module.exports.driver = async(req, res) => {
    try {
        const queries = req.query;
        const label = Object.keys(queries)[0];
        const value = Object.values(queries)[0];
        const dataq = {};
        dataq[label] = value;
        const driver = await User.findOne(queries).exec();
        return sendRespose(res, { driver });
    } catch (error) {
        return sendRespose(res, "forbidden");
    }
}