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
      enum: ['active', 'inactive'],
      default: 'active'
    },

    variants: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: false
    }
  },
  {
    timestamps: true
  }
)

// 🔁 Auto update status when stock is zero
productSchema.pre('save', function (next) {
  if (this.stockQuantity === 0) {
    this.status = 'inactive'
  }
  next()
})

export default mongoose.model('Product', productSchema)
