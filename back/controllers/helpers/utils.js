
module.exports.sendRespose = (res, message) => {
    const status = typeof (message) === 'string' ? 0 : 1; // error message or success message
    let formatted_message = {};
    formatted_message = status ? { status, ...message } : { status, message: message };
    return res.json(formatted_message);
}

module.exports.sendServerError = (res) => {
    return res.status(500).json({ success: 0, message: "Server Error"});
}