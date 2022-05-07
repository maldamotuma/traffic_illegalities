const { Router } = require("express");
const { login, logout } = require("../controllers/trafficpolice/authcontroller");
const { registerRecord } = require("../controllers/trafficpolice/RecordsController");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");

const router = Router();

router.post("/login", login);
router.post("/logout", VerifyAuth, logout);
router.post("/register-record", VerifyAuth, registerRecord);

module.exports = router;