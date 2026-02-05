import PDFDocument from 'pdfkit'

export function exportRegistrationsToPDF(data, res, title = 'Registrations') {
  const doc = new PDFDocument({ margin: 40 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${title.toLowerCase().replace(' ', '_')}.pdf`
  )

  doc.pipe(res)

  doc.fontSize(18).text(title, { align: 'center' })
  doc.moveDown(1)

  const margin = 40
  const colWidths = {
    customer: 150,
    country: 120,
    status: 80,
    date: 120
  }

  // Header
  doc.font('Helvetica-Bold').fontSize(12)
  doc.text('Farmers', margin, doc.y, { width: colWidths.customer })
  doc.text('Country', margin + colWidths.customer, doc.y, { width: colWidths.country })
  doc.text('Status', margin + colWidths.customer + colWidths.country, doc.y, { width: colWidths.status })
  doc.text('Date', margin + colWidths.customer + colWidths.country + colWidths.status, doc.y, { width: colWidths.date })

  doc.moveDown(0.5)
  doc.font('Helvetica').fontSize(11)

  data.forEach(item => {
    const y = doc.y

    doc.text(`${item.name}\n${item.email}`, margin, y, { width: colWidths.customer })
    doc.text(item.country || 'N/A', margin + colWidths.customer, y, { width: colWidths.country })
    doc.text(item.status || 'N/A', margin + colWidths.customer + colWidths.country, y, { width: colWidths.status })
    doc.text(new Date(item.createdAt).toLocaleString(), margin + colWidths.customer + colWidths.country + colWidths.status, y, { width: colWidths.date })

    doc.moveDown(2)
  })

  doc.end()
}
