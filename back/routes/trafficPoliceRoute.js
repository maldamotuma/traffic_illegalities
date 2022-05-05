const { Router } = require("express");
const { login, logout } = require("../controllers/trafficpolice/authcontroller");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");

const router = Router();

router.post("/login", login)
router.post("/logout", VerifyAuth, logout)

module.exports = router;