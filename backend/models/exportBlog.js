import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
  heading: String,
  paragraphs: [String]
})

const exportBlogSchema = new mongoose.Schema(
  {
    title: String,
    excerpt: String,
    slug: { type: String, unique: true },
    image: String,

    sections: [sectionSchema], // 👈 IMPORTANT

    publishedAt: Date
  },
  { timestamps: true }
)

export default mongoose.model('ExportBlog', exportBlogSchema)