import mongoose from 'mongoose'

/**
 * Variant Schema
 */
const variantSchema = new mongoose.Schema(
  {
    name: {
      type: Map,
      of: String, // { en: "Red Pepper", fr: "Poivron Rouge", de: "Rote Paprika" }
      required: true
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

/**
 * Product Schema
 */
const productSchema = new mongoose.Schema(
  {
    title: {
      type: Map,
      of: String, // { en, fr, de, es, it, pt, ar, zh, ru, tr }
      required: true
    },

    image: {
      type: String, // group cover image
      required: true
    },

    descriptions: {
      type: Map,
      of: String,
      required: true
    },

    packaging: {
      type: Map,
      of: String,
      required: true
    },

    containerSize: {
      type: Map,
      of: String,
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

    variants: {
      type: [variantSchema],
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
