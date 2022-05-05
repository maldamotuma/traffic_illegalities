const { sendRespose } = require("../helpers/utils");
const Useroperator = require("../../models/Useroperator");

module.exports.operatorConversation = async(req, res) => {
    try {
        const { op_region } = req.body;
        const conversation = await Useroperator.findOne({ closed: false, user: req.user }).exec();
        if (conversation) {
            sendRespose(res, { conversation });
        } else {
            const tmp_conversation = new Useroperator({
                user: req.user,
                operator: op_region,
                closed: false
            });
            const new_conv = await tmp_conversation.save();
            sendRespose(res, { conversation: new_conv });
        }
    } catch (error) {
        console.log(error);
        sendRespose(res, "error Happende!!");
    }
}