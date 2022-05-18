const { Router } = require("express");
const { driver } = require("../controllers/generalController");
const { login, user, logout } = require("../controllers/operatorscontroller/auth");
const { userConversation } = require("../controllers/operatorscontroller/usercontroller");
const { VerifyAuth } = require('../middlewares/authmiddlewares/Verifyauth');
const router = Router();

router.post("/login", login);
router.post("/me", VerifyAuth, user);
router.get("/user-conversation", VerifyAuth, userConversation);
router.get("/driver", VerifyAuth, driver);
router.post("/logout", VerifyAuth, logout);

module.exports = router;