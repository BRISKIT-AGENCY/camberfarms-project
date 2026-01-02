import express from 'express';
import Contact from '../models/contact.js';

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Save contact form message
 * @access  Public
 */
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log(name);
    

    // Basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newContact
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
