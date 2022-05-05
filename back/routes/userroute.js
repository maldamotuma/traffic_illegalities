const { Router } = require("express");
const { register, login, test } = require("../controllers/userscontroller/authcontroller");
const { operatorConversation } = require("../controllers/userscontroller/operatorsconversation");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/operator-conversation", VerifyAuth, operatorConversation);
router.post("/test", VerifyAuth, test);

module.exports = router;