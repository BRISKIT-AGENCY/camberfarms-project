// seedData.js
import mongoose from 'mongoose';
import News from '../models/News.js';
import Blog from '../models/Blog.js';
import exportBlog from '../models/exportBlog.js';
import { translateText } from '../utils/translate.js';
import { translateSections } from '../utils/translateSections.js';
import { generateSlug } from '../utils/generateSlug.js';
import dotenv from 'dotenv';

dotenv.config();

// Languages to translate into
const LANGUAGES = ['fr', 'it', 'es', 'nl', 'de', 'ru', 'ar', 'zh', 'pt'];

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/newsdb';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample English news/blog data (5 items)
const sampleData = [
  {
    title: 'Breaking News: New Tech Revolutionizes AI',
    excerpt: 'A groundbreaking technology is transforming the AI landscape.',
    sections: [
      { heading: 'Introduction', paragraphs: ['AI technology is evolving rapidly, impacting industries globally.'] },
      { heading: 'Impact', paragraphs: ['Businesses are leveraging this tech to improve efficiency and innovation.'] }
    ]
  },
  {
    title: 'Sports Update: Local Team Wins Championship',
    excerpt: 'The local team clinched the championship in a thrilling final.',
    sections: [
      { heading: 'Match Summary', paragraphs: ['The final game was intense, with both teams showing incredible skill.'] },
      { heading: 'Key Players', paragraphs: ['Star players led the team to victory with outstanding performances.'] }
    ]
  },
  {
    title: 'Health Alert: New Guidelines Released',
    excerpt: 'Authorities release new health guidelines to improve public wellbeing.',
    sections: [
      { heading: 'Guidelines Overview', paragraphs: ['The new guidelines focus on diet, exercise, and mental health.'] },
      { heading: 'Recommendations', paragraphs: ['Citizens are encouraged to follow these recommendations daily.'] }
    ]
  },
  {
    title: 'Environment: Major Initiative to Plant Trees',
    excerpt: 'A nationwide effort to plant millions of trees is underway.',
    sections: [
      { heading: 'Goals', paragraphs: ['The initiative aims to combat climate change and restore ecosystems.'] },
      { heading: 'Community Involvement', paragraphs: ['Volunteers from all regions are participating in the project.'] }
    ]
  },
  {
    title: 'Entertainment: Upcoming Movie Creates Buzz',
    excerpt: 'The upcoming blockbuster movie is generating excitement worldwide.',
    sections: [
      { heading: 'Synopsis', paragraphs: ['The movie tells an epic story of adventure and heroism.'] },
      { heading: 'Release', paragraphs: ['It is scheduled to premiere in cinemas next month.'] }
    ]
  }
];

async function seedData() {
  try {
    console.log('Seeding data...');

    for (const item of sampleData) {
      const slug = generateSlug(item.title);

      // Base English translation
      const translations = {
        en: {
          title: item.title,
          excerpt: item.excerpt,
          sections: item.sections
        }
      };

      // Translate into all other languages
      for (const lang of LANGUAGES) {
        console.log(`Translating "${item.title}" → ${lang}`);
        const [title, excerpt, sections] = await Promise.all([
          translateText(item.title, lang),
          translateText(item.excerpt, lang),
          translateSections(item.sections, lang)
        ]);
        translations[lang] = { title, excerpt, sections };
      }

      // Create documents for News, Blog, and exportBlog
      const newsDoc = new News({
        slug,
        image: '/images/news1.png',
        publishedAt: new Date(),
        translations
      });
      const blogDoc = new Blog({
        slug,
        image: '/images/news1.png',
        publishedAt: new Date(),
        translations
      });
      const exportBlogDoc = new exportBlog({
        slug,
        image: '/images/news1.png',
        publishedAt: new Date(),
        translations
      });

      // Save all three
      await Promise.all([newsDoc.save(), blogDoc.save(), exportBlogDoc.save()]);
      console.log(`"${item.title}" seeded in News, Blog, and exportBlog`);
    }

    console.log('All data seeded successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.disconnect();
  }
}

// Run seed
seedData();
