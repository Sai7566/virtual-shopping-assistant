import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatbotDataPath = path.join(__dirname, '../chatbot/chatbot_data.json');

// Load chatbot data
let chatbotData = [];
try {
  const rawData = fs.readFileSync(chatbotDataPath, 'utf-8');
  chatbotData = JSON.parse(rawData);
} catch (error) {
  console.error("❌ Failed to load chatbot data:", error.message);
}

export function getChatbotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  console.log("🟡 User message:", message);

  // ✅ Direct greeting match only
  if (["hi", "hi buddy", "hello"].includes(message)) {
    const greetingEntry = chatbotData.find(entry => entry.category === "greeting");
    if (greetingEntry) {
      console.log("👋 Greeting match found.");
      return greetingEntry.response;
    }
  }

  // ✅ Remove conversational filler words
  const ignoreWords = [
    "please", "suggest", "recommend", "sir", "madam", "i", "want", "show", "me",
    "hi", "hello", "hey", "buddy", "bro", "dude", "whatsup", "what's up"
  ];
  const cleanedMessage = ignoreWords.reduce(
    (msg, word) => msg.replace(new RegExp(`\\b${word}\\b`, 'gi'), ''),
    message
  ).replace(/\s+/g, ' ').trim();

  console.log("🧹 Cleaned message:", cleanedMessage);

  // ✅ Gender detection
  let detectedGender = null;
  if (/\b(women|woman|girl|girls)\b/.test(cleanedMessage)) detectedGender = "women";
  else if (/\b(men|man|boy|boys)\b/.test(cleanedMessage)) detectedGender = "men";
  else if (/\b(kid|kids|child|children)\b/.test(cleanedMessage)) detectedGender = "kids";

  console.log("🧠 Detected gender:", detectedGender || "not specified");

  // ✅ Filter chatbot data by gender
  const filteredData = chatbotData.filter(entry => !entry.gender || entry.gender === detectedGender);

  // ✅ Budget intent override
  const budgetKeywords = ["cheap", "budget", "low price", "affordable", "least", "under 500", "below 500", "poor quality", "economy"];
  const isBudgetIntent = budgetKeywords.some(keyword => cleanedMessage.includes(keyword));
  if (isBudgetIntent) {
    const budgetEntries = filteredData.filter(entry => entry.category === "lowprice");
    const bestBudgetMatch = getBestMatch(budgetEntries, cleanedMessage);
    if (bestBudgetMatch) {
      console.log("🔁 Budget-specific override applied:", bestBudgetMatch.category);
      return bestBudgetMatch.response;
    }
  }

  // ✅ Try exact keyword match first
  for (const entry of filteredData) {
    if (entry.keywords.includes(cleanedMessage)) {
      console.log("✅ Exact keyword match found:", entry.category);
      return entry.response;
    }
  }

  // ✅ Remove greetings from fallback unless direct match
  const nonGreetingData = filteredData.filter(entry => entry.category !== "greeting");

  // 🔁 Prioritize more specific categories like cancellation first
  const priorityCategories = ["ordercancellation", "deliveryissues", "lowprice", "highprice"];
  for (const category of priorityCategories) {
    const specificEntries = nonGreetingData.filter(entry => entry.category === category);
    const specificMatch = getBestMatch(specificEntries, cleanedMessage);
    if (specificMatch) {
      console.log("🔍 Priority match found:", specificMatch.category);
      return specificMatch.response;
    }
  }

  // 🔄 Then check other categories normally
  const bestMatch = getBestMatch(nonGreetingData, cleanedMessage);

  // ✅ Final response
  if (bestMatch) {
    console.log("✅ Best matched category:", bestMatch.category, "| Gender:", bestMatch.gender || "any");
    return bestMatch.response;
  }

  console.log("⚠️ No relevant match found.");
  return "🤖 Sorry, I don't have a response for that at the moment. Please try asking differently.";
}

// 🔍 Helper to find best match using keyword frequency
function getBestMatch(entries, message) {
  let bestMatch = null;
  let highestMatchCount = 0;

  for (const entry of entries) {
    let matchCount = 0;
    for (const keyword of entry.keywords) {
      if (message.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }

    // Prioritize entries with most keyword hits
    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      bestMatch = entry;
    }
  }

  return highestMatchCount > 0 ? bestMatch : null;
}

