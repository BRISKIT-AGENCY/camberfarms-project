import Visitor from '../models/Visitor.js'

export const trackVisitor = async (req, _res, next) => {
  try {
    // Ignore non-page requests (optional but recommended)
    const ignorePaths = [
      '/api',
      '/favicon.ico'
    ]

    if (ignorePaths.some(p => req.originalUrl.startsWith(p))) {
      return next()
    }

    await Visitor.create({
      ip:
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      path: req.originalUrl
    })
  } catch (error) {
    console.error('Visitor tracking error:', error.message)
  }

  next()
}
