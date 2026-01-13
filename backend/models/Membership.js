import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema(
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
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    idFiles: [
      {
        type: String // stored file paths or URLs
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Membership', membershipSchema);
