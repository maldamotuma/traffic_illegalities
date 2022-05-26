const Rule = require("../../models/Rule");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.addRule = async(req, res) => {
    try {
        const params = req.body;
        const frequent = [];
        params.count.forEach((count, i) => {
            let tmpobj = {
                count: count,
                expected: params.expected[i]
            };
            frequent.push(tmpobj);
        });
        const resp = await Rule.create({
            title: params.title,
            article: params.article,
            description: params.description,
            frequent,
            admin: req.user._id
        });
        sendRespose(res, { resp });
    } catch (error) {
        sendServerError(res, error, "System admin adding new rule");
    }
}

module.exports.fetchRules = async(req, res) => {
    try {
        const rules = await Rule.find({}).exec();
        sendRespose(res, { rules });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "System admin fetching rules");
    }
}

module.exports.deleteRules = async(req, res) => {
    try {
        const rules = req.body;
        const rsns = await Rule.deleteMany({ _id: { $in: rules.rules } }).exec();
        sendRespose(res, { rules: rsns });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "System admin fetching rules");
    }
}