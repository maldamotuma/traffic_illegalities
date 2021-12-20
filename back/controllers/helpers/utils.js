
module.exports.sendRespose = (res, message) => {
    const status = typeof (message) === 'string' ? 0 : 1; // error message or success message
    let formatted_message = {};
    formatted_message = status ? { status, ...message } : { status, message: message };
    return res.json(formatted_message);
}