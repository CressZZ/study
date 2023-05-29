/**
 * 서비스 계정 키
 * 로컬 개발에 사용자 인증 정보를 사용할 수 없으면 서비스 계정 키를 사용할 수 있습니다. 서비스 계정 키는 불필요한 위험을 초래하므로 가능하면 피해야 합니다.
 * 
 */

process.env.GOOGLE_APPLICATION_CREDENTIALS = './translate-test-388202-2ca8c6e7ccce.json';

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'The text to translate, e.g. Hello, world!';
const target = 'ru';

async function translateText() {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
}

translateText();
