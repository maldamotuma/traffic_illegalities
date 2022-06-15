const Operator = require("../models/Oprator");
const Record = require("../models/Record");
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
        const { _id, name, email, phoneNumber, driving } = await User.findOne(queries, "_id name email phoneNumber").populate("driving", "name type platenumber level");
        const driver = {
            _id,
            name,
            email,
            phoneNumber
        }
        const license = driver.identificationCards;
        const car = driving;
        // const new_records = await Record.find({ driver: driver, closed: false }).populate("car").exec();
        const new_records = await Record.find({ driver: driver._id, closed: false }, "_id exact_violation createdAt");
        const old_records = await Record.find({ driver: driver._id, closed: true }, "_id  exact_violation createdAt");
        return sendRespose(res, { driver, new_records, license, car, old_records });
    } catch (error) {
        return sendRespose(res, "forbidden");
    }
}