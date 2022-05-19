const express = require('express');
const router = express.Router();
const { signIn, signOut, signUp, test, forgotPassword, resetPassword, createNewPassword, currentUser, change_Password } = require("../../controllers/systemadmin/authcontroller");
const { addOperator, operators, operator } = require('../../controllers/systemadmin/OperatorsController');
const { addTrafficPolices, trafficpolices } = require('../../controllers/systemadmin/TrafficPolicesController');
const { VerifyAuth } = require('../../middlewares/authmiddlewares/Verifyauth');
const { addOfficeTraffic } = require('../../controllers/systemadmin/OfficeTrafficControllers');
const { addCar, cars } = require('../../controllers/systemadmin/CarsController');
const { addSystemAdmin, getConversation } = require('../../controllers/systemadmin/SystemAdminsControllor');
const { addDriverOwner } = require('../../controllers/systemadmin/DriverandorOwnersController');
const multer = require('multer');
const { addSpeed, speedLimits } = require('../../controllers/systemadmin/SpeedController');
const { userOwner } = require('../../controllers/systemadmin/userscontroller');
const { crashes, downloadCrash } = require('../../controllers/systemadmin/crashreport');

const operatorProfile = "./pictures/profile/operator";
const operatorID = "./pictures/IDs/operator";

const trafficPProfile = "./pictures/profile/trafficP";
const trafficPID = "./pictures/IDs/trafficP";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, file.fieldname === "profilePicture" ? operatorProfile : operatorID);
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray.pop();
        cb(null, req.user._id + Math.ceil(Math.random() * 99999) + Date.now() + `.${extension}`);
    }
});

const carStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./pictures/cars");
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray.pop();
        cb(null, Date.now() + `.${extension}`);
    }
});

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
const upload = multer({ storage });
const traffic_upload = multer({ storage: traffic_police_storage });
const car_upload = multer({ storage: carStorage });


router.post('/signin', signIn);
router.post('/signout', VerifyAuth, signOut);
router.post('/signup', signUp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/create-new-password', VerifyAuth, createNewPassword);
router.post('/change-password', VerifyAuth, change_Password);
router.post('/add-operator', VerifyAuth, upload.any(), addOperator);
router.post('/add-traffic-police', VerifyAuth, traffic_upload.any(), addTrafficPolices);
router.post('/add-traffic-office', VerifyAuth, upload.any(), addOfficeTraffic);
router.post('/add-car', VerifyAuth, car_upload.any(), addCar);
router.get('/cars', VerifyAuth, cars);
router.get('/traffic-polices', VerifyAuth, trafficpolices);
router.get('/operators', VerifyAuth, operators);
router.get('/operator/:id', VerifyAuth, operator);
router.post('/add-speed', VerifyAuth, addSpeed);
router.get('/speed-limits', VerifyAuth, speedLimits);
router.post('/add-system-admin', VerifyAuth, addSystemAdmin);
router.post('/add-driver-owner', VerifyAuth, addDriverOwner);
router.get('/auth-user', VerifyAuth, currentUser);
router.get('/get-conversation', VerifyAuth, getConversation);
router.get('/user-owner', VerifyAuth, userOwner);
router.get('/crashes', VerifyAuth, crashes);
router.get('/download-crash', VerifyAuth, downloadCrash);

router.post('/testauth', VerifyAuth, test);

module.exports = router;