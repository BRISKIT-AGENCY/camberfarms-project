import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
      // e.g. "Grains", "Legumes", "Oil Seeds"
    },

    type: {
      type: String,
      required: true,
      trim: true
      // e.g. "White Maize", "Yellow Maize"
    },

    images: [
      {
        type: String,
        required: true
      }
    ],

    description: {
      type: String,
      required: true,
      trim: true
    },

    stockQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ['active', 'sold_out'],
      default: 'active'
    },

    moistureContent: {
      type: Number,
      min: 0,
      max: 100
    },

    proteinContent: {
      type: Number,
      min: 0,
      max: 100
    },

    cropYear: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// 🔁 Auto update status when stock is zero
productSchema.pre('save', function (next) {
  if (this.stockQuantity === 0) {
    this.status = 'sold_out'
  }
  next()
})

export default mongoose.model('Product', productSchema)
