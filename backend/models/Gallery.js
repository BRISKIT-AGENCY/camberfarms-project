import mongoose from "mongoose"
const gallerySchema = new mongoose.Schema(
  {
    images: [
      {
        url: {
          type: String,
          required: true
        },
        size: {
          type: Number // bytes
        },
        width: Number,
        height: Number,
        aspectRatio: String,
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model('Gallery', gallerySchema)
