import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const BASE_URL = `https://translation.googleapis.com/language/translate/v2`;

// Translate a simple string
export async function translateTexts(text, targetLang) {
  if (!text) return '';

  try {
    const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text',
      }),
    });

    const data = await res.json();
    return data?.data?.translations?.[0]?.translatedText || text;
  } catch (err) {
    console.error('Google translation error:', err.message);
    return text; // fallback
  }
}

// Translate variants if they are objects with string values
export async function translateVariants(variants, targetLang) {
  if (!variants) return {};

  const translated = {};
  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === 'string') {
      translated[key] = await translateTexts(value, targetLang);
    } else {
      translated[key] = value; // leave non-strings as is
    }
  }
  return translated;
}
