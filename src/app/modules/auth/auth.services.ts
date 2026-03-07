import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/user.model";

const loginUser = async (email: string, password: string) => {

  // find user with password
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }
  
  // compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  
  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }
  
  // create token
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
  
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthServices = {
  loginUser,
};