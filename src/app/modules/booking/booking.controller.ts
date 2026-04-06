import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.services';
import PDFDocument from 'pdfkit';
const createBooking = catchAsync(async (req, res) => {
   const payload = {
    ...req.body,
    date: new Date(req.body.date), // ✅ convert ONCE here
  };
  const result = await BookingServices.createBookingIntoDB(payload);

  res.status(200).json({
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
    const query=req?.query

  const result = await BookingServices.getAllBookings(query);

  res.status(200).json({
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});
const getCustomBookingsReport = catchAsync(async (req, res) => {
    const query=req?.query
  const result = await BookingServices.getCustomBookingsReport(query);

  res.status(200).json({
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getBookingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getBookingById(id);

  res.status(200).json({
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
const updateData = {
    ...req.body,
    ...(req.body.date && { date: new Date(req.body.date) }),
  };

  const result = await BookingServices.updateBookingInDB(id, updateData);

  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

export const exportBookingReport = async (req: Request, res: Response) => {
    try {
        const data = req.body.data || []; // send reportData.data from frontend

        const doc = new PDFDocument({
            margin: 30,
            size: 'A4',
        });

        // 🔥 Set headers for download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=booking-report-${Date.now()}.pdf`
        );

        // Pipe PDF to response
        doc.pipe(res);

        // Title
        doc
            .fontSize(16)
            .text('Booking Report', { align: 'center' })
            .moveDown();

        // Table Header
        const tableTop = 80;
        const colWidths = [30, 70, 70, 120, 50, 50, 60, 60, 70];

        const headers = [
            'SL',
            'Type',
            'Booking No',
            'Customer',
            'Qty',
            'Rate',
            'Amount',
            'Advance',
            'Date'
        ];

        let x = 30;

        doc.fontSize(9).font('Helvetica-Bold');

        headers.forEach((header, i) => {
            doc.text(header, x, tableTop, {
                width: colWidths[i],
                align: 'left',
            });
            x += colWidths[i];
        });

        doc.moveTo(30, tableTop + 15)
            .lineTo(565, tableTop + 15)
            .stroke();

        // Table Rows
        let y = tableTop + 20;
        doc.font('Helvetica').fontSize(8);

        data.forEach((row: any, index: number) => {
          
            if (y > 750) {
                doc.addPage();
                y = 50;
            }

            let x = 30;

            const customerText = `${row.customerName}\n${row.phone}\n${row.address}`;

            const rowData = [
                index + 1,
                row.bookingType,
                row.bookingNo,
                customerText,
                row.qtyOfBags,
                row.rate,
                row.amount,
                row.advanceAmount,
                new Date(row.date).toLocaleDateString(),
            ];

            rowData.forEach((cell, i) => {
                doc.text(String(cell), x, y, {
                    width: colWidths[i],
                    align: 'left',
                });
                x += colWidths[i];
            });

            y += 40; // 🔥 adjust row height (important)
        });

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'PDF generation failed' });
    }
};

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingInDB(id);

  res.status(200).json({
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getCustomBookingsReport
};
