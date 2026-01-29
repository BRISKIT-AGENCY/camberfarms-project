import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  profilePhoto: {
    type: String, // store URL or path to the profile image
    default: ''    // optional default empty string
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Admin', adminSchema)

