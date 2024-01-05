import axios from 'axios';

const API_KEY = 'AIzaSyBYp4OytliRm4AtdwpHgHg-HRJW767gSms';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

const translateText = async (text, targetLanguage) => {
  console.log('nen')
  const response = await axios.post(
    `${API_URL}?key=${API_KEY}`,
    {
      q: text,
      target: targetLanguage,
    }
  );

  return response.data.data.translations[0].translatedText;
};

export default translateText;