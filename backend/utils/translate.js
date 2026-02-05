import fetch from 'node-fetch';
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const BASE_URL = `https://translation.googleapis.com/language/translate/v2`;

export async function translateText(text, targetLang) {
  if (!text) return '';

  try {
    const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text'
      })
    });

    const data = await res.json();

    if (!data?.data?.translations?.[0]?.translatedText) {
      throw new Error('Translation failed');
    }

    return data.data.translations[0].translatedText;
  } catch (err) {
    console.error('Google translation error:', err.message);
    return text; // fallback
  }
}
