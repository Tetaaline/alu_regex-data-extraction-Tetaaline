const fs = require("fs");

// Read input file and remove extra spaces
let rawInput = '';
try {
  rawInput = fs.readFileSync("input.txt", "utf-8").trim();
} catch (err) {
  console.log("Error:input.txt not found or unreadable.");
  process.exit();
}

// Check if the input file is empty
if (rawInput.length === 0) {
  console.log("The input file is empty. Please provide some text.");
  process.exit();
}

// Detect unsafe content without stopping the program
const unsafePatterns = /<script|DROP\s+TABLE|javascript:|onerror\s*=|--/i;
const hasUnsafeInput = unsafePatterns.test(rawInput);

// Hide part of the email for privacy
function maskEmail(email) {
  const [user, domain] = email.split("@");
  // Skip emails with invalid double dots, missing parts, or empty strings
  if (!user || !domain || user.includes("..") || domain.includes("..")) return null;
  return user[0] + "*@" + domain;
}

// Extract and mask emails
const extractedEmails = rawInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
const safeEmails = extractedEmails.map(maskEmail).filter(e => e !== null);

// Find Rwanda phone numbers in standard formats
const rwandaPhones = rawInput.match(/(?:\+250\s?|0)7[2-9]\d(?:\s?\d{3}){2}/g) || [];

// Extract credit card numbers and mask all but last 4 digits
const extractedCards = rawInput.match(/(?:\d{4}[- ]?){3}\d{4}/g) || [];
const safeCards = extractedCards.map(card => {
  const cleaned = card.replace(/\D/g, "");
  return cleaned.length === 16 ? "** ** ** " + cleaned.slice(-4) : card;
});

// Extract time values (24h or 12h with AM/PM)
const extractedTimes = rawInput.match(
  /\b((([01]?\d|2[0-3]):[0-5]\d)|((1[0-2]|0?[1-9]):[0-5]\d\s?(AM|PM)))\b/gi
) || [];

// Extract currency amounts in RWF and USD and filter invalid entries
const extractedMoney = rawInput.match(
  /RWF\s?\d[\d,](\.\d{2})?|\$\d[\d,](\.\d{2})?/g
) || [];
const safeMoney = extractedMoney.filter(m => m.length > 0);

// Organize extracted data
const output = {
  emails: safeEmails,
  phones: rwandaPhones,
  credit_cards: safeCards,
  time: extractedTimes,
  money: safeMoney,
  unsafe_input_detected: hasUnsafeInput,
  ignored_patterns: hasUnsafeInput
    ? ["script tags", "javascript urls", "sql keywords"]
    : []
};

// Write output to JSON file
fs.writeFileSync("sample_output.json", JSON.stringify(output, null, 2));
console.log("Done creating sample_output.json");