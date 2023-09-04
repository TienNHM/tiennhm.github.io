/**
 * Flattens an object to a single level object
 * @param {object} obj Object to flatten 
 * @returns An object with all keys and values flattened
 */
function FlattenObject(obj) {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, FlattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });

  return flattened;
}

const data = {
  "word": "pho",
  "meanings": {
    "partOfSpeech": "noun",
    "definitions": "A Vietnamese soup with a beef base, typically served with rice noodles and beef or chicken."
  }
}

var result = FlattenObject(data, "");
render(JSON.stringify(result));