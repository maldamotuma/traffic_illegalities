const User = require("../../models/User");
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
        const userRequest = await User.updateOne({ _id: data.driver }, { $push: { driver_assignment_verification: newAssignmentID } }).exec();

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
            assignmentInfo = await User.updateOne({ "driver_assignment._id": data.assignment }, {
                '$set': {
                    "driver_assignment.$.verified_at": Date.now(),
                }
            }).exec();
        } else {
            assignmentInfo = await User.updateOne({ "driver_assignment._id": data.assignment }, {
                '$set': {
                    "driver_assignment.$.rejected_at": Date.now(),
                }
            }).exec();
        }

        /**
         * delete assignment verification request
         */
        req.user.driver_assignment_verification.pull(data.assignment);
        await req.user.save();
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
        sendRespose(res, { driver });
    } catch (error) {
        console.log(error);
        sendRespose(res, "server get driver to assign!!");
    }
}