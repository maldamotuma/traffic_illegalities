const express = require('express');
const router = express.Router();
const { signIn, signUp, test } = require("../../controllers/systemadmin/authcontroller");
const { VerifyAuth } = require('../../middlewares/authmiddlewares/Verifyauth');


router.post('/signin', signIn);
router.post('/signup', signUp);

router.post('/testauth', VerifyAuth,test);

module.exports = router;