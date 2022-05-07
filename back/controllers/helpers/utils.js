const { logger_to_file } = require("../../logger");
const Crashlog = require("../../models/Crashlog");
const { log_path } = require("./logfilespath");

module.exports.sendRespose = (res, message, cstatus = null) => {
    const success = (cstatus === null) ? typeof(message) === 'string' ? 0 : 1 : cstatus; // error message or success message
    let formatted_message = {};
    formatted_message = success ? { success, ...message } : { success, message: message };
    return res.json(formatted_message);
}

module.exports.sendServerError = async(res, error, actor = "unknown") => {
    const message_file = error.message.replace(/(?<=\w)\s+(?=\w)|(\s+)/g, "_") + "__" + Date.now() + ".log";
    const logger = logger_to_file(log_path[actor] + message_file);
    await Crashlog.create({
        log_file: message_file,
        from: actor
    })
    logger.error({
        error: {
            code: error.code,
            message: error.message,
            stack: error.stack
        }
    });
    return res.status(500).json({ success: 0, message: "Server Error" });
}