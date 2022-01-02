const express = require('express');
const router = express.Router();
const { signIn, signOut, signUp, test, forgotPassword, resetPassword, createNewPassword, currentUser } = require("../../controllers/systemadmin/authcontroller");
const { addOperator } = require('../../controllers/systemadmin/OperatorsController');
const { addTrafficPolices } = require('../../controllers/systemadmin/TrafficPolicesController');
const { VerifyAuth } = require('../../middlewares/authmiddlewares/Verifyauth');
const { addOfficeTraffic } = require('../../controllers/systemadmin/OfficeTrafficControllers');
const { addCar } = require('../../controllers/systemadmin/CarsController');
const { addSystemAdmin } = require('../../controllers/systemadmin/SystemAdminsControllor');
const { addDriverOwner } = require('../../controllers/systemadmin/DriverandorOwnersController');


router.post('/signin', signIn);
router.post('/signout', VerifyAuth, signOut);
router.post('/signup', signUp);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password', resetPassword);
router.post('/create-new-password', VerifyAuth, createNewPassword);
router.post('/add-operator', VerifyAuth, addOperator);
router.post('/add-traffic-police', VerifyAuth, addTrafficPolices);
router.post('/add-traffic-office', VerifyAuth, addOfficeTraffic);
router.post('/add-car', VerifyAuth, addCar);
router.post('/add-system-admin', VerifyAuth, addSystemAdmin);
router.post('/add-driver-owner', VerifyAuth, addDriverOwner);
router.get('/auth-user', VerifyAuth, currentUser);
router.post('/testauth', VerifyAuth,test);

module.exports = router;