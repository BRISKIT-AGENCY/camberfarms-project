import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Blog from '../models/Blog.js'
import exportBlog from '../models/exportBlog.js'
import adminAuth from '../middleware/adminAuth.js'
import contact from '../models/contact.js'
import FarmFund from '../models/FarmFund.js'
import Membership from '../models/Membership.js'
import News from '../models/News.js'
import Product from '../models/Product.js'
import Feedback from '../models/Feedback.js'
import Message from '../models/Message.js'
import Affiliate from '../models/Affiliate.js'

dotenv.config();

const router = express.Router()

// Admin login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (username !== process.env.ADMIN_USERNAME) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const adminHash = process.env.ADMIN_PASSWORD_HASH

    if (!adminHash) {
        throw new Error('ADMIN_PASSWORD_HASH not set')
    }

    // Exact password check (bcrypt)
    const isMatch = await bcrypt.compare(
        password,
        adminHash
    )

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate JWT
    const token = jwt.sign(
        { role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.json({
        message: 'Admin login successful',
        token
    })
})


// camberfarm africa blog creation route
router.post('/africa-blogs', adminAuth, async (req, res) => {
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

// camberfarm export blog creation route
router.post('/export-blogs', adminAuth, async (req, res) => {
  try {
    const { title, excerpt, slug, image, sections, publishedAt } = req.body

    if (!validatePostBody(req.body)) {
      return res.status(400).json({ message: 'Title, excerpt, and slug are required' })
    }

    const exportBlog = new ExportBlog({
      title,
      excerpt,
      slug,
      image,
      sections,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date()
    })

    await exportBlog.save()
    res.status(201).json({ message: 'ExportBlog created successfully', exportBlog })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create export blog' })
  }
})

// GET all contact messages
router.get('/contacts', adminAuth, async (req, res) => {
  try {
      const contacts = await Contact.find()
        .sort({ createdAt: -1 }) // latest first
  
      res.status(200).json({
        success: true,
        total: contacts.length,
        data: contacts
      })
    } catch (error) {
      console.error('Fetch contacts error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contacts'
      })
    }
})

// GET all FarmFund registrations
router.get('/farm-fund', adminAuth, async (req, res) => {
  try {
    const registrations = await FarmFund.find().sort({ createdAt: -1 })
    const count = await FarmFund.countDocuments()

    res.json({
      count,
      registrations
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET all members (admin only)
router.get('/membership', adminAuth, async (req, res) => {
  try {
    const members = await Membership.find().sort({ createdAt: -1 })
    const count = await Membership.countDocuments()

    res.json({
      count,
      members
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// create a news article (admin only)
router.post('/news', adminAuth, async (req, res) => {
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

// CREATE PRODUCT
// POST /api/products
router.post('/products', adminAuth, async (req, res) => {
  try {
      const {
        title,
        image,
        descriptions,
        packaging,
        containerSize,
        seasons,
        incoterms,
        variants
      } = req.body
  
      // Basic validation
      if (
        !title ||
        !image ||
        !descriptions ||
        !packaging ||
        !containerSize ||
        !seasons ||
        !incoterms ||
        !variants
      ) {
        return res.status(400).json({
          message: 'Missing required fields'
        })
      }
  
      const product = new Product({
        title,
        image,
        descriptions,
        packaging,
        containerSize,
        seasons,
        incoterms,
        variants
      })
  
      await product.save()
  
      res.status(201).json({
        message: 'Product created successfully',
        product
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Failed to create product',
        error: error.message
      })
    }
})


// ✅ ADMIN – GET ALL FEEDBACK
// GET /api/feedback
router.get('/feedback',adminAuth, async (_req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })

    res.status(200).json({
      total: feedbacks.length,
      data: feedbacks
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch feedback',
      error: error.message
    })
  }
})

// ✅ ADMIN – GET ALL MESSAGES
// GET /api/messages
router.get('/messages',adminAuth, async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })

    res.status(200).json({
      total: messages.length,
      data: messages
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch messages',
      error: error.message
    })
  }
})

// ✅ ADMIN – GET ALL AFFILIATES
// GET /api/affiliate
router.get('/affiliate', async (_req, res) => {
  try {
    const affiliates = await Affiliate.find().sort({ createdAt: -1 })

    res.status(200).json({
      total: affiliates.length,
      data: affiliates
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch affiliates',
      error: error.message
    })
  }
})


export default router
