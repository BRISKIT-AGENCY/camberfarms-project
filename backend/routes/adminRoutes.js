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
import path from 'path'
import sizeOf from 'image-size'
import { exportRegistrationsToPDF } from '../utils/exportFarmFundPdf.js'
import { translateText } from '../utils/translate.js'
import { translateSections } from '../utils/translateSections.js'
import { SUPPORTED_LANGUAGES } from '../utils/languages.js'
import { translateVariants, translateTexts } from '../utils/translateProduct.js'
import Enquiry from '../models/Enquiry.js'
import Notification from '../models/Notification.js'
import { sendEmail } from '../utils/email.js'

dotenv.config();

const router = express.Router()

// Admin login route

{/*router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })
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
    { expiresIn: '3h' }
  )

  res.status(200).json({
    message: 'Login successful',
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      profilePhoto: admin.profilePhoto
    }
  })
})*/}

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 min

  // Save OTP directly to this admin
  admin.twoFactor = { code: otp, expiresAt, verified: false }
  await admin.save()

  // Send OTP via email
  await sendEmail(
    admin.email,
    'Your login verification code',
    `Your OTP is: ${otp}. It expires in 10 minutes.`
  )

  res.status(200).json({
    message: 'OTP sent to your email. Verify to complete login.'
    // no need to send adminId
  })
})


router.post('/login/verify-otp', async (req, res) => {
  const { email, otp } = req.body

  const admin = await Admin.findOne({ email })
  if (!admin) return res.status(404).json({ message: 'Admin not found' })

  if (!admin.twoFactor || admin.twoFactor.code !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' })
  }

  if (new Date() > admin.twoFactor.expiresAt) {
    return res.status(401).json({ message: 'OTP expired' })
  }

  // Mark OTP as verified
  admin.twoFactor.verified = true
  await admin.save()

  // Generate JWT after successful OTP verification
  const token = jwt.sign(
    { adminId: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '3h' }
  )

  res.status(200).json({
    message: 'Login successful',
    token,
    admin: {
      id: admin._id,
      email: admin.email,
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
    console.error('OTP ERROR:', err);

    res.status(500).json({
      message: 'Failed to send OTP',
      error: err.message
    });
  }

})

router.post('/reset-password/verify-otp', adminAuth, async (req, res) => {
  const { otp } = req.body

  const admin = await Admin.findById(req.admin.adminId)
  if (!admin) return res.status(404).json({ message: 'Admin not found' })

  if (!admin.twoFactor || admin.twoFactor.code !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' })
  }

  if (new Date() > admin.twoFactor.expiresAt) {
    return res.status(401).json({ message: 'OTP expired' })
  }

  admin.twoFactor.verified = true
  await admin.save()

  res.json({ message: 'OTP verified successfully' })
})

router.post('/reset-password', adminAuth, async (req, res) => {
  const { newPassword } = req.body

  const admin = await Admin.findById(req.admin.adminId)
  if (!admin) return res.status(404).json({ message: 'Admin not found' })

  if (!admin.twoFactor || !admin.twoFactor.verified) {
    return res.status(401).json({ message: 'OTP not verified' })
  }

  if (new Date() > admin.twoFactor.expiresAt) {
    return res.status(401).json({ message: 'OTP expired' })
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 10)

  // clear OTP
  admin.twoFactor = undefined
  await admin.save()

  res.json({ message: 'Password updated successfully' })
})

router.post('/forgot-password/request-otp', async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    admin.twoFactor = {
      code: otp,
      expiresAt,
      verified: false
    };

    await admin.save();

    await sendEmail(
      admin.email,
      'Password reset code',
      `Your OTP is ${otp}. It expires in 10 minutes.`
    );

    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('OTP ERROR:', err);

    res.status(500).json({
      message: 'Failed to send OTP',
      error: err.message
    });
  }

});

router.post('/forgot-password/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (!admin.twoFactor || admin.twoFactor.code !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    if (new Date() > admin.twoFactor.expiresAt) {
      return res.status(401).json({ message: 'OTP expired' });
    }

    admin.twoFactor.verified = true;
    await admin.save();

    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'OTP verification failed' });
  }
});

router.post('/forgot-password/reset', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (!admin.twoFactor || !admin.twoFactor.verified) {
      return res.status(401).json({ message: 'OTP not verified' });
    }

    if (new Date() > admin.twoFactor.expiresAt) {
      return res.status(401).json({ message: 'OTP expired' });
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);

    // clear OTP
    admin.twoFactor = undefined;

    await admin.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Password reset failed' });
  }
});



// Upload or update the single admin's profile photo
router.post('/profile-photo', adminAuth, adminUpload, async (req, res) => {
  try {
    const admin = await Admin.findOne()

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      })
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    // Delete old profile photo if it exists
    if (admin.profilePhoto) {
      const oldPath = path.join(process.cwd(), admin.profilePhoto)

      try {
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath)
        }
      } catch (err) {
        console.log("Failed to delete old profile photo:", err)
      }
    }

    // Save new photo
    admin.profilePhoto = `uploads/admins/${req.file.filename}`
    await admin.save()

    res.status(200).json({
      success: true,
      message: 'Profile photo updated successfully',
      profilePhoto: `https://api.camberfarms.org/${admin.profilePhoto}`
    })

  } catch (error) {
    console.error('Upload profile photo error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to upload profile photo'
    })
  }
})


// GET ALL IMAGES
//
router.get("/gallery", async (req, res) => {
  try {
    const gallery = await Gallery.findOne()

    if (!gallery || !gallery.images) {
      return res.json({
        success: true,
        total: 0,
        images: []
      })
    }

    const images = [...gallery.images].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    )

    res.json({
      success: true,
      total: images.length,
      images
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch images"
    })
  }
})

//
// GET SINGLE IMAGE
//
router.get("/gallery/:imageId", async (req, res) => {
  try {
    const gallery = await Gallery.findOne()

    if (!gallery || !gallery.images) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      })
    }

    const image = gallery.images.id(req.params.imageId)

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      })
    }

    res.json({
      success: true,
      image
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
})

//
// UPLOAD IMAGES
//
router.post(
  "/gallery",
  adminAuth,
  galleryUpload.array("images", 20),
  async (req, res) => {

    try {

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No images uploaded"
        })
      }

      let gallery = await Gallery.findOne()

      if (!gallery) {
        gallery = new Gallery({ images: [] })
      }

      // Ensure images array exists
      gallery.images = gallery.images || []

      const newImages = await Promise.all(
        req.files.map(async (file) => {

          const buffer = await fs.promises.readFile(file.path)
          const dimensions = sizeOf(buffer)

          return {
            url: `https://api.camberfarms.org/uploads/gallery/${file.filename}`,
            size: file.size,
            width: dimensions.width,
            height: dimensions.height,
            aspectRatio:
              dimensions.width && dimensions.height
                ? (dimensions.width / dimensions.height).toFixed(2)
                : null,
            uploadedAt: new Date()
          }
        })
      )

      gallery.images.push(...newImages)

      await gallery.save()

      res.status(201).json({
        success: true,
        images: newImages
      })

    } catch (error) {
      console.error(error)

      res.status(500).json({
        success: false,
        message: "Upload failed"
      })
    }
  }
)

//
// UPDATE IMAGE
//
router.patch(
  "/gallery/:imageId",
  adminAuth,
  galleryUpload.single("image"),
  async (req, res) => {

    try {

      const gallery = await Gallery.findOne()

      if (!gallery || !gallery.images) {
        return res.status(404).json({
          success: false,
          message: "Image not found"
        })
      }

      const image = gallery.images.id(req.params.imageId)

      if (!image) {
        return res.status(404).json({
          success: false,
          message: "Image not found"
        })
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No new image uploaded"
        })
      }

      // Delete old file
      let oldPath = image.url.replace(
        "https://api.camberfarms.org/",
        ""
      )

      oldPath = path.join(process.cwd(), oldPath)

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath)
      }

      const buffer = await fs.promises.readFile(req.file.path)
      const dimensions = sizeOf(buffer)

      image.url = `https://api.camberfarms.org/uploads/gallery/${req.file.filename}`
      image.size = req.file.size
      image.width = dimensions.width
      image.height = dimensions.height
      image.aspectRatio =
        dimensions.width && dimensions.height
          ? (dimensions.width / dimensions.height).toFixed(2)
          : null
      image.uploadedAt = new Date()

      await gallery.save()

      res.json({
        success: true,
        image
      })

    } catch (error) {
      console.error(error)

      res.status(500).json({
        success: false,
        message: "Update failed"
      })
    }
  }
)

//
// DELETE IMAGE
//
router.delete("/gallery/:imageId", adminAuth, async (req, res) => {

  try {

    const gallery = await Gallery.findOne()

    if (!gallery || !gallery.images) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      })
    }

    const image = gallery.images.id(req.params.imageId)

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      })
    }

    let filePath = image.url.replace(
      "https://api.camberfarms.org/",
      ""
    )

    filePath = path.join(process.cwd(), filePath)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    image.deleteOne()

    await gallery.save()

    res.json({
      success: true,
      message: "Image deleted"
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Delete failed"
    })
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

      const slugExists = await Blog.findOne({ slug });

      if (slugExists) {
        return res.status(400).json({
          message: "Slug already exists"
        });
      }

      // 2️⃣ Parse sections if it's a string
      if (sections && typeof sections === 'string') sections = JSON.parse(sections);

      const imagePath = `https://api.camberfarms.org/uploads/blogs/${req.file.filename}`;

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

      await Notification.create({
        title: 'New Blog Published',
        description: title,
        type: 'blog',
        sourceWebsite: 'africa',
        link: `/blogs/${slug}`,
        date: new Date()
      });

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
router.patch(
  "/africa-blogs/:id",
  adminAuth,
  blogUpload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params
      let updateData = { ...req.body }

      // Parse sections if JSON string
      if (updateData.sections && typeof updateData.sections === "string") {
        updateData.sections = JSON.parse(updateData.sections)
      }

      const existingBlog = await Blog.findById(id)

      if (!existingBlog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found"
        })
      }

      // =========================
      // IMAGE HANDLING
      // =========================
      if (req.file) {

        // Save relative path to DB
        const newImagePath = `uploads/blogs/${req.file.filename}`
        updateData.image = newImagePath

        // Delete old image
        if (existingBlog.image) {

          const oldImagePath = path.join(
            process.cwd(),
            existingBlog.image
          )

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
          }
        }
      }

      // =========================
      // TRANSLATIONS
      // =========================
      const titleChanged = updateData.title !== undefined
      const excerptChanged = updateData.excerpt !== undefined
      const sectionsChanged = updateData.sections !== undefined

      if (titleChanged || excerptChanged || sectionsChanged) {

        const existingEn = existingBlog.translations.get("en")

        const newTitle = updateData.title || existingEn.title
        const newExcerpt = updateData.excerpt || existingEn.excerpt
        const newSections = updateData.sections || existingEn.sections

        const translations = {
          en: {
            title: newTitle,
            excerpt: newExcerpt,
            sections: newSections
          }
        }

        for (const lang of SUPPORTED_LANGUAGES) {
          translations[lang] = {
            title: await translateText(newTitle, lang),
            excerpt: await translateText(newExcerpt, lang),
            sections: await translateSections(newSections, lang)
          }
        }

        updateData.translations = translations

        delete updateData.title
        delete updateData.excerpt
        delete updateData.sections
      }

      // Date conversion
      if (updateData.publishedAt) {
        updateData.publishedAt = new Date(updateData.publishedAt)
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      )

      // Create notification
      await Notification.create({
        title: "Blog Updated",
        description: updatedBlog.translations?.en?.title || "Blog updated",
        type: "blog",
        sourceWebsite: "africa",
        link: `/blogs/${updatedBlog.slug}`,
        date: new Date()
      })

      // Convert image path to full URL before sending response
      const blogResponse = updatedBlog.toObject()

      if (blogResponse.image) {
        blogResponse.image = `https://api.camberfarms.org/${blogResponse.image}`
      }

      res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog: blogResponse
      })

    } catch (error) {
      console.error(error)

      res.status(500).json({
        success: false,
        message: "Failed to update blog",
        error: error.message
      })
    }
  }
)


// delete a africa blog
router.delete('/africa-blogs/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params

    // Find and delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    // =========================
    // DELETE BLOG IMAGE
    // =========================
    if (deletedBlog.image) {
      try {
        // Convert full URL to relative path if needed
        let imagePath = deletedBlog.image
        if (imagePath.startsWith('https://api.camberfarms.org/')) {
          imagePath = imagePath.replace('https://api.camberfarms.org/', '')
        }

        const fullPath = path.join(process.cwd(), imagePath)

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath)
        }
      } catch (err) {
        console.warn('Image not found or failed to delete:', err.message)
      }
    }

    // =========================
    // CREATE NOTIFICATION
    // =========================
    await Notification.create({
      title: 'Blog Deleted',
      description: deletedBlog.translations?.en?.title || 'Blog deleted',
      type: 'blog',
      sourceWebsite: 'africa',
      link: '/blogs',
      date: new Date()
    })

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
    const exportBlogs = await exportBlog
      .find()
      .sort({ createdAt: -1 })
      .populate('author', 'email profilePhoto')

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

    const blog = await exportBlog
      .findById(id)
      .populate('author', 'email profilePhoto')

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

      // Validate required fields
      if (!title) return res.status(400).json({ message: 'Title is required' });
      if (!excerpt) return res.status(400).json({ message: 'Excerpt is required' });
      if (!slug) return res.status(400).json({ message: 'Slug is required' });
      if (!req.file) return res.status(400).json({ message: 'ExportBlog image is required' });

      const slugExists = await exportBlog.findOne({ slug });

      if (slugExists) {
        return res.status(400).json({
          message: "Slug already exists"
        });
      }

      // Parse sections
      if (sections && typeof sections === 'string') {
        sections = JSON.parse(sections);
      }

      const imagePath = `/uploads/export-blogs/${req.file.filename}`;

      // Prepare translations
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

      // Create ExportBlog
      const exportBlogDoc = new exportBlog({
        slug,
        image: imagePath,
        author: req.admin.adminId,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        translations
      });

      await exportBlogDoc.save();

      // 🔔 Create notification
      await Notification.create({
        title: 'New Export Blog Published',
        description: title,
        type: 'blog',
        sourceWebsite: 'export',
        link: `/blogs/${slug}`,
        date: new Date()
      });

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


// UPDATE export blog
router.patch(
  "/export-blogs/:id",
  adminAuth,
  exportBlogUpload.single("image"),
  async (req, res) => {
    try {

      const { id } = req.params
      let updateData = { ...req.body }

      // =========================
      // SLUG CHECK
      // =========================
      if (updateData.slug) {
        const slugExists = await exportBlog.findOne({
          slug: updateData.slug,
          _id: { $ne: id }
        })

        if (slugExists) {
          return res.status(400).json({
            message: "Slug already exists"
          })
        }
      }

      // =========================
      // PARSE SECTIONS
      // =========================
      if (updateData.sections && typeof updateData.sections === "string") {
        updateData.sections = JSON.parse(updateData.sections)
      }

      const existingBlog = await exportBlog.findById(id)

      if (!existingBlog) {
        return res.status(404).json({
          message: "ExportBlog not found"
        })
      }

      // =========================
      // IMAGE HANDLING
      // =========================
      if (req.file) {

        const newImagePath = `uploads/export-blogs/${req.file.filename}`
        updateData.image = newImagePath

        if (existingBlog.image) {

          const oldImagePath = path.join(
            process.cwd(),
            existingBlog.image
          )

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
          }
        }
      }

      // =========================
      // TRANSLATIONS
      // =========================
      const titleChanged = updateData.title !== undefined
      const excerptChanged = updateData.excerpt !== undefined
      const sectionsChanged = updateData.sections !== undefined

      if (titleChanged || excerptChanged || sectionsChanged) {

        const existingEn = existingBlog.translations.get("en")

        const newTitle = updateData.title || existingEn.title
        const newExcerpt = updateData.excerpt || existingEn.excerpt
        const newSections = updateData.sections || existingEn.sections

        const translations = {
          en: {
            title: newTitle,
            excerpt: newExcerpt,
            sections: newSections
          }
        }

        for (const lang of SUPPORTED_LANGUAGES) {
          translations[lang] = {
            title: await translateText(newTitle, lang),
            excerpt: await translateText(newExcerpt, lang),
            sections: await translateSections(newSections, lang)
          }
        }

        updateData.translations = translations

        delete updateData.title
        delete updateData.excerpt
        delete updateData.sections
      }

      // =========================
      // DATE FIX
      // =========================
      if (updateData.publishedAt) {
        updateData.publishedAt = new Date(updateData.publishedAt)
      }

      const updatedBlog = await exportBlog.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      )

      // =========================
      // CREATE NOTIFICATION
      // =========================
      await Notification.create({
        title: "Export Blog Updated",
        description:
          updatedBlog.translations?.en?.title || "Export blog updated",
        type: "blog",
        sourceWebsite: "export",
        link: `/blogs/${updatedBlog.slug}`,
        date: new Date()
      })

      // =========================
      // FORMAT RESPONSE IMAGE
      // =========================
      const blogResponse = updatedBlog.toObject()

      if (blogResponse.image) {
        blogResponse.image = `https://api.camberfarms.org/${blogResponse.image}`
      }

      res.status(200).json({
        success: true,
        message: "ExportBlog updated successfully",
        exportBlog: blogResponse
      })

    } catch (error) {

      console.error(error)

      res.status(500).json({
        success: false,
        message: "Failed to update ExportBlog",
        error: error.message
      })
    }
  }
)


// DELETE export blog
router.delete('/export-blogs/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the blog
    const deletedBlog = await exportBlog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'ExportBlog not found' });
    }

    // =========================
    // DELETE BLOG IMAGE
    // =========================
    if (deletedBlog.image) {
      try {
        // Convert full URL to relative path if needed
        let imagePath = deletedBlog.image;
        if (imagePath.startsWith('https://api.camberfarms.org/')) {
          imagePath = imagePath.replace('https://api.camberfarms.org/', '');
        }

        const fullPath = path.join(process.cwd(), imagePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      } catch (err) {
        console.warn('Image not found or failed to delete:', err.message);
      }
    }

    // =========================
    // CREATE NOTIFICATION
    // =========================
    await Notification.create({
      title: 'Export Blog Deleted',
      description: deletedBlog.translations?.en?.title || 'Export blog deleted',
      type: 'blog',
      sourceWebsite: 'export',
      link: '/blogs',
      date: new Date()
    });

    res.status(200).json({ message: 'ExportBlog deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete ExportBlog',
      error: error.message
    });
  }
});


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

    // 🔔 Create notification
    await Notification.create({
      title: "FarmFund Registration Updated",
      description: `Registration from ${updatedRegistration.name || "a user"} was updated`,
      type: "farmfund",
      sourceWebsite: "africa",
      link: "/farm-fund",
      date: new Date()
    })

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

    // 🔔 Create notification
    await Notification.create({
      title: "Membership Status Updated",
      description: `Membership for ${updatedMembership.name || "a user"} was marked as ${status}`,
      type: "membership",
      sourceWebsite: "africa",
      link: "/membership",
      date: new Date()
    })

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
router.get('/news', adminAuth, async (req, res) => {
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

    const slugExists = await News.findOne({ slug });

    if (slugExists) {
      return res.status(400).json({
        message: "Slug already exists"
      });
    }

    if (sections && typeof sections === 'string') {
      sections = JSON.parse(sections);
    }

    const imagePath = `https://api.camberfarms.org/uploads/news/${req.file.filename}`;

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

    // 🔔 Create notification
    await Notification.create({
      title: 'New news article published',
      description: title,
      type: 'news',
      sourceWebsite: 'africa',
      link: `/news/${newsItem.slug}`,
      date: new Date()
    });

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

router.patch('/news/:id', adminAuth, newsUpload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    // =========================
    // SLUG CHECK
    // =========================
    if (updateData.slug) {
      const slugExists = await News.findOne({
        slug: updateData.slug,
        _id: { $ne: id }
      });
      if (slugExists) {
        return res.status(400).json({ message: "Slug already exists" });
      }
    }

    // =========================
    // PARSE SECTIONS
    // =========================
    if (updateData.sections && typeof updateData.sections === 'string') {
      updateData.sections = JSON.parse(updateData.sections);
    }

    const existingNews = await News.findById(id);
    if (!existingNews) {
      return res.status(404).json({ message: 'News item not found' });
    }

    // =========================
    // IMAGE HANDLING
    // =========================
    if (req.file) {
      const newImagePath = `uploads/news/${req.file.filename}`;
      updateData.image = newImagePath;

      // Delete old image
      if (existingNews.image) {
        try {
          let oldPath = existingNews.image;

          // Convert full URL to relative path if needed
          if (oldPath.startsWith('https://api.camberfarms.org/')) {
            oldPath = oldPath.replace('https://api.camberfarms.org/', '');
          }

          const fullOldPath = path.join(process.cwd(), oldPath);
          if (fs.existsSync(fullOldPath)) {
            fs.unlinkSync(fullOldPath);
          }
        } catch (err) {
          console.warn('Old image not found or failed to delete:', err.message);
        }
      }
    }

    // =========================
    // TRANSLATION HANDLING
    // =========================
    const titleChanged = updateData.title !== undefined;
    const excerptChanged = updateData.excerpt !== undefined;
    const sectionsChanged = updateData.sections !== undefined;

    if (titleChanged || excerptChanged || sectionsChanged) {
      const existingEn = existingNews.translations.get('en');

      const newTitle = updateData.title || existingEn.title;
      const newExcerpt = updateData.excerpt || existingEn.excerpt;
      const newSections = updateData.sections || existingEn.sections;

      const translations = {
        en: { title: newTitle, excerpt: newExcerpt, sections: newSections }
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

    // =========================
    // UPDATE NEWS ITEM
    // =========================
    const updatedNews = await News.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    // =========================
    // NOTIFICATION
    // =========================
    await Notification.create({
      title: 'News article updated',
      description: updatedNews.translations?.get('en')?.title || 'News updated',
      type: 'news',
      sourceWebsite: 'africa',
      link: `/news/${updatedNews.slug}`,
      date: new Date()
    });

    // =========================
    // FORMAT IMAGE URL FOR RESPONSE
    // =========================
    const newsResponse = updatedNews.toObject();
    if (newsResponse.image) {
      newsResponse.image = `https://api.camberfarms.org/${newsResponse.image}`;
    }

    res.status(200).json({
      success: true,
      message: 'News updated successfully',
      newsItem: newsResponse
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update news item',
      error: error.message
    });
  }
});

router.delete('/news/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the news item
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ message: 'News item not found' });
    }

    // =========================
    // DELETE IMAGE
    // =========================
    if (deletedNews.image) {
      try {
        let imagePath = deletedNews.image;

        // Convert full URL to relative path if needed
        if (imagePath.startsWith('https://api.camberfarms.org/')) {
          imagePath = imagePath.replace('https://api.camberfarms.org/', '');
        }

        const fullPath = path.join(process.cwd(), imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      } catch (err) {
        console.warn('Image already deleted or failed to delete:', err.message);
      }
    }

    // =========================
    // CREATE NOTIFICATION
    // =========================
    await Notification.create({
      title: 'News article deleted',
      description: deletedNews.translations?.get('en')?.title || 'News deleted',
      type: 'news',
      sourceWebsite: 'africa',
      link: '/news',
      date: new Date()
    });

    res.status(200).json({ message: 'News item deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete news item',
      error: error.message
    });
  }
});

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

// GET INDIVIDUAL PRODUCT
router.get('/products/:id', adminAuth, async (req, res) => {
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
// CREATE PRODUCT
router.post('/products', adminAuth, productUpload, async (req, res) => {
  try {
    const { name, category, description, stockQuantity, variants } = req.body;

    // Validate required fields
    if (!name) return res.status(400).json({ message: 'Product name is required' });
    if (!category) return res.status(400).json({ message: 'Category is required' });
    if (!description) return res.status(400).json({ message: 'Description is required' });
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: 'At least one product image is required' });
    if (stockQuantity && stockQuantity < 0)
      return res.status(400).json({ message: "Stock quantity cannot be negative" });

    // Map uploaded files to relative paths
    const images = req.files.map(file => `uploads/products/${file.filename}`);

    // Parse variants
    let parsedVariants = {};
    if (variants) {
      try {
        const v = typeof variants === 'string' ? JSON.parse(variants) : variants;

        // Convert null-prototype object to plain object
        parsedVariants = JSON.parse(JSON.stringify(v));

      } catch (err) {
        return res.status(400).json({ message: 'Invalid variants format' });
      }
    }

    // Build translations
    const translations = new Map();
    translations.set('en', { name, category, description, variants: parsedVariants || {} });

    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang === 'en') continue;
      translations.set(lang, {
        name: await translateTexts(name, lang),
        category: await translateTexts(category, lang),
        description: await translateTexts(description, lang),
        variants: Object.keys(parsedVariants).length
          ? await translateVariants(parsedVariants, lang)
          : {}
      });
    }

    // Save product
    const product = new Product({
      stockQuantity: stockQuantity || 0,
      images,
      translations
    });

    await product.save();

    // Create notification
    await Notification.create({
      title: 'New product added',
      description: `Product "${name}" has been added`,
      sourceWebsite: 'export',
      type: 'product',
      link: `/products/${product._id}`
    });

    // Return full URLs for frontend
    const productResponse = product.toObject();
    productResponse.images = productResponse.images.map(img => `https://api.camberfarms.org/${img}`);

    res.status(201).json({ message: 'Product created successfully', product: productResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
});


// UPDATE PRODUCT
router.patch('/products/:id', adminAuth, productUpload, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // =========================
    // IMAGE HANDLING
    // =========================
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `uploads/products/${file.filename}`);

      // Delete old images
      if (product.images?.length) {
        for (const img of product.images) {
          try {
            let oldPath = img;
            if (oldPath.startsWith('https://api.camberfarms.org/')) {
              oldPath = oldPath.replace('https://api.camberfarms.org/', '');
            }
            const fullOldPath = path.join(process.cwd(), oldPath);
            if (fs.existsSync(fullOldPath)) await fs.promises.unlink(fullOldPath);
          } catch (err) {
            console.warn('Old image not found:', err.message);
          }
        }
      }

      product.images = newImages;
    }

    // =========================
    // TRANSLATION HANDLING
    // =========================
    const existingEn = product.translations?.get('en');
    if (!existingEn) return res.status(500).json({ message: 'English translation missing' });

    // Parse variants if coming from form-data
    if (typeof updateData.variants === 'string') {
      const parsed = JSON.parse(updateData.variants);
      updateData.variants = JSON.parse(JSON.stringify(parsed));
    }

    const nameChanged = updateData.name !== undefined;
    const categoryChanged = updateData.category !== undefined;
    const descriptionChanged = updateData.description !== undefined;
    const variantsChanged = updateData.variants !== undefined;

    if (nameChanged || categoryChanged || descriptionChanged || variantsChanged) {
      if (nameChanged) existingEn.name = updateData.name;
      if (categoryChanged) existingEn.category = updateData.category;
      if (descriptionChanged) existingEn.description = updateData.description;
      if (variantsChanged) existingEn.variants = updateData.variants || {};

      product.translations.set('en', existingEn);

      for (const lang of SUPPORTED_LANGUAGES) {
        if (lang === 'en') continue;
        const existingLang = product.translations.get(lang) || {};
        if (nameChanged) existingLang.name = await translateTexts(existingEn.name, lang);
        if (categoryChanged) existingLang.category = await translateTexts(existingEn.category, lang);
        if (descriptionChanged) existingLang.description = await translateTexts(existingEn.description, lang);
        if (variantsChanged)
          existingLang.variants = Object.keys(existingEn.variants || {}).length
            ? await translateVariants(existingEn.variants, lang)
            : {};
        product.translations.set(lang, existingLang);
      }
    }

    // =========================
    // OTHER FIELD UPDATES
    // =========================
    if (updateData.stockQuantity !== undefined) product.stockQuantity = updateData.stockQuantity;
    product.status = product.stockQuantity === 0 ? 'inactive' : 'active';

    await product.save();

    const enTranslation = product.translations.get('en');

    await Notification.create({
      title: 'Product updated',
      description: `Product "${enTranslation?.name || 'Unnamed'}" was updated`,
      sourceWebsite: 'export',
      type: 'product',
      link: `/products/${product._id}`
    });

    // Convert image paths to full URLs
    const productResponse = product.toObject();
    productResponse.images = productResponse.images.map(img => `https://api.camberfarms.org/${img}`);

    res.status(200).json({ message: 'Product updated successfully', product: productResponse });
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

    // =========================
    // DELETE IMAGES
    // =========================
    await Promise.all(
      deletedProduct.images?.map(async img => {
        try {
          let filePath = img;
          if (filePath.startsWith('https://api.camberfarms.org/')) {
            filePath = filePath.replace('https://api.camberfarms.org/', '');
          }
          const fullPath = path.join(process.cwd(), filePath);
          if (fs.existsSync(fullPath)) await fs.promises.unlink(fullPath);
        } catch (err) {
          console.warn('Failed to delete image:', img, err.message);
        }
      }) || []
    );

    const enTranslation = deletedProduct.translations?.get('en');

    await Notification.create({
      title: 'Product deleted',
      description: `Product "${enTranslation?.name || 'Unnamed'}" was removed`,
      sourceWebsite: 'export',
      type: 'product',
      link: '/products'
    });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});



// GET product images count
router.get('/products/images/count', adminAuth, async (req, res) => {
  try {
    const products = await Product.find({}, 'images')

    const totalImages = products.reduce(
      (sum, p) => sum + (p.images?.length || 0),
      0
    )

    res.status(200).json({
      totalImages
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch image count',
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
    const { status } = req.body

    // Validate status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const updatedAffiliate = await Affiliate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!updatedAffiliate) {
      return res.status(404).json({ message: 'Affiliate not found' })
    }

    // CREATE NOTIFICATION
    let descriptionText = ''
    if (status === 'approved') descriptionText = 'Your affiliate request has been approved.'
    else if (status === 'rejected') descriptionText = 'Your affiliate request has been rejected.'
    else descriptionText = 'Your affiliate request status has been updated.'

    await Notification.create({
      title: 'Affiliate Status Update',
      description: descriptionText,
      sourceWebsite: 'export',
      type: 'affiliate',
      link: `/affiliate/${updatedAffiliate._id}`
    })

    res.status(200).json({
      message: 'Status updated successfully',
      data: updatedAffiliate
    })
  } catch (error) {
    console.error('Update affiliate status error:', error)
    res.status(500).json({
      message: 'Failed to update status',
      error: error.message
    })
  }
})

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

// GET /africa/notifications
router.get('/africa/notifications', adminAuth, async (req, res) => {
  try {
    // Optional limit query param (default 10)
    const limit = parseInt(req.query.limit) || 10;

    // Fetch notifications where sourceWebsite is 'africa', newest first
    const notifications = await Notification.find({ sourceWebsite: 'africa' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({
      total: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Fetch Africa notifications error:', error);
    res.status(500).json({
      message: 'Failed to fetch Africa notifications',
      error: error.message
    });
  }
});

// GET export notifications (combined)
// GET /export/notifications
router.get('/export/notifications', adminAuth, async (req, res) => {
  try {
    // Optional limit query param (default 10)
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    // Fetch notifications where sourceWebsite is 'export', newest first
    const notifications = await Notification.find({ sourceWebsite: 'export' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({
      total: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Fetch Export notifications error:', error);
    res.status(500).json({
      message: 'Failed to fetch Export notifications',
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

    // Monthly stats
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

    const monthlyBreakdowns = monthly
      .map(item => ({
        year: item._id.year,
        month: item._id.month,
        total: item.total,
      }))
      .sort((a, b) => a.year - b.year || a.month - b.month);

    res.status(200).json({
      success: true,
      totalEnquiries,
      monthlyBreakdowns,
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
    const normalizedType = type.toLowerCase();

    // Validate type
    const validTypes = ['contact', 'feedback', 'message'];
    if (!validTypes.includes(normalizedType)) {
      return res.status(400).json({ message: 'Invalid enquiry type' });
    }

    // Find enquiry by ID and type
    const enquiry = await Enquiry.findOne({ _id: id, sourceModel: normalizedType }).lean();

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
    const { type, id } = req.params
    const { status, adminReply } = req.body

    const normalizedType = type.toLowerCase();

    // Validate status
    if (!status || !['pending', 'read'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    // Validate type
    const validTypes = ['contact', 'feedback', 'message']
    if (!validTypes.includes(normalizedType)) {
      return res.status(400).json({ message: 'Invalid enquiry type' })
    }

    // Update enquiry
    const updated = await Enquiry.findOneAndUpdate(
      { _id: id, sourceModel: normalizedType },
      { status, adminReply },
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ message: 'Enquiry not found' })
    }

    // 🔔 Create notification
    const notification = new Notification({
      title: `Enquiry replied: ${normalizedType}`,
      description: adminReply || 'No reply message provided',
      sourceWebsite: updated.source, // africa or export
      type: 'enquiry',
      link: `/admin/enquiries/${normalizedType}/${id}` // adjust link as needed
    })

    await notification.save()

    res.status(200).json({
      message: 'Enquiry updated and notification created successfully',
      enquiry: updated,
      notification
    })
  } catch (error) {
    console.error('Update enquiry error:', error)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid enquiry ID' })
    }
    res.status(500).json({ message: 'Failed to update enquiry', error: error.message })
  }
})




// GET total views for home, blogs, and news
router.get('/track-visit/stats', adminAuth, async (req, res) => {
  try {
    const now = new Date()

    // Start of this week (Monday)
    const startOfThisWeek = new Date(now)
    const day = startOfThisWeek.getDay() || 7
    startOfThisWeek.setDate(startOfThisWeek.getDate() - day + 1)
    startOfThisWeek.setHours(0, 0, 0, 0)

    // Start of last week
    const startOfLastWeek = new Date(startOfThisWeek)
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7)

    // End of last week
    const endOfLastWeek = new Date(startOfThisWeek)

    // ----------------------------
    // CURRENT WEEK TOTAL
    // ----------------------------
    const currentWeekTotal = await Visitor.countDocuments({
      createdAt: { $gte: startOfThisWeek }
    })

    // ----------------------------
    // LAST WEEK TOTAL
    // ----------------------------
    const lastWeekTotal = await Visitor.countDocuments({
      createdAt: {
        $gte: startOfLastWeek,
        $lt: endOfLastWeek
      }
    })

    // ----------------------------
    // PERCENTAGE CHANGE
    // ----------------------------
    let percentageIncrease = 0

    if (lastWeekTotal > 0) {
      percentageIncrease =
        ((currentWeekTotal - lastWeekTotal) / lastWeekTotal) * 100
    }

    percentageIncrease = Number(percentageIncrease.toFixed(2))

    // ----------------------------
    // DAILY TRAFFIC (CURRENT WEEK)
    // ----------------------------
    const dailyRaw = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfThisWeek }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          traffic: { $sum: 1 }
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

    const dailyTraffic = dailyRaw.map(item => ({
      day: `${item._id.year}-${item._id.month}-${item._id.day}`,
      traffic: item.traffic
    }))

    res.status(200).json({
      success: true,
      totalTraffic: currentWeekTotal,
      percentageIncrease,
      dailyTraffic
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch stats' })
  }
})



// GET overall stats
router.post('/track-visit', async (req, res) => {
  try {
    const { path } = req.body

    if (!path) {
      return res.status(400).json({ message: 'Path is required' })
    }

    await Visitor.create({
      ip:
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      path
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Tracking failed' })
  }
})


//Total views by day (combined)
router.get('/track-visit/blogs/by-day', adminAuth, async (req, res) => {
  try {
    const dailyViews = await Visitor.aggregate([
      {
        $match: {
          path: { $regex: '^/blog' }
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
router.get('/track-visit/blogs/by-week', adminAuth, async (req, res) => {
  try {
    const weeklyRaw = await Visitor.aggregate([
      {
        $match: {
          path: { $regex: '^/blog' } // matches /blog, /blogs, /blog/slug
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
        changeFromPreviousWeek:
          changePercentage !== null
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
router.get('/track-visit/news/:slug', adminAuth, async (req, res) => {
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
