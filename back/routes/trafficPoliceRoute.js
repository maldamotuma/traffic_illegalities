const { Router } = require("express");
const { login, logout } = require("../controllers/trafficpolice/authcontroller");
const { registerRecord } = require("../controllers/trafficpolice/RecordsController");
const { userConversations, userConversation } = require("../controllers/trafficpolice/userconversationcontroller");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");
const { recordPunishments } = require("../controllers/trafficOffice/recordcontroller");
const { driver } = require("../controllers/generalController");

const router = Router();

router.post("/login", login);
router.post("/logout", VerifyAuth, logout);
router.get("/user-conversations", VerifyAuth, userConversations);
router.get("/user-conversation", VerifyAuth, userConversation);
router.get("/detail-info", VerifyAuth, recordPunishments);
router.get("/driver", driver);
router.post("/register-record", VerifyAuth, registerRecord);

module.exports = router;