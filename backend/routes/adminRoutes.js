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
import { getEnquiries } from '../services/enquiries.js'
import { exportToPDF } from '../utils/exportPdf.js'
import crypto from 'crypto'
import fs from 'fs'
import sharp from 'sharp'
import { exportRegistrationsToPDF } from '../utils/exportFarmFundPdf.js'
import { translateText } from '../utils/translate.js'
import { translateSections } from '../utils/translateSections.js'
import { SUPPORTED_LANGUAGES } from '../utils/languages.js'
import { translateVariants, translateTexts } from '../utils/translateProduct.js'

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


router.post('/reset-password/request-otp', adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.adminId)
    if (!admin) return res.status(404).json({ message: 'Admin not found' })

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 min

    admin.twoFactor = { code: otp, expiresAt }
    await admin.save()

    // Send OTP via email
    await sendEmail(
      admin.email,
      'Your password change code',
      `Your verification code is: ${otp}. It expires in 10 minutes.`
    )

    res.json({ message: 'OTP sent to your email' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to send OTP' })
  }
})

router.post('/reset-password', adminAuth, async (req, res) => {
  const { otp, newPassword } = req.body

  const admin = await Admin.findById(req.admin.adminId)
  if (!admin) return res.status(404).json({ message: 'Admin not found' })

  // Check OTP
  if (!admin.twoFactor || admin.twoFactor.code !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' })
  }
  if (new Date() > admin.twoFactor.expiresAt) {
    return res.status(401).json({ message: 'OTP expired' })
  }

  // Hash new password
  admin.passwordHash = await bcrypt.hash(newPassword, 10)

  // Clear OTP
  admin.twoFactor = undefined
  await admin.save()

  res.json({ message: 'Password updated successfully' })
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


router.get('/gallery',adminAuth, async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, total: galleries.length, galleries })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to fetch galleries' })
  }
})

router.get('/gallery/:id',adminAuth, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery not found' })
    res.status(200).json({ success: true, gallery })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to fetch gallery' })
  }
})

router.post('/gallery', adminAuth, galleryUpload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' })
    }

    const imagesWithMeta = await Promise.all(
      req.files.map(async (file) => {
        const metadata = await sharp(file.path).metadata()

        return {
          url: `/uploads/gallery/${file.filename}`,
          size: file.size, // bytes
          width: metadata.width,
          height: metadata.height,
          aspectRatio: metadata.width && metadata.height
            ? (metadata.width / metadata.height).toFixed(2)
            : null,
          uploadedAt: new Date()
        }
      })
    )

    const gallery = new Gallery({
      images: imagesWithMeta
    })

    await gallery.save()

    res.status(201).json({
      success: true,
      gallery
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to upload gallery'
    })
  }
})

router.patch(
  '/gallery/:id',
  adminAuth,
  galleryUpload.array('images', 20),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image is required' })
      }

      const gallery = await Gallery.findById(req.params.id)
      if (!gallery) {
        return res.status(404).json({ success: false, message: 'Gallery not found' })
      }

      // Optional: delete old images from disk
      gallery.images.forEach(img => {
        const filePath = img.replace('/', '')
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
      })

      // Save new images
      const images = req.files.map(
        file => `/uploads/gallery/${file.filename}`
      )

      gallery.images = images
      await gallery.save()

      res.status(200).json({
        success: true,
        message: 'Gallery images updated successfully',
        gallery
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Failed to update gallery images' })
    }
  }
)


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

router.get('/africa-blogs/:id', async (req, res) => {
  try {
    const { id } = req.params

    const blog = await Blog.findById(id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    // Use slug from blog
    const views = await Visitor.countDocuments({
      path: `/blogs/${blog.slug}`
    })

    res.status(200).json({
      success: true,
      blog,
      views
    })
  } catch (error) {
    console.error('Failed to fetch blog:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message
    })
  }
})


// camberfarm africa blog creation route
router.post(
  '/africa-blogs',
  adminAuth,
  blogUpload.single('image'),
  async (req, res) => {
    try {
      let { title, excerpt, slug, sections, publishedAt } = req.body;

      // 1️⃣ Validate required fields
      if (!title) return res.status(400).json({ message: 'Title is required' });
      if (!excerpt) return res.status(400).json({ message: 'Excerpt is required' });
      if (!slug) return res.status(400).json({ message: 'Slug is required' });
      if (!req.file) return res.status(400).json({ message: 'Blog image is required' });

      // 2️⃣ Parse sections if it's a string
      if (sections && typeof sections === 'string') sections = JSON.parse(sections);

      const imagePath = `/uploads/blogs/${req.file.filename}`;

      // 3️⃣ Prepare translations object
      const translations = {};

      translations.en = {
        title,
        excerpt,
        sections: sections || []
      };

      for (const lang of SUPPORTED_LANGUAGES) {
        translations[lang] = {
          title: await translateText(title, lang),
          excerpt: await translateText(excerpt, lang),
          sections: await translateSections(sections || [], lang)
        };
      }

      // 4️⃣ Create Blog document
      const blogDoc = new Blog({
        slug,
        image: imagePath,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        translations
      });

      await blogDoc.save();

      res.status(201).json({
        message: 'Blog created successfully',
        blog: blogDoc
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create Blog', error: error.message });
    }
  }
);


// update a africa blog
router.patch('/africa-blogs/:id', adminAuth, blogUpload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    // Parse sections if sent as JSON string
    if (updateData.sections && typeof updateData.sections === 'string') {
      updateData.sections = JSON.parse(updateData.sections);
    }

    // Find existing blog
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) return res.status(404).json({ message: 'Blog not found' });

    // IMAGE HANDLING
    if (req.file) {
      updateData.image = `/uploads/blogs/${req.file.filename}`;

      // Delete old image
      if (existingBlog.image) {
        try {
          fs.unlinkSync(`.${existingBlog.image}`);
        } catch (err) {
          console.warn('Old image not found:', err.message);
        }
      }
    }

    // TRANSLATION HANDLING
    const titleChanged = updateData.title !== undefined;
    const excerptChanged = updateData.excerpt !== undefined;
    const sectionsChanged = updateData.sections !== undefined;

    if (titleChanged || excerptChanged || sectionsChanged) {
      const existingEn = existingBlog.translations.get('en');

      const newTitle = updateData.title || existingEn.title;
      const newExcerpt = updateData.excerpt || existingEn.excerpt;
      const newSections = updateData.sections || existingEn.sections;

      const translations = {
        en: {
          title: newTitle,
          excerpt: newExcerpt,
          sections: newSections
        }
      };

      for (const lang of SUPPORTED_LANGUAGES) {
        translations[lang] = {
          title: await translateText(newTitle, lang),
          excerpt: await translateText(newExcerpt, lang),
          sections: await translateSections(newSections, lang)
        };
      }

      updateData.translations = translations;

      // Remove raw fields to avoid schema conflicts
      delete updateData.title;
      delete updateData.excerpt;
      delete updateData.sections;
    }

    // Update publishedAt if provided
    if (updateData.publishedAt) updateData.publishedAt = new Date(updateData.publishedAt);

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    res.status(200).json({
      message: 'Blog updated successfully',
      blog: updatedBlog
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update blog', error: error.message });
  }
});


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

router.get('/export-blogs/:id', async (req, res) => {
  try {
    const { id } = req.params

    const blog = await exportBlog.findById(id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Export blog not found'
      })
    }

    // Count views using blog slug
    const views = await Visitor.countDocuments({
      path: `/blog/${blog.slug}`
    })

    res.status(200).json({
      success: true,
      blog,
      views
    })
  } catch (error) {
    console.error('Failed to fetch export blog:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch export blog',
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
      let { title, excerpt, slug, sections, publishedAt } = req.body;

      // 1️⃣ Validate required fields
      if (!title) return res.status(400).json({ message: 'Title is required' });
      if (!excerpt) return res.status(400).json({ message: 'Excerpt is required' });
      if (!slug) return res.status(400).json({ message: 'Slug is required' });
      if (!req.file) return res.status(400).json({ message: 'ExportBlog image is required' });

      // 2️⃣ Parse sections if it's a string
      if (sections && typeof sections === 'string') sections = JSON.parse(sections);

      const imagePath = `/uploads/export-blogs/${req.file.filename}`;

      // 3️⃣ Prepare translations object
      const translations = {};

      translations.en = {
        title,
        excerpt,
        sections: sections || []
      };

      for (const lang of SUPPORTED_LANGUAGES) {
        translations[lang] = {
          title: await translateText(title, lang),
          excerpt: await translateText(excerpt, lang),
          sections: await translateSections(sections || [], lang)
        };
      }

      // 4️⃣ Create ExportBlog document
      const exportBlogDoc = new exportBlog({
        slug,
        image: imagePath,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        translations
      });

      await exportBlogDoc.save();

      res.status(201).json({
        message: 'ExportBlog created successfully',
        exportBlog: exportBlogDoc
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create ExportBlog', error: error.message });
    }
  }
);

// update a export blog
router.patch('/export-blogs/:id', adminAuth, exportBlogUpload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    // Parse sections if sent as JSON string
    if (updateData.sections && typeof updateData.sections === 'string') {
      updateData.sections = JSON.parse(updateData.sections);
    }

    // Find existing exportBlog
    const existingBlog = await exportBlog.findById(id);
    if (!existingBlog) return res.status(404).json({ message: 'ExportBlog not found' });

    // IMAGE HANDLING
    if (req.file) {
      updateData.image = `/uploads/export-blogs/${req.file.filename}`;

      // Delete old image
      if (existingBlog.image) {
        try {
          fs.unlinkSync(`.${existingBlog.image}`);
        } catch (err) {
          console.warn('Old image not found:', err.message);
        }
      }
    }

    // TRANSLATION HANDLING
    const titleChanged = updateData.title !== undefined;
    const excerptChanged = updateData.excerpt !== undefined;
    const sectionsChanged = updateData.sections !== undefined;

    if (titleChanged || excerptChanged || sectionsChanged) {
      const existingEn = existingBlog.translations.get('en');

      const newTitle = updateData.title || existingEn.title;
      const newExcerpt = updateData.excerpt || existingEn.excerpt;
      const newSections = updateData.sections || existingEn.sections;

      const translations = {
        en: {
          title: newTitle,
          excerpt: newExcerpt,
          sections: newSections
        }
      };

      for (const lang of SUPPORTED_LANGUAGES) {
        translations[lang] = {
          title: await translateText(newTitle, lang),
          excerpt: await translateText(newExcerpt, lang),
          sections: await translateSections(newSections, lang)
        };
      }

      updateData.translations = translations;

      // Remove raw fields
      delete updateData.title;
      delete updateData.excerpt;
      delete updateData.sections;
    }

    // Update publishedAt if provided
    if (updateData.publishedAt) updateData.publishedAt = new Date(updateData.publishedAt);

    const updatedBlog = await exportBlog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    res.status(200).json({
      message: 'ExportBlog updated successfully',
      exportBlog: updatedBlog
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update ExportBlog', error: error.message });
  }
});


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

// export farmfund in pdf
router.post('/farm-fund/export', adminAuth, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null

    let query = FarmFund.find().sort({ createdAt: -1 })

    if (limit) {
      query = query.limit(limit)
    }

    const registrations = await query.lean()

    // Default export = PDF
    exportRegistrationsToPDF(registrations, res, 'Farm Fund Registrations')
  } catch (error) {
    console.error('FarmFund export error:', error)
    res.status(500).json({ message: 'FarmFund export failed' })
  }
})


router.get('/farm-fund/stats/approved-by-month', adminAuth, async (req, res) => {
  try {
    const [monthlyStats, totalApproved] = await Promise.all([
      FarmFund.aggregate([
        {
          $match: { status: "read" }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ]),
      FarmFund.countDocuments({ status: "read" })
    ])

    res.status(200).json({
      success: true,
      totalApprovedInvestors: totalApproved,
      monthlyBreakdown: monthlyStats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


router.get('/farm-fund/stats/pending-by-week', adminAuth, async (req, res) => {
  try {
    const [weeklyStats, totalPending] = await Promise.all([
      FarmFund.aggregate([
        {
          $match: { status: "pending" }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              week: { $week: "$createdAt" }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.week": 1 }
        }
      ]),
      FarmFund.countDocuments({ status: "pending" })
    ])

    res.status(200).json({
      success: true,
      totalPendingReplies: totalPending,
      weeklyBreakdown: weeklyStats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


router.get('/farm-fund/stats/reply-percentage', adminAuth, async (req, res) => {
  try {
    const total = await FarmFund.countDocuments()
    const replied = await FarmFund.countDocuments({ status: "read" })

    const percentage =
      total === 0 ? 0 : ((replied / total) * 100).toFixed(2)

    res.status(200).json({
      success: true,
      totalForms: total,
      repliedForms: replied,
      percentage: Number(percentage)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.get('/farm-fund/stats/new-messages', adminAuth, async (req, res) => {
  try {
    const [totalNewMessages, monthlyStats] = await Promise.all([
      FarmFund.countDocuments({ status: "pending" }),
      FarmFund.aggregate([
        {
          $match: { status: "pending" }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ])
    ])

    res.status(200).json({
      success: true,
      totalNewMessages,
      monthlyBreakdown: monthlyStats
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

// export membership in pdf
router.post('/membership/export', adminAuth, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null

    let query = Membership.find().sort({ createdAt: -1 })

    if (limit) {
      query = query.limit(limit)
    }

    const registrations = await query.lean()

    // Default export = PDF
    exportRegistrationsToPDF(registrations, res, 'Membership Registrations')
  } catch (error) {
    console.error('Membership export error:', error)
    res.status(500).json({ message: 'Membership export failed' })
  }
})

//Total forms + forms submitted by month
router.get('/membership/stats/forms-by-month', adminAuth, async (req, res) => {
  try {
    const [totalForms, monthlyStats] = await Promise.all([
      Membership.countDocuments(),
      Membership.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ])
    ])

    res.status(200).json({
      success: true,
      totalForms,
      monthlyBreakdown: monthlyStats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

//Pending replies + pending replies by week
router.get('/membership/stats/pending-by-week', adminAuth, async (req, res) => {
  try {
    const [totalPending, weeklyStats] = await Promise.all([
      Membership.countDocuments({ status: "pending" }),
      Membership.aggregate([
        {
          $match: { status: "pending" }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              week: { $week: "$createdAt" }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.week": 1 }
        }
      ])
    ])

    res.status(200).json({
      success: true,
      totalPendingReplies: totalPending,
      weeklyBreakdown: weeklyStats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

//Approved percentage + total approved
router.get('/membership/stats/approved-percentage', adminAuth, async (req, res) => {
  try {
    const [totalForms, approvedCount] = await Promise.all([
      Membership.countDocuments(),
      Membership.countDocuments({ status: "approved" })
    ])

    const percentage =
      totalForms === 0 ? 0 : ((approvedCount / totalForms) * 100).toFixed(2)

    res.status(200).json({
      success: true,
      totalForms,
      totalApproved: approvedCount,
      approvedPercentage: Number(percentage)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

//New messages + percentage by month
router.get('/membership/stats/new-messages', adminAuth, async (req, res) => {
  try {
    const totalNewMessages = await Membership.countDocuments({ status: "pending" })

    const monthlyStats = await Membership.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          total: { $sum: 1 },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          total: 1,
          pending: 1,
          percentage: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$pending", "$total"] },
                  100
                ]
              }
            ]
          }
        }
      },
      {
        $sort: { year: 1, month: 1 }
      }
    ])

    res.status(200).json({
      success: true,
      totalNewMessages,
      monthlyBreakdown: monthlyStats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


// GET all news articles (admin or public)
router.get('/news',adminAuth, async (req, res) => {
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

// GET /news/:id - get a single news item by ID
router.get('/news/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const newsItem = await News.findById(id);
    if (!newsItem) {
      return res.status(404).json({ success: false, message: 'News item not found' });
    }

    res.status(200).json({ success: true, news: newsItem });
  } catch (error) {
    console.error('Failed to fetch news:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch news', error: error.message });
  }
});


// create a news article (admin only)
router.post('/news', adminAuth, newsUpload.single('image'), async (req, res) => {
  try {
    let { title, excerpt, slug, sections, publishedAt } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });
    if (!excerpt) return res.status(400).json({ message: 'Excerpt is required' });
    if (!slug) return res.status(400).json({ message: 'Slug is required' });
    if (!req.file) return res.status(400).json({ message: 'News image is required' });

    if (sections && typeof sections === 'string') {
      sections = JSON.parse(sections);
    }

    const imagePath = `/uploads/news/${req.file.filename}`;

    const translations = {};

    // English base content
    translations.en = {
      title,
      excerpt,
      sections: sections || []
    };

    // Translate to all supported languages
    for (const lang of SUPPORTED_LANGUAGES) {
      translations[lang] = {
        title: await translateText(title, lang),
        excerpt: await translateText(excerpt, lang),
        sections: await translateSections(sections || [], lang)
      };
    }

    const newsItem = new News({
      slug,
      image: imagePath,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      translations
    });

    await newsItem.save();

    res.status(201).json({
      message: 'News created successfully',
      newsItem
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create news',
      error: error.message
    });
  }
});

// update a news article 
router.patch('/news/:id', adminAuth, newsUpload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    // Parse sections if sent as JSON string
    if (updateData.sections && typeof updateData.sections === 'string') {
      updateData.sections = JSON.parse(updateData.sections);
    }

    // Find existing news
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return res.status(404).json({ message: 'News item not found' });
    }

    // IMAGE HANDLING
    if (req.file) {
      // Set new image path
      updateData.image = `/uploads/news/${req.file.filename}`;

      // Delete old image
      if (existingNews.image) {
        try {
          fs.unlinkSync(`.${existingNews.image}`);
        } catch (err) {
          console.warn('Old image not found:', err.message);
        }
      }
    }

    // TRANSLATION HANDLING
    const titleChanged = updateData.title !== undefined;
    const excerptChanged = updateData.excerpt !== undefined;
    const sectionsChanged = updateData.sections !== undefined;

    if (titleChanged || excerptChanged || sectionsChanged) {
      const existingEn = existingNews.translations.get('en');

      const newTitle = updateData.title || existingEn.title;
      const newExcerpt = updateData.excerpt || existingEn.excerpt;
      const newSections = updateData.sections || existingEn.sections;

      const translations = {
        en: {
          title: newTitle,
          excerpt: newExcerpt,
          sections: newSections
        }
      };

      // Translate all languages
      for (const lang of SUPPORTED_LANGUAGES) {
        translations[lang] = {
          title: await translateText(newTitle, lang),
          excerpt: await translateText(newExcerpt, lang),
          sections: await translateSections(newSections, lang)
        };
      }

      updateData.translations = translations;

      // Remove raw fields to avoid schema conflicts
      delete updateData.title;
      delete updateData.excerpt;
      delete updateData.sections;
    }

    const updatedNews = await News.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'News updated successfully',
      newsItem: updatedNews
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update news item',
      error: error.message
    });
  }
});




// delete a news article
router.delete('/news/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const deletedNews = await News.findByIdAndDelete(id)

    if (!deletedNews) {
      return res.status(404).json({ message: 'News item not found' })
    }

    if (deletedNews.image) {
      try {
        fs.unlinkSync(`.${deletedNews.image}`)
      } catch (err) {
        console.warn('Image already deleted')
      }
    }

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
        $match: {
          publishedAt: { $ne: null }
        }
      },
      {
        $facet: {
          totalCount: [
            { $count: 'total' }
          ],
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

    const totalNews = stats[0]?.totalCount[0]?.total || 0

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


// GET ALL PRODUCTS
router.get('/products', adminAuth, async (req, res) => {
  try {
    const [products, totalProducts, monthlyRaw] = await Promise.all([
      Product.find().sort({ createdAt: -1 }),
      Product.countDocuments(),
      Product.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ])
    ])

    const monthlyStats = monthlyRaw.map((current, index) => {
      const prev = monthlyRaw[index - 1]

      let change = null
      let changePercentage = null

      if (prev) {
        change = current.total - prev.total
        changePercentage =
          prev.total === 0
            ? 0
            : ((change / prev.total) * 100).toFixed(2)
      }

      return {
        year: current._id.year,
        month: current._id.month,
        totalAdded: current.total,
        changeFromPreviousMonth: change,
        changePercentage:
          changePercentage !== null ? Number(changePercentage) : null
      }
    })

    res.status(200).json({
      success: true,
      total: totalProducts,
      products,
      stats: {
        monthly: monthlyStats
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    })
  }
})


// GET INDIVIDUAL PRODUCT
router.get('/products/:id',adminAuth, async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      product
    })
  } catch (error) {
    console.error(error)

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    })
  }
})

// CREATE PRODUCT
// POST /api/products
router.post('/products', adminAuth, productUpload, async (req, res) => {
  try {
    let { name, category, description, stockQuantity, variants } = req.body;

    if (!name) return res.status(400).json({ message: 'Product name is required' });
    if (!category) return res.status(400).json({ message: 'Category is required' });
    if (!description) return res.status(400).json({ message: 'Description is required' });
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'At least one product image is required' });

    const images = req.files.map(file => `/uploads/products/${file.filename}`);

    const translations = {
      en: { name, category, description, variants: variants || {} },
    };

    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang === 'en') continue;
      translations[lang] = {
        name: await translateTexts(name, lang),
        category: await translateTexts(category, lang),
        description: await translateTexts(description, lang),
        variants: await translateVariants(variants, lang),
      };
    }

    const product = new Product({
      name,
      category,
      description,
      stockQuantity: stockQuantity || 0,
      variants,
      images,
      translations,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
});



// UPDATE PRODUCT
// PUT /api/admin/products/:id
router.patch('/products/:id', adminAuth, productUpload, async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    const existingProduct = await Product.findById(id);
    if (!existingProduct) return res.status(404).json({ message: 'Product not found' });

    // IMAGE HANDLING
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/products/${file.filename}`);

      // Optionally delete old images
      if (existingProduct.images) {
        existingProduct.images.forEach(img => {
          try { fs.unlinkSync(`.${img}`); } catch (err) { console.warn('Old image not found:', err.message); }
        });
      }

      updateData.images = newImages;
    }

    const nameChanged = updateData.name !== undefined;
    const categoryChanged = updateData.category !== undefined;
    const descriptionChanged = updateData.description !== undefined;
    const variantsChanged = updateData.variants !== undefined;

    if (nameChanged || categoryChanged || descriptionChanged || variantsChanged) {
      const existingEn = existingProduct.translations.en;

      const newName = updateData.name || existingEn.name;
      const newCategory = updateData.category || existingEn.category;
      const newDescription = updateData.description || existingEn.description;
      const newVariants = updateData.variants || existingEn.variants;

      const translations = {
        en: {
          name: newName,
          category: newCategory,
          description: newDescription,
          variants: newVariants,
        },
      };

      for (const lang of SUPPORTED_LANGUAGES) {
        if (lang === 'en') continue;
        translations[lang] = {
          name: await translateTexts(newName, lang),
          category: await translateTexts(newCategory, lang),
          description: await translateTexts(newDescription, lang),
          variants: await translateVariants(newVariants, lang),
        };
      }

      updateData.translations = translations;
      delete updateData.name;
      delete updateData.category;
      delete updateData.description;
      delete updateData.variants;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
});




// DELETE PRODUCT
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    // Delete all product images safely
    await Promise.all(deletedProduct.images?.map(async img => {
      try {
        const filePath = `.${img}`;
        if (fs.existsSync(filePath)) await fs.promises.unlink(filePath);
      } catch (err) {
        console.warn('Failed to delete image:', img, err.message);
      }
    }) || []);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});


router.get('/products/stats', adminAuth, async (req, res) => {
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

// export affiliate in pdf
router.post('/affiliate/export', adminAuth, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null

    let query = Affiliate.find().sort({ createdAt: -1 })

    if (limit) {
      query = query.limit(limit)
    }

    const registrations = await query.lean()

    // Default export = PDF
    exportRegistrationsToPDF(registrations, res, 'Affiliate Registrations')
  } catch (error) {
    console.error('Affiliate export error:', error)
    res.status(500).json({ message: 'Affiliate export failed' })
  }
})

//Total forms + forms submitted by month
router.get('/affiliate/stats/forms-by-month', adminAuth, async (req, res) => {
  try {
    const [totalForms, monthlyStats] = await Promise.all([
      Affiliate.countDocuments(),
      Affiliate.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ])
    ])

    res.status(200).json({
      success: true,
      totalForms,
      monthlyBreakdown: monthlyStats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

//Pending replies + pending replies by week
router.get('/affiliate/stats/pending-by-week', adminAuth, async (req, res) => {
  try {
    const [totalPending, weeklyStats] = await Promise.all([
      Affiliate.countDocuments({ status: "pending" }),
      Affiliate.aggregate([
        {
          $match: { status: "pending" }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              week: { $week: "$createdAt" }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.week": 1 }
        }
      ])
    ])

    res.status(200).json({
      success: true,
      totalPendingReplies: totalPending,
      weeklyBreakdown: weeklyStats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

//Approved percentage + total approved
router.get('/affiliate/stats/approved-percentage', adminAuth, async (req, res) => {
  try {
    const [totalForms, approvedCount] = await Promise.all([
      Affiliate.countDocuments(),
      Affiliate.countDocuments({ status: "approved" })
    ])

    const percentage =
      totalForms === 0 ? 0 : ((approvedCount / totalForms) * 100).toFixed(2)

    res.status(200).json({
      success: true,
      totalForms,
      totalApproved: approvedCount,
      approvedPercentage: Number(percentage)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

//New messages + percentage by month
router.get('/affiliate/stats/new-messages', adminAuth, async (req, res) => {
  try {
    const totalNewMessages = await Affiliate.countDocuments({ status: "pending" })

    const monthlyStats = await Affiliate.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          total: { $sum: 1 },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          total: 1,
          pending: 1,
          percentage: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$pending", "$total"] },
                  100
                ]
              }
            ]
          }
        }
      },
      {
        $sort: { year: 1, month: 1 }
      }
    ])

    res.status(200).json({
      success: true,
      totalNewMessages,
      monthlyBreakdown: monthlyStats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


// GET unified africa notifications
// GET /api/admin/africa/notifications?limit=10
router.get('/africa/notifications', adminAuth, async (req, res) => {
  try {
    // Optional limit query param (default 10)
    const limit = parseInt(req.query.limit) || 10;

    // Fetch all latest entries (without limit yet)
    const [blogs, contacts, farmFunds, memberships, news] = await Promise.all([
      Blog.find().lean(),
      contact.find().lean(),
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

    // Fetch all enquiries, sorted by newest first
    let enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();

    // Apply limit if provided
    if (limit) {
      enquiries = enquiries.slice(0, limit);
    }

    // -----------------------------
    // Monthly stats
    // -----------------------------
    const monthlyMap = {};

    enquiries.forEach(item => {
      const date = new Date(item.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month}`;
      monthlyMap[key] = (monthlyMap[key] || 0) + 1;
    });

    const monthlyStats = Object.entries(monthlyMap)
      .map(([key, total]) => {
        const [year, month] = key.split('-');
        return { year: Number(year), month: Number(month), total };
      })
      .sort((a, b) => a.year - b.year || a.month - b.month)
      .map((current, index, arr) => {
        const prev = arr[index - 1];
        let diff = null;
        let percentage = null;

        if (prev) {
          diff = current.total - prev.total;
          percentage = prev.total === 0 ? 0 : Number(((diff / prev.total) * 100).toFixed(2));
        }

        return {
          ...current,
          changeFromPreviousMonth: diff,
          changePercentage: percentage
        };
      });

    res.status(200).json({
      success: true,
      totalEnquiries: enquiries.length,
      enquiries,
      monthlyStats
    });
  } catch (error) {
    console.error('Fetch enquiries error:', error);
    res.status(500).json({ message: 'Failed to fetch enquiries', error: error.message });
  }
});


// GET /api/admin/enquiries/export to export enquiries
router.post('/enquiries/export', adminAuth, async (req, res) => {
  try {
    // Default format = pdf
    const { format = 'pdf', limit = null } = req.body

    const enquiries = await getEnquiries(
      limit ? parseInt(limit) : null
    )

    // Default behaviour → PDF
    if (format === 'pdf') {
      return exportToPDF(enquiries, res)
    }

    res.status(400).json({
      message: 'Unsupported export format'
    })
  } catch (err) {
    console.error('Export error:', err)
    res.status(500).json({
      message: 'Export failed'
    })
  }
})


// GET /api/admin/enquiries/:type/:id
router.get('/enquiries/:type/:id', adminAuth, async (req, res) => {
  try {
    const { type, id } = req.params;

    // Validate type
    const validTypes = ['contact', 'feedback', 'message'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid enquiry type' });
    }

    // Find enquiry by ID and type
    const enquiry = await Enquiry.findOne({ _id: id, sourceModel: type }).lean();

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ enquiry });
  } catch (error) {
    console.error('Fetch single enquiry error:', error);
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid enquiry ID' });
    }
    res.status(500).json({ message: 'Failed to fetch enquiry', error: error.message });
  }
});

// POST reply to an enquiry
router.post('/enquiries/:type/:id/reply', adminAuth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status, adminReply } = req.body;

    // Validate status
    if (!status || !['pending', 'read'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Validate type
    const validTypes = ['contact', 'feedback', 'message'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid enquiry type' });
    }

    // Update enquiry
    const updated = await Enquiry.findOneAndUpdate(
      { _id: id, sourceModel: type },
      { status, adminReply },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({
      message: 'Enquiry updated successfully',
      enquiry: updated,
    });
  } catch (error) {
    console.error('Update enquiry error:', error);
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid enquiry ID' });
    }
    res.status(500).json({ message: 'Failed to update enquiry', error: error.message });
  }
});

//Total enquiries + enquiries submitted by month
router.get('/enquiries/stats/by-month', adminAuth, async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();

    const monthly = await Enquiry.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
    ]);

    const monthlyBreakdown = monthly
      .map(item => ({
        year: item._id.year,
        month: item._id.month,
        total: item.total,
      }))
      .sort((a, b) => a.year - b.year || a.month - b.month);

    res.status(200).json({
      success: true,
      totalEnquiries,
      monthlyBreakdown,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Pending replies stats by week
router.get('/enquiries/stats/pending-by-week', adminAuth, async (req, res) => {
  try {
    const totalPending = await Enquiry.countDocuments({ status: "pending" });

    const weekly = await Enquiry.aggregate([
      { $match: { status: "pending" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $week: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
    ]);

    const weeklyBreakdown = weekly
      .map(item => ({
        year: item._id.year,
        week: item._id.week,
        total: item.total,
      }))
      .sort((a, b) => a.year - b.year || a.week - b.week);

    res.status(200).json({
      success: true,
      totalPendingReplies: totalPending,
      weeklyBreakdown,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Resolution rate
router.get('/enquiries/stats/resolution-rate', adminAuth, async (req, res) => {
  try {
    const total = await Enquiry.countDocuments();
    const resolved = await Enquiry.countDocuments({ status: "read" });

    const percentage = total === 0 ? 0 : ((resolved / total) * 100).toFixed(2);

    res.status(200).json({
      success: true,
      totalEnquiries: total,
      totalResolved: resolved,
      resolutionPercentage: Number(percentage),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Average response time per week
router.get('/enquiries/stats/response-time', adminAuth, async (req, res) => {
  try {
    const replied = await Enquiry.aggregate([
      { $match: { status: "read" } },
      {
        $project: {
          responseTimeHours: {
            $divide: [{ $subtract: ["$updatedAt", "$createdAt"] }, 1000 * 60 * 60],
          },
          year: { $year: "$updatedAt" },
          week: { $week: "$updatedAt" },
        },
      },
    ]);

    const weeklyMap = {};
    replied.forEach(item => {
      const key = `${item.year}-${item.week}`;
      if (!weeklyMap[key]) weeklyMap[key] = { total: 0, count: 0 };
      weeklyMap[key].total += item.responseTimeHours;
      weeklyMap[key].count += 1;
    });

    const weeklyResponseTime = Object.entries(weeklyMap)
      .map(([key, data]) => {
        const [year, week] = key.split("-");
        return {
          year: Number(year),
          week: Number(week),
          averageResponseTimeHours: Number((data.total / data.count).toFixed(2)),
        };
      })
      .sort((a, b) => a.year - b.year || a.week - b.week);

    res.status(200).json({
      success: true,
      weeklyResponseTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

//Total views by day (combined)
router.get('/track-visit/blogs/by-day', async (req, res) => {
  try {
    const dailyViews = await Visitor.aggregate([
      {
        $match: {
          path: { $in: ['/blogs', '/blog'] }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          totalViews: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1
        }
      }
    ])

    res.status(200).json({
      success: true,
      dailyViews
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch daily views' })
  }
})

//Weekly totals with comparison to previous weeks
router.get('/track-visit/blogs/by-week', async (req, res) => {
  try {
    const weeklyRaw = await Visitor.aggregate([
      {
        $match: {
          path: { $in: ['/blogs', '/blog'] }
        }
      },
      {
        $group: {
          _id: {
            year: { $isoWeekYear: "$createdAt" },
            week: { $isoWeek: "$createdAt" }
          },
          totalViews: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.week": 1
        }
      }
    ])

    // Calculate week-over-week comparison
    const weeklyComparison = weeklyRaw.map((current, index) => {
      const prev = weeklyRaw[index - 1]

      let changePercentage = null

      if (prev && prev.totalViews > 0) {
        changePercentage =
          ((current.totalViews - prev.totalViews) / prev.totalViews) * 100
      }

      return {
        year: current._id.year,
        week: current._id.week,
        totalViews: current.totalViews,
        changeFromPreviousWeek: changePercentage !== null
          ? Number(changePercentage.toFixed(2))
          : null
      }
    })

    res.status(200).json({
      success: true,
      weeklyStats: weeklyComparison
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch weekly views' })
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
