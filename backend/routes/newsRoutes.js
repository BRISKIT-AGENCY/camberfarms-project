import express from 'express'
import News from '../models/News.js'
const router = express.Router()

// GET all news (with pagination & locale)
router.get('/news', async (req, res) => {
  try {
    const lang = req.query.lang || 'en'
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3
    const skip = (page - 1) * limit

    const [newsItems, total] = await Promise.all([
      News.find()
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      News.countDocuments()
    ])

    // Format for locale
    const formatted = newsItems.map(item => ({
      title: item.title.get(lang) || item.title.get('en'),
      excerpt: item.excerpt.get(lang) || item.excerpt.get('en'),
      slug: item.slug,
      image: item.image,
      publishedAt: item.publishedAt
    }))

    res.json({
      data: formatted,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news' })
  }
})

// SEARCH news
router.get('/news/search', async (req, res) => {
  try {
    const lang = req.query.lang || 'en'
    const query = req.query.q

    if (!query) {
      return res.status(400).json({ message: 'Search query required' })
    }

    const newsItems = await News.find({
      $or: [
        { [`title.${lang}`]: { $regex: query, $options: 'i' } },
        { [`excerpt.${lang}`]: { $regex: query, $options: 'i' } }
      ]
    })

    const formatted = newsItems.map(item => ({
      title: item.title.get(lang) || item.title.get('en'),
      slug: item.slug,
      image: item.image,
      publishedAt: item.publishedAt
    }))

    res.json(formatted)
  } catch (error) {
    res.status(500).json({ message: 'Search failed' })
  }
})

// GET single news item by slug
router.get('/news/:slug', async (req, res) => {
  try {
    const lang = req.query.lang || 'en'
    const slug = req.params.slug
    console.log(slug);
    console.log(lang);
    
    

    const newsItem = await News.findOne({ slug })
    if (!newsItem) return res.status(404).json({ message: 'News not found' })

    res.json({
      title: newsItem.title.get(lang) || newsItem.title.get('en'),
      excerpt: newsItem.excerpt.get(lang) || newsItem.excerpt.get('en'),
      image: newsItem.image,
      publishedAt: newsItem.publishedAt,
      sections: newsItem.sections.map(section => ({
        heading: section.heading.get(lang) || section.heading.get('en'),
         paragraphs: section.paragraphs.get(lang) || section.paragraphs.get('en')
       }))
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' })
  }
})

router.post('/news', async (req, res) => {
  try {
    const { title, excerpt, slug, image, sections, publishedAt } = req.body

    if (!validatePostBody(req.body)) {
      return res.status(400).json({ message: 'Title, excerpt, and slug are required' })
    }

    const newsItem = new News({
      title,
      excerpt,
      slug,
      image,
      sections,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date()
    })

    await newsItem.save()
    res.status(201).json({ message: 'News created successfully', newsItem })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create news' })
  }
})

export default router
