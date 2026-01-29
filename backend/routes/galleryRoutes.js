import express from "express";
import Gallery from "../models/Gallery";

const router= express.Router

router.get('/gallery', async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, total: galleries.length, galleries })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to fetch galleries' })
  }
})

router.get('/gallery/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery not found' })
    res.status(200).json({ success: true, gallery })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to fetch gallery' })
  }
})