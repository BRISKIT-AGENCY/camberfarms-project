import mongoose from 'mongoose'

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String, // e.g. "Red Pepper", "Yellow Pepper"
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    minimumOrder: {
      type: Number,
      required: true
    },

    maximumOrder: {
      type: Number,
      required: true
    }
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    // GENERAL GROUP
    title: {
      type: String, // e.g. "Pepper"
      required: true,
      trim: true
    },

    image: {
      type: String, // group cover image
      required: true
    },

    descriptions: {
      type: String,
      required: true
    },

    packaging: {
      type: String,
      required: true
    },

    containerSize: {
      type: String,
      required: true
    },

    seasons: {
      type: [String],
      required: true
    },

    incoterms: {
      type: [String],
      required: true
    },

    // VARIANTS UNDER GROUP
    variants: {
      type: [variantSchema],
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
