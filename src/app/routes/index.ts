import express from 'express';
import { customerRoutes } from '../modules/customer/customer.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { stockInRoutes } from '../modules/stockIn/stockIn.routes';
import { stockOutRoutes } from '../modules/stockOut/stockOut.routes';
import { statisticsRoutes } from '../modules/statistics/statistics.routes';
import { userRoutes } from '../modules/users/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/customers',
    routes: customerRoutes,
  },
  {
    path: '/bookings',
    routes: BookingRoutes,
  },
  {
    path: '/stock-ins',
    routes: stockInRoutes,
  },
  {
    path: '/stock-outs',
    routes: stockOutRoutes,
  },
  {
    path: '/statistics',
    routes: statisticsRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.routes));
export default router;
