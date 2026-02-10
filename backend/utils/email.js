import dotenv from 'dotenv'
import nodemailer from 'nodemailer'


dotenv.config()

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})


export async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: `"Admin Panel" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text
  })
}
