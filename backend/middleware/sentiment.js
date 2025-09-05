require("dotenv").config();

const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");

const key = process.env.AZURE_KEY;
const endpoint = process.env.AZURE_ENDPOINT;

if (!key || !endpoint) {
  console.error("Missing Azure credentials in .env file:");
  if (!key) console.error(" - AZURE_KEY is missing");
  if (!endpoint) console.error(" - AZURE_ENDPOINT is missing");
  process.exit(1);
}

const client = new TextAnalyticsClient(
  endpoint.toString(),
  new AzureKeyCredential(key.toString())
);

async function checkSentiment(comment) {
  console.log("checking sentiment");
  const [result] = await client.analyzeSentiment([comment]);

  if (result.error) {
    console.error("Sentiment analysis error:", result.error);
    return { sentiment: "unknown" };
  }

  if (result.sentiment === "positive") {
    console.log("positive sentiment got");
    return "positive";
  } else if (result.sentiment === "negative") {
    console.log("negative sentiment got");
    return "negative";
  } else {
    console.log("neutral sentiment got");
    return "neutral";
  }
}

module.exports.checkSentiment = checkSentiment;
