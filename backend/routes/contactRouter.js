import express from 'express';
import contact from '../models/Contact.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();


router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    

    // Basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const newContact = await contact.create({
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
