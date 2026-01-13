import express from 'express'
import Feedback from '../models/Feedback.js'

const router = express.Router()

// POST /api/feedback
router.post('/feedback', async (req, res) => {
  const { name, country, phone, email, message } = req.body

  // 🔴 Required fields
  const requiredFields = { name, country, phone, email, message }

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value || value.toString().trim() === '')
    .map(([key]) => key)

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Missing required fields',
      missingFields
    })
  }

  try {
    const feedback = new Feedback({
      name,
      country,
      phone,
      email,
      message
    })

    await feedback.save()

    res.status(201).json({
      message: 'Message sent successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
})

export default router
