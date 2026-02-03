import PDFDocument from 'pdfkit'

export function exportFarmFundToPDF(registrations, res) {
  const doc = new PDFDocument({ margin: 40 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=farmfund_registrations.pdf'
  )

  doc.pipe(res)

  doc.fontSize(18).text('Farm Fund Registrations', { align: 'center' })
  doc.moveDown()

  registrations.forEach((r, i) => {
    doc
      .fontSize(12)
      .text(`${i + 1}. Name: ${r.name || 'N/A'}`)
      .text(`Email: ${r.email || 'N/A'}`)
      .text(`Phone: ${r.phone || 'N/A'}`)
      .text(`Amount: ${r.amount || 'N/A'}`)
      .text(`Date: ${new Date(r.createdAt).toLocaleString()}`)
      .moveDown()
  })

  doc.end()
}
