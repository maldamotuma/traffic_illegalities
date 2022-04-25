const OpratorSchema = require("../../models/Oprator");
const { hashPassword } = require("../helpers/auth");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.addOperator = async (req, res) => {
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
            ...params, assignedBy: req.user, password: await hashPassword(params.password)
        });
        console.log(req.files);
        sendRespose(res, params);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}