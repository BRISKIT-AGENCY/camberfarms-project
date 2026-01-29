import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },

    adminReply: {
      type: String,
      trim: true,
      default: ''
    },

    status: {
      type: String,
      enum: ['pending', 'read'],
      default: 'pending'
    },
    source: {
      type: String,
      default: 'africa',
      immutable: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Contact', contactSchema);
