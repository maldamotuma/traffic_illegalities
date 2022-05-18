const { Router } = require("express");
const { driver } = require("../controllers/generalController");
const { login } = require("../controllers/trafficOffice/authcontroller");
const { VerifyAuth } = require("../middlewares/authmiddlewares/Verifyauth");

const router = Router();

router.post("/login", login);
router.get("/driver", VerifyAuth, driver);

module.exports = router;