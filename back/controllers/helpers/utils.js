
module.exports.sendRespose = (res, message, cstatus = null) => {
    const success = (cstatus === null) ? typeof (message) === 'string' ? 0 : 1 : cstatus; // error message or success message
    let formatted_message = {};
    formatted_message = success ? { success, ...message } : { success, message: message };
    return res.json(formatted_message);
}

module.exports.sendServerError = (res) => {
    return res.status(500).json({ success: 0, message: "Server Error"});
}