import express from 'express'
import Message from '../models/Message.js'

const router = express.Router()

// POST /api/messages
router.post('/message', async (req, res) => {
  const { name, phone, email, message } = req.body

  // Required fields
  const requiredFields = { name, phone, email, message }

  // Check for missing fields
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
    const newMessage = new Message({ name, phone, email, message })
    await newMessage.save()

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
