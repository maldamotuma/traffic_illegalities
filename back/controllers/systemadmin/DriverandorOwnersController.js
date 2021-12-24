const DriverOwner = require("../../models/Driverowner");
const { hashPassword } = require("../helpers/auth");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.addDriverOwner = async (req, res) => {
    try {
        const params = req.body;
        const newDriverOwner = await DriverOwner.create({
            ...params, assignedBy: req.user, password: await hashPassword(params.password)
        });
        sendRespose(res, newDriverOwner);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}