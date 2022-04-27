const Trafficpolice = require("../../models/Trafficpolice");
const { hashPassword } = require("../helpers/auth");
const { sendServerError, sendRespose } = require("../helpers/utils");

module.exports.addTrafficPolices = async (req, res) => {
    try {
        let params = req.body;
        params.identificationCard = JSON.parse(params.identificationCard);
        params.name = JSON.parse(params.name);
        
        params.profilePicture = req.files.find(pctr => pctr.fieldname === "profilePicture").filename;
        params.identificationCard.photos = [];
        const IDsPhotos = req.files.filter(pht => pht.fieldname === "IDphotos[]");
        IDsPhotos.forEach(pht => {
            params.identificationCard.photos.push(pht.filename);
        });
        const newTrafficpolice = await Trafficpolice.create({
            ...params, assignedBy: req.user, password: await hashPassword(params.password)
        });
        sendRespose(res, newTrafficpolice);
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}

module.exports.trafficpolices = async (req, res) => {
    try {
        const trafficpolices = await Trafficpolice.find({}).exec();
        sendRespose(res, {trafficpolices});
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}