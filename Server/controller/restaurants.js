const Restaurant = require("../model/restaurant");
const { kmpSearch } = require("../utils/kmp-search");

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findOne({
      Restaurant_ID: restaurantId,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Unified Controller for Listing, Filtering, Searching, and Location-Based Queries
exports.getRestaurants = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    country,
    cuisines,
    search,
    latitude,
    longitude,
    radius,
  } = req.query;
  const minSpend = Number(req.query.minSpend);
  const maxSpend = Number(req.query.maxSpend);
  const filter = {};

  // Filtering by country
  if (country) {
    filter.Country_Code = country;
  }

  // Filtering by "Average_Cost_for_two"
  if (minSpend || maxSpend) {
    filter["Average_Cost_for_two"] = {};
    if (minSpend) filter["Average_Cost_for_two"].$gte = minSpend;
    if (maxSpend) filter["Average_Cost_for_two"].$lte = maxSpend;
  }

  // Filtering by cuisines
  if (cuisines && cuisines.trim()) {
    const cuisinesArray = cuisines
      .split(",")
      .map((cuisine) => cuisine.trim())
      .filter(Boolean);
    if (cuisinesArray.length > 0) {
      filter.Cuisines = {
        $all: cuisinesArray.map((cuisine) => new RegExp(cuisine, "i")),
      };
    }
  }

  // Search by restaurant name
  if (search) {
    filter.$or = [
      { Restaurant_Name: new RegExp(search, "i") },
      // { Address: new RegExp(search, "i") }, // Uncomment if address search is needed
    ];
  }

  // Location-based search
  if (latitude && longitude && radius) {
    filter.Location = {
      $geoWithin: {
        $centerSphere: [
          [parseFloat(longitude), parseFloat(latitude)],
          parseFloat(radius) / 6371, // radius divided by Earth's radius in km
        ],
      },
    };
  }

  try {
    // Fetch restaurants with pagination and filtering
    const total = await Restaurant.countDocuments(filter).exec();
    const restaurants = await Restaurant.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    res.status(200).json({
      restaurants,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
