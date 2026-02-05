import express from 'express';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();

// POST /enquiries
router.post('/enquiries', async (req, res) => {
  try {
    const { sourceModel, name, email, phone, message, country } = req.body;

    if (!sourceModel || !['contact', 'feedback', 'message'].includes(sourceModel)) {
      return res.status(400).json({ message: 'Invalid or missing sourceModel' });
    }

    // -----------------------------
    // Validation based on sourceModel
    // -----------------------------
    if (!name) return res.status(400).json({ message: 'Name is required' });
    if (!message) return res.status(400).json({ message: 'Message is required' });

    if (sourceModel === 'contact') {
      if (!email) return res.status(400).json({ message: 'Email is required for contact enquiries' });
      if (!phone) return res.status(400).json({ message: 'Phone is required for contact enquiries' });
    }

    if (sourceModel === 'feedback') {
      if (!email) return res.status(400).json({ message: 'Email is required for feedback' });
      if (!phone) return res.status(400).json({ message: 'Phone is required for feedback' });
      if (!country) return res.status(400).json({ message: 'Country is required for feedback' });
    }

    if (sourceModel === 'message') {
      if (!email) return res.status(400).json({ message: 'Email is required for message enquiries' });
      if (!phone) return res.status(400).json({ message: 'Phone is required for message enquiries' });
    }

    // -----------------------------
    // Create the enquiry
    // -----------------------------
    const enquiry = new Enquiry({
      sourceModel,
      name,
      email,
      phone,
      message,
      country // optional for contact/message
    });

    await enquiry.save();

    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit enquiry', error: err.message });
  }
});

export default router;
