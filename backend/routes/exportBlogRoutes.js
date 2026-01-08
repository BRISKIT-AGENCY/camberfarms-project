import express from 'express'
import exportBlog from '../models/exportBlog.js'

const router = express.Router()


router.get('/blog', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3
    const skip = (page - 1) * limit

    const [blogs, total] = await Promise.all([
      exportBlog.find()
        .sort({  publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title slug excerpt image publishedAt'), // IMPORTANT
      exportBlog.countDocuments()
    ])

    res.json({
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' })
  }
})

router.get('/blog/search', async (req, res) => {
  try {
    const query = req.query.q

    if (!query) {
      return res.status(400).json({ message: 'Search query required' })
    }

    const blogs = await exportBlog.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { 'sections.heading': { $regex: query, $options: 'i' } },
        { 'sections.paragraphs': { $regex: query, $options: 'i' } }
      ]
    }).select('title slug image publishedAt')

    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Search failed' })
  }
})



router.get('/blog/:slug', async (req, res) => {
  try {
    
    const blog = await exportBlog.findOne({ slug: req.params.slug })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })

    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog' })
  }
})

export default router
