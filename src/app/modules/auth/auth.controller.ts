import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

 const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await AuthServices.loginUser(email, password);

  // res.cookie("token", result.token, {
  //   httpOnly: true,
  //   // secure: process.env.NODE_ENV === "production",
  //   // sameSite: process.env.NODE_ENV === "production"?"none":'strict',
  //   secure: true,
  //   sameSite: 'none',
  //    domain: ".render.com",
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token:result.token,
    },
  });
};

 const logoutUser = async (req: Request, res: Response) => {

  res.clearCookie("token",{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"strict"
  });

  res.status(200).json({
    success:true,
    message:"Logged out successfully"
  });

};

const getMe=async (req:Request,res:Response)=>{
  const user=req.user;
  res.status(200).json({
    success:true,
    data:user,
    message:"User is validated successfully"
  });
}

export const AuthControllers={
    loginUser,logoutUser,getMe
}