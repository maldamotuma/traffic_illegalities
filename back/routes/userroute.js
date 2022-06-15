const { Router } = require("express");
const { register, login, test } = require("../controllers/userscontroller/authcontroller");
const { getMyCars } = require("../controllers/userscontroller/carscontroller");
const { operatorConversation } = require("../controllers/userscontroller/operatorsconversation");
const { assignDriver, verifyAssignment, getDriver, assignments, trafficConversations, trafficConversation } = require("../controllers/userscontroller/userscontroller");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/operator-conversation", VerifyAuth, operatorConversation);
router.get("/my-cars", VerifyAuth, getMyCars);
router.get("/driver", VerifyAuth, getDriver);
router.post("/assign-driver", VerifyAuth, assignDriver);
router.get("/assignments", VerifyAuth, assignments);
router.post("/verify-assignment", VerifyAuth, verifyAssignment);
router.get("/traffic-conversations", VerifyAuth, trafficConversations);
router.get("/traffic-conversation", VerifyAuth, trafficConversation);
router.post("/test", VerifyAuth, test);

module.exports = router;