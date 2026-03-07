import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { bookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';
import { bookingValidation } from './booking.validations';
import { auth, isAdmin } from '../auth/auth.middleware';

const router = express.Router();

// Create Booking
router.post(
  '/',
  auth,
  isAdmin,
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingController.createBooking,
);

// Get All Bookings
router.get('/', BookingController.getAllBookings);
router.get('/custom-bookings-report', BookingController.getCustomBookingsReport);

// Get Booking by Booking No
router.get('/:id', BookingController.getBookingById);

// Update Booking

router.patch(
  '/:id',
  validateRequest(bookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking,
);

// Delete Booking
router.delete('/:id', BookingController.deleteBooking);

export const BookingRoutes = router;
