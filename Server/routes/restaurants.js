const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurants");

router.get("/restaurants", restaurantController.getRestaurants);

router.get("/restaurant/:id", restaurantController.getRestaurantById);

// router.get('/search-by-location', restaurantController.searchByLocation);

module.exports = router;
