const Systemadmin = require("../../models/Systemadmin");
const { hashPassword } = require("../helpers/auth");
const { sendServerError, sendRespose } = require("../helpers/utils");
const Conversation = require("../../models/Conversation");

module.exports.addSystemAdmin = async(req, res) => {
    try {
        const params = req.body;
        // const newSystemAdmin = await Systemadmin.create({
        //     ...params,
        //     assignedBy: req.user,
        //     password: await hashPassword(params.password)
        // });
        console.log(params);
        sendRespose(res, { params });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "System Admin Backend");
    }
}

module.exports.getConversation = async(req, res) => {
    try {
        const maldaTest = JSON.parse(req.query.ids);
        const conversation = await Conversation.findOne({
            $and: [{
                    participators: {
                        $elemMatch: {
                            participatorType: maldaTest[0].type,
                            pid: maldaTest[0].id
                        }
                    }
                },
                {
                    participators: {
                        $elemMatch: {
                            participatorType: maldaTest[1].type,
                            pid: maldaTest[1].id
                        }
                    }
                }
            ]
        }).exec();
        if (conversation !== null) {
            sendRespose(res, { conversation });
        } else {
            const conv = new Conversation({
                participators: [{
                        participatorType: maldaTest[0].type,
                        pid: maldaTest[0].id
                    },
                    {
                        participatorType: maldaTest[1].type,
                        pid: maldaTest[1].id
                    },
                ],
            });
            const savedDoc = await conv.save();
            sendRespose(res, { conversation: savedDoc._doc });
        }
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}