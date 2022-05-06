const User = require("../../models/User");
const { sendRespose } = require("../helpers/utils");

module.exports.userOwner = async(req, res) => {
    try {
        const ID_id = req.query.id;
        const users = await User.find({ "identificationCards.id_number": { $regex: '.*' + ID_id + '.*' } }, "_id name identificationCards");
        sendRespose(res, { users });
    } catch (error) {
        sendRespose(res, "forbidden !!");
    }
}