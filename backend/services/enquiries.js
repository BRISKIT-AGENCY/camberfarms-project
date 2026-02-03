import Feedback from '../models/Feedback.js'
import contact from '../models/Contact.js'
import Message from '../models/Message.js'

export async function getEnquiries(limit = null) {
  const [feedbacks, contacts, messages] = await Promise.all([
    Feedback.find().lean(),
    contact.find().lean(),
    Message.find().lean()
  ])

  const combined = [
    ...feedbacks.map(item => ({ ...item, type: 'feedback' })),
    ...contacts.map(item => ({ ...item, type: 'contact' })),
    ...messages.map(item => ({ ...item, type: 'message' }))
  ]

  const sorted = combined.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  return limit ? sorted.slice(0, limit) : sorted
}
