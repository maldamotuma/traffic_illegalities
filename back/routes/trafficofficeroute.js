const { Router } = require("express");
const multer = require("multer");
const { driver } = require("../controllers/generalController");
const { login, user, logout } = require("../controllers/trafficOffice/authcontroller");
const { recordPunishments } = require("../controllers/trafficOffice/recordcontroller");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");

const router = Router();
const traffic_police_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, file.fieldname === "profilePicture" ? trafficPProfile : trafficPID);
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray.pop();
        cb(null, req.user._id + Math.random() * 99999 + Date.now() + `.${extension}`);
    }
});
const traffic_upload = multer({ storage: traffic_police_storage });

router.post("/login", login);
router.post("/me", VerifyAuth, user);
router.get("/driver", VerifyAuth, driver);
router.post("/record-punishment", VerifyAuth, traffic_upload.none(), recordPunishments);
router.post("/logout", VerifyAuth, logout);

module.exports = router;