import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// Supported languages
const SUPPORTED_LANGUAGES = [
  'en', 'fr', 'es', 'it', 'ar', 'ru', 'zh', 'nl', 'de', 'pt'
];

// Helper to safely get translation
function getTranslation(item, lang) {
  if (item.translations?.[lang]) return item.translations[lang];
  if (item.translations?.en) return item.translations.en;

  // fallback to first available translation
  const firstLang = Object.keys(item.translations || {})[0];
  return item.translations?.[firstLang] || {};
}

// -----------------------------
// GET all news (pagination + locale)
// -----------------------------
router.get('/news', async (req, res) => {
  try {
    let lang = req.query.lang || 'en';
    if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const [newsItems, total] = await Promise.all([
      News.find()
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      News.countDocuments()
    ]);

    const formatted = newsItems.map(item => {
      const t = getTranslation(item, lang);

      return {
        title: t.title,
        excerpt: t.excerpt,
        slug: item.slug,
        image: item.image,
        publishedAt: item.publishedAt,
        lang
      };
    });

    res.json({
      data: formatted,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

// -----------------------------
// SEARCH news (multi-language safe)
// -----------------------------
router.get('/news/search', async (req, res) => {
  try {
    const query = req.query.q;
    let lang = req.query.lang || 'en';

    if (!query) {
      return res.status(400).json({ message: 'Search query required' });
    }

    if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';

    // Search in requested language + English fallback
    const newsItems = await News.find({
      $or: [
        { [`translations.${lang}.title`]: { $regex: query, $options: 'i' } },
        { [`translations.${lang}.excerpt`]: { $regex: query, $options: 'i' } },
        { 'translations.en.title': { $regex: query, $options: 'i' } },
        { 'translations.en.excerpt': { $regex: query, $options: 'i' } }
      ]
    }).lean();

    const formatted = newsItems.map(item => {
      const t = getTranslation(item, lang);

      return {
        title: t.title,
        slug: item.slug,
        image: item.image,
        publishedAt: item.publishedAt,
        lang
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Search failed' });
  }
});

// -----------------------------
// GET single news item by slug
// -----------------------------
router.get('/news/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    let lang = req.query.lang || 'en';

    if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';

    const newsItem = await News.findOne({ slug }).lean();
    if (!newsItem) {
      return res.status(404).json({ message: 'News not found' });
    }

    const t = getTranslation(newsItem, lang);

    res.json({
      title: t.title,
      excerpt: t.excerpt,
      image: newsItem.image,
      publishedAt: newsItem.publishedAt,
      lang,
      sections: (t.sections || []).map(section => ({
        heading: section.heading,
        paragraphs: section.paragraphs
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

export default router;
