const Trafficpolice = require("../../models/Trafficpolice");
const { hashPassword } = require("../helpers/auth");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.addTrafficPolices = async (req, res) => {
    try {
        const params = req.body;
        const newTrafficpolice = await Trafficpolice.create({
            ...params, assignedBy: req.user, password: await hashPassword(params.password)
        });
        sendRespose(res, newTrafficpolice);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}