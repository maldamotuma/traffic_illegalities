const OpratorSchema = require("../../models/Oprator");
const { hashPassword } = require("../helpers/auth");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.addOperator = async (req, res) => {
    try {
        const params = req.body;
        const operator = await OpratorSchema.create({
            ...params, assignedBy: req.user, password: await hashPassword(params.password)
        });
        sendRespose(res, operator);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}