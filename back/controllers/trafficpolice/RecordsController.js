const Record = require("../../models/Record");
const { sendRespose } = require("../helpers/utils");

module.exports.registerRecord = async(req, res) => {
    try {
        const data = req.body;
        const newRecord = await Record.create({
            ...data
        });
        sendRespose(res, { record: newRecord });
    } catch (error) {
        return sendRespose(res, "forbidden");
    }
}