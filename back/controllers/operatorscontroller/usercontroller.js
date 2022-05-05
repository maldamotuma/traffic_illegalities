const UserOperator = require("../../models/Useroperator");
const { sendRespose } = require("../helpers/utils");

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