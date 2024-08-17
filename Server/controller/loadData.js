const Restaurant = require("../model/restaurant");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

exports.loadData = async (req, res) => {
  const filePath = path.resolve(__dirname, "../data/zomato.csv");

  const restaurants = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      try {
        const restaurantData = {
          Restaurant_ID: parseInt(row["Restaurant ID"]) || 0,
          Restaurant_Name: row["Restaurant Name"] || "Unknown",
          Country_Code: parseInt(row["Country Code"]) || 0,
          City: row["City"] || "Unknown",
          Address: row["Address"] || "Unknown",
          Locality: row["Locality"] || "Unknown",
          Locality_Verbose: row["Locality Verbose"] || "Unknown",
          Location: {
            type: "Point",
            coordinates: [
              parseFloat(row["Longitude"]),
              parseFloat(row["Latitude"]),
            ],
          },
          Cuisines: row["Cuisines"] || "Unknown",
          Average_Cost_for_two: parseInt(row["Average Cost for two"]) || 0,
          Currency: row["Currency"] || "Unknown",
          Has_Table_booking: row["Has Table booking"] === "Yes",
          Has_Online_delivery: row["Has Online delivery"] === "Yes",
          Is_Delivering_now: row["Is delivering now"] === "Yes",
          Switch_to_order_menu: row["Switch to order menu"] === "Yes",
          Price_range: parseInt(row["Price range"]) || 0,
          Aggregate_rating: parseFloat(row["Aggregate rating"]) || 0,
          Rating_color: row["Rating color"] || "Unknown",
          Rating_text: row["Rating text"] || "Unknown",
          Votes: parseInt(row["Votes"]) || 0,
        };
        restaurants.push(restaurantData);
      } catch (error) {
        console.error("Error processing row:", error);
      }
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");

      try {
        await Restaurant.insertMany(restaurants);
        console.log("All data inserted successfully");
        res.status(200).send("Data loaded successfully");
      } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
      }
    })
    .on("error", (err) => {
      console.error("Error reading CSV file:", err);
      res.status(500).send("Error reading CSV file");
    });
};
