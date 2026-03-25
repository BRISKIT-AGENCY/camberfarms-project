import mongoose from "mongoose"
const gallerySchema = new mongoose.Schema(
  {
    images: {
      type: [
        {
          url: { type: String, required: true },
          size: Number,
          width: Number,
          height: Number,
          aspectRatio: String,
          uploadedAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
)

export default mongoose.model('Gallery', gallerySchema)
