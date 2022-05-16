const Crashlog = require("../../models/Crashlog");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.crashes = async(req, res) => {
    try {
        const crashes = await Crashlog.find({}).exec();
        sendRespose(res, { crashes });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "Systemadmin");
    }
}

module.exports.downloadCrash = async(req, res) => {
    try {
        const crash = await Crashlog.findOne({ _id: req.query.crash }).exec();
        const file = "./logFiles/user/" + crash.log_file;
        return res.download(file);
        // sendRespose(res, { file });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "Systemadmin");
    }
}