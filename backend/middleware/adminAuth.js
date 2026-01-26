import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    // 👇 THIS is the key addition
    req.admin = {
      adminId: decoded.adminId,
      role: decoded.role
    }

    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default adminAuth
