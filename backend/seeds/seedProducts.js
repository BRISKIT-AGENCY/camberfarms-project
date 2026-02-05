// seedProducts.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import { translateTexts, translateVariants } from '../utils/translateProduct.js';
import { generateSlug } from '../utils/generateSlug.js';

dotenv.config();

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdb';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding products'))
  .catch(err => console.error('MongoDB connection error:', err));

// Languages to translate into
const SUPPORTED_LANGUAGES = ['fr', 'it', 'es', 'nl', 'de', 'ru', 'ar', 'zh', 'pt'];

// Sample agricultural products
const sampleProducts = [
  {
    name: 'Organic Wheat Seeds',
    category: 'Seeds',
    description: 'High-quality organic wheat seeds for sustainable farming.',
    stockQuantity: 200,
    variants: { packageSize: '1kg', type: 'Hard Red' },
    images: ['/images/products/wheat.png']
  },
  {
    name: 'Fertilizer - Nitrogen Rich',
    category: 'Fertilizers',
    description: 'Boost crop growth with nitrogen-rich fertilizer.',
    stockQuantity: 150,
    variants: { weight: '50kg', type: 'Granular' },
    images: ['/images/products/fertilizer.png']
  },
  {
    name: 'Tomato Seedlings',
    category: 'Seedlings',
    description: 'Healthy tomato seedlings for early season planting.',
    stockQuantity: 300,
    variants: { size: 'Small', variety: 'Roma' },
    images: ['/images/products/tomato.png']
  },
  {
    name: 'Irrigation Pump',
    category: 'Equipment',
    description: 'Efficient water pump for small and medium farms.',
    stockQuantity: 25,
    variants: { power: '2HP', voltage: '220V' },
    images: ['/images/products/pump.png']
  },
  {
    name: 'Organic Corn Seeds',
    category: 'Seeds',
    description: 'Non-GMO organic corn seeds with high yield potential.',
    stockQuantity: 180,
    variants: { packageSize: '1kg', type: 'Yellow' },
    images: ['/images/products/corn.png']
  },
  {
    name: 'Handheld Sprayer',
    category: 'Equipment',
    description: 'Portable sprayer for pesticides and fertilizers.',
    stockQuantity: 50,
    variants: { capacity: '5L', material: 'Plastic' },
    images: ['/images/products/sprayer.png']
  },
  {
    name: 'Organic Lettuce Seeds',
    category: 'Seeds',
    description: 'High-germination organic lettuce seeds.',
    stockQuantity: 220,
    variants: { packageSize: '500g', variety: 'Butterhead' },
    images: ['/images/products/lettuce.png']
  },
  {
    name: 'Compost',
    category: 'Fertilizers',
    description: 'Rich organic compost to improve soil fertility.',
    stockQuantity: 100,
    variants: { weight: '25kg', type: 'Organic' },
    images: ['/images/products/compost.png']
  }
];

async function seedProducts() {
  try {
    console.log('Seeding agricultural products...');

    for (const product of sampleProducts) {
      const slug = generateSlug(product.name);

      // Base English translation
      const translations = { en: {
        name: product.name,
        category: product.category,
        description: product.description,
        variants: product.variants
      }};

      // Translate into other languages
      for (const lang of SUPPORTED_LANGUAGES) {
        if (lang === 'en') continue;

        translations[lang] = {
          name: await translateTexts(product.name, lang),
          category: await translateTexts(product.category, lang),
          description: await translateTexts(product.description, lang),
          variants: await translateVariants(product.variants, lang)
        };
      }

      const productDoc = new Product({
        slug,
        images: product.images,
        stockQuantity: product.stockQuantity,
        status: product.stockQuantity > 0 ? 'active' : 'inactive',
        translations
      });

      await productDoc.save();
      console.log(`Product "${product.name}" seeded successfully`);
    }

    console.log('All agricultural products seeded!');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding products:', err);
    mongoose.disconnect();
  }
}

// Run seed
seedProducts();
