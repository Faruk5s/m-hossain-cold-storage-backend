/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';

const createUser = catchAsync(async (req, res, next) => {
  const data  = req.body;
  const result = await UserServices.createUserInDB(data);
  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getUsers = catchAsync(async (req, res, next) => {
  const result = await UserServices.getAllUser();
  res.status(200).json({
    success: true,
    message: 'All Users fetched successfully',
    data: result,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await UserServices.getUserById(id);
  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;
  const result = await UserServices.updateUserInDB(id, data);
  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserInDB(id);
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
   createUser,
   getUsers,
   getUserById,
   updateUser,
   deleteUser,
};
