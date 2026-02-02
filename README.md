ALU Regex Data Extraction & Secure Validation

 Project Overview
This Node.js utility extracts structured data from a plain text file (sample_input.txt) using regular expressions.  
The program focuses on accuracy, robustness, and security awareness, demonstrating how to handle realistic text inputs safely.

 Data types extracted:
-Emails (masked for privacy)  
-Rwanda phone numbers (common formats)  
-Credit card numbers (masked, last 4 digits visible)  
-Time values (12-hour and 24-hour formats, AM/PM)  
-Currency amounts (USD "$" and RWF)  
-Security detection for unsafe patterns (script tags, javascript: URLs, SQL keywords)

The main source file is index.js.

Prerequisites
-Node.js 14+ (recommended)  
-Terminal or VS Code in the project directory  

 The project uses built-in Node modules (fs) and standard ES syntax.

Files
-index.js— main program implementing input reading, regex extraction, validation, and masking  
-sample_input.txt— input text for extraction  
-sample_output.json — generated JSON output  
-README.md — project documentation  

Run the program:

node index.js
The program will generate a JSON file sample_output.json containing the extracted and validated data.

How the program works (function-level)
index.js main flow:
Read input file
Reads sample_input.txt safely and trims whitespace. Flags empty files.

Detect unsafe input
Uses regex to detect script tags, SQL keywords (DROP TABLE), javascript: URLs, or onerror attributes.
Unsafe content is flagged but not executed.

Mask sensitive data

Emails: local-part partially hidden (first***last@domain.com)

Credit cards: only last 4 digits visible (** ** ** 1234)

Regex extraction for valid patterns

Emails: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g

Rwanda phones: /(?:\+250\s?|0)7[2-9]\d(?:\s?\d{3}){2}/g

Credit cards: /(?:\d{4}[- ]?){3}\d{4}/g

Times: /\b((([01]?\d|2[0-3]):[0-5]\d)|((1[0-2]|0?[1-9]):[0-5]\d\s?(AM|PM)))\b/gi

Currency: /RWF\s?\d[\d,](\.\d{2})?|\$\d[\d,](\.\d{2})?/g

Output results
Results are organized into a JSON object and saved as sample_output.json:

{
  "emails": ["j***e@example.com"],
  "phones": ["078 123 4567", "+250 788 987 654"],
  "credit_cards": ["** ** ** 3456"],
  "times": ["12:30", "2:45 PM"],
  "money": ["$19.99", "RWF 12,345"],
  "unsafe_input_detected": true,
  "ignored_patterns": ["script tags", "javascript URLs", "SQL keywords"]
}