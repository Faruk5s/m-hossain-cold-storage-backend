import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserInDB = async (data: TUser) => {
  const result = await UserModel.create(data);
  return result;
};

const getAllUser = async () => {
  const result = await UserModel.find().sort({createdAt:'desc'});
  return result;
};

const getUserById = async (userId: string) => {
  const result = await UserModel.findById({ userId });
  return result;
};

const updateUserInDB = async (userId: string, data: Partial<TUser>) => {
  const result = await UserModel.findByIdAndUpdate(userId , data, { new: true });
  return result;
};

const deleteUserInDB = async (userId: string) => {
  const result = await UserModel.findByIdAndDelete( userId );
  return result;
};

export const UserServices = {
   createUserInDB,
   getAllUser,
   getUserById,
   updateUserInDB,
   deleteUserInDB,
};
