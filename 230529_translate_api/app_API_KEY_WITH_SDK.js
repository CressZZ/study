/**
 * - 설치: https://cloud.google.com/sdk/docs/install-sdk?hl=ko
 * - gcloud auth application-default login 명령어를 실행하여 ADC에 사용자 인증 정보를 제공
 * - 프로젝트 변경 방법 : gcloud auth application-default set-quota-project YOUR_PROJECT
 */


// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate({
  // projectId:'translate-test-388202',
  key: '',
});

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'The to translate, e.g. Hello, world!';
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
