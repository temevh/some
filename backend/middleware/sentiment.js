// Move the require outside to avoid re-loading the module on every call
const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient();

async function checkSentiment(comment) {
  console.log("Checking sentiment...");

  const document = {
    content: comment,
    type: "PLAIN_TEXT",
  };

  try {
    const [result] = await client.analyzeSentiment({ document });
    const sentiment = result.documentSentiment;

    console.log(`Text: ${comment}`);
    console.log(`Score: ${sentiment.score}`);
    console.log(`Magnitude: ${sentiment.magnitude}`);

    return sentiment.score >= 0 ? "positive" : "negative";
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

module.exports.checkSentiment = checkSentiment;
