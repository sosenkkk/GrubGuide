const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/loadData");

router.get("/data", restaurantController.loadData);

module.exports = router;
