require("dotenv").config({ path: "../.env" });

const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");

const key = process.env.AZURE_KEY;
const endpoint = process.env.AZURE_ENDPOINT;

if (!key || !endpoint) {
  console.error("Missing Azure credentials in .env file");
  process.exit(1);
}

const client = new TextAnalyticsClient(
  endpoint.toString(),
  new AzureKeyCredential(key.toString())
);

const documents = ["Juho on tosi siisti tyyppi", "Kapo on tosi tyhmä"];

async function main() {
  const results = await client.analyzeSentiment(documents);

  for (const result of results) {
    if (result.error === undefined) {
      console.log("Overall sentiment:", result.sentiment);
      console.log("Scores:", result.confidenceScores);
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}

main();
