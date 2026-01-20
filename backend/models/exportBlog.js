import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
  heading: {
    type: Map,
    of: String
  },
  paragraphs: {
    type: Map,
    of: [String]
  }
})

const exportBlogSchema = new mongoose.Schema(
  {
    title: {
      type: Map,
      of: String
    },
    excerpt: {
      type: Map,
      of: String
    },
    slug: { type: String, unique: true },
    image: String,

    sections: [sectionSchema],

    publishedAt: Date
  },
  { timestamps: true }
)

export default mongoose.model('ExportBlog', exportBlogSchema)