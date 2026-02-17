import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Supported languages
const SUPPORTED_LANGUAGES = ['en', 'fr', 'es', 'it', 'ar', 'ru', 'zh', 'nl', 'de', 'pt'];

// Helper: get translation safely
function getTranslation(product, lang) {
  if (!product.translations) return {};

  const t = product.translations;

  // Case 1: Mongoose Map
  if (typeof t.get === 'function') {
    if (t.get(lang)) return t.get(lang);
    if (t.get('en')) return t.get('en');

    const firstLang = t.keys().next().value;
    return firstLang ? t.get(firstLang) : {};
  }

  // Case 2: Plain object (after .lean())
  if (t[lang]) return t[lang];
  if (t.en) return t.en;

  const firstLang = Object.keys(t)[0];
  return firstLang ? t[firstLang] : {};
}


// GET ALL PRODUCTS
router.get('/products', async (req, res) => {
  try {
    let lang = req.query.lang || 'en';
    if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';

    const products = await Product.find().sort({ createdAt: -1 }).lean();

    const formatted = products.map(p => {
      const t = getTranslation(p, lang);
      return {
        _id: p._id,
        name: t.name,
        category: t.category,
        description: t.description,
        variants: t.variants || {},
        images: p.images,
        stockQuantity: p.stockQuantity,
        status: p.status,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      };
    });

    res.status(200).json({
      success: true,
      total: formatted.length,
      products: formatted
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// GET SINGLE PRODUCT
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let lang = req.query.lang || 'en';
    if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';

    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const t = getTranslation(product, lang);

    res.status(200).json({
      success: true,
      product: {
        _id: product._id,
        name: t.name,
        category: t.category,
        description: t.description,
        variants: t.variants || {},
        images: product.images,
        stockQuantity: product.stockQuantity,
        status: product.status,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  } catch (error) {
    console.error(error);

    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

export default router;
