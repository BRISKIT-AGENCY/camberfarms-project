import PDFDocument from 'pdfkit'

export function exportToPDF(enquiries, res) {
  const doc = new PDFDocument({ margin: 40 })

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=enquiries.pdf'
  )

  doc.pipe(res)

  // Title
  doc.fontSize(18).text('Enquiries Report', { align: 'center' })
  doc.moveDown(1)

  // Table column widths
  const margin = 40
  const colWidths = {
    customer: 150,
    subject: 250,
    website: 60,
    date: 80
  }

  // Table header
  doc.fontSize(12).font('Helvetica-Bold')
  doc.text('Customer', margin, doc.y, { width: colWidths.customer })
  doc.text('Subject', margin + colWidths.customer, doc.y, { width: colWidths.subject })
  doc.text('Website', margin + colWidths.customer + colWidths.subject, doc.y, { width: colWidths.website })
  doc.text('Date', margin + colWidths.customer + colWidths.subject + colWidths.website, doc.y, { width: colWidths.date })
  doc.moveDown(0.5)

  // Table rows
  doc.font('Helvetica').fontSize(11)
  enquiries.forEach(e => {
    const y = doc.y

    // Customer column: Name + Email (email under name)
    doc.text(`${e.name}\n${e.email}`, margin, y, { width: colWidths.customer })

    // Subject column: message
    doc.text(e.message, margin + colWidths.customer, y, { width: colWidths.subject })

    // Website column: source
    doc.text(e.source, margin + colWidths.customer + colWidths.subject, y, { width: colWidths.website })

    // Date column
    doc.text(new Date(e.createdAt).toLocaleString(), margin + colWidths.customer + colWidths.subject + colWidths.website, y, { width: colWidths.date })

    // Move down for next row
    doc.moveDown(2)
  })

  // Finalize PDF
  doc.end()
}
