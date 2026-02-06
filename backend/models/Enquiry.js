import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    message: { type: String, trim: true },
    adminReply: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['pending', 'read'], default: 'pending' },
    source: { type: String, trim: true },
    sourceModel: {
      type: String,
      enum: ['contact', 'feedback', 'message'],
      required: true
    },
    country: { type: String, trim: true } // optional, for feedback
  },
  { timestamps: true }
);

// 🔁 Set source automatically based on sourceModel
enquirySchema.pre('validate', async function() {
  if (this.sourceModel === 'contact') {
    this.source = 'africa';
  } else if (this.sourceModel === 'feedback' || this.sourceModel === 'message') {
    this.source = 'export';
  } else {
    this.source = 'unknown';
  }
});

export default mongoose.model('Enquiry', enquirySchema);
