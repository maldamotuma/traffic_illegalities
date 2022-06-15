const UserOperator = require("../../models/Useroperator");
const { sendRespose, sendServerError } = require("../helpers/utils");

module.exports.userConversation = async(req, res) => {
    try {
        const conversation_id = req.query.id;
        const conversation = await UserOperator.findOne({ _id: conversation_id }).populate('user', 'name _id').exec();
        sendRespose(res, { conversation });
    } catch (error) {
        console.log(error);
        sendRespose(res, 'forbidden');
    }
}

module.exports.closeConversation = async(req, res) => {
    try {
        const conversation_id = req.params.conv_id;
        const conversation = await UserOperator.updateOne({ _id: conversation_id }, {
            closed: true
        });
        sendRespose(res, { conversation });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, 'close user operator conversation');
    }
}