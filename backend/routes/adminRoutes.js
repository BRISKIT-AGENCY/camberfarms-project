import express from 'express'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Blog from '../models/Blog.js'
import exportBlog from '../models/exportBlog.js'
import adminAuth from '../middleware/adminAuth.js'
import contact from '../models/Contact.js'
import FarmFund from '../models/FarmFund.js'
import Membership from '../models/Membership.js'
import News from '../models/News.js'
import Product from '../models/Product.js'
import Feedback from '../models/Feedback.js'
import Message from '../models/Message.js'
import Affiliate from '../models/Affiliate.js'
import { productUpload } from '../middleware/productUpload.js'
import { blogUpload } from '../middleware/blogUpload.js'
import { exportBlogUpload } from '../middleware/exportBlogUpload.js'
import { newsUpload } from '../middleware/newsUpload.js'
import Visitor from '../models/Visitor.js'
import Admin from '../models/Admin.js'
import { galleryUpload } from '../middleware/galleryUpload.js'
import Gallery from '../models/Gallery.js'
import { adminUpload } from '../middleware/adminUpload.js'

dotenv.config();

const router = express.Router()

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const admin = await Admin.findOne({ username })
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign(
    {
      adminId: admin._id,
      role: admin.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  res.status(200).json({
    message: 'Login successful',
    token,
    admin: {
      id: admin._id,
      username: admin.username,
      role: admin.role,
      profilePhoto: admin.profilePhoto
    }
  })
})



router.post('/reset-password/request', async (req, res) => {
  const { username } = req.body

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(404).json({ message: 'Admin not found' })
  }

  const resetToken = jwt.sign(
    { role: 'admin', type: 'password_reset' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  // In real apps, email this token
  res.json({
    message: 'Password reset token generated',
    resetToken
  })
})

router.post('/reset-password/confirm', async (req, res) => {
  const { token, newPassword } = req.body

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== 'admin' || decoded.type !== 'password_reset') {
      return res.status(403).json({ message: 'Invalid reset token' })
    }

    const newHash = await bcrypt.hash(newPassword, 10)

    // Save securely — update ENV, DB, or secrets manager
    // Example (NOT for production):
    // process.env.ADMIN_PASSWORD_HASH = newHash

    res.json({
      message: 'Password reset successful',
      newPasswordHash: newHash
    })
  } catch (err) {
    return res.status(401).json({ message: 'Token expired or invalid' })
  }
})

// Upload or update the single admin's profile photo
router.post('/admin/profile-photo', adminAuth, adminUpload, async (req, res) => {
  try {
    // Assuming there is only one admin in the collection
    const admin = await Admin.findOne()
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' })
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    // Save file path to admin document
    admin.profilePhoto = `/uploads/admins/${req.file.filename}`
    await admin.save()

    res.status(200).json({
      success: true,
      message: 'Profile photo updated successfully',
      profilePhoto: admin.profilePhoto
    })
  } catch (error) {
    console.error('Upload profile photo error:', error)
    res.status(500).json({ success: false, message: 'Failed to upload profile photo' })
  }
})

router.post('/reset-password', adminAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const admin = await Admin.findById(req.admin.adminId)

  if (!admin) {
    return res.status(404).json({ message: 'Admin not found' })
  }

  const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash)
  if (!isMatch) {
    return res.status(401).json({ message: 'Old password incorrect' })
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 10)
  await admin.save()

  res.json({ message: 'Password updated successfully' })
})

router.post('/gallery', adminAuth, galleryUpload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: 'At least one image is required' })

    const images = req.files.map(file => `/uploads/gallery/${file.filename}`)

    const gallery = new Gallery({ images })
    await gallery.save()

    res.status(201).json({ message: 'Gallery created successfully', gallery })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create gallery', error: error.message })
  }
})

router.delete('/gallery/:id', adminAuth, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id)
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery not found' })
    res.status(200).json({ success: true, message: 'Gallery deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to delete gallery' })
  }
})

// GET all Africa blogs
router.get('/africa-blogs', async (req, res) => {
  try {
    // Fetch all blogs, newest first
    const blogs = await Blog.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      total: blogs.length,
      blogs
    })
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message
    })
  }
})

// camberfarm africa blog creation route
router.post('/africa-blogs', adminAuth, blogUpload.single('image'), async (req, res) => {
  try {
    let { title, excerpt, slug, sections, publishedAt } = req.body

    // 1️⃣ Check required fields
    if (!title) return res.status(400).json({ message: 'Title is required' })
    if (!excerpt) return res.status(400).json({ message: 'Excerpt is required' })
    if (!slug) return res.status(400).json({ message: 'Slug is required' })
    if (!req.file) return res.status(400).json({ message: 'Blog image is required' })

    // 2️⃣ Parse JSON fields if sent as strings
    title = typeof title === 'string' ? JSON.parse(title) : title
    excerpt = typeof excerpt === 'string' ? JSON.parse(excerpt) : excerpt
    sections = typeof sections === 'string' ? JSON.parse(sections) : sections

    const imagePath = `/uploads/blogs/${req.file.filename}`

    // 3️⃣ Create new blog
    const blog = new Blog({
      title,
      excerpt,
      slug,
      image: imagePath,
      sections,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date()
    })

    await blog.save()

    res.status(201).json({ message: 'Blog created successfully', blogId: blog._id, blog })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create blog', error: error.message })
  }
})



// update a africa blog
router.patch('/africa-blogs/:id', adminAuth, blogUpload.single('image'), async (req, res) => {
  try {
    const { id } = req.params
    const updateData = { ...req.body }

    if (updateData.publishedAt) {
      updateData.publishedAt = new Date(updateData.publishedAt)
    }

    // If a new image is uploaded, update image path
    if (req.file) {
      updateData.image = `/uploads/blogs/${req.file.filename}`

      // Optional: delete old image
      const existingBlog = await Blog.findById(id)
      if (existingBlog?.image) {
        fs.unlinkSync(`.${existingBlog.image}`)
      }
    }

    // Parse JSON fields
    if (updateData.title && typeof updateData.title === 'string') updateData.title = JSON.parse(updateData.title)
    if (updateData.excerpt && typeof updateData.excerpt === 'string') updateData.excerpt = JSON.parse(updateData.excerpt)
    if (updateData.sections && typeof updateData.sections === 'string') updateData.sections = JSON.parse(updateData.sections)

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' })

    res.status(200).json({
      message: 'Blog updated successfully',
      blog: updatedBlog
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update blog', error: error.message })
  }
})


// delete a africa blog
router.delete('/africa-blogs/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' })

    // Delete the blog image
    if (deletedBlog.image) fs.unlinkSync(`.${deletedBlog.image}`)

    res.status(200).json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete blog', error: error.message })
  }
})


// GET africa blog stats
router.get('/africa-blogs/stats', adminAuth, async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      {
        $facet: {
          // Total blogs count
          totalCount: [
            { $count: 'total' }
          ],

          // Monthly blogs count (by publishedAt)
          monthlyCounts: [
            {
              $group: {
                _id: {
                  year: { $year: '$publishedAt' },
                  month: { $month: '$publishedAt' }
                },
                total: { $sum: 1 }
              }
            },
            {
              $sort: {
                '_id.year': 1,
                '_id.month': 1
              }
            }
          ]
        }
      }
    ])

    const totalBlogs = stats[0].totalCount[0]?.total || 0

    res.status(200).json({
      totalBlogs,
      monthlyCounts: stats[0].monthlyCounts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to fetch blog stats',
      error: error.message
    })
  }
})

// GET all export blogs
router.get('/export-blogs', async (req, res) => {
  try {
    // Fetch all blogs, newest first
    const exportBlogs = await exportBlog.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      total: exportBlogs.length,
      exportBlogs
    })
  } catch (error) {
    console.error('Failed to fetch export blogs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch export blogs',
      error: error.message
    })
  }
})

// camberfarm export blog creation route
router.post(
  '/export-blogs',
  adminAuth,
  exportBlogUpload.single('image'),
  async (req, res) => {
    try {
      let { title, excerpt, slug, sections, publishedAt } = req.body

      // 1️⃣ Validate required fields
      if (!title) return res.status(400).json({ message: 'Title is required' })
      if (!excerpt) return res.status(400).json({ message: 'Excerpt is required' })
      if (!slug) return res.status(400).json({ message: 'Slug is required' })
      if (!req.file) return res.status(400).json({ message: 'ExportBlog image is required' })

      // 2️⃣ Parse JSON fields if sent as strings
      title = typeof title === 'string' ? JSON.parse(title) : title
      excerpt = typeof excerpt === 'string' ? JSON.parse(excerpt) : excerpt
      sections = typeof sections === 'string' ? JSON.parse(sections) : sections

      const imagePath = `/uploads/export-blogs/${req.file.filename}`

      // 3️⃣ Create new ExportBlog document
      const exportBlogs = new exportBlog({
        title,
        excerpt,
        slug,
        image: imagePath,
        sections,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date()
      })

      await exportBlogs.save()

      res.status(201).json({ message: 'ExportBlog created successfully', exportBlogId: exportBlogs._id, exportBlogs })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Failed to create ExportBlog', error: error.message })
    }
  }
)



// update a export blog
router.patch(
  '/export-blogs/:id',
  adminAuth,
  exportBlogUpload.single('image'),
  async (req, res) => {
    try {
      const { id } = req.params
      const updateData = { ...req.body }

      if (updateData.publishedAt) {
        updateData.publishedAt = new Date(updateData.publishedAt)
      }

      // If a new image is uploaded, update image path
      if (req.file) {
        updateData.image = `/uploads/export-blogs/${req.file.filename}`

        // Optional: delete old image
        const existingBlog = await exportBlog.findById(id)
        if (existingBlog?.image) fs.unlinkSync(`.${existingBlog.image}`)
      }

      // Parse JSON fields if sent as strings
      if (updateData.title && typeof updateData.title === 'string') updateData.title = JSON.parse(updateData.title)
      if (updateData.excerpt && typeof updateData.excerpt === 'string') updateData.excerpt = JSON.parse(updateData.excerpt)
      if (updateData.sections && typeof updateData.sections === 'string') updateData.sections = JSON.parse(updateData.sections)

      const updatedBlog = await exportBlog.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      )

      if (!updatedBlog) return res.status(404).json({ message: 'ExportBlog not found' })

      res.status(200).json({
        message: 'ExportBlog updated successfully',
        exportBlog: updatedBlog
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Failed to update ExportBlog', error: error.message })
    }
  }
)


// delete a export blog
router.delete('/export-blogs/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const deletedBlog = await exportBlog.findByIdAndDelete(id)

    if (!deletedBlog) return res.status(404).json({ message: 'ExportBlog not found' })

    // Delete the blog image
    if (deletedBlog.image) fs.unlinkSync(`.${deletedBlog.image}`)

    res.status(200).json({ message: 'ExportBlog deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete ExportBlog', error: error.message })
  }
})


// GET export blog stats
router.get('/export-blogs/stats', adminAuth, async (req, res) => {
  try {
    const stats = await exportBlog.aggregate([
      {
        $facet: {
          // Total export blogs count
          totalCount: [
            { $count: 'total' }
          ],

          // Monthly export blogs count (by publishedAt)
          monthlyCounts: [
            {
              $group: {
                _id: {
                  year: { $year: '$publishedAt' },
                  month: { $month: '$publishedAt' }
                },
                total: { $sum: 1 }
              }
            },
            {
              $sort: {
                '_id.year': 1,
                '_id.month': 1
              }
            }
          ]
        }
      }
    ])

    const totalExportBlogs = stats[0].totalCount[0]?.total || 0

    res.status(200).json({
      totalExportBlogs,
      monthlyCounts: stats[0].monthlyCounts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to fetch export blog stats',
      error: error.message
    })
  }
})

// GET all contact messages (admin)
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const contacts = await contact.find()
      .select('_id name email phone message adminReply status source createdAt')
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

// GET single contact message by ID (admin)
router.get('/contacts/:id', adminAuth, async (req, res) => {
  try {
    const contact = await contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }

    res.status(200).json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Fetch contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    })
  }
})

// POST admin reply to contact + update status
router.post('/contacts/:id', adminAuth, async (req, res) => {
  try {
    const { adminReply, status } = req.body

    if (!adminReply && !status) {
      return res.status(400).json({
        success: false,
        message: 'Nothing to update'
      })
    }

    // validate status if provided
    if (status && !['pending', 'read'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      })
    }

    const updatedContact = await contact.findByIdAndUpdate(
      req.params.id,
      {
        ...(adminReply && { adminReply }),
        ...(status && { status })
      },
      { new: true }
    )

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact
    })
  } catch (error) {
    console.error('Reply contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
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

// PATCH /api/admin/farm-fund/:id
// Admin can reply and/or change status
router.patch('/farm-fund/:id', adminAuth, async (req, res) => {
  try {
    const { status, adminReply } = req.body

    // Validate status if provided
    if (status && !["pending", "read"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" })
    }

    const updateData = {}
    if (status) updateData.status = status
    if (adminReply) updateData.adminReply = adminReply

    const updatedRegistration = await FarmFund.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!updatedRegistration) {
      return res.status(404).json({ message: "FarmFund registration not found" })
    }

    res.status(200).json({
      message: "FarmFund updated successfully",
      data: updatedRegistration
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// GET /api/admin/farm-fund/:id
// Fetch a single registration
router.get('/farm-fund/:id', adminAuth, async (req, res) => {
  try {
    const registration = await FarmFund.findById(req.params.id)

    if (!registration) {
      return res.status(404).json({ message: "FarmFund registration not found" })
    }

    res.status(200).json({
      success: true,
      data: registration
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
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

// GET /api/admin/membership/:id
// Fetch a single membership form
router.get('/membership/:id', adminAuth, async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id)

    if (!membership) {
      return res.status(404).json({ message: "Membership form not found" })
    }

    res.status(200).json({
      success: true,
      data: membership
    })
  } catch (error) {
    console.error('Fetch membership error:', error)
    res.status(500).json({ message: "Server error" })
  }
})

// PATCH /api/admin/membership/:id/status
// Admin can approve, reject, or set pending
router.patch('/membership/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body

    // Validate status
    if (!["pending", "reject", "approved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" })
    }

    const updatedMembership = await Membership.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!updatedMembership) {
      return res.status(404).json({ message: "Membership form not found" })
    }

    res.status(200).json({
      message: "Membership status updated successfully",
      data: updatedMembership
    })
  } catch (error) {
    console.error('Update membership status error:', error)
    res.status(500).json({ message: "Server error" })
  }
})


// GET all news articles (admin or public)
router.get('/news', async (req, res) => {
  try {
    // Fetch all news, sorted by newest first
    const newsItems = await News.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      total: newsItems.length,
      news: newsItems
    })
  } catch (error) {
    console.error('Failed to fetch news:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
      error: error.message
    })
  }
})

// create a news article (admin only)
router.post('/news', adminAuth, newsUpload.single('image'), async (req, res) => {
  try {
    let { title, excerpt, slug, sections, publishedAt } = req.body

    // Validate required fields
    if (!title) return res.status(400).json({ message: 'Title is required' })
    if (!excerpt) return res.status(400).json({ message: 'Excerpt is required' })
    if (!slug) return res.status(400).json({ message: 'Slug is required' })
    if (!req.file) return res.status(400).json({ message: 'News image is required' })

    // Parse JSON fields
    title = typeof title === 'string' ? JSON.parse(title) : title
    excerpt = typeof excerpt === 'string' ? JSON.parse(excerpt) : excerpt
    sections = typeof sections === 'string' ? JSON.parse(sections) : sections

    const imagePath = `/uploads/news/${req.file.filename}`

    const newsItem = new News({
      title,
      excerpt,
      slug,
      image: imagePath,
      sections,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date()
    })

    await newsItem.save()
    res.status(201).json({ message: 'News created successfully', newsItem, id:newsItem._id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create news', error: error.message })
  }
})



// update a news article 
router.patch('/news/:id', adminAuth, newsUpload.single('image'), async (req, res) => {
  try {
    const { id } = req.params
    const updateData = { ...req.body }

    // Convert publishedAt to Date if provided
    if (updateData.publishedAt) {
      updateData.publishedAt = new Date(updateData.publishedAt)
    }

    // Parse JSON fields if sent as strings
    if (updateData.title && typeof updateData.title === 'string') updateData.title = JSON.parse(updateData.title)
    if (updateData.excerpt && typeof updateData.excerpt === 'string') updateData.excerpt = JSON.parse(updateData.excerpt)
    if (updateData.sections && typeof updateData.sections === 'string') updateData.sections = JSON.parse(updateData.sections)

    // If a new image was uploaded, update path and delete old image
    if (req.file) {
      updateData.image = `/uploads/news/${req.file.filename}`

      const existingNews = await News.findById(id)
      if (existingNews?.image) fs.unlinkSync(`.${existingNews.image}`)
    }

    const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

    if (!updatedNews) return res.status(404).json({ message: 'News item not found' })

    res.status(200).json({ message: 'News updated successfully', newsItem: updatedNews })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update news item', error: error.message })
  }
})


// delete a news article
router.delete('/news/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const deletedNews = await News.findByIdAndDelete(id)

    if (!deletedNews) return res.status(404).json({ message: 'News item not found' })

    // Delete the image from disk
    if (deletedNews.image) fs.unlinkSync(`.${deletedNews.image}`)

    res.status(200).json({ message: 'News item deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete news item', error: error.message })
  }
})


// GET news stats
router.get('/news/stats', adminAuth, async (req, res) => {
  try {
    const stats = await News.aggregate([
      {
        $facet: {
          // total news count
          totalCount: [
            { $count: 'total' }
          ],

          // news count by month (using publishedAt)
          monthlyCounts: [
            {
              $group: {
                _id: {
                  year: { $year: '$publishedAt' },
                  month: { $month: '$publishedAt' }
                },
                total: { $sum: 1 }
              }
            },
            {
              $sort: {
                '_id.year': 1,
                '_id.month': 1
              }
            }
          ]
        }
      }
    ])

    const totalNews = stats[0].totalCount[0]?.total || 0

    res.status(200).json({
      totalNews,
      monthlyCounts: stats[0].monthlyCounts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to fetch news stats',
      error: error.message
    })
  }
})

// CREATE PRODUCT
// POST /api/products
router.post('/products', adminAuth, productUpload, async (req, res) => {
  try {
    const {
      title,
      descriptions,
      packaging,
      containerSize,
      seasons,
      incoterms,
      variants
    } = req.body

    // 1️⃣ Check main product image
    if (!req.files?.image || !req.files.image[0]) {
      return res.status(400).json({ message: 'Main product image is required' })
    }

    // 2️⃣ Check required fields
    if (
      !title ||
      !descriptions ||
      !packaging ||
      !containerSize ||
      !seasons ||
      !incoterms ||
      !variants
    ) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // 3️⃣ Parse JSON fields if sent as strings
    const parsedTitle = typeof title === 'string' ? JSON.parse(title) : title
    const parsedDescriptions = typeof descriptions === 'string' ? JSON.parse(descriptions) : descriptions
    const parsedPackaging = typeof packaging === 'string' ? JSON.parse(packaging) : packaging
    const parsedContainerSize = typeof containerSize === 'string' ? JSON.parse(containerSize) : containerSize
    const parsedSeasons = typeof seasons === 'string' ? JSON.parse(seasons) : seasons
    const parsedIncoterms = typeof incoterms === 'string' ? JSON.parse(incoterms) : incoterms
    const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants

    // 4️⃣ Validate variants
    if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
      return res.status(400).json({ message: 'Variants are required and must be an array' })
    }

    const variantImages = req.files.variantImages || []

    // Optional: enforce that each variant has an image
    // if (variantImages.length !== parsedVariants.length) {
    //   return res.status(400).json({ message: 'Each variant must have an image' })
    // }

    const variantsWithImages = parsedVariants.map((variant, index) => ({
      ...variant,
      image: variantImages[index]
        ? `/uploads/products/${variantImages[index].filename}`
        : variant.image || '' // fallback empty string if no image provided
    }))

    // 5️⃣ Main product image
    const mainImage = `/uploads/products/${req.files.image[0].filename}`

    // 6️⃣ Create product
    const product = new Product({
      title: parsedTitle,
      image: mainImage,
      descriptions: parsedDescriptions,
      packaging: parsedPackaging,
      containerSize: parsedContainerSize,
      seasons: parsedSeasons,
      incoterms: parsedIncoterms,
      variants: variantsWithImages
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

// UPDATE INDIVIDUAL PRODUCTS
router.put('/products/:id', adminAuth, productUpload, async (req, res) => {
  try {
    const { id } = req.params
    const updateData = { ...req.body }

    // 1️⃣ Parse JSON fields if sent as strings
    if (updateData.title && typeof updateData.title === 'string') updateData.title = JSON.parse(updateData.title)
    if (updateData.descriptions && typeof updateData.descriptions === 'string') updateData.descriptions = JSON.parse(updateData.descriptions)
    if (updateData.packaging && typeof updateData.packaging === 'string') updateData.packaging = JSON.parse(updateData.packaging)
    if (updateData.containerSize && typeof updateData.containerSize === 'string') updateData.containerSize = JSON.parse(updateData.containerSize)
    if (updateData.seasons && typeof updateData.seasons === 'string') updateData.seasons = JSON.parse(updateData.seasons)
    if (updateData.incoterms && typeof updateData.incoterms === 'string') updateData.incoterms = JSON.parse(updateData.incoterms)
    if (updateData.variants && typeof updateData.variants === 'string') updateData.variants = JSON.parse(updateData.variants)

    // 2️⃣ Handle main product image
    if (req.files?.image && req.files.image[0]) {
      updateData.image = `/uploads/products/${req.files.image[0].filename}`
    }

    // 3️⃣ Handle variant images if provided
    if (updateData.variants && req.files?.variantImages) {
      const variantImages = req.files.variantImages
      updateData.variants = updateData.variants.map((variant, index) => ({
        ...variant,
        image: variantImages[index] ? `/uploads/products/${variantImages[index].filename}` : variant.image || ''
      }))
    }

    // 4️⃣ Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update product', error: error.message })
  }
})


// DELETE INDIVIDUAL PRODUCTS
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }

    if (deletedProduct.image) fs.unlinkSync(`.${deletedProduct.image}`)

    res.status(200).json({
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to delete product',
      error: error.message
    })
  }
})


router.get('/products', adminAuth, async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $facet: {
          // total products
          totalCount: [
            { $count: 'total' }
          ],

          // products grouped by year + month
          monthlyCounts: [
            {
              $group: {
                _id: {
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' }
                },
                total: { $sum: 1 }
              }
            },
            {
              $sort: {
                '_id.year': 1,
                '_id.month': 1
              }
            }
          ],

          // most recent product
          latestProduct: [
            { $sort: { createdAt: -1 } },
            { $limit: 1 }
          ]
        }
      }
    ])

    const totalProducts = stats[0].totalCount[0]?.total || 0
    const latestProduct = stats[0].latestProduct[0] || null

    res.status(200).json({
      totalProducts,
      monthlyCounts: stats[0].monthlyCounts,
      latestProduct
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to fetch product stats',
      error: error.message
    })
  }
})

// GET product images count
router.get('/products/images/count', adminAuth, async (req, res) => {
  try {
    const mainImagesCount = await Product.countDocuments({ image: { $exists: true, $ne: '' } })

    const variantImagesCountAgg = await Product.aggregate([
      { $unwind: '$variants' },
      { $match: { 'variants.image': { $exists: true, $ne: '' } } },
      { $count: 'variantImages' }
    ])
    const variantImagesCount = variantImagesCountAgg[0]?.variantImages || 0

    res.status(200).json({
      mainImagesCount,
      variantImagesCount,
      totalImages: mainImagesCount + variantImagesCount
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to fetch image count',
      error: error.message
    })
  }
})


// ✅ ADMIN – GET ALL FEEDBACK
// GET /api/admin/feedback
router.get('/feedback', adminAuth, async (_req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .select('_id name email phone country message status adminReply source createdAt')
      .sort({ createdAt: -1 })

    res.status(200).json({
      total: feedbacks.length,
      data: feedbacks
    })
  } catch (error) {
    console.error('Fetch feedback error:', error)
    res.status(500).json({
      message: 'Failed to fetch feedback',
      error: error.message
    })
  }
})

// GET /api/admin/feedback/:id
router.get('/feedback/:id', adminAuth, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback form not found' })
    }

    res.status(200).json({ success: true, data: feedback })
  } catch (error) {
    console.error('Fetch single feedback error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/admin/feedback/:id
// Admin can reply and change status (pending -> read)
router.patch('/feedback/:id', adminAuth, async (req, res) => {
  try {
    const { status, adminReply } = req.body

    // Validate status if provided
    if (status && !['pending', 'read'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const updateData = {}
    if (status) updateData.status = status
    if (adminReply) updateData.adminReply = adminReply

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback form not found' })
    }

    res.status(200).json({
      message: 'Feedback updated successfully',
      data: updatedFeedback
    })
  } catch (error) {
    console.error('Update feedback error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})


// ✅ ADMIN – GET ALL MESSAGES
// GET /api/messages
router.get('/messages', adminAuth, async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10

    const messages = await Message.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(limit)

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


// GET /api/admin/affiliate
router.get('/affiliate', adminAuth, async (_req, res) => {
  try {
    const affiliates = await Affiliate.find()
      .select('_id fullName email phone country city understandTerms haveABuyer buyerCountry buyerProduct productVolume aboutInterest aboutCommission referralPlatform referralPlatformOthers status createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: affiliates.length,
      data: affiliates
    });
  } catch (error) {
    console.error('Fetch affiliates error:', error);
    res.status(500).json({
      message: 'Failed to fetch affiliates',
      error: error.message
    });
  }
});

// GET /api/admin/affiliate/:id
router.get('/affiliate/:id', adminAuth, async (req, res) => {
  try {
    const affiliate = await Affiliate.findById(req.params.id);

    if (!affiliate) {
      return res.status(404).json({
        message: 'Affiliate not found'
      });
    }

    res.status(200).json({
      success: true,
      data: affiliate
    });
  } catch (error) {
    console.error('Fetch affiliate error:', error);
    res.status(500).json({
      message: 'Failed to fetch affiliate',
      error: error.message
    });
  }
});

// PATCH /api/admin/affiliate/:id/status
router.patch('/affiliate/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedAffiliate = await Affiliate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedAffiliate) {
      return res.status(404).json({ message: 'Affiliate not found' });
    }

    res.status(200).json({
      message: 'Status updated successfully',
      data: updatedAffiliate
    });
  } catch (error) {
    console.error('Update affiliate status error:', error);
    res.status(500).json({
      message: 'Failed to update status',
      error: error.message
    });
  }
});

// GET unified africa notifications
// GET /api/admin/africa/notifications?limit=10
router.get('/africa/notifications', adminAuth, async (req, res) => {
  try {
    // Optional limit query param (default 10)
    const limit = parseInt(req.query.limit) || 10;

    // Fetch all latest entries (without limit yet)
    const [blogs, contacts, farmFunds, memberships, news] = await Promise.all([
      Blog.find().lean(),
      Contact.find().lean(),
      FarmFund.find().lean(),
      Membership.find().lean(),
      News.find().lean()
    ]);

    // Tag each entry with a "type" so you know its source
    const tagged = [
      ...blogs.map(b => ({ ...b, type: 'blog' })),
      ...contacts.map(c => ({ ...c, type: 'contact' })),
      ...farmFunds.map(f => ({ ...f, type: 'farmFund' })),
      ...memberships.map(m => ({ ...m, type: 'membership' })),
      ...news.map(n => ({ ...n, type: 'news' }))
    ];

    // Sort all by createdAt descending
    const sorted = tagged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Apply the limit
    const limited = sorted.slice(0, limit);

    res.status(200).json({
      total: limited.length,
      notifications: limited
    });
  } catch (error) {
    console.error('Fetch unified notifications error:', error);
    res.status(500).json({
      message: 'Failed to fetch unified notifications',
      error: error.message
    });
  }
});

// GET export notifications (combined)
router.get('/export/notifications', adminAuth, async (req, res) => {
  try {
    // Optional limit query param
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    // Fetch latest entries from each collection
    const [exportBlogs, affiliates, feedbacks, messages, products] = await Promise.all([
      exportBlog.find().lean(),
      Affiliate.find().lean(),
      Feedback.find().lean(),
      Message.find().lean(),
      Product.find().lean()
    ]);

    // Combine all entries into a single array
    const combined = [
      ...exportBlogs.map(item => ({ ...item, type: 'exportBlog' })),
      ...affiliates.map(item => ({ ...item, type: 'affiliate' })),
      ...feedbacks.map(item => ({ ...item, type: 'feedback' })),
      ...messages.map(item => ({ ...item, type: 'message' })),
      ...products.map(item => ({ ...item, type: 'product' }))
    ];

    // Sort by createdAt descending
    const sorted = combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Apply limit if set
    const limited = limit ? sorted.slice(0, limit) : sorted;

    res.status(200).json({
      total: limited.length,
      notifications: limited
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch dashboard notifications',
      error: error.message
    });
  }
});

// GET /api/admin/enquiries?limit=10
router.get('/enquiries', adminAuth, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    const [feedbacks, contacts, messages] = await Promise.all([
      Feedback.find().lean(),
      Contact.find().lean(),
      Message.find().lean()
    ]);

    // Combine all entries into a single array
    const combined = [
      ...feedbacks.map(item => ({ ...item, type: 'feedback' })),
      ...contacts.map(item => ({ ...item, type: 'contact' })),
      ...messages.map(item => ({ ...item, type: 'message' }))
    ];

    // Sort by newest first
    const sorted = combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Apply limit if provided
    const limited = limit ? sorted.slice(0, limit) : sorted;

    res.status(200).json({
      total: limited.length,
      enquiries: limited
    });
  } catch (error) {
    console.error('Fetch enquiries error:', error);
    res.status(500).json({
      message: 'Failed to fetch enquiries',
      error: error.message
    });
  }
});

// GET /api/admin/enquiries/:type/:id
router.get('/enquiries/:type/:id', adminAuth, async (req, res) => {
  try {
    const { type, id } = req.params;
    let enquiry;

    switch (type) {
      case 'feedback':
        enquiry = await Feedback.findById(id);
        break;
      case 'contact':
        enquiry = await Contact.findById(id);
        break;
      case 'message':
        enquiry = await Message.findById(id);
        break;
      default:
        return res.status(400).json({ message: 'Invalid enquiry type' });
    }

    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

    res.status(200).json({ enquiry });
  } catch (error) {
    console.error('Fetch single enquiry error:', error);
    res.status(500).json({ message: 'Failed to fetch enquiry', error: error.message });
  }
});

// POST /api/admin/enquiries/:type/:id/reply
router.post('/enquiries/:type/:id/reply', adminAuth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status, adminReply } = req.body;

    if (!status || !["pending", "read"].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    let updated;

    switch (type) {
      case 'feedback':
        updated = await Feedback.findByIdAndUpdate(
          id,
          { status, adminReply },
          { new: true }
        );
        break;
      case 'contact':
        updated = await Contact.findByIdAndUpdate(
          id,
          { status, adminReply },
          { new: true }
        );
        break;
      case 'message':
        updated = await Message.findByIdAndUpdate(
          id,
          { status, adminReply },
          { new: true }
        );
        break;
      default:
        return res.status(400).json({ message: 'Invalid enquiry type' });
    }

    if (!updated) return res.status(404).json({ message: 'Enquiry not found' });

    res.status(200).json({
      message: 'Enquiry updated successfully',
      enquiry: updated
    });
  } catch (error) {
    console.error('Update enquiry error:', error);
    res.status(500).json({ message: 'Failed to update enquiry', error: error.message });
  }
});


// GET overall stats
router.get('/track-visit', async (req, res) => {
  try {
    const homeVisits = await Visitor.countDocuments({ path: '/' })
    const blogVisits = await Visitor.countDocuments({ path: '/blogs' })
    const newsVisits = await Visitor.countDocuments({ path: '/news' })

    res.status(200).json({
      home: homeVisits,
      blogs: blogVisits,
      news: newsVisits
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch stats' })
  }
})

// GET single blog views
router.get('/track-visit/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    if (!slug) return res.status(400).json({ message: 'Blog slug is required' })

    const views = await Visitor.countDocuments({ path: `/blogs/${slug}` })

    res.status(200).json({ slug, views })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch blog views' })
  }
})

// GET single news views
router.get('/track-visit/news/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    if (!slug) return res.status(400).json({ message: 'News slug is required' })

    const views = await Visitor.countDocuments({ path: `/news/${slug}` })

    res.status(200).json({ slug, views })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch news views' })
  }
})


export default router
