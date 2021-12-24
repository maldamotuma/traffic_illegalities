const express = require('express');
const router = express.Router();
const { signIn, signUp, test, forgotPassword, resetPassword, createNewPassword } = require("../../controllers/systemadmin/authcontroller");
const { VerifyAuth } = require('../../middlewares/authmiddlewares/Verifyauth');


router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password', resetPassword);
router.post('/create-new-password', VerifyAuth, createNewPassword);

router.post('/testauth', VerifyAuth,test);

module.exports = router;