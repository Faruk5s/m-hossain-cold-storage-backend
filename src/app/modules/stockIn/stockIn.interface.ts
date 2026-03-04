import { Types } from "mongoose";

export type TStockIn = {
  srNo: string;
  bookingId: Types.ObjectId;
  bookingNo:string;
  bagsIn: number;
  srHolderName:string;
  potatoName:string;
  receiverName:string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};