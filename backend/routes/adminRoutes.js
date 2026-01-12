import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Blog from '../models/Blog.js'
import exportBlog from '../models/exportBlog.js'
import adminAuth from '../middleware/adminAuth.js'
import exportBlog from '../models/exportBlog.js'
import contact from '../models/contact.js'
import FarmFund from '../models/FarmFund.js'
import Membership from '../models/Membership.js'
import News from '../models/News.js'

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
    const {
      title,
      excerpt,
      slug,
      image,
      sections,
      publishedAt
    } = req.body

    // basic validation
    if (!title || !excerpt || !slug) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const blog = await Blog.create({
      title,
      excerpt,
      slug,
      image,
      sections,
      publishedAt
    })

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Slug already exists' })
    }

    res.status(500).json({ message: 'Server error' })
  }
})

// camberfarm export blog creation route
router.post('/export-blogs', adminAuth, async (req, res) => {
  try {
    const {
      title,
      excerpt,
      slug,
      image,
      sections,
      publishedAt
    } = req.body

    // basic validation
    if (!title || !excerpt || !slug) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const exportBlogs = await exportBlog.create({
      title,
      excerpt,
      slug,
      image,
      sections,
      publishedAt
    })

    res.status(201).json({
      message: 'Blog created successfully',
      exportBlogs
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Slug already exists' })
    }

    res.status(500).json({ message: 'Server error' })
  }
})

// GET all contact messages
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const contacts = await contact.find().sort({ createdAt: -1 })

    res.json({
      count: contacts.length,
      contacts
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
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

    // Validate required fields
    if (!title || !excerpt || !slug) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const news = await News.create({
      title,
      excerpt,
      slug,
      image,
      sections,
      publishedAt
    })

    res.status(201).json({
      message: 'News article created successfully',
      news
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Slug already exists' })
    }
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
