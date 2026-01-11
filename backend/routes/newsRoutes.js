import express from 'express'
import News from '../models/News.js'
const router = express.Router()


router.get('/news', async (req, res) => {
  try {
    console.log('here');
    
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3
    const skip = (page - 1) * limit

    const [news, total] = await Promise.all([
      News.find()
        .sort({  publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title slug excerpt image publishedAt'),
      News.countDocuments()
    ])

    res.json({
      data: news,
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

router.get('/news/:slug', async (req, res) => {
  try {
    
    const news = await News.findOne({ slug: req.params.slug })
    if (!news) return res.status(404).json({ message: 'News not found' })

    res.json(news)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' })
  }
})

export default router
