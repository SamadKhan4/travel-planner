const travelService = require("../services/travelService");
const sentimentService = require("../services/sentimentService");
const { detectEmotionService } = require("../services/emotionService");
const cityData = require("../data/cityData");

// const {cityData} = require("../data/cityData");

const planTrip = async (req, res, next) => {
  try {
    const { lat, lon, days, people, budget, query } = req.body;

    console.log(req.body);

    console.log("Step 1: Analyze emotions");

    // Step 1: Analyze emotions
    const top5Emotions = await detectEmotionService(query);

    console.log("Top 5 emotions: ", top5Emotions);

    console.log("Step 2: Get places based on emotions");

    // Step 2: Get places based on emotions
    const places = await travelService.getPlacesByEmotions(top5Emotions);

    console.log("Places: ", places);

    console.log("Step 3: Calculate costs");

    // Step 3: Calculate costs
    places.forEach((place) => {
      // Calculate the travel cost from user's location to each place
      const travelCost = travelService.calculateTravelCost(
        lat,
        lon,
        place.Lat,
        place.Lon
      );

      // Calculate the total expenses (including expense per day for the given number of days and people)
      const otherExpenses = place.Expense * days * people*50;

      // Calculate the total cost (travel cost + other expenses)
      const totalCost = travelCost + otherExpenses;

      // Add the calculated costs to the place object
      place.TravelCost = travelCost;
      place.OtherExpenses = otherExpenses;
      place.TotalCost = totalCost;
    });

    console.log("Step 4: Respond with the trip plan");

    // Step 4: Respond with the trip plan
    res.json({ top5Emotions, places });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getCities = async (req, res, next) => {
  try {
    res.json(cityData);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { planTrip, getCities };
