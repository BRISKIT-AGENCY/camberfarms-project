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
import { productUpload } from '../middleware/productUpload.js'
import { blogUpload } from '../middleware/blogUpload.js'
import { exportBlogUpload } from '../middleware/exportBlogUpload.js'
import { newsUpload } from '../middleware/newsUpload.js'
import Visitor from '../models/Visitor.js'

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

    res.status(201).json({ message: 'Blog created successfully', blog })
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
router.get('/africa-blogs', adminAuth, async (req, res) => {
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

      res.status(201).json({ message: 'ExportBlog created successfully', exportBlogs })
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
router.get('/export-blogs', adminAuth, async (req, res) => {
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

// GET all contact messages
router.get('/contacts', adminAuth, async (req, res) => {
  try {
      const contacts = await contact.find()
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
    res.status(201).json({ message: 'News created successfully', newsItem })
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
router.get('/news', adminAuth, async (req, res) => {
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

// GET africa notifications
router.get('/africa/notifications', adminAuth, async (req, res) => {
  try {
    // Fetch latest 5 entries from each collection
    const [latestBlogs, latestContacts, latestFarmFunds, latestMemberships, latestNews] = await Promise.all([
      Blog.find().sort({ createdAt: -1 }).limit(5),
      contact.find().sort({ createdAt: -1 }).limit(5),
      FarmFund.find().sort({ createdAt: -1 }).limit(5),
      Membership.find().sort({ createdAt: -1 }).limit(5),
      News.find().sort({ createdAt: -1 }).limit(5)
    ])

    // Return combined result
    res.status(200).json({
      blogs: latestBlogs,
      contacts: latestContacts,
      farmFunds: latestFarmFunds,
      memberships: latestMemberships,
      news: latestNews
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to fetch dashboard notifications',
      error: error.message
    })
  }
})

// GET export notifications
router.get('/export/notifications', adminAuth, async (req, res) => {
  try {
    // Fetch latest 5 entries from each collection
    const [latestExportBlogs, latestAffiliates, latestFeedback, latestMessage, latestProducts] = await Promise.all([
      exportBlog.find().sort({ createdAt: -1 }).limit(5),
      Affiliate.find().sort({ createdAt: -1 }).limit(5),
      Feedback.find().sort({ createdAt: -1 }).limit(5),
      Message.find().sort({ createdAt: -1 }).limit(5),
      Product.find().sort({ createdAt: -1 }).limit(5)
    ])

    // Return combined result
    res.status(200).json({
      exportBlogs: latestExportBlogs,
      affiliates: latestAffiliates,
      feedback: latestFeedback,
      messages: latestMessage,
      products: latestProducts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to fetch dashboard notifications',
      error: error.message
    })
  }
})

// Get counts for specific pages
router.get('/track-visit', async (req, res) => {
  try {
    const homeVisits = await Visitor.countDocuments({ path: '/' })
    const blogVisits = await Visitor.countDocuments({ path: '/blogs' })
    const newsVisits = await Visitor.countDocuments({ path: '/news' })
    const singleBlogVisits = await Visitor.countDocuments({path: `/blogs/${slug}`
})


    res.status(200).json({
      home: homeVisits,
      blogs: blogVisits,
      news: newsVisits,
      singleBlog: singleBlogVisits
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' })
  }
})

export default router
