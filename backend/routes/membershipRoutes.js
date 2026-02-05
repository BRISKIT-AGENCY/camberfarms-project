import express from 'express';
import Membership from '../models/Membership.js';
import { upload } from '../middleware/Upload.js';

const router = express.Router();


router.post(
  '/membership',
  upload.array('idFiles', 5),
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        address,
        country,
        state,
        region
      } = req.body;

      if (
        !name ||
        !email ||
        !phone ||
        !dateOfBirth ||
        !gender ||
        !address ||
        !country ||
        !state ||
        !region
      ) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'At least one ID file must be uploaded'
        });
      }

      const filePaths = req.files?.map(file => file.path) || [];

      const membership = await Membership.create({
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        address,
        country,
        state,
        region,
        idFiles: filePaths
      });

      // 🔔 Create notification
      await Notification.create({
        title: 'New membership application received',
        description: `${name} applied for membership from ${country}`,
        type: 'membership',
        sourceWebsite: 'africa',
        link: `/membership/${membership._id}`,
        date: new Date()
      });

      res.status(201).json({
        success: true,
        message: 'Membership created successfully',
        data: membership
      });
    } catch (error) {
      console.error('Membership error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);


export default router;
