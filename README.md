ALU Regex Data Extraction & Secure Validation

 Project Overview:
 
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

Prerequisites:

-Node.js 14+ (recommended)  
-Terminal or VS Code in the project directory  

 The project uses built-in Node modules (fs) and standard ES syntax.

Files:

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

Detect unsafe input;
Uses regex to detect script tags, SQL keywords (DROP TABLE), javascript: URLs, or onerror attributes.
Unsafe content is flagged but not executed.

