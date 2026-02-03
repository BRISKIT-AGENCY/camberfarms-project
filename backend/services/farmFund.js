import FarmFund from '../models/FarmFund.js'

export async function getFarmFundRegistrations(limit = null) {
  const registrations = await FarmFund.find().sort({ createdAt: -1 }).lean()
  const result = limit ? registrations.slice(0, limit) : registrations
  const count = await FarmFund.countDocuments()
  return { count, registrations: result }
}
