import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { bookingValidation } from './booking.validation';
import { BookingController, exportBookingReport } from './booking.controller';
import { bookingValidation } from './booking.validations';
import { auth, isAdmin } from '../auth/auth.middleware';

const router = express.Router();

// Create Booking
router.post(
  '/',
  auth,
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingController.createBooking,
);

router.post('/export-booking-pdf', exportBookingReport);

// Get All Bookings
router.get('/',auth, BookingController.getAllBookings);
router.get('/custom-bookings-report',auth, BookingController.getCustomBookingsReport);

// Get Booking by Booking No
router.get('/:id',auth, BookingController.getBookingById);

// Update Booking

router.patch(
  '/:id',auth,
  validateRequest(bookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking,
);

// Delete Booking
router.delete('/:id',auth, BookingController.deleteBooking);

export const BookingRoutes = router;
