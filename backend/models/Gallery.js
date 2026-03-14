import mongoose from "mongoose"
const gallerySchema = new mongoose.Schema({
  url: String,
  size: Number,
  width: Number,
  height: Number,
  aspectRatio: Number,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Gallery', gallerySchema)
