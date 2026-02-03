import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()


// GET ALL PRODUCTS
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      total: products.length,
      products
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    })
  }
})

// GET INDIVIDUAL PRODUCT
router.get('/products/:id', async (req, res) => {
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


export default router
