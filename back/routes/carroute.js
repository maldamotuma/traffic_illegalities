const { Router } = require("express");
const { carforcar } = require("../controllers/cars/carscontroller");
const router = Router();

router.get("/car", carforcar);

module.exports = router;