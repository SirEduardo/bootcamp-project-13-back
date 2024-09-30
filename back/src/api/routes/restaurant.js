const { uploadRestaurants } = require("../../middlewares/file");
const {
  getRestuarants,
  getRestuarantById,
  createRestaurant,
  deleteRestaurant,
  getRestaurantByName,
  updateRestaurant,
} = require("../controllers/restaurant");

const restaurantRoutes = require("express").Router();

restaurantRoutes.get("/", getRestuarants);
restaurantRoutes.get("/:id", getRestuarantById);
restaurantRoutes.get("/search", getRestaurantByName);
restaurantRoutes.post("/", uploadRestaurants.single("img"), createRestaurant);
restaurantRoutes.delete("/:id", deleteRestaurant);
restaurantRoutes.put("/:id", updateRestaurant);

module.exports = restaurantRoutes;
