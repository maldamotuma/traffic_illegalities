const express = require('express');
const router = express.Router();
const { signIn, signOut, signUp, test, forgotPassword, resetPassword, createNewPassword, currentUser, change_Password } = require("../../controllers/systemadmin/authcontroller");
const { addOperator } = require('../../controllers/systemadmin/OperatorsController');
const { addTrafficPolices } = require('../../controllers/systemadmin/TrafficPolicesController');
const { VerifyAuth } = require('../../middlewares/authmiddlewares/Verifyauth');
const { addOfficeTraffic } = require('../../controllers/systemadmin/OfficeTrafficControllers');
const { addCar } = require('../../controllers/systemadmin/CarsController');
const { addSystemAdmin, getConversation } = require('../../controllers/systemadmin/SystemAdminsControllor');
const { addDriverOwner } = require('../../controllers/systemadmin/DriverandorOwnersController');
const multer  = require('multer');

const operatorProfile = "./pictures/profile/operator";
const operatorID = "./pictures/IDs/operator";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, file.fieldname === "profilePicture" ? operatorProfile : operatorID);
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray.pop();
        cb(null, Date.now()+`.${extension}`);
    }
});
const upload = multer({ storage });


router.post('/signin', signIn);
router.post('/signout', VerifyAuth, signOut);
router.post('/signup', signUp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/create-new-password', VerifyAuth, createNewPassword);
router.post('/change-password', VerifyAuth, change_Password);
router.post('/add-operator', VerifyAuth, upload.any(), addOperator);
router.post('/add-traffic-police', VerifyAuth, addTrafficPolices);
router.post('/add-traffic-office', VerifyAuth, addOfficeTraffic);
router.post('/add-car', VerifyAuth, addCar);
router.post('/add-system-admin', VerifyAuth, addSystemAdmin);
router.post('/add-driver-owner', VerifyAuth, addDriverOwner);
router.get('/auth-user', VerifyAuth, currentUser);
router.get('/get-conversation', VerifyAuth, getConversation);

router.post('/testauth', VerifyAuth,test);

module.exports = router;