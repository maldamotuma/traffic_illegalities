const { Router } = require("express");
const { register, login, test } = require("../controllers/userscontroller/authcontroller");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/test", VerifyAuth, test);

module.exports = router;