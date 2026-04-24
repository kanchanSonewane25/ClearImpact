import PDFDocument from 'pdfkit';
import path from 'path';

export const generate80GReceipt = (donation: any, res: any) => {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe the document to the response
  doc.pipe(res);

  // Set headers so the browser downloads the PDF
  res.setHeader('Content-disposition', `attachment; filename=80G_Receipt_${donation.traceId}.pdf`);
  res.setHeader('Content-type', 'application/pdf');

  // Header
  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('ClearImpact Foundation', { align: 'center' })
    .moveDown();

  doc
    .fontSize(12)
    .font('Helvetica')
    .text('Anandwan, Warora, Maharashtra, India 442914', { align: 'center' })
    .text('Email: support@clearimpact.org | Phone: +91 12345 67890', { align: 'center' })
    .moveDown()
    .moveDown();

  doc
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('80G TAX EXEMPTION RECEIPT', { align: 'center', underline: true })
    .moveDown();

  // Receipt Details
  doc
    .fontSize(12)
    .font('Helvetica')
    .text(`Receipt No: ${donation.traceId}`)
    .text(`Date: ${new Date(donation.createdAt).toLocaleDateString()}`)
    .moveDown();

  // Donor Details
  doc
    .font('Helvetica-Bold')
    .text('Received with thanks from:')
    .font('Helvetica')
    .text(`Name: ${donation.donor ? donation.donor.name : donation.guestName || 'Valued Donor'}`)
    .text(`Email: ${donation.donor ? donation.donor.email : donation.guestEmail || 'N/A'}`)
    .moveDown();

  // Donation Amount
  doc
    .font('Helvetica-Bold')
    .text(`Amount: ₹${donation.amount} (${donation.currency})`)
    .text(`Allocated To: ${donation.allocatedTo}`)
    .moveDown();

  // 80G Statement
  doc
    .fontSize(10)
    .font('Helvetica-Oblique')
    .text('This receipt is valid for tax exemption under section 80G of the Income Tax Act, 1961.', { align: 'justify' })
    .moveDown();

  // Footer / Signature
  doc
    .fontSize(12)
    .font('Helvetica')
    .text('Authorized Signatory', { align: 'right' })
    .moveDown(0.5)
    .text('For ClearImpact Foundation', { align: 'right' });

  // Finalize PDF file
  doc.end();
};
