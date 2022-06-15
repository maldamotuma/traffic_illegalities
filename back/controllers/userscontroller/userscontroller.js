const User = require("../../models/User");
const UserTraffic = require("../../models/UserTraffic");
const { sendRespose } = require("../helpers/utils");

module.exports.assignDriver = async(req, res) => {
    try {
        const data = req.body;
        /**
         * main driver assignment on car owner
         */
        req.user.driver_assignment.push(data);
        const newAssignment = await req.user.save();

        const { driver_assignment } = newAssignment;
        const newAssignmentID = driver_assignment.pop();

        /**
         * driver verification request
         */

        const userRequest = await User.updateOne({ _id: data.driver }, { $push: { driver_assignment_verification: { car: data.car, requested_on: Date.now(), ass_id: newAssignmentID._id } } });

        sendRespose(res, { message: userRequest });
    } catch (error) {
        console.log(error);
        sendRespose(res, "error Happende!!");
    }
}

module.exports.verifyAssignment = async(req, res) => {
    try {
        const data = req.body; // assignment, accepted
        /**
         * Registering response
         */
        let assignmentInfo;
        if (data.accepted) {
            await User.updateOne({ "driver_assignment_verification._id": data.assignment }, {
                driving: data.car
            });
            assignmentInfo = await User.updateOne({ "driver_assignment.car": data.car }, {
                '$set': {
                    "driver_assignment.$.verified_at": Date.now(),
                }
            }).exec();
        } else {
            assignmentInfo = await User.updateOne({ "driver_assignment._id": data.car }, {
                '$set': {
                    "driver_assignment.$.rejected_at": Date.now(),
                }
            }).exec();
        }

        /**
         * delete assignment verification request
         */
        await User.updateOne({ _id: req.user._id }, {
            $pull: {
                driver_assignment_verification: {
                    _id: data.assignment
                }
            }
        });
        // req.user.driver_assignment_verification.pull({ "driver_assignment_verification._id": data.assignment });
        // await req.user.save();
        sendRespose(res, { message: assignmentInfo });
    } catch (error) {
        console.log(error);
        sendRespose(res, "error Happende!!");
    }
}

module.exports.getDriver = async(req, res) => {
    try {
        const query = req.query;
        const driver = await User.findOne({ username: query.username }).exec();
        if (driver) {
            sendRespose(res, { driver });
        } else {
            sendRespose(res, "Check your spelling");
        }
    } catch (error) {
        console.log(error);
        sendRespose(res, "server get driver to assign!!");
    }
}

module.exports.assignments = async(req, res) => {
    try {
        // const requests = await User.findOne({ _id: "626ec21625c43bc1fa5c9e86" }, "driver_assignment_verification").populate("driver_assignment_verification.car", "_id name platenumber owner").populate("driver_assignment_verification.car.owner").exec();
        const requests = await User.findOne({ _id: req.user._id }, "driver_assignment_verification").populate("driver_assignment_verification.car");
        const requests_info = await requests.populate("driver_assignment_verification.car.owner", "name");
        console.log(requests_info);
        sendRespose(res, { requests: requests_info.driver_assignment_verification });
    } catch (error) {
        console.log(error);
        sendRespose(res, "server get driving requests!!");
    }
}

module.exports.trafficConversations = async(req, res) => {
    try {
        const conversations = await UserTraffic.find({ user: req.user._id }).populate("traffic").exec();
        console.log("hello malda", conversations);
        sendRespose(res, { conversations });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "User conversation fetching for users");
    }
}

module.exports.trafficConversation = async(req, res) => {
    try {
        const conversation = await UserTraffic.findOne({ _id: req.query.conv_id }).exec();
        console.log("hello malda motuma", conversation);
        sendRespose(res, { conversation });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "User conversation fetching for users single conversation");
    }
}