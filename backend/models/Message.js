import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "read"],
      default: "pending"
    },
    adminReply: {
      type: String,
      trim: true,
      default: ''
    },
    source: {
      type: String,
      default: 'export',
      immutable: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Message', messageSchema)
