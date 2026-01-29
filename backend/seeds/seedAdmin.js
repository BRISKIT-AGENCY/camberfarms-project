import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const username = 'admin'
    const password = 'admin123' // change after first login

    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      console.log('Admin already exists')
      process.exit(0)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await Admin.create({
      username,
      passwordHash,
      role: 'admin',
    })

    console.log('✅ Admin user created')
    console.log('Username:', username)
    console.log('Password:', password)

    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seedAdmin()
