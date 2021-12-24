const Systemadmin = require("../../models/Systemadmin");
const { hashPassword } = require("../helpers/auth");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.addSystemAdmin = async (req, res) => {
    try {
        const params = req.body;
        const newSystemAdmin = await Systemadmin.create({
            ...params,
            assignedBy: req.user,
            password: await hashPassword(params.password)
        });
        sendRespose(res, newSystemAdmin);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}