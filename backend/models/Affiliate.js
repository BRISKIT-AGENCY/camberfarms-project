import mongoose from 'mongoose'

const affiliateSchema = new mongoose.Schema(
  {
    fullName: {
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
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },

    understandTerms: {
      type: String,
      enum: ['yes', 'no'],
      required: true
    },

    haveABuyer: {
      type: String,
      enum: ['yes', 'no'],
      required: true
    },

    buyerCountry: {
      type: String,
      default: ''
    },
    buyerProduct: {
      type: String,
      default: ''
    },
    productVolume: {
      type: String,
      default: ''
    },

    aboutInterest: {
      type: String,
      required: true
    },
    aboutCommission: {
      type: String,
      required: true
    },

    referralPlatform: {
      type: String,
      required: true
    },
    referralPlatformOthers: {
      type: String,
      default: ''
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Affiliate', affiliateSchema)
