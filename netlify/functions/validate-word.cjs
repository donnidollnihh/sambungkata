const fs = require('fs');
const path = require('path');

// Wordlist dibaca sekali, cache di memory
let kbbiWords = null;
function loadWordlist() {
  if (!kbbiWords) {
    const filePath = path.join(__dirname, 'kbbi-wordlist.txt');
    kbbiWords = new Set(
      fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .map(w => w.trim().toLowerCase())
        .filter(Boolean)
    );
  }
  return kbbiWords;
}

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { word } = JSON.parse(event.body);
    if (!word || typeof word !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: "Word is required" }) };
    }
    const words = loadWordlist();
    const isValid = words.has(word.toLowerCase());
    return { statusCode: 200, body: JSON.stringify({ valid: isValid }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to validate word" }) };
  }
}; 