import Enquiry from "../models/Enquiry.js";

export async function getEnquiries(limit = null) {
  let enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
  return limit ? enquiries.slice(0, limit) : enquiries;
}
