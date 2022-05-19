const Officetraffic = require("../../models/Officetraffic");
const { hashPassword } = require("../helpers/auth");
const { sendRespose, sendServerError } = require("../helpers/utils");

module.exports.addOfficeTraffic = async(req, res) => {
    try {
        const params = req.body;
        // const newTrafficoffice = await Officetraffic.create({
        //     ...params, assignedBy: req.user, password: await hashPassword(params.password)
        // });

        // params.identificationCard = JSON.parse(params.identificationCard);
        params.name = JSON.parse(params.name);
        // params.profilePicture = req.files.find(pctr => pctr.fieldname === "profilePicture").filename;
        // params.identificationCard.photos = [];
        const IDsPhotos = req.files.filter(pht => pht.fieldname === "IDphotos[]");
        // IDsPhotos.forEach(pht => {
        //     params.identificationCard.photos.push(pht.filename);
        // });
        const newTrafficoffice = await Officetraffic.create({
            ...params,
            assignedBy: req.user,
            password: await hashPassword(params.password)
        });
        sendRespose(res, params);
    } catch (error) {
        console.log(error);
        sendServerError(res, error, "System Admin");
    }
}