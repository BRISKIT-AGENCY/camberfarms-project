import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    sourceWebsite: {
      type: String,
      required: true
    },
    type: {
      type: String, // blog, message, enquiry, etc.
      required: true
    },
    link: {
      type: String, // URL to redirect to
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

export default mongoose.model('Notification', notificationSchema)
