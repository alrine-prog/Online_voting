// index.js or app.js
// Replace your old hardcoded string with this:
const apiKey = process.env.API_KEY; 

// Example usage in a fetch request
fetch(`https://example.com{apiKey}`)
  .then(response => response.json())
  .then(data => console.log(data));
