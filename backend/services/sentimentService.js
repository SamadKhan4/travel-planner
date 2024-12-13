const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const config = require("../config/config");

const analyzeSentiment = (query) => {
  // Define the list of allowed sentiments
  const predefinedSentiments = [
    "happy",
    "sad",
    "relaxing",
    "adventurous",
    "historical",
    "romantic",
    "peaceful",
    "exciting",
    "cultural",
    "spiritual",
  ];

  const result = sentiment.analyze(query, );

  // Map the sentiment to a predefined list
  if (result.comparative > config.SENTIMENT_THRESHOLD) {
    return "happy";
  } else if (result.comparative < -config.SENTIMENT_THRESHOLD) {
    return "sad";
  } else {
    return "neutral";
  }
};

module.exports = { analyzeSentiment };
