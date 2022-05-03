const { Router } = require("express");
const { login, user, logout } = require("../controllers/operatorscontroller/auth");
const { VerifyAuth } = require('../middlewares/authmiddlewares/Verifyauth');
const router = Router();

router.post("/login", login);
router.post("/me", VerifyAuth, user);
router.post("/logout", VerifyAuth, logout);

module.exports = router;