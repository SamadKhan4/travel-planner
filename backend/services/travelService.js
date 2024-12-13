const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const haversine = require("../utils/haversine");
const config = require("../config/config");

// Define a ranking score for each emotion position (Weight = Importance)
const emotionRankWeights = {
  "Emotion 1": 5,
  "Emotion 2": 4,
  "Emotion 3": 3,
  "Emotion 4": 2,
  "Emotion 5": 1,
};

// Helper function to calculate the rank score based on matched emotions
const calculateRankScore = (emotionsList, placeEmotions) => {
  let score = 0;
  
  // Iterate through each input emotion and compare it with the place's emotions
  emotionsList.forEach((inputEmotion, i) => {
    placeEmotions.forEach((placeEmotion, j) => {
      if (inputEmotion === placeEmotion) {
        // Apply a matching importance factor based on position
        const matchImportanceFactor = (5 - j) / 5; // For Emotion 1, factor = 1, for Emotion 5, factor = 0.2
        score += emotionRankWeights[`Emotion ${j + 1}`] * matchImportanceFactor;
      }
    });
  });
  
  return score;
};

// Reads the CSV and filters by sentiment
// Function to get places based on matching emotions
const getPlacesByEmotions = async (emotionsList) => {
  return new Promise((resolve, reject) => {
    const matchList = [];
    const filePath = path.join(__dirname, "..", "data", "places.csv");

    // Read the CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const placeEmotions = [
          row["Emotion 1"],
          row["Emotion 2"],
          row["Emotion 3"],
          row["Emotion 4"],
          row["Emotion 5"],
        ];

        // console.log("EmotionsList: ", emotionsList);

        inputEmotions = emotionsList.map((e) => e.emotion);

        // console.log("placeEmotions: ", placeEmotions);

        // Check if any of the input emotions are present in the place's emotions
        const hasMatch = placeEmotions.some((emotion) =>
          inputEmotions.includes(emotion)
        );

        // console.log("hasMatch: ", hasMatch);

        if (hasMatch) {
          // Calculate rank score based on the number of matches and their positions
          const rankScore = calculateRankScore(inputEmotions, placeEmotions);

          // Add this row to the match list with a rankScore field
          matchList.push({
            City: row.City,
            Country: row.Country,
            Place: row["Place to Visit"],
            Emotions: placeEmotions,
            Lat: row.Lat,
            Lon: row.Lon,
            Expense: row["Expense/Day"],
            Image: row.Image,
            RankScore: rankScore,
            Description: row.Description,
          });
        }
      })
      .on("end", () => {
        // Sort matchList based on rank score (highest score first)
        matchList.sort((a, b) => b.RankScore - a.RankScore);

        // Resolve the promise with the sorted match list
        resolve(matchList);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

// Calculate travel cost based on distance
const calculateTravelCost = (lat1, lon1, lat2, lon2) => {
//   console.log("lat1, lon1, lat2, lon2: ", lat1, lon1, lat2, lon2);
  const distance = haversine(lat1, lon1, lat2, lon2);
  return distance * config.COST_PER_KM*10;
};

module.exports = { getPlacesByEmotions, calculateTravelCost };
