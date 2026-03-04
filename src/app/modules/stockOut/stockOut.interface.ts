import { Types } from "mongoose";

export type TStockOut = {
  srNo: string;
  bookingNo: string;
  bookingId: Types.ObjectId;
  bagsOut: number;
  date: Date;
  doNo:string;
  createdAt?: Date;
  updatedAt?: Date;
};