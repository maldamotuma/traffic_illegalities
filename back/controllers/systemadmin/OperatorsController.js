const OpratorSchema = require("../../models/Oprator");
const { hashPassword } = require("../helpers/auth");
const { convertToMongooseFormat } = require("../helpers/datamap");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.addOperator = async(req, res) => {
    try {
        const params = req.body;
        params.identificationCard = JSON.parse(params.identificationCard);
        params.name = JSON.parse(params.name);
        params.region = JSON.parse(params.region);
        params.profilePicture = req.files.find(pctr => pctr.fieldname === "profilePicture").filename;
        params.identificationCard.photos = [];
        const IDsPhotos = req.files.filter(pht => pht.fieldname === "IDphotos[]");
        IDsPhotos.forEach(pht => {
            params.identificationCard.photos.push(pht.filename);
        });
        const operator = await OpratorSchema.create({
            ...params,
            assignedBy: req.user,
            password: await hashPassword(params.password)
        });
        console.log(req.files);
        sendRespose(res, params);
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "System Admin");
    }
}

module.exports.operators = async(req, res) => {
    try {
        const operators = await OpratorSchema.find({}).exec();
        // operators = operators.toObject({virtuals: true});
        sendRespose(res, { operators });
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}

module.exports.operator = async(req, res) => {
    try {
        const operator = await OpratorSchema.findOne({ _id: req.params.id }).exec();
        sendRespose(res, { operator });
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}

module.exports.editOperator = async(req, res) => {
    try {
        const params = req.body;
        const query_data = convertToMongooseFormat(params);
        const operator = await OpratorSchema.updateOne({ _id: req.params.id }, {...query_data }).exec();
        sendRespose(res, { params });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "Edit Operator Backed of system admin");
    }
}

module.exports.deleeoperatorIDphoto = async(req, res) => {
    try {
        const { op_id, photo } = req.params;
        const rspns = await OpratorSchema.updateOne({ _id: op_id }, { $pull: { "identificationCard.photos": photo } }).exec();
        sendRespose(res, { rspns });
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "Delete Operator id photos Operator Backed of system admin");
    }
}