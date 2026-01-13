import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()


// GET ALL PRODUCTS
// GET /api/products
router.get('/products', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message
    })
  }
})

// GET SINGLE PRODUCT
// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ message: 'Invalid product ID' })
  }
})

export default router
