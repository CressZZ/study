
// const url = 'https://translation.googleapis.com/language/translate/v2?key={{API_KEY}}';
const url = 'https://translation.googleapis.com/language/translate/v2/languages?key={{API_KEY}}';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    "q": ["Hello world", "My name is Jeff"],
    "target": "de"
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));





  