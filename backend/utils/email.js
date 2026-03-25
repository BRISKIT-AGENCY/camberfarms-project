import dotenv from 'dotenv'
import { Resend } from 'resend'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(to, subject, text) {
  try {
    // For testing, force sending to your verified email
    const testRecipient = 'pastorphillofficial@gmail.com'

    const response = await resend.emails.send({
      from: 'Camber Farms <onboarding@resend.dev>', // fine for testing
      to: testRecipient, // must be your verified email
      subject,
      html: `<p>${text}</p>`,
    })

    console.log('Email sent via Resend:', response)
    return response
  } catch (err) {
    console.error('Resend email error:', err)
    throw err
  }
}
