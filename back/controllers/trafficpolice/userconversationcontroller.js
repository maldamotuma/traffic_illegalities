const UserTraffic = require("../../models/UserTraffic");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.userConversations = async(req, res) => {
    try {
        const conversations = await UserTraffic.find({ traffic: req.user._id }).populate("user").exec();
        console.log(conversations);
        sendRespose(res, { conversations });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "User conversation fetching for traffic police");
    }
}

module.exports.userConversation = async(req, res) => {
    try {
        const conversation = await UserTraffic.findOne({ _id: req.query.conv_id }).exec();
        console.log("hello malda motuma", req.query.conv_id);
        sendRespose(res, { conversation });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "User conversation fetching for users single conversation");
    }
}