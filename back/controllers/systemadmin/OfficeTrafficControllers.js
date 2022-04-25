const Officetraffic = require("../../models/Officetraffic");
const { sendRespose, sendServerError } = require("../helpers/utils");

module.exports.addOfficeTraffic = async (req, res) => {
    try {
        const params = req.body;
        const newTrafficoffice = await Officetraffic.create({
            ...params, assignedBy: req.user, password: await hashPassword(params.password)
        });
        sendRespose(res, newTrafficoffice);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}