const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  Restaurant_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  Restaurant_Name: {
    type: String,
    required: true,
  },
  Country_Code: {
    type: Number,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Locality: {
    type: String,
  },
  Locality_Verbose: {
    type: String,
  },
  Location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  Cuisines: {
    type: String,
  },
  Average_Cost_for_two: {
    type: Number,
    required: true,
  },
  Currency: {
    type: String,
    required: true,
  },
  Has_Table_booking: {
    type: Boolean,
    required: true,
  },
  Has_Online_delivery: {
    type: Boolean,
    required: true,
  },
  Is_Delivering_now: {
    type: Boolean,
  },
  Switch_to_order_menu: {
    type: Boolean,
  },
  Price_range: {
    type: Number,
    required: true,
  },
  Aggregate_rating: {
    type: Number,
    required: true,
  },
  Rating_color: {
    type: String,
  },
  Rating_text: {
    type: String,
  },
  Votes: {
    type: Number,
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
