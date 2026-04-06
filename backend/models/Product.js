import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    translations: {
      type: Map,
      of: new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        variants: {
          type: mongoose.Schema.Types.Mixed,
          default: {},
        },
      }, { _id: false })
    },
    images: [
      { type: String, required: true }
    ],
    stockQuantity: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);


// 🔁 Auto update status when stock is zero
productSchema.pre('save', function () {
  if (this.stockQuantity === 0) {
    this.status = 'inactive';
  }
});

export default mongoose.model('Product', productSchema)
