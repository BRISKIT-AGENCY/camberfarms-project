import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
  heading: String,
  paragraphs: [String]
});

const translationSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  sections: [sectionSchema]
}, { _id: false });

const exportBlogSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },

    translations: {
      type: Map,
      of: translationSchema
    },

    image: String,
    publishedAt: Date,

    // 👇 ADD THIS
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('ExportBlog', exportBlogSchema)