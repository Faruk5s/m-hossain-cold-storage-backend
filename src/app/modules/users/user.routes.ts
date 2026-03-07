import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validations';
import { UserController } from './user.controller';
import { auth, isAdmin } from '../auth/auth.middleware';

const router = express.Router();

// Create Customer
router.post(
  '/',
  validateRequest(userValidation.createUserValidation),
  UserController.createUser,
);

// Get All Customers
router.get(
  '/',
   
  UserController.getUsers,
);

// Get Customer by ID
router.get(
  '/:id',
  UserController.getUserById,
);

// Update Customer
router.put(
  '/:id',
  validateRequest(userValidation.updateUserValidation),
  UserController.updateUser,
);

// Delete Customer
router.delete(
  '/:id',
  UserController.deleteUser,
);

export const userRoutes = router;
