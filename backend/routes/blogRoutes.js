import express from 'express'
import Blog from '../models/Blog.js'
const router = express.Router()


router.get('/blog', async (req, res) => {
  try {
    const lang = req.query.lang || 'en'
    console.log(lang);
    
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3
    const skip = (page - 1) * limit

    const blogs = await Blog.find()
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Blog.countDocuments()

    const formatted = blogs.map(blog => ({
      title: blog.title.get(lang) || blog.title.get('en'),
      excerpt: blog.excerpt.get(lang) || blog.excerpt.get('en'),
      slug: blog.slug,
      image: blog.image,
      publishedAt: blog.publishedAt
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
    res.status(500).json({ message: 'Failed to fetch blogs' })
  }
})


router.get('/blog/search', async (req, res) => {
  try {
    const lang = req.query.lang || 'en'
    const query = req.query.q

    if (!query) {
      return res.status(400).json({ message: 'Search query required' })
    }

    const blogs = await Blog.find({
      $or: [
        { [`title.${lang}`]: { $regex: query, $options: 'i' } },
        { [`excerpt.${lang}`]: { $regex: query, $options: 'i' } },
        { [`sections.heading.${lang}`]: { $regex: query, $options: 'i' } },
        { [`sections.paragraphs.${lang}`]: { $regex: query, $options: 'i' } }
      ]
    })

    res.json(
      blogs.map(blog => ({
        title: blog.title.get(lang) || blog.title.get('en'),
        slug: blog.slug,
        image: blog.image,
        publishedAt: blog.publishedAt
      }))
    )
  } catch (error) {
    res.status(500).json({ message: 'Search failed' })
  }
})



router.get('/blog/:slug', async (req, res) => {
  try {
    const lang = req.query.lang || 'en'
    const slug = req.params.slug
    console.log(slug);
    

    const blog = await Blog.findOne({ slug })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })

    res.json({
      title: blog.title.get(lang) || blog.title.get('en'),
      excerpt: blog.excerpt.get(lang) || blog.excerpt.get('en'),
      image: blog.image,
      publishedAt: blog.publishedAt,
      sections: blog.sections.map(section => ({
        heading:
          section.heading.get(lang) || section.heading.get('en'),
        paragraphs:
          section.paragraphs.get(lang) || section.paragraphs.get('en')
      }))
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog' })
  }
})

router.post('/blog', async (req, res) => {
  try {
    const { title, excerpt, slug, image, sections, publishedAt } = req.body

    if (!validatePostBody(req.body)) {
      return res.status(400).json({ message: 'Title, excerpt, and slug are required' })
    }

    const blog = new Blog({
      title,
      excerpt,
      slug,
      image,
      sections,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date()
    })

    await blog.save()
    res.status(201).json({ message: 'Blog created successfully', blog })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create blog' })
  }
})

export default router
