const use = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs');

// Predefined emotion set
const emotionWords = [
 "Happy",
  "Sad",
  "Angry",
  "Fearful",
  "Surprised",
  "Disgusted",
  "Neutral",
  "Excited",
  "Bored",
  "Nervous",
  "Hopeful",
  "Relieved",
  "Confident",
  "Jealous",
  "Proud",
  "Peaceful",
  "Adventurous",
  "Curious",
  "Frustrated",
  "Homesick",
  "Grateful",
  "Impatient",
  "Restless",
  "Wanderlust",
  "Inspired",
  "Nostalgic",
  "In Awe",
  "Historic",
  "Romantic",
  "Serene",
  "Culturally Connected",
  "Thrilled"
];

// Emotion Detection Service
const detectEmotionService = async (sentence) => {
  try {
    // Load the USE model
    const model = await use.load();

    // Embed the sentence and emotion words
    const sentences = [sentence, ...emotionWords];
    const embeddings = await model.embed(sentences);

    // Split the sentence embedding from emotion embeddings
    const sentenceEmbedding = embeddings.slice(
      [0, 0],
      [1, embeddings.shape[1]]
    );
    const emotionEmbeddings = embeddings.slice(
      [1, 0],
      [emotionWords.length, embeddings.shape[1]]
    );

    // Calculate similarity scores between the sentence and each emotion
    const scores = tf
      .matMul(sentenceEmbedding, emotionEmbeddings, false, true)
      .dataSync();

    // Combine emotions with their corresponding scores
    const emotionScores = emotionWords.map((emotion, index) => ({
      emotion,
      score: scores[index]
    }));

    // Sort emotions by score in descending order
    const sortedEmotionScores = emotionScores.sort((a, b) => b.score - a.score);

    // Return the top 5 emotions with scores in JSON format
    const top5Emotions = sortedEmotionScores.slice(0, 5);

    return top5Emotions;
  } catch (error) {
    console.error(error);
    throw new Error("Error in emotion detection");
  }
};

module.exports = { detectEmotionService };
