import express from 'express'
import Blog from '../models/Blog.js'

const router = express.Router()


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

// GET all blogs
router.get('/blog', async (req, res) => {
  try {
    let lang = req.query.lang || 'en';
    if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find().sort({ publishedAt: -1 }).skip(skip).limit(limit).lean(),
      Blog.countDocuments()
    ]);

    const formatted = blogs.map(blog => {
      const t = getTranslation(blog, lang);
      return {
        title: t.title,
        excerpt: t.excerpt,
        slug: blog.slug,
        image: blog.image,
        publishedAt: blog.publishedAt,
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});

// SEARCH blogs
router.get('/blog/search', async (req, res) => {
  try {
    const query = req.query.q;
    let lang = req.query.lang || 'en';
    if (!query) return res.status(400).json({ message: 'Search query required' });
    if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';

    const blogs = await Blog.find({
      $or: [
        { [`translations.${lang}.title`]: { $regex: query, $options: 'i' } },
        { [`translations.${lang}.excerpt`]: { $regex: query, $options: 'i' } },
        { 'translations.en.title': { $regex: query, $options: 'i' } },
        { 'translations.en.excerpt': { $regex: query, $options: 'i' } }
      ]
    }).lean();

    const formatted = blogs.map(blog => {
      const t = getTranslation(blog, lang);
      return {
        title: t.title,
        slug: blog.slug,
        image: blog.image,
        publishedAt: blog.publishedAt,
        lang
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed' });
  }
});

// GET single blog by slug
router.get('/blog/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    let lang = req.query.lang || 'en';
    if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';

    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const t = getTranslation(blog, lang);
    res.json({
      title: t.title,
      excerpt: t.excerpt,
      image: blog.image,
      publishedAt: blog.publishedAt,
      lang,
      sections: (t.sections || []).map(section => ({
        heading: section.heading,
        paragraphs: section.paragraphs
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching blog' });
  }
});

export default router
