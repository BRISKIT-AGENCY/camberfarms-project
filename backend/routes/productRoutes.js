import express from 'express'
import Product from '../models/Product.js'
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router()


// GET ALL PRODUCTS
router.get('/products', async (req, res) => {
  try {
    const lang = req.query.lang || 'en'

    const products = await Product.find().sort({ createdAt: -1 })

    const formatted = products.map(product => ({
      _id: product._id,

      title: product.title.get(lang) || product.title.get('en'),
      descriptions: product.descriptions.get(lang) || product.descriptions.get('en'),
      packaging: product.packaging.get(lang) || product.packaging.get('en'),
      containerSize: product.containerSize.get(lang) || product.containerSize.get('en'),

      image: product.image,
      seasons: product.seasons,
      incoterms: product.incoterms,

      variants: product.variants.map(variant => ({
        name: variant.name.get(lang) || variant.name.get('en'),
        image: variant.image,
        minimumOrder: variant.minimumOrder,
        maximumOrder: variant.maximumOrder
      })),

      createdAt: product.createdAt
    }))

    res.status(200).json(formatted)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message
    })
  }
})


// GET SINGLE PRODUCT
router.get('/products/:id', async (req, res) => {
  try {
    const lang = req.query.lang || 'en'

    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({
      _id: product._id,

      title: product.title.get(lang) || product.title.get('en'),
      descriptions: product.descriptions.get(lang) || product.descriptions.get('en'),
      packaging: product.packaging.get(lang) || product.packaging.get('en'),
      containerSize: product.containerSize.get(lang) || product.containerSize.get('en'),

      image: product.image,
      seasons: product.seasons,
      incoterms: product.incoterms,

      variants: product.variants.map(variant => ({
        name: variant.name.get(lang) || variant.name.get('en'),
        image: variant.image,
        minimumOrder: variant.minimumOrder,
        maximumOrder: variant.maximumOrder
      })),

      createdAt: product.createdAt
    })
  } catch (error) {
    res.status(400).json({ message: 'Invalid product ID' })
  }
})

// POST /api/products
router.post('/products',adminAuth, async (req, res) => {
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


export default router
