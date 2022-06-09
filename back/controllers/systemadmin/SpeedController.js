const Speed = require("../../models/Speed");
const { sendRespose, sendServerError } = require("../helpers/utils");

module.exports.addSpeed = async(req, res) => {
    try {
        let params = req.body;
        params.region = params.coordinates;
        delete params.coordinates;

        const newSpeed = await Speed.create({
            ...params,
            assignedBy: req.user
        });
        sendRespose(res, newSpeed);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}

module.exports.speedLimits = async(req, res) => {
    try {
        const speedlimits = await Speed.find({}).populate("assignedBy", "name _id").exec();
        sendRespose(res, { speedlimits });
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}