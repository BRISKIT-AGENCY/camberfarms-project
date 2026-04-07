import express from 'express'
import Affiliate from '../models/Affiliate.js'
import adminAuth from '../middleware/adminAuth.js'
import Notification from '../models/Notification.js'

const router = express.Router()

router.post('/affiliate', async (req, res) => {
  const {
    fullName,
    phone,
    email,
    country,
    city,
    understandTerms,
    haveABuyer,
    buyerCountry,
    buyerProduct,
    productVolume,
    aboutInterest,
    aboutCommission,
    referralPlatform,
    referralPlatformOthers
  } = req.body

  // 🔴 Required fields (always)
  const requiredFields = {
    fullName,
    phone,
    email,
    country,
    city,
    understandTerms,
    haveABuyer,
    aboutInterest,
    aboutCommission,
    referralPlatform
  }

  // Find missing required fields
  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value || value.toString().trim() === '')
    .map(([key]) => key)

  // 🔴 Buyer-specific fields
  if (haveABuyer === 'yes') {
    if (!buyerCountry) missingFields.push('buyerCountry')
    if (!buyerProduct) missingFields.push('buyerProduct')
    if (!productVolume) missingFields.push('productVolume')
  }

  // ❌ If any field is missing
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Missing required fields',
      missingFields
    })
  }

  try {
    const affiliate = new Affiliate({
      fullName,
      phone,
      email,
      country,
      city,
      understandTerms,
      haveABuyer,
      buyerCountry: buyerCountry || '',
      buyerProduct: buyerProduct || '',
      productVolume: productVolume || '',
      aboutInterest,
      aboutCommission,
      referralPlatform,
      referralPlatformOthers: referralPlatformOthers || ''
    })

    await affiliate.save()

    // 🔔 Create a notification for new affiliate application
    await Notification.create({
      title: 'New Affiliate Application',
      description: `${fullName} submitted an affiliate application.`,
      sourceWebsite: 'export',
      type: 'affiliate',
      link: `/affiliate/${affiliate._id}`
    })

    res.status(201).json({
      message: 'Affiliate application submitted successfully'
    })
  } catch (error) {
    console.error('Affiliate creation error:', error)
    res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
})



export default router
