const { Router } = require("express");
const { driver } = require("../controllers/generalController");
const { login, user, logout } = require("../controllers/trafficOffice/authcontroller");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");

const router = Router();

router.post("/login", login);
router.post("/me", VerifyAuth, user);
router.get("/driver", VerifyAuth, driver);
router.post("/logout", VerifyAuth, logout);

module.exports = router;